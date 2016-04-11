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

<style>
h3 {
    line-height: 1;
    letter-spacing: 2px;
    margin-top: 5px;
}
h6 {
    line-height: 1;
    letter-spacing: 2px;
    margin-top: 5px;
}
</style>

* ### 1.下载集成开发环境
* ### 2.安装配置环境
* ### 3.常用功能配置
	* ###### 3.1自动生成头文件(配置javah)
	* ###### 3.2生成Sign签名(配置Javap)
	* ###### 3.3配置C/C++库

## 1. 下载集成开发环境

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

## 2. 安装配置环境
	
#### 2.1. 安装JDK并设置环境变量到path中. 如:javah工具等

#### 2.2. 解压Eclipse到D盘目录如: D:/eclipse

#### 2.3. 为Eclipse安装ADT插件 

方式一绿色安装: 

> 1.解压ADT到到某一个目录   
> 2.单独复制`features`与`plugins`这两个文件夹到D:/eclipse/my_plugins/ADT/eclipse/目录下(新创建目录)   
> 3.到D:/eclipse/dropins目录下新创建一个adt.link文件,里面编写内容:`path=D:/eclipse/my_plugins/ADT/eclipse/`

方式二直接安装:

> 打开Eclpse-->Help-->Install New Software..-->Add-->Name:ADT-->Archive-->选择下载好的ADT.zip文件-->OK-->下方会加载显示出
> Developer Tools -->全选-->Next-->Next-->选择上面的I accept the ....-->Finish-->进入自动安装状态-->安装完后重启,即可.   


Developer Tools其中全部包含有如下

	Android DDMS
	Android Development Tool
	Android Hierarchy Viewer
	Android Native Developme
	Android Traceview
	Tracer for OpenGL ES


#### 2.4. 解压Android SDK到my_plugins目录下.
> 配置一下环境变量到path中,方便以后的需要.如:draw9patch工具等等

#### 2.5. 安装NDK,如果是压缩包形式则,解压到my_plugins目录下.
> 如果是安装包(exe,其实是zip的自解压文件)也可安装到my_plugins目录

#### 2.6. 如果是下载的Eclipse是C/C++版本的,默认是C/C++视图.修改视图-->点击右上角Open perspective-->选择java
	
	如果安装ADT的时候使用的是方式二直接安装ADT.zip的方式,则安装完后无需要再配置C/C++环境,ADT已经包含了.

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

---

## 3.常用功能配置

#### 3.1自动生成头文件(配置javah)

	非Ant批量生成头文件,配置是为了简化命令行的操作.

> 1.打开Eclipse  --> 2.Run  --> 3.External Tools  --> 4.External Tool Configurations -->   
> 5.Program右击选择New --> 6.Name:输入 Generate_C++_Header_File ->7.Main栏目中Location:中选择下面的Variables  
> 选择system_path --> 8.Locaton输入框里会自动填上${system_path}--> 9.修改内容为${system_path:javah} -->  
> 10.  在Working Directory中选择Variables--> 11.选择project_loc --> 12.中间输入框会自动填写${project_loc}   
> 13.修改内容为${_project_loc}/jni --> 14.Arguments:输入内容
> -classpath ${project_loc}\bin\classes;输入AndroidSDK目录\platforms\android-?\android.jar -d ${project_loc}\jni -jni ${java_type_name}   

例如我的配置是: 
	
	Location:
		${system_path:javah}
	Working Directory:
		${project_loc}\jni
	Arguments:
	-classpath ${project_loc}\bin\classes;D:\eclipse\my_plugins\android-sdk-windows\platforms\android-17\android.jar -d ${project_loc}\jni -jni ${java_type_name}

![javah](/res/img/blog/2014/10/28/Android_NDK_IDE_environment_one/external_tool_javah.png)

使用方法:

	点选中有native修饰的方法的类 --> Run Generate_C++_Header_File  --> 刷新项目.会在项目/jni目录下生成.h头文件.

![javah](/res/img/blog/2014/10/28/Android_NDK_IDE_environment_one/external_tool_run.png)

---

#### 3.2生成Sign签名(配置Javap) 
	
	代替使用cmd命令行生成.提高效率
	见JNI

> 1.打开Eclipse  --> 2.Run  --> 3.External Tools  --> 4.External Tool Configurations -->   
> 5.Program右击选择New --> 6.Name:输入javap ->7.Main栏目中Location:中选择下面的Variables  
> 选择system_path --> 8.Locaton输入框里会自动填上${system_path}--> 9.修改内容为${system_path:javap} -->  
> 10.  在Working Directory中选择Variables--> 11.选择project_loc --> 12.中间输入框会自动填写${project_loc}   
> 13.Arguments:输入内容: -classpath ${project_loc}\bin\classes -s -p ${java_type_name}

如我的配置是:

	Location:
		${system_path:javap}
	Working Directory:
		${project_loc}
	Arguments:
		-classpath ${project_loc}\bin\classes -s -p ${java_type_name}
	
![javah](/res/img/blog/2014/10/28/Android_NDK_IDE_environment_one/external_tool_javap.png)

使用方法:
	
	点选有 native 修饰的方法的类--> Run javap

	在Console就会打印出javap运行在cmd命令行一样的效果.生成 Sign 签名 

![javah](/res/img/blog/2014/10/28/Android_NDK_IDE_environment_one/external_tool_run.png)

---


#### 3.3配置C/C++库
	
	前提,已经有一个Android项目支持NDK.
		即: 选择项目右击--> Android Tool -->Add Native Support..

如果出现C++代码alt+/无提示可使用此方法解决.
或者需要引用其它.h资源库,也同样适用.
	


> 1.选择C/C++视图 --> 2.选中项目右击-->Properties --> 3.C/C++ General--> Paths and Symbols   
> 4.弹出的Paths and Symbols试图中--> Add  --> File system.. --> 选择NDK的目录结构如:  
> NDK目录\platforms\android-?\arch-arm\usr\include --> Apply --OK 



如我的配置是:
	
	D:\eclipse\my_plugins\android-ndk-r10e\platforms\android-19\arch-arm\usr\include
	D:\eclipse\my_plugins\android-ndk-r10e\sources\cxx-stl\stlport\stlport      
	后者是原生C标准头文件库(代码提示,以及看原代码使用.)

![javah](/res/img/blog/2014/10/28/Android_NDK_IDE_environment_one/Properties_C-C++.png)



---

End
