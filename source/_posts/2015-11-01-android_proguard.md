---
layout : post
title : "Android混淆"
category : Android
duoshuo: true
date : 2015-11-01
tags : [Android , proguard]
---

# 什么是代码混淆

	Java 是一种跨平台的、解释型语言，Java 源代码编译成中间”字节码”存储于 class 文件中。
	由于跨平台的需要，Java 字节码中包括了很多源代码信息，如变量名、方法名，并且通过这些名称来访问变量和方法，
	这些符号带有许多语义信息，很容易被反编译成 Java 源代码。为了防止这种现象，我们可以使用 Java 混淆器对 Java 字节码进行混淆。

	混淆就是对发布出去的程序进行重新组织和处理，使得处理后的代码与处理前代码完成相同的功能，而混淆后的代码很难被反编译，
	即使反编译成功也很难得出程序的真正语义。被混淆过的程序代码，仍然遵照原来的档案格式和指令集，执行结果也与混淆前一样，
	只是混淆器将代码中的所有变量、函数、类的名称变为简短的英文字母代号，在缺乏相应的函数名和程序注释的况下，即使被反编译，
	也将难以阅读。同时混淆是不可逆的，在混淆的过程中一些不影响正常运行的信息将永久丢失，这些信息的丢失使程序变得更加难以理解。

	混淆器的作用不仅仅是保护代码，它也有精简编译后程序大小的作用。由于以上介绍的缩短变量和函数名以及丢失部分信息的原因， 
	编译后 jar 文件体积大约能减少25% ，这对当前费用较贵的无线网络传输是有一定意义的。


<!-- more --> 

# 理论知识  
	ProGuard 是一款免费的Java类文件压缩器、优化器和混淆器。它能发现并删除无用类、字段（field）、方法和属性值（attribute）。
	它也能优化字节码 并删除无用的指令。最后，它使用简单无意义的名字来重命名你的类名、字段名和方法名。
	经过以上操作的jar文件会变得更小，并很难进行逆向工程。


# 基本使用
	在Android应用程序也可以使用ProGuard来进行混洗打包，大大的优化Apk包的大小。但是注意ProGuard对文件路径的名名很有讲究，
	不支持括号，也不支持空格。   
	在混淆过后，可以在工程目录的 proguard 中的 mapping.txt 看到混淆后的类名，方法名，变量名和混淆前的类名，方法名，变量名。
		在使用Eclipse新建一个工程，都会在工程目录下生产配置 project.properties 和 proguard-project.txt .
		# To enable ProGuard to shrink and obfuscate your code, uncomment this (available properties: sdk.dir, user.home):
		#proguard.config=${sdk.dir}/tools/proguard/proguard-android.txt:proguard-project.txt

		# Project target.
		target=android-10
	project.properties 用于配置Android工程的一些属性，#号的话表示当前行是注释，  
	这里的 proguard.config 就用于指定ProGuard的混淆配置文件，
	并对使用 release 方式打包应用程序时开启代码混淆功能。   
	对于是否是使用 release 方式打包，和 AndroidManifest.xml 中 application 的 android:debuggable 属性有很多关系。
	如果该值为 android:debuggable="true" ，那么最终就是debug方式打包。   
	最明智的方式就是在 AndroidManifest.xml 并不显示的指定它，而是是打包工具在打包时来决定它最终的值。
	对于 ant 就是 ant release 或 ant debug 。而对于直接在Eclipse中使用run 或debgu来打包的话就是debug,使用export的话就是release.
	
> proguard.config=${sdk.dir}/tools/proguard/proguard-android.txt:proguard-project.txt

	这里的话指定了混淆的基本配置文件 proguard-android.txt ，和混淆的个性化配置文件 proguard-project.txt。
	这里 proguard-project.txt 文件用于对前面的基本的混淆配置文件 proguard-android.txt 的配置进行 override 和 添加。

		
也有些老版本的项目使用的是 在 project.properties 里加上

> proguard.config=proguard.cfg   

然后编写 proguard.cfg 混淆文件,如果没有新创建即可

编写同目录下的 proguard-project.txt 文件.编写混淆规则即可.

		

# 混淆常用的方式: (混淆利器 proguard 的用法)

先去官网 [http://proguard.sourceforge.net/](http://proguard.sourceforge.net/) 下载一个版本

	找到里面的examples文件夹，先看一下示例

	其中在 android.pro 文件里应有这么一句

> java -jar proguard.jar @android.pro

	其中最为关键的就是 android.pro 里的文件配置，只要这个文件配置合适了，执行一下这个语句即可。

	打开这个.pro文件，可以看到里面的参数:

	-injars //表示要进行混淆的class文件或jar、war等,可用文件目录表示，例如：

	-outjars 表示要生成的jar包，后跟jar包名字，如：-outjars ../out.jar

	-libraryjars 后面跟要编译in.jar的其它类包，如果是多个，用多行列出，如：

		-libraryjars d:/1/2/1.jar

		-libraryjars d:/1/2/2.jar

	-keep 后跟项目的入口类，如：
			-keep public class * extends android.app.Activity

		-keep 后还可以跟在项目中没有用到的类或方法，但在配置文件中有用到，
			如果不用该参数保留出来，在做优化时，就会直接的删除掉了，项目运行时会报找不到类的错误。

	-printusage 该参数是把优化时移除的类及方法记录下来，后跟一个文件。如：-printusage ./jar/deadCode.txt

	其余的常用的参数，如：

	-target 1.6 //指定版本号

	-forceprocessing //强制执行，即使过期

	-allowaccessmodification //指定，当执行修改方法或属性的modifer范围

	-printmapping  //指定混淆后，类或方法生成的map,后跟指定的路径及文件名 *.map

	-overloadaggressively //

	-repackageclasses //把执行后的类重新放在某一个目录下，后跟一个目录名

	-dontpreverify //不用预先检查

	-verbose //不用输出详细的过程

	-dontwarn//不用输出警告

	-dontnote//不用输出通知

	为了增加混淆的难度，可以在

	java -jar progurad.jar @application.pro 后再加 -classobfuscationdictionary ./dictionaries/windows.txt

	即
> java -jar progurad.jar @application.pro -classobfuscationdictionary ./dictionaries/windows.txt

	这样生成的类名都是window系统命名系统严令禁止使用的文件名，反编译时就更增加难度了
	
	后面的./dictionaries/windows.txt指的该目录下的windows.txt文件，可根据你自己文件来做相应的指定。

# 混淆常用模板
	

	混淆文件 proguard.cfg 参数详解
	
	-optimizationpasses 5                                                           # 指定代码的压缩级别
	-dontusemixedcaseclassnames                                                     # 是否使用大小写混合
	-dontskipnonpubliclibraryclasses                                                # 是否混淆第三方jar
	-dontpreverify                                                                  # 混淆时是否做预校验
	-verbose                                                                        # 混淆时是否记录日志
	-optimizations !code/simplification/arithmetic,!field/*,!class/merging/*        # 混淆时所采用的算法
	
	-renamesourcefileattribute SourceFile						#混淆代码保持class文件中的调试信息（源码的行号、源文件信息等)
	-keepattributes SourceFile,LineNumberTable

	-keep public class * extends android.app.Activity                               # 保持哪些类不被混淆
	-keep public class * extends android.app.Application                            # 保持哪些类不被混淆
	-keep public class * extends android.app.Service                                # 保持哪些类不被混淆
	-keep public class * extends android.content.BroadcastReceiver                  # 保持哪些类不被混淆
	-keep public class * extends android.content.ContentProvider                    # 保持哪些类不被混淆
	-keep public class * extends android.app.backup.BackupAgentHelper               # 保持哪些类不被混淆
	-keep public class * extends android.preference.Preference                      # 保持哪些类不被混淆
	-keep public class com.android.vending.licensing.ILicensingService              # 保持哪些类不被混淆

	-keepclasseswithmembernames class * {                                           # 保持 native 方法不被混淆
	    native <methods>;
	}

	-keepclasseswithmembers class * {                                               # 保持自定义控件类不被混淆
	    public <init>(android.content.Context, android.util.AttributeSet);
	}

	-keepclasseswithmembers class * {
	    public <init>(android.content.Context, android.util.AttributeSet, int);     # 保持自定义控件类不被混淆
	}

	-keepclassmembers class * extends android.app.Activity {                        # 保持自定义控件类不被混淆
	   public void *(android.view.View);
	}

	-keepclassmembers enum * {                                                      # 保持枚举 enum 类不被混淆
	    public static **[] values();
	    public static ** valueOf(java.lang.String);
	}

	-keep class * implements android.os.Parcelable {                                # 保持 Parcelable 不被混淆
	  public static final android.os.Parcelable$Creator *;
	}

	-keep class MyClass;                                                            # 保持自己定义的类不被混淆
	

# 混淆编译出现如下错误解决方案
		[2012-04-17 22:20:48 - projectname] Proguard returned with error code 1. See console
		[2012-04-17 22:20:48 - projectname] proguard.ParseException: Unknown option 'and' in argument number 9
		[2012-04-17 22:20:48 - projectname] at proguard.ConfigurationParser.parse(ConfigurationParser.java:170)
		[2012-04-17 22:20:48 - projectname] at proguard.ProGuard.main(ProGuard.java:491)
		[2012-04-17 22:20:59 - projectname] Proguard returned with error code 1. See console
		[2012-04-17 22:20:59 - projectname] proguard.ParseException: Unknown option 'and' in argument number 9
		[2012-04-17 22:20:59 - projectname] at proguard.ConfigurationParser.parse(ConfigurationParser.java:170)

		[2012-04-17 22:20:59 - projectname] at proguard.ProGuard.main(ProGuard.java:491)

		解决办法：
		ProGuard 是 Android 代码混淆工具，对于程序员保护自己的劳动成果非常有用，目前已经包含在 Android SDK 2.3 里面了。
		今天在配置好 ProGuard 使用 Export Android Application 时提示“conversion to Dalvik format failed with error 1”错误。
		网络上有人介绍将 SDK 降级到 r11 和修改 proguard.bat 两种方法，
		不过最彻底的方法是将 Android SDK 2.3 包含的 ProGuard v4.4 升级到 v4.6，就能彻底解决该问题。

		解决方法：从这里下载 ProGuard 最新版，我下载的是v4.6；解压缩 proguard4.6.zip 文件，
		将 bin 和 lib 两个文件夹覆盖 [Android SDK 安装目录]\tools\proguard 中的同名文件夹

		即可；回到 Eclipse 重新执行 Export Android Application 看看是否成功了。

		更新完如果不能够正常使用，请重启Eclipse ，并更新ADT，即可


# 解码混淆过的堆栈跟踪信息
	
	首先获取到堆栈信息,再通过map反映射回原信息.

## 堆栈信息如何获取

	方法一：最简单的方法直接copy logcat中的堆栈信息保存为txt

	方法二：是在 Application 中添加一个异常监听：

```java
			Thread.setDefaultUncaughtExceptionHandler(CrashHandler.create(this));
```

		再在 CrashHandler 中将堆栈信息保存为文本文件：

```java
			LogUtils.e(this, "崩溃toString: " + ex.toString());
			StringWriter stringWriter = new StringWriter();
			PrintWriter printWriter = new PrintWriter(stringWriter);
			printWriter.print(TimeUtils.getCurrentTime());
			try {
				dumpPhoneInfo(printWriter);
			} catch (NameNotFoundException e) {
				e.printStackTrace();
			}
			ex.printStackTrace(printWriter);
			FileUtils.savaData("error.txt", stringWriter.getBuffer().toString());
			printWriter.println();
			printWriter.close();
			ex.printStackTrace();// 也别忘了同时打印日志信息
```
	这样我们就能够获取到堆栈信息，并保存到了本地。
	接下来就调用查看的指令.

## 查看
	当混淆后的代码输出一个堆栈信息时，方法名是不可识别的，这使得调试变得很困难，甚至是不可能的。

	幸运的是，当ProGuard运行时，它都会输出一个 <project_root>/bin/proguard/mapping.txt文件，
	而这个文件中包含了原始的类，方法和字段名被映射成的混淆名字。
	如果使用的是 Eclipse 进行签名生成签名apk.会在项目编译后项目根目录下多一个proguard目录里面有如下文件:
		dump.txt
		mapping.txt
		seeds.txt
		usage.txt


	retrace.bat脚本（Window）或 retrace.sh 脚本（Linux，Mac OS X）可以将一个被混淆过的堆栈跟踪信息还原成一个可读的信息。
	它位于<sdk_root>/tools/proguard 文件夹中。执行retrace工具的语法如下：

		retrace.bat|retrace.sh [-verbose] mapping.txt [<stacktrace_file>]

	例如：

		retrace.bat -verbose mapping.txt obfuscated_trace.txt

	如果你没有指定<stacktrace_file>，retrace工具会从标准输入读取。

	当然 你也可以使用工具 在tools/proguard/bin/ 下面 运行proguardGUI.bat 
	会运行一个GUI页面，操作方式很简单的 Retrace --> Browase --> Obtuscated stack trace  

	如果出现无法还原错误信息可以尝试下载其它版本的ProGuard进行如上操作
		https://sourceforge.net/projects/proguard/files/proguard/
		