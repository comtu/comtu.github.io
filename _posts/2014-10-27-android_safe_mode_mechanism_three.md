---
layout : post
title : "Android安全模式机制之三(实际运用)"
category : Android
duoshuo: true
date : 2014-10-27
tags : [Android安全模式机制]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---

<style>
h3 {
    line-height: 1.5;
    letter-spacing: 2px;
    margin-top: -10px;
}
h6 {
    line-height: 1.5;
    letter-spacing: 2px;
    margin-top: -10px;
}

</style>

目录:
	
* ###1.移动平台中的主流签名作用
	* ######1.1自签名的完整性鉴别
	* ######1.2信任模式
	* ######1.3限制安装/运行
	* ######1.4权限的作用
	* ######1.5权限的安全性保护
	* ######1.6Android的签名作用
	* ######1.7Android APK之METAINF

* ###2.Android中的权限
	* ######2.1Android的权限作用
	* ######2.2Android的权限类别
	* ######2.3Android的权限定义方式
	* ######2.4Android的运行时权限控制方式
	* ######2.5Android的Permission与UID/GID的mapping

* ###3.Android中的组件的安全机制
	* ######3.1组件的权限分配(Demo)
		* ######3.1.1 Activity
		* ######3.1.2 Service
		* ######3.1.3 ContentProvide
		* ######3.1.4 BroadcastReceiver

* ###4.Android应用安装
	* ######4.1应用安装的安全性考虑和调用方式
	* ######4.2应用安装流程之UID/GID的分配
	* ######4.3应用安装流程之工作目录的创建和权限设置
	
* ###5.Android中系统Service的安全
	* ######5.1Binder的安全
	* ######5.2ServiceManager Add Service的安全限制
	* ######5.3Zygote的Process Fork
	* ######5.4Zygote的Socket安全检查	

* ###6.Android中的ContentProvider以及基于URI的安全
	* ######6.1ContentProvider的作用
	* ######6.2权限临时继承的需求
	* ######6.3配置ContentProvider允许临时委派权限
	* ######6.4基于URI的权限临时委派

* ###7.Android的Policy模式和多设备绑定
	* ######7.1Android的Policy模式
	* ######7.2MR2开始的AppOps(安卓4.3开始)
	* ######7.3AppOps对开发者的影响
	* ######7.4设备绑定
	* ######7.5跨设备使用

* ###8.应用内计费和App2SDCard
	* ######8.1应用内计费
	* ######8.2SD卡安装应用的安全策略

* ###9.Android中的多用户安全
	* ######9.1需求场景
	* ######9.2UserManagerService
	* ######9.3对开发者的影响

* ###10.Android Superuser机制讲解
	* ######10.1ROOT的作用
	* ######10.2ROOT的第一步:寻找漏洞并安装特权文件
	* ######10.3SU的sUID的特性
	* ######10.4SU的核心代码分析
	* ######10.5MR2后的方案:SU Deamon Service

* ###11.SEAndroid
	* ######11.1DAC和MAC
	* ######11.2基于Label的MAC
	* ######11.3推荐读物



<!-- more -->

---

**1.移动平台中的主流签名作用**
	
	1.1 自签名的完整性鉴别
		证书的签名者和证书拥有者是同一个实体---自签名
			作为信任链的根证书.
			完整性鉴别
	1.2 信任模式
		签名了?
		签名是可信的?
		可信任和普通应用的权利差异
			人为的把一些操作归类
			某类操作对于可信任应用和普通应用的表现不一样.
		
	1.3 限制安装/运行
		应用安装时
			是否包含签名?-->没有?禁止安装
			提取证书进行验证-->证书是有效且可信任的吗?-->不是?禁止安装
			基于证书的公钥对签名进行验证-->签名正确吗?-->不正确?禁止安装
		应用运行时
			是否包含签名?-->没有?禁止运行
			提取证书进行验证-->证书是有效且可信任的吗?-->不是?禁止运行
			基于证书的公钥对签名进行验证-->签名正确吗?-->不正确?禁止运行


	1.4 权限的作用

		细粒度的特权管理
			权限是一个ID或者一个字符串
			权限用来细分权利(类似Capability)
			通常一个权限与一类操作绑定
			权限首先需要申请
			但申请后是否被批准由平台策略决定

	1.5 权限的安全性保护

		通过签名
			权限的完整性保护:防篡改
			权限的授权安全策略:防Escalate


	1.6 Android的签名作用

		1.6.1.完整性鉴别
			支持自签名用于完整性鉴别
			不做信任模式
			不做安装和运行时的限制

		1.6.2.Signature Permision和ShareUID
			Signature Protection Level Permision
				用于特权Permission
				只有特定签名的Apk才被授权
				
				例如:

<pre class="brush: xml;">
	&lt;!--访问硬件辅助设备,用于硬件测试 -->
	&lt;--allows access to hardware peripherals . Intended only for hardware testing . &lt;p>Not for use by third-party applications.-->
	&lt;permission android:name="android.permission.HARDWARE_TEST"
		android:permissionGroup="android.permission-group.HARDWARE_CONTROLS"
		android:protectionLevel="signature"
		android:lable="@string/permlab_hardware_test"
		android:description="@string/permadesc_hardware_test" />
</pre>

			Share Process UID

<pre class="brush: xml;">
				android:sharedUserId="xxxx"
</pre>

				Process间Share UID的目的是共享资源等 (如:/data/data/A包名/目录下面)
				Android中两个APK Share相同的UID必须其签名所用的Private Key一样.

		1.6.3.身份ID和升级的匹配
			Android中的自签名只是代表了身份,但不代表身份是否可信任
			Android的应用的标识符是Package Name
				Package Name不一样,相互不影响,允许同时存在(安装)
				Package Name一样,只能存在一个,允许做升级处理.
			升级的安全性考虑
				必须签名的证书一致(防假冒,防侵入隐私)
				如果不一致,则用户要么放弃新的应用,要么先卸载旧的,再安装新的.但这属于安装,不属于升级
				正常的升级将不擦除应用的工作目录数据,以保证历史数据的持续性.


	1.7Android APK之METAINF

		APK结构

![apk结构](/res/img/blog/2014/10/27/android_safe_mode_mechanism_three/001.png)

		META INF的组成

![METAINF结构](/res/img/blog/2014/10/27/android_safe_mode_mechanism_three/002.png)

		签名流程

<pre class="brush: shell;">
	java -jar signapk.jar testkey.x509.pem testkey.pk8 update.apk update-signed.apk
</pre>

				这条命令的意思是:通过signapk.jar这个可执行jar包，以“testkey.x509.pem”这个公钥文件
						 和“testkey.pk8”这个私钥文件对“update.apk”进行签名，签名后的文件保存为“update_signed.apk”
				详情可阅:[Android APK 签名比对](http://www.blogjava.net/zh-weir/archive/2011/07/19/354663.html)
			
			MANIFEST.MF文件 (第一重保护,本文本里面包含apk的资源文件的每个文件的SHA1值)

![METAINF结构](/res/img/blog/2014/10/27/android_safe_mode_mechanism_three/003.png)

			CERT.SF文件 (第二重保护,本文本里面包含MANIFEST.MF里的所有内容,并包含有MANIFEST.MF的SHA1-Digest-Manifest)

![METAINF结构](/res/img/blog/2014/10/27/android_safe_mode_mechanism_three/004.png)

			CERT.RSA (第三重保护,此文件是一个PKCS#7格式的文件,
				里面包含证书信息,以及基于私钥的签名信息,
				签名信息是由整个CERT.SF文件的做一个基于sha1(160bit)+rsa(testkey.pk8,publicKey)生成)

![METAINF结构](/res/img/blog/2014/10/27/android_safe_mode_mechanism_three/005.png)

---

**2.Android中的权限**
	
	2.1 Android的权限作用
		细粒度特权管理
			权限与操作关联
			应用需要显式申请权限
			用户对权限可知(不可控) (也可通过LBE,腾讯管家,360等可进行权限控制)
			对特权权限单独控制
	
	2.2 Android的权限类别
		Normal 没那么敏感
		Dangerous 比较敏感的,安装时会被列举出来.
		Signature 基于特殊权限的权限(申请权限的apk它的签名的私钥必须要跟定义这个权限的私钥一致)
		SignatureOrSystem  申请权限的apk它的签名的私钥必须要跟定义这个权限的私钥一致或者apk是系统应用
	
	2.3 Android的权限定义方式

<pre class="brush: xml;">
   <!-- Allows an application to monitor incoming SMS messages, to record or perform processing on them. -->
    <permission android:name="android.permission.RECEIVE_SMS"
				android:permissionGroup="android.permission-group.MESSAGES"
				android:protectionLevel="dangerous"
				android:label="@string/permlab_receiveSms"
				android:description="@string/permdesc_receiveSms" />

				<!--name 权限名称
				permissionGroup 权限组
				protectionLevel 权限类别
				label 安装时用户可查看到的信息,提示申请当前权限的作用
				description 显示给用户的申请权限的详细概述-->
</pre>

[源代码frameworks/base/core/res/AndroidManifest.xml](http://osdn.jp/projects/gb-231r1-is01/scm/git/Gingerbread_2.3.3_r1_IS01/blobs/master/frameworks/base/core/res/AndroidManifest.xml)


	2.4 Android的运行时权限控制方式

		通过PM的CheckPermission
			Android独有的Service(底层平台不具有)
			所以需要在Android本身Framework中控制
			主流的Service一般都基于Binder IPC或者其他IPC提供服务
			所以在最底层控制(Service所在的Server中)以避免逃逸控制
				绕开应用函数直接调用远程服务
			例子:(mContext.checkCallingOrSelfPermission(permission) == PackageManager.PERMISSION_GRANTED)
				
		映射为OS的特定属性
			非Android特有的Service(底层平台已经提供,如File访问,TCPIP数据收发等)
			多个入口访问ndroidAPI,Java API NDK C API , Shell , et:Ac
			底层控制准则,会聚口在底层,所以在底层(OS层面)统一控制,这样可以避免逃逸控制
			所以复用OS的一些安全控制特性,比如GID
			所以需要把Android空间的Permission Mapping到OS的GID
		
<pre class="brush: shell;">
	进入到手机SDCard里发现GID都是sdcard_rw
	shell@android:/storage/sdcard0 $ ls -l
	ls -l
		      UID      GID
	drwxrwxr-x system   sdcard_rw          2014-12-15 18:03 Android
	drwxrwxr-x system   sdcard_rw          2015-03-18 16:09 BaiduMapSdk
	drwxrwxr-x system   sdcard_rw          2014-06-30 10:04 BaoDownload
	drwxrwxr-x system   sdcard_rw          2014-07-07 17:33 Cache
	drwxrwxr-x system   sdcard_rw          2014-12-15 18:03 CloudDrive
	drwxrwxr-x system   sdcard_rw          2015-03-20 11:33 DCIM
	drwxrwxr-x system   sdcard_rw          2014-12-15 18:02 Download
	drwxrwxr-x system   sdcard_rw          2015-03-04 12:05 ExtDataTunnel
</pre>

<pre class="brush: xml;">
	&lt;uses-permission
	android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
</pre>

<pre class="brush: xml;">
	&lt;!--当开发者增加上条权限时会程序会自动增加这条信息. 本信息来源:frameworks/base/data/etc/platform.xml-->
	&lt;permission name="android.permission.WRITE_EXTERNAL_STORAGE">
		&lt;group gid="sdcard_rw" />
	&lt;/permission>
</pre>

<pre class="brush:shell; ruler: true;  highlight: [12] ; auto-links: false ; collapse: true ; gutter: false;">
	/*进程所占内存proc pid status*/
	shell@android:/proc/5914 # cat status
	cat status
	Name:   n.ledinside.app /*进程的程序名*/
	State:  S (sleeping) /*进程的状态信息*/
	Tgid:   5914 /*线程组号*/
	Pid:    5914 /*进程pid*/
	PPid:   148 /*父进程的pid*/
	TracerPid:      0 /*跟踪进程的pid*/
	Uid:    10075   10075   10075   10075 /*uid euid suid fsuid*/
	Gid:    10075   10075   10075   10075 /*gid egid sgid fsgid*/
	FDSize: 256 /*文件描述符的最大个数，file->fds*/
	Groups: 1015 1028 3003/*启动该进程的用户所属的组的id*/
	VmPeak:   354256 kB /*进程地址空间的大小*/
	VmSize:   301964 kB /*进程虚拟地址空间的大小reserved_vm：进程在预留或特殊的内存间的物理页*/
	VmLck:         0 kB /*进程已经锁住的物理内存的大小.锁住的物理内存不能交换到硬盘*/
	VmPin:         0 kB
	VmHWM:     63052 kB /*文件内存映射和匿名内存映射的大小*/
	VmRSS:     33884 kB /*应用程序正在使用的物理内存的大小，就是用ps命令的参数rss的值 (rss)*/
	VmData:    30484 kB /*程序数据段的大小（所占虚拟内存的大小），存放初始化了的数据*/
	VmStk:       136 kB /*进程在用户态的栈的大小*/
	VmExe:         8 kB /*程序所拥有的可执行虚拟内存的大小,代码段,不包括任务使用的库 */
	VmLib:     28068 kB /*被映像到任务的虚拟内存空间的库的大小*/
	VmPTE:       150 kB /*该进程的所有页表的大小*/
	VmSwap:        0 kB
	Threads:        15 /*共享使用该信号描述符的任务的个数*/
	SigQ:   0/3133 /*待处理信号的个数/目前最大可以处理的信号的个数*/
	SigPnd: 0000000000000000 /*屏蔽位，存储了该线程的待处理信号*/
	ShdPnd: 0000000000000000 /*屏蔽位，存储了该线程组的待处理信号*/
	SigBlk: 0000000000001204 /*存放被阻塞的信号*/
	SigIgn: 0000000000000000 /*存放被忽略的信号*/
	SigCgt: 00000002000094e8 /*存放被俘获到的信号*/
	CapInh: 0000000000000000 /*能被当前进程执行的程序的继承的能力*/
	CapPrm: 0000000000000000 /*进程能够使用的能力，可以包含CapEff中没有的能力，这些能力是被进程自己临时放弃的*/
	CapEff: 0000000000000000 /*是CapPrm的一个子集，进程放弃没有必要的能力有利于提高安全性*/
	CapBnd: ffffffffffffffff
	Cpus_allowed:   3 /*可以执行该进程的CPU掩码集*/
	Cpus_allowed_list:      0-1
	voluntary_ctxt_switches:        223 /*进程主动切换的次数*/
	nonvoluntary_ctxt_switches:     406 /*进程被动切换的次数*/
</pre>
	
<pre class="brush: xml; highlight: [4]"   >
	&lt;!--Groups中1015正好对应的是SDCARD_RW-->
	#define AID_MEDIA         1013  /* mediaserver process */
	#define AID_DHCP          1014  /* dhcp client */
	#define AID_SDCARD_RW     1015  /* external storage write access */
	#define AID_VPN           1016  /* vpn system */
	#define AID_KEYSTORE      1017  /* keystore subsystem */
	#define AID_USB           1018  /* USB devices */

</pre>

	2.5 Android的Permission与UID/GID的mapping

		语法:
			UID assigning permission: 
				< assign-permission name="permission_name" uid="target_uid" />
			GIDs Mapping:
				<permission name="permission_nema" >
				<group gid="assigned gid" />
				<group gid="assigned gid" />
				.....
				</permission>
		发生时刻:安装时
		etc/permissions
			任何符合以上语法的在system/etc/permissions下面的xml文件,都会被系统读取来parse并进行UID/GID的mapping.
			比如Platform.xml(check代码)

[frameworks/base/data/etc/platform.xml](http://osdn.jp/projects/gb-231r1-is01/scm/git/Gingerbread_2.3.3_r1_IS01/blobs/master/frameworks/base/data/etc/platform.xml)

		安全性
			任何应用都可以为自己的permission assign GID? 
				当然不行! 只有Root用户才允许新增或者改写.
				并且对于ROOT用户组的用户也只有r权限
				如下为手机system/etc/permissions目录下的文件权限

<pre class="brush: shell; highlight: [3,7]"   >

	shell@android:/system/etc # ls -l	
	....
	drwxr-xr-x root     root              2013-07-09 21:54 permissions
	....
	shell@android:/system/etc # cd permissions
	shell@android:/system/etc/permissions # ls -l platform.xml
	-rw-r--r-- root     root         9466 2008-08-01 20:00 platform.xml

</pre>

---

**3.Android中的组件的安全机制**
		
		Android的4大组件及组件间的通信
		组件的public和private
		组件的权限分配

	3.1 组件的权限分配(demo)
		3.1.1.Activity
	
			服务端增加相应的权限:
		
<pre class="brush: xml; ruler: true; first-line: 0; highlight: [11,30] ; auto-links: true ; collapse: true ; gutter: true; ">

	&lt;?xml version="1.0" encoding="utf-8"?>
	&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
	    package="com.tu.test.diyPermission"
	    android:versionCode="1"
	    android:versionName="1.0" >

	    &lt;uses-sdk
		android:minSdkVersion="8"
		android:targetSdkVersion="19" />

	    &lt;!-- 自定义Activity权限 start -->
	    &lt;permission android:name="com.tu.test.diyPermission.DIYPERMISSION" />
	    &lt;!-- 自定义Activity权限 end -->

	    &lt;application
		android:allowBackup="true"
		android:icon="@drawable/ic_launcher"
		android:label="@string/app_name" >
		&lt;activity
		    android:name="com.tu.test.diyPermission.MainActivity"
		    android:label="@string/app_name" >
		    &lt;intent-filter>
			&lt;action android:name="android.intent.action.MAIN" />
			&lt;category android:name="android.intent.category.LAUNCHER" />
		    &lt;/intent-filter>
		&lt;/activity>
		&lt;!-- 自定义Activity权限 start -->
		&lt;activity
		    android:name=".NewPageActivity"
		    android:exported="true"
		    android:permission="com.tu.test.diyPermission.DIYPERMISSION" >
		    &lt;intent-filter>
			&lt;action android:name="com.tu.test.diyPermission.NewPageActivity" />
			&lt;category android:name="android.intent.category.DEFAULT" />
		    &lt;/intent-filter>
		&lt;/activity>
		&lt;!-- 自定义Activity权限 end -->
	    &lt;/application>
	&lt;/manifest>
</pre>

			客户端必须申请许可:
			否则会抛出:
				java.lang.SecurityException: Permission Denial: starting Intent { 
					act=com.tu.test.diyPermission.NewPageActivity cmp=com.tu.test.
					diyPermission/.NewPageActivity (has extras) } from ProcessRecord
					{41efe3e8 8642:com.tu.test.diyPermission.client/u0a204} (pid=8642,
					uid=10204) requires com.tu.test.diyPermission.DIYPERMISSION

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [11] ; auto-links: true ; collapse: true ; gutter: true; ">

	&lt;?xml version="1.0" encoding="utf-8"?>
	&lt;manifest xmlns:android="http://schemas.android.com/apk/res/android"
	    package="com.tu.test.diyPermission.client"
	    android:versionCode="1"
	    android:versionName="1.0" >

	    &lt;uses-sdk
		android:minSdkVersion="8"
		android:targetSdkVersion="19" />

	    &lt;!-- 申请应用DiyPermission中的自定义Activity权限 start -->
	    &lt;uses-permission android:name="com.tu.test.diyPermission.DIYPERMISSION" />
	    &lt;!-- 申请应用DiyPermission中的自定义Activity权限 end -->

	    &lt;application
		android:allowBackup="true"
		android:icon="@drawable/ic_launcher"
		android:label="@string/app_name" >
		&lt;activity
		    android:name="com.tu.test.diyPermission.client.MainActivity"
		    android:label="@string/app_name" >
		    &lt;intent-filter>
			&lt;action android:name="android.intent.action.MAIN" />
			&lt;category android:name="android.intent.category.LAUNCHER" />
		    &lt;/intent-filter>
		&lt;/activity>
	    &lt;/application>

	&lt;/manifest>
</pre>

		3.1.2.service
			
			服务端增加相应的权限:

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [2,12] ; auto-links: true ; collapse: true ; gutter: true; ">
	&lt;manifest ...>
	    &lt;permission
		android:name="com.tu.test.diyPermission.DIYPERMISSION_SERVICE"
		android:label="diy Permission service" 
		android:description="@string/hello_world"/>

		 &lt;application ...>
			....
			 &lt;service
			    android:name=".service.NewService"
			    android:enabled="true"
			    android:exported="true"
			    android:permission="com.tu.test.diyPermission.DIYPERMISSION_SERVICE" >
			    &lt;intent-filter>
				&lt;action android:name="com.tu.test.diyPermission.SERVICE_ACTION" />
			    &lt;/intent-filter>
			&lt;/service>
		 &lt;/application>
	 &lt;/manifest>
</pre>
	
			客户端必须申请许可:
			否则会抛出:
				Caused by: java.lang.SecurityException: 
					Not allowed to bind to service Intent { act=com.tu.test.diyPermission.SERVICE_ACTION }

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">
	&lt;uses-permission android:name="com.tu.test.diyPermission.DIYPERMISSION_SERVICE" />
</pre>

		3.1.3.ContentProvide

			服务端增加相应的权限:
				读,写,访问权限.

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [3,4,5,12,13,14] ; auto-links: true ; collapse: true ; gutter: true; ">		

	&lt;manifest ...>
		&lt;permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER" />
		&lt;permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_WRITE" />
		&lt;permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_READ" />

		 &lt;application ...>
			....
			 &lt;provider
			    android:name=".provider.NewContentProvider"
			    android:exported="true"
			    android:authorities="com.tu.test.diyPermission.providers.PersonProvider"
			    android:readPermission="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_READ"
			    android:writePermission="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_WRITE"
			    android:permission="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER" />
		 &lt;/application>
	 &lt;/manifest>
</pre>

			客户端必须申请许可:
			否则会抛出:
				Caused by: java.lang.SecurityException: Permission Denial: opening provider 
				com.tu.test.diyPermission.provider.NewContentProvider from ProcessRecord{4236abd0
				22086:com.tu.test.diyPermission.client/u0a204} (pid=22086, uid=10204) requires 
				com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_READ or com.tu.test.
				diyPermission.DIYPERMISSION_CONTENTPROVIDER_WRITE

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">

	&lt;uses-permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER" />
	&lt;uses-permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_WRITE" />
	&lt;uses-permission android:name="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_READ" />

</pre>

		3.1.4.BroadcastReceiver
			服务端增加权限:

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [3,8] ; auto-links: true ; collapse: true ; gutter: true; ">		

	&lt;manifest ...>
		....
		 &lt;permission android:name="com.tu.test.diyPermission.BROADCESTRECEIVER" />
		&lt;application ...>
			....
		  &lt;receiver
		    android:name=".receiver.NewReceiver"
		    android:permission="com.tu.test.diyPermission.BROADCESTRECEIVER" >
		    &lt;intent-filter>
			&lt;action android:name="com.tu.test.diyPermission.BROADCESTRECEIVER_ACTION" />
			&lt;category android:name="android.intent.category.DEFAULT" />
		    &lt;/intent-filter>
		&lt;/receiver>
		  &lt;/application>
	&lt;/manifest>

</pre>

			客户端必须申请许可:
				否则服务端周日接收不到信息

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [3,8] ; auto-links: true ; collapse: true ; gutter: true; ">		
 &lt;uses-permission android:name="com.tu.test.diyPermission.BROADCESTRECEIVER" />
</pre>


**4.应用安装**
	
	4.1.应用安装的安全性考虑和调用方式
		应用安装是一个高特权/风险操作,所以必须是可知/可控,主流实现方式:客户只能委派而不能直接操作.
		调用安装传统模式: 发送Intent给系统的Package Install app

<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">
			Intent intent = new Intent();
			intent.setAction(Intent.ACTION_VIEW);
			intent.setDataAndType(Uri.fromFile(file), "application/vnd.android.package-archive");
			intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			startActivity(intent);
</pre>

		特权安装模式:系统的Package Install App内部会调用PackageManagerService的Install Package,
			该操作与android.permission.INSTALL_PACKAGES 绑定,且该peimission的protection level是 signature|system
		
		所谓的静默安装方式只存在Root手机上,开发者可以选择:
			基于pm cmd : pm install -r

	4.2.应用安装流程之UID/GID的分配

		基于Android4.3原代码目录
		frameworks/base/services/java/com/android/srver/pm/PackageManagerService.java

<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
	//installPackage 将会调用 scanPackageLI

	privage PackageParser.Package scanPackageLI(PackageParser.Package pkg,int parseFlags,int scanMode,log currentTime,UserHandle user){
		....
		pkgSetting = mSettings.getPackageLPw(pkg,origPackage,realName,suid,destCodeFile,destResourceFile,pkg.applicationInfo.nativeLibraryDir,pkg.applicationInfo.flags,user,false);
		.....
		pkg.applicationInfo.uid = pkgSetting.appId;//说明是由Settings里面产生Uid,获取到appId
		....
		//invoke installer to do the actual installation 
		int ret = createDataDirsLI(pagName,pkg.applicationInfo.uid,pkg.applicationInfo.seinfo);//创建工作目录和权限设置
	}
</pre>
		
		fameworks/base/services/java/com/android/server/pm/Settings.java


<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
	private PackageSetting getPackageLPw(String name,PackageSetting origPackage,String realName,SharedUserSetting shardUser,File codePath,File resourcePath,String nativeLibraryPathString,int vc,int pkgFlags,UserHandle installUser,Boolean add , boolean allowlnstall){
		PackageSetting p = mPackages.get(name);
		if(p!=null){
			if(!p.codePath.equals(codePath)){
				//check to see if its a disabled syste
				.....
			}else{
				//Assign new user id
				p.appId = newUserIdLPw(p);//分配Uid
			}
		}
	}
	
	//分配Uid的方法
	private int newUserIdLPw(Object obj){
		//Let's be stupidly inefficient for now...
		final int N = mUserIds.size();
		for(int i = 0;i<N;i++){
			if(mUserIds.get(i)==null){
				mUserIds.set(i,obj);
				return Process.FIRST_APPLICATION_UID + i;//这就为什么用户安装的uid都是大于10000的原因.
			}
		}
		//None left?
		if(N>(Process.LAST_APPLICATION_UID-Process.FIRST_APPLICATION_UID)){
			return -1;
		}
		mUserIds.add(obj);
		return Process.FIRST_APPLICATION_UID+N;
	}

	frameworks/base/core/java/android/os/Process.java
	public static final int FIRST_APPLICATION_UID=10000;//这就为什么用户安装的uid都是大于10000的原因.
</pre>

	4.3.应用安装流程之工作目录的创建和权限设置

		frameworks/base/services/java/com/android/server/pm/PackageManagerService.java

<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
	
	private int createDataDirsLI(String packageName,int uid,String seinfo){
		int [] users = sUserManager.getUserIds();
		int res = mlnstaller.install(packageName,uid,uid,seinfo);//从这里可以看出uid gid都被设置成uid
		if(res<0){
			return res;
		}
		//only for multi-user//Android 4.1之后支持多用户
		for(int user: users){
			if(user!=0){
				res = mlnstaller.createUserData(packageName,UserHandle.getUid(user,uid),user);
				if(res<0){
					return res;
				}
			}
		}
		return res;
	}

</pre>
		
		frameworks/base/services/java/com/anddroid/server/pm/Installer.java
		
<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
	
	private boolean connect(){//Installer一起来会进行初始化
		if(mSocket!=null){
			return true;
		}
		try{
			mSocket = new LocalSocket();
			//本地Socket
			LocalSocketAddress address = new LocalSocketAddress("installd",LocalSocketAddress.Namespace.RESERVED);
			mSocket.connect(address);
			mIn = mSocket.getInputStream();
			mOut = mSocket.getOutputStream();
		}catch(IOException ex){
			disconnect();
			return false;
		}
		return true;
	}

	private int install(String name,int uid , int gid , String seinfo){
		//内部协议
		StringBuilder builder = new StringBuilder("install");
		builder.append('');
		builder.append(name);
		builder.append('');
		builder.append(uid);
		builder.append('');
		builder.append(gid);
		builder.append('');
		builder.append(seinfo!=null?seinfo:"!");
		return execute(builder.toString());//会调用mOut mIn发数据
	}

</pre>

		frameworks/native/cmds/installd/installd.c

<pre class="brush: c; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
			
		int main(const int argc, const char *argv[]) {   //here the SOCKET_PATH is installd
			..........
			lsocket = android_get_control_socket(SOCKET_PATH);
			if (listen(lsocket, 5)) {}
			 fcntl(lsocket, F_SETFD, FD_CLOEXEC);
			 for (;;) {
				alen = sizeof(addr);
				s = accept(lsocket, &addr, &alen);
				fcntl(s, F_SETFD, FD_CLOEXEC);

				if(readx(s,buf,count)){}
				if(execute(s,buf))break;
			}
		}

		static int do_install(char **arg, char reply[REPLY_MAX])
		{
		    return install(arg[0], atoi(arg[1]), atoi(arg[2]), atoi(arg[3])); /* pkgname, uid, gid */
		}
</pre>

		framework/native/cmds/installd/commands.c

<pre class="brush: c; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		

	int install(const char *pkgname, int encrypted_fs_flag, uid_t uid, gid_t gid){
		.....
		if(create_pkg_path(pkgdir,pkgname,PKG_DIR_POSTEIX,0)){//创建工作目录结构,/data/data/包名/
			ALOGE("cannot create package path\n");
			return -1;
		}....
		if (mkdir(pkgdir, 0751) < 0) {//创建目录,并设置权限 0751 uid7(4+2+1)读写执行,gid5(4+1)读执行,其它1(1)执行
			ALOGE("cannot create dir '%s': %s\n", pkgdir, strerror(errno));
			return -1;
		}
		if (chmod(pkgdir,0751) < 0) {//再设置一次权限
			ALOGE("cannot chmod dir '%s': %s\n", pkgdir, strerror(errno));
			unlink(pkgdir);
			return -errno;
		}.....
		if(chown(pkgdir,uid,gid)<0){//因设置权限时是使用root用户,些处再进行权限修改.把uid root , gid root 修改成应用的uid,与gid.
		.....
		}
	}
</pre>

**5.Android中系统Service的安全**
	
	5.1 Binder的安全	
		Binder的作用:实现以IPC的RPC,完成远程业务范围.

[Android进程间通信（IPC）机制Binder简要介绍和学习计划](http://blog.csdn.net/luoshengyang/article/details/6618363)

[SEAndroid安全机制对Binder IPC的保护分析](http://blog.csdn.net/luoshengyang/article/details/38326729)
	
	5.2 ServiceManager Add Service的安全限制
		Service Manager Process的作用: Naming Resolver,用于RPC框架中 AddService  GetSetvice
		

	5.3 Zygote的Process Fork

[Android系统进程Zygote启动过程的源代码分析](http://blog.csdn.net/luoshengyang/article/details/6768304)

[Android深入浅出之Zygote](http://www.cnblogs.com/innost/archive/2011/01/26/1945769.html)

	5.4 Zygote的Socket安全检查

[空]()


**6.Android中的ContentProvider以及基于URI的安全**
	
	6.1.ContentProvider的作用
		
		6.1.1.软件设计更优美(官方)
			屏蔽内部数据存储操作的差异性
			对外提供一致的数据操作方式
			抽象/共性---->都是数据操作

		6.1.2.进程间数据共享
			           Proxy|        Binder              |  Content Provider
			client Process  ------------------------------- > Service Process 
	
	6.2.权限临时继承的需求
		临时委派使得委托者的权限临时提升(类似Root-setUID模式)


	6.3.配置ContentProvider允许临时委派权限

<pre class="brush: xml; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
 &lt;provider 
	android:readPermission="com.tu.test.diyPermission.DIYPERMISSION_CONTENTPROVIDER_READ"
	android:grantUriPermissions="true" />
	&lt;!--允许派遣给uri-->
	&lt;provider ...>
		....
		&lt;grant-uri-permission android:path="/comtu/"/>
		&lt;!--允许派遣给限制URI的路径-->
	&lt;/provider>
	&lt;provider ...>
		....
		&lt;grant-uri-permission android:pathPrefix="/abc/"/>
				&lt;!--允许派遣给限制URI的路径前缀-->
	&lt;/provider>
	&lt;provider ...>
		....
		&lt;grant-uri-permission android:pathPattern=".*public.*"/>
		&lt;!--允许派遣给限制URI的路径通过正则-->
	&lt;/provider>
</pre>	

	6.4.基于URI的权限临时委派
		6.4.1 基于API

<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
			//委派uri权限临时委派给com.example.testapps.test2,权限为FLAG_GRANT_READ_URI_PERMISSION
			uri = "content://com.example.testapps.test1.mailprovider/attachments/42";
			Context.grantUriPermission("com.example.testapps.test2",uri,Intent.FLAG_GRANT_READ_URI_PERMISSION);

			//一定时间之后将收回委派的权限.否则可能存在安全隐患.需要思考的时什么时候收回.
			uri = "content://com.example.testapps.test1.mailprovider/attachments/42";
			Context.revokeUriPermission(uri,Intent.FLAG_GRANT_READ_URI_PERMISSION);
</pre>

		6.4.2 基于Intent

<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">		
			Intent intent = new Intent(Intent.ACTION_VIEW);
			intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
			intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
			intent.setDataAndType(uri,"image/gif");
			startActivity(intent);
</pre>
			权限的生命周期: Activity Start --> Destro即Activity的生命周期

**7.Android的Policy模式和多设备绑定**

	7.1.Android的Policy模式
		一个移动平台它解决用户隐私,相当的一系列控制或者说是跟用户的交互模式.
		安装时安全提问
			列出所有权限,提示用户是否安装.

			All or Nothing 
			None Runtime Control 
			None Recallable 
			Disable untrust source by default 

	7.2.MR2开始的AppOps(安卓4.3开始)
		如 LBE 等安全卫士控制权限

		>基于AppOps Service
		>定义Ignore , Allow Reject 3种Policy
		>Hook and check Permission

		
	7.3AppOps对开发者的影响
		开发者已经申请权限时,但被LBE等安全卫士等的权限限制.
			会导致权限一样获取不到.为了代码健壮性,需加多一些try catch.防止异常

	7.4设备绑定
		应用与设备绑定的需求前景
			如,计费应用.
			
		>同时基于SIM卡和Device的绑定(如BREW下载,单机内的下载卡可用.基于SIM卡计费,运营商间排斥)
		>仅基于Device的绑定(如Google Store下载,当时下载的Device可用)
		>实现: 加密 per device per SIM卡
			Device Key: ESN/MEID/IMEI or random generate
			SIM ID : IMSI
		
	7.5跨设备使用
		基于Account ID的云端管理
		Device1 --buy it using xx@x.x account -->AppStore<----Down load freely--(Register as xx@x.x) --Device2


**8.应用内计费和App2SDCard**

	8.1 应用内计费
		什么是应用内计费
			In App purchase or In app Billing(IAP,IAB)
			直接在应用内进行Paymen以unLock某些功能,或者买某些道具等
		应用内计费的需求
			可支付途径(信用卡,手机卡等)
			安全性:
				面向用户
					可知
					可控
				面向应用
					可信(避免免费使用收费内容)

		解决方案
			>计费Server接口保密且Transiction加密(SSL)
			>仅允许配套的安全本地组件与计费Server通信,且安全本地组件负责
				与用户的"显式"交互,同时提供API给Client
			>Clent仅允许调用本地计费安全组件来委派Transiction
			>Response的signature + Nounce (防止重放攻击)


	8.2 SD卡安装应用的安全策略	
		绑定设备
			>绑定perDevice使得防Export:应用以及应用数据(SD卡允许Export)
			>以加密实现之:例子,应用安装至SD卡(.Android_Secure in SDCard)

		ASEC的不可访问性
			由于.Android_Secure的加密特性,所以需要禁止应用直接Access该Folder(允许Access SDCard上的其他任何内容)

	
**9.Android中的多用户安全**

		4.2开始可以支持

	9.1需求场景
		已有的例子/ Windows/Linux多用户

		Android中的差别
			UID/GID跟着User走
			UID/GID和User的区分和绑定
		应用的可控共享
			共享,不存在多份Code
			可控,控制谁可见.
		数据的多用户独立
			工作目录
			External Storage(外部存储器)
	
	9.2UserManagerService
		作用:
			管理User的属性信息: 设置/获取用户的UserId,Name,Icon,RestrictProfile等
			管理User:创建,删除等
		
		UserId(UserHandle)是Process的属性,不100%等同于当前设置切换的用户
		一切与多用户相关的运行时行为(比如Mount的SDCard等)与进程的UserID所属有关,
			而与当前设置中的当前用户没有必然联系
		典型的例子:
			通过adb shell的方式,永远只能访问User0的SDCard:/data/media/0,不管切换哪个用户
			通过文件管理器应用访问的SDCard则与当前用户相关.
			原因: adb shell只存在User0,不管在哪个当前设置用户下.
	9.3对开发者的影响
		
		永远使用相对路径(基于工作目录)以及基于Environment.getXXXX来获取你感兴趣的路径(Environment内部
			会处理多用户).否则会出现路径错误而访问被拒绝的问题.

<pre class="brush: java;">		
		New File("setting/setting.log");
		New File(Environment.getExternalStorageDirectory+"SharePic/a.png");
</pre>


**10.Android Superuser机制讲解**
	
	10.1 ROOT的作用
		Customization(定制,用户化)
		任何需要特权的操作

	10.2 ROOT的第一步:寻找漏洞并安装特权文件
		Hack会寻找漏洞,如UID设置设备(ADB)
		手机Root后,最重要的是,给手机安装了su程序和superuser apk. su一般被安装在/system/xbin或者/system/bin

	10.3 SU的sUID的特性
		Android的App授权获取Root权限,其实不是App自身的权限提升了,而是通过具有Root权限的Sh流来执行shell命令.

<pre class="brush:shell;">
	shell@android:/system/xbin # ls su -l
	ls su -l
	-rwsr-sr-x root     root        79500 2008-08-01 20:00 su
</pre>
		这里可以看到,su是Owner和Group分别为Root,Root.Other用户具有Execute权限,另外,su设置了suid和sgid,这个非常重要,
			使得Su进程可以提升自身的EUID.

	
	
	10.4 SU的核心代码分析
		在JB MR2(4.3)之前,Apk内部可以通过Java的Runtime执行一个
			具有Root-setUid的可执行文件而提升Effective UID来完成一些特权操作,典型的Root包中的su就是这个原理.
		JB MR2中,修补了改漏洞.
			
	10.5 MR2后的方案:SU Deamon Service
		怎么办? Native Service依然可以利用Root-setUID的su提升权限
	

**11.SEAndroid**
	
	11.1 DAC和MAC
		DAC
			自主访问控制
			主体(Process)的Capability觉得了它能访问和操作什么?
				Root进程可以访问和操作一切!
			传统(legacy)Linux的安全模式,基于UID/GID/Capability
		MAC 
			强制访问控制
			系统的Policy觉得了主体能操作访问哪些客体
			即便是ROOT进程,系统Policy配置了你能做什么,你只能做什么,在MAC模式下,ROOT进程和普通进程是无区别对待的.
			 
	11.2 基于Label的MAC
		每个主体/客体在运行时都绑定一个标签(Label)
		该标签又称为Security Context
		Security Context的构成
			User : Role : Type : SecurityLevel
			比如: u:r:zygote:s0
		Type Enhancement
			Security Context中的Type主要是用于Policy的设定,即Policy
			一般的Rule是:
				Allow Type Type : Operation
				Allow appdomain zygote_tmpfs:file read;
			所以,Type被实际用于"授权"的Decision,所以称之为Type Enhancement
		ls命令的SELinux版本: ls -l -Z

		Ps命令的SELinux版本: ps -Z


	11.3 推荐读物

[Your visual how-to guide for SELinux policy enforcement](http://opensource.com/business/13/11/selinux-policy-guide)

[SELinux实例：使用安全增强的Linux](http://book.51cto.com/art/200810/94193.htm)
	
		
---

Android中的组件的安全机制之组件的权限分配(Demo)    
Activity Service ContentProvide BroadcastReceiver四大组件不同App数据通信:   
[Demo](/res/file/blog/2014/10/27/android_safe_mode_mechanism_three/Permission.rar)


