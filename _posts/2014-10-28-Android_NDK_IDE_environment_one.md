---
layout : post
title : "Android 中NDK的使用详解第一篇:环境"
category : Android
duoshuo: true
date : 2014-10-28
tags : [AndroidNDK , NDK , JNI]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---


## 1. 安装集成开发环境

所需要的开发工具:   
**Eclipse** 下载地址:[http://www.eclipse.org/downloads/](http://www.eclipse.org/downloads/)   
	选择Eclipse的时候可以选择C/C++版本的,方便后续直接在Eclipse里编写C程序.当然也可以自己对Eclipse安装C/C++插件   
**JDK** 下载地址:[http://www.oracle.com/technetwork/java/javase/downloads/index.html](http://www.oracle.com/technetwork/java/javase/downloads/index.html)   
**ADT** 下载地址:[http://developer.android.com/sdk/installing/installing-adt.html](http://developer.android.com/sdk/installing/installing-adt.html)   
**Android SDK** 下载地址:[http://developer.android.com/sdk/index.html](http://developer.android.com/sdk/index.html)   
**NDK** 下载地址:[http://developer.android.com/ndk/downloads/index.html](http://developer.android.com/ndk/downloads/index.html)   
	也可以直接下载**ADT Bundle** 但官方已经找不到下载地址.可网上搜索或者我下面提供的一个地址可找到.   
如果没有代理可能很多工具无法下载.这里提供一个[Android开发人员工具集给大家](http://www.androiddevtools.cn/)    

<!-- more -->

## 2. 配置环境
	
#### 2.1. 安装JDK并设置环境变量到path中. 如:javah工具等

#### 2.2. 解压Eclipse到D盘目录如: D:/eclipse

#### 2.3. 为Eclipse安装ADT插件 
> 解压ADT到到某一个目录后,单独复制`features`与`plugins`这两个文件夹到D:/eclipse/my_plugins/ADT/eclipse/目录下(新创建目录)  
> 然后到D:/eclipse/dropins目录下新创建一个adt.link文件,里面编写内容:	path=D:/eclipse/my_plugins/ADT/eclipse/

#### 2.4. 解压Android SDK到my_plugins目录下.
> 配置一下环境变量到path中,方便以后的需要.如:draw9patch工具等等

#### 2.5. 安装NDK,如果是压缩包形式则,解压到my_plugins目录下.
> 如果是安装包(exe,其实是zip的自解压文件)也可安装到my_plugins目录

#### 2.6. 如果是下载的Eclipse是C/C++版本的,默认是C/C++视图.修改视图-->点击右上角Open perspective-->选择java
	
> 如果非C/C++版本的则为Eclipse安装C/C++ 插件方法如下:

		1.Eclipse里安装CDT-->Help-->Install new software-->弹出窗口中-->
			Work with:输入-->http://download.eclipse.org/tools/cdt/releases/galileo
			-->回车-->等待一段时间后会在下面列表显示出CDT Main Features选中-->Next-->等待安装完后重启Eclipse即可.
		2.安装MinGW --- C/C++编译平台，下载后需要安装，http://www.mingw.org/download.shtml
			同时选中g++、MinGW Make，同时设置环境变量，将%MinGW_HOME%\bin设置到PATH中.
		3.安装gdb——C/C++调试平台，下载后安装，默认到MinGW_HOME就行。http://www.gnu.org/software/gdb/download
		
#### 2.7. 目录结构如下:

	D:\eclipse
		+---- ....
		+----dropins
		|	+-----adt.link
		+----my_plugins
			+-----android-sdk
			|	+----....
			+-----android-ndk-r10e
			|	+----....
			+-----MinGW
			|	+----....
			+-----ADT
			|	+----eclipse
			|		+-----features
			|		|	+-----....
			|		+-----plugins
			|			+-----....			


#### 2.8. 配置环境变量:

	 计算机右击-->属性-->高级系统设置-->高级-->环境变量-->
			新建-->系统变量-->变量名:java_home -->变量值:jdk安装目录,如我的是:C:\Program Files\Java\jdk1.8.0_20
			系统变量-->找到Path选中-->编辑-->光标定位到最尾部-->输入-->;%java_home%\bin
			新建-->系统变量-->变量名:android_sdk -->变量值:androidSDK安装目录,如我的是:D:\eclipse\my_plugins\android-sdk
			系统变量-->找到Path选中-->编辑-->光标定位到最尾部-->输入-->;%android_sdk%\tools
			新建-->系统变量-->变量名:MinGW_HOME -->变量值:MinGW安装目录\bin,如我的是:D:\eclipse\my_plugins\MinGW;
			系统变量-->找到Path选中-->编辑-->光标定位到最尾部-->输入-->;%MinGW_HOME%\bin

#### 2.9. 以上配置完成后打开eclipse/eclipse.exe运行IDE

	配置AndroidSDK-->Windows-->Proferences-->选择中Android-->
			SDK Location中选中D:\eclipse\my_plugins\android-sdk目录即可

	配置AndroidNDK-->Windows-->Proferences-->打开折叠的Android-->
			NDK-->NDK Location中选中D:\eclipse\my_plugins\android-ndk-r10e目录即可

	为了使CDT能够取用MinGW来进行编译的工作, 我们要回到 Eclipse 当中进行设定：
			Window->Preferences->C/C++->New CDT project wizard->Makefile Project 
			找到 Binary Parser 取消 Elf Parser 改选 PE Windows Parser

#### 2.10. 打开Android SDK Manager下载SDK
	
> 如果速度慢可按照如下设置代理:

	Android SDK在线更新镜像服务器

	中国科学院开源协会镜像站地址:

	IPV4/IPV6: http://mirrors.opencas.cn 端口：80

	IPV4/IPV6: http://mirrors.opencas.org 端口：80

	IPV4/IPV6: http://mirrors.opencas.ac.cn 端口：80

	上海GDG镜像服务器地址:

	http://sdk.gdgshanghai.com 端口：8000

	北京化工大学镜像服务器地址:

	IPv4: http://ubuntu.buct.edu.cn/ 端口：80

	IPv4: http://ubuntu.buct.cn/ 端口：80

	IPv6: http://ubuntu.buct6.edu.cn/ 端口：80

	大连东软信息学院镜像服务器地址:

	http://mirrors.neusoft.edu.cn 端口：80

	使用方法：

	启动 Android SDK Manager ，打开主界面，依次选择『Tools』、『Options...』，
	弹出『Android SDK Manager - Settings』窗口；

	在『Android SDK Manager - Settings』窗口中，在『HTTP Proxy Server」和
	「HTTP Proxy Port』输入框内填入上面镜像服务器地址(不包含http:// )和端口，
	并且选中『Force https://... sources to be fetched using http://...』复选框。
	设置完成后单击『Close』按钮关闭『Android SDK Manager - Settings』窗口返回到主界面；

	依次选择『Packages』、『Reload』。

