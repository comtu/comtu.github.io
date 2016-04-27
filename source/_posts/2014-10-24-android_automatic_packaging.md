---
title : "Android程序自动化打包"
category : Android
date : 2014-10-24
tags : [windows环境下搭建Android开发环境 ,Android程序自动化打包 ]
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

* 1.概述
* 2.准备
* 3.开始(如果之前有做过前面的步骤可直达第三步)


## **1 概述**   

在一般的Android开发中，我们通常使用Eclipse自带的导出工具来进行App的签名和发布，Android自动化打包，就是利用脚本将这样一个手动操作的过程转化为一个命令搞定。


<!-- more -->

---


## **2 准备**

需要配置好JDK、Android SDK和Ant的环境，

### **2.1 安装配置JDK**   

以jdk-8u45-windows-i586安装包为例  


**2.1.1** 双击安装包，假设安装路径默认是C:\Program Files\Java\jdk1.8.0_45，然后点击下一步完成安装。  


**2.1.2** windows XP或者Server下右击“我的电脑”弹出菜单，点击“属性“》“高级“》“环境变量“，windows7则右击“计算机“弹出菜单，点击“属性“》“高级系统设置“》“高级“》“环境变量“ ,在“系统变量”下方点击“新建”，“变量名”输入"**`JAVA_HOME`**"，“变量值”输入"**`C:\Program Files\Java\jdk1.8.0_45`**"，点击“确认”；在“系统变量”选择变量为“Path”的选项，点击下方的“编辑”，在弹出框中修改“变量值”，在原有值的末尾输入“**`;%JAVA_HOME%\bin`**”，注意开头包含一个英文的分号。   


**2.1.3** 点击“开始”》“运行”(或者Win+R)，输入“**`cmd`**”，在弹出的命令窗口中输入“**`javac -version`**”然后回车，如果下方出现：javac version "1.8.0_45”，说明配置成功。


---


### **2.2安装配置Android SDK**

**2.2.1** 打开http://developer.android.com/sdk/index.html#ExistingIDE ，找到SDK Tools Only 找到最新版本的包**[android-sdk_r24.3.3-windows.zip](http://dl.google.com/android/android-sdk_r24.3.3-windows.zip)**  ，然后勾选“I have read...”复选框，点击下方的“Download the SDK.....”，将下载完整的SDK工具压缩包。附录[百度云android-sdk_r24.3.2-windows.zip](http://pan.baidu.com/s/1i3eUFDb)   

**2.2.2** 将第一步下载好的压缩包解压，比如直接放到D盘下，完整路径是D:\android-sdk_r24.3.3-windows。   


**2.2.3** 进入上面这个文件夹，双击SDK Manager.exe，在弹出的窗口中有个Packages栏，勾选其中的“`**Tools**`”、"Android 4.2.2 (API17)"以及“Extras”下面所有的的选项，点击下方的“**`Install packages`**”开始下载，如果这些选项的Status变为“**`Installed`**”，说明下载完毕。如果下载速度过慢，用记事本打开C:\WINDOWS\system32\drivers\etc\hosts这个文件，在最下方新输入一行：**`74.125.237.1    dl-ssl.google.com`**，然后保存，重新打开SDK Manager.exe再试一次。


**2.2.4** windows XP或者Server下右击“我的电脑”弹出菜单，点击“属性“》“高级“》“环境变量“，在“系统变量”下方点击“新建”，“变量名”**`输入"ANDROID_HOME`**"，“变量值”输入"**`D:\android-sdk_r24.3.3-windows`**"，点击“确认”；在“系统变量”选择变量为“Path”的选项，点击下方的“编辑”，在弹出框中修改“变量值”，在原有值的末尾输入“**`;%ANDROID_HOME%\platform-tools`**”，注意开头包含一个英文的分号。


**2.2.5** 点击“开始”》“运行”，输入“**`cmd`**”，在弹出的命令窗口中输入：**`adb`**回车，如果下方出现：Android Debug Bridge version ...等多行文字，说明配置成功。


---

### **2.3 安装配置Ant**

以Ant1.9.3为例


**2.3.1** 浏览器打开**[http://ant.apache.org/bindownload.cgi](http://ant.apache.org/bindownload.cgi)** ，找到**.zip archive: [apache-ant-1.9.5-bin.zip](http://ftp.mirror.tw/pub/apache//ant/binaries/apache-ant-1.9.5-bin.zip)** ，点击下载压缩包   


**2.3.2** 将压缩包解压的某一个目录，比如直接放到D盘下，完整路径是D:\apache-ant-1.9.5。


**2.3.3** windows XP或者Server下右击“我的电脑”弹出菜单，点击“属性“》“高级“》“环境变量“，在“系统变量”下方点击“新建”，“变量名”输入"**`ANT_HOME`**"，“变量值”输入"**`D:\apache-ant-1.9.5`**，点击“确认”；在“系统变量”选择变量为“Path”的选项，点击下方的“编辑”，在弹出框中修改“变量值”，在原有值的末尾输入“**`;%ANT_HOME%\bin`**”，注意开头包含一个英文的分号。   


**2.3.4** 点击“开始”》“运行”(Win+R)，输入“**`cmd`**”，在弹出的命令窗口中输入“**`ant -version`**”然后回车，如果下方出现：**`Apache Ant(TM) version 1.9.5 compiled on May 31 2015，`**说明配置成功。


---


## **3 开始**

**3.1** 准备好项目的源码和依赖库源码，最好放在同一级目录下，确保源码和依赖库可在IDE中编译成功，这样就无需调整project.properties文件中依赖库的相对位置了。   


**3.2** 打开CMD命令行，进入到**`依赖库源码目录`**(cd命令)，执行**`android update lib-project -p . -t android-17`**，这个命令的作用是在依赖库下生成自动打包相关的文件，-p .的意思是在当前根目录下执行，-t android-17的意思是此源码使用android-17 api进行编译，各位根据自己的项目情况自行修改，所有的依赖库都要执行这一步操作。  


**3.3** 打开CMD命令行，进入到源码根目录，执行**`android update project -p . -t android-17`**，这个命令的作用是在源码下生成自动打包相关的文件。


**3.4** 打开CMD命令行，进入到源码根目录，执行**`ant clean`**，然后**`ant debug`**，如果打包成功，可以在源代码的bin目录下看到未签名的apk文件。


**3.5** 想要生成签名文件，需要在源码根目录下建立**`ant.properties`**文件，内容如下：

<pre class="brush: shell;">
	#包名
	application.package=you_package_name
	#项目名，缺省时源码文件名
	ant.project.name=
	#编码方式
	java.encoding=utf-8
	#编译输出绝对路径
	out.absolute.dir=d:/out
	#生成文件绝对路径
	gos.path=d:/out
	#签名key文件绝对路径
	key.store=D:/adt-bundle/Nomouse
	#签名文件密码
	key.store.password=password
	#签名别称，中文的话需要转成utf-8编码，可以使用JDK自带的native2ascii工具
	key.alias=\u4f01\u4e1a
	#签名别称密码
	key.alias.password=password
</pre>

**3.6** 打开CMD命令行，进入到源码根目录，执行**`ant release`**，成功的话可以在d:/out目录下看到输出的App签名文件。