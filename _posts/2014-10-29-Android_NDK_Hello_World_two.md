---
layout : post
title : "Android 中NDK的使用详解第二篇:Hello World"
category : Android
duoshuo: true
date : 2014-10-29
tags : [AndroidNDK , NDK , JNI]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---


上一编讲到了搭建AndroidNDK开发环境的内容,这篇则进行实战.


目录:
	
	Hello World
	批量生成头文件
	编译多个源文件
	支持多CPU架构

创建一个项目:
项目名为AndroidNDK
项目包名为:com.tu.test.androidndk

## Hello World

#### 1.创建一个类.

> 编写带有native修饰的方法  

<!-- more -->

<pre class="brush: java;  highlight: [3]">
package com.tu.test.androidndk.jni;
public class Port {
	public static native void sayHello(String str);
}
</pre>


#### 2.使用Android Tools工具为项目工程支持NDK

> 项目上右击-->`Android Tools`-->`add native support`-->`输入或者默认的名称(例如:AndroidNDK)`-->`finish`  
> 会注意到项目目录下多了一个`jni`的目录里面多了两个文件**Android.mk** , **AndroidNDK.app**(上面输入的名称)  

#### 3.使用cmd把目录定位到"`项目路径/bin/classes/`"项目下.(后会被批量生成头文件代替)

<pre class="brush: shell; ">
	C:\Users\comtu>cd E:\ComTu_Design\workspace\AndroidNDK
	E:\ComTu_Design\workspace\AndroidNDK>cd bin
	E:\ComTu_Design\workspace\AndroidNDK\bin>cd classes
	E:\ComTu_Design\workspace\AndroidNDK\bin\classes>dir
	 驱动器 E 中的卷没有标签。
	 卷的序列号是 EE26-DAFE
	 E:\ComTu_Design\workspace\AndroidNDK\bin\classes 的目录
	2015-07-14  14:50    &lt;DIR>          .
	2015-07-14  14:50    &lt;DIR>          ..
	2015-07-14  14:50    &lt;DIR>          android
	2015-07-14  14:50    &lt;DIR>          com
	               0 个文件              0 字节
	               4 个目录 35,301,425,152 可用字节
</pre>
		       
#### 4.生成头文件使用javah命令(后会被批量生成头文件代替)

<pre class="brush: shell;  highlight: [1,12]">
	E:\ComTu_Design\workspace\AndroidNDK\bin\classes>javah -jni com.tu.test.androidndk.jni.Port
	E:\ComTu_Design\workspace\AndroidNDK\bin\classes>dir
	 驱动器 E 中的卷没有标签。
	 卷的序列号是 EE26-DAFE
	
	 E:\ComTu_Design\workspace\AndroidNDK\bin\classes 的目录
	
	2015-07-14  16:15    &lt;DIR>          .
	2015-07-14  16:15    &lt;DIR>          ..
	2015-07-14  16:08    &lt;DIR>          android
	2015-07-14  16:08    &lt;DIR>          com
	2015-07-14  16:15             1,213 com_tu_test_androidndk_jni_Port.h
	               1 个文件          1,213 字节
	               4 个目录 35,301,281,792 可用字节
</pre>

> 输入完后控制台不会有打印信息,只会在E:\ComTu_Design\workspace\AndroidNDK\bin\classes>目  
> 录下会生成一个文件名为**com_tu_test_androidndk_jni_Port.h**的头文件
	
#### 5.拷贝头文件(后会被批量生成头文件代替)   

> 把步骤4生成的.h文件拷贝到步骤2生成的jni目录下.

	使目录结构如下:
		jni
		|-Android.mk
		|-AndroidNDK.app
		|-com_tu_test_androidndk_jni_Port.h

#### 6.打开com_tu_test_androidndk_jni_Port.h文件

<pre class="brush: c; ">
JNIEXPORT void JNICALL Java_com_tu_test_androidndk_jni_Port_sayHello
  (JNIEnv *, jclass, jstring);
</pre>

> 把生成的方法拷贝到AndroidNDK.app里面.并实现方法体.

<pre class="brush: c; highlight: [2, 3, 8,9]">
#include "com_tu_test_androidndk_jni_Port.h//引入头文件
#include <android/log.h>
//Logcat打印日志 Android.mk 文件必须配置: LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog 
JNIEXPORT void JNICALL Java_com_tu_test_androidndk_jni_Port_sayHello
  (JNIEnv * env, jclass clazz, jstring s){//实现方法体
  	char * str = (char *) env->GetStringUTFChars(s, 0);
	printf("\n c-string: hello - %s", str);
	//在Logcat中打印日志,在个参数,日志类型,过滤标签Tag,输入的文本内容Text
	__android_log_print(ANDROID_LOG_INFO, "JNIMsg", "Hello World!!!~~~~~");
  }
</pre>

> 在java里并编写静态代码块加载lib

<pre class="brush: java;  highlight: [4]">
		
		Port.sayHello("Hi");//调用C程序实现的sayHello方法

		static{
				System.loadLibrary("AndroidNDK");
		}
</pre>

#### 7.运行程序(注意以上操作只适合于ARM架构的CPU)
		
		使用已经Root的手机通过R.E.管理器,
		或者ES文件管理器,进入到文件顶级根目录下/proc文件夹/cpuinfo文件可查看
		
		或者使用cmd查看CPU是属于那个架构可使用命令:

<pre class="brush: shell;  highlight: [1,2,4]">
			C:\Users\comtu>adb shell
			shell@android:/ $ cat /proc/cpuinfo
			cat /proc/cpuinfo
			Processor       : ARMv7 Processor rev 1 (v7l)
			processor       : 0
			BogoMIPS        : 668.86
			
			processor       : 1
			BogoMIPS        : 668.86
			
			Features        : swp half thumb fastmult vfp edsp thumbee neon vfpv3 tls vfpv4
			CPU implementer : 0x41
			CPU architecture: 7
			CPU variant     : 0x0
			CPU part        : 0xc05
			CPU revision    : 1
			
			Hardware        : MSM8x25 C8833D BOARD
			Revision        : 0000
			Serial          : 0000000000000000
			shell@android:/ $
</pre>

---

## 批量生成头文件

使用Ant工具自动生成头文件.	(3-5步骤)
> Ant是一个自动构建的一个脚本,基于xml . 

#### 1.创建Ant文件

> 在项目工程里创建一个new-->File新创建一个文件名:build_headers.xml的文件  
> 选择文件-->右击-->open with->other->**ant editor**的方式打开.  
> 打开文件后使用**alt+/**快捷键会自动生成模板.  
	
#### 2.编写模板

<pre class="brush: xml;  highlight: [5,10]">
	&lt;project name="AndroidNDK" default="BuildAllHeaders">
	&lt;description>description&lt;/description>
	&lt;!--呼叫目标-->
	&lt;target name="BuildAllHeaders">
		&lt;antcall target="BuildPortHeader" />
		&lt;antcall target="BuildTwoPortHeader" />
	&lt;/target>
	&lt;!--目标_使用javah命令 destdir生成文件的目的路径,classpath类Class文件路径 , class类名-->
	&lt;target name="BuildPortHeader">
		&lt;javah destdir="./jni" classpath="./bin/classes" class="com.tu.test.androidndk.jni.Port"/>
	&lt;/target>
	&lt;target name="BuildTwoPortHeader">
		&lt;javah destdir="./jni" classpath="./bin/classes" class="com.tu.test.androidndk.jni.TwoPort"/>
	&lt;/target>
	&lt;/project>
</pre>

#### 3.运行Ant自动编译

> 选择build_headers.xml右击--> run as -->Ant build   
> 或者:   
> 打开Ant窗口(Wnidow-->Show View-->Ant)-->Add Buildfiles-->选择项目-->Ant窗口里会多出一个AndroidNDK项双击即可.   

#### 4.刷新项目

> 查看jni目录会新增加一个文件.h文件	   
> 选择项目-->右击-->Refresh  
	

---  
	
## 编译多个源文件

#### 1.jni目录里创建多一个c文件

> 选择jni-->右击选择new-->other-->C/C++-->class-->文件名如(Hello)  
> 或者  
> 选择C/C++ Perspective 视图 -->jni目录下右击new-->class-->文件名(Hello)  
	
#### 2.编写新创建的Hello.h文件

<pre class="brush: c; ">
	#ifndef HELLO_H_
	#define HELLO_H_
	
	class Hello {
	public:
		Hello();
		char * getWords();//&lt;----编写一个方法
		virtual ~Hello();
	};
	
	#endif /* HELLO_H_ */
</pre>

#### 3.实现Hello.cpp代码

<pre class="brush: c; ">
	#include "Hello.h"
	
	Hello::Hello() {}
	
	char * Hello::getWords(){//&lt;----编写一个方法用于与java交互
		return "Hello NDK";
	}
	
	Hello::~Hello() {}
</pre>

#### 4.编写Android.mk文件,让Hello可进行编译

> LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog 要打印log需要增加

<pre class="brush: xml; ">
	LOCAL_PATH := $(call my-dir)

	include $(CLEAR_VARS)
	
	LOCAL_LDLIBS += -L$(SYSROOT)/usr/lib -llog

	LOCAL_MODULE    := AndroidNDK
	LOCAL_SRC_FILES := AndroidNDK.cpp Hello.cpp
	
	include $(BUILD_SHARED_LIBRARY)
</pre>

> 如果增加很多个.cpp文件使用空格分开,为了方便观看也可使用\符号进行分行显示

<pre class="brush: xml; ">
		LOCAL_SRC_FILES := AndroidNDK.cpp \
		Hello.cpp
</pre>

#### 5.编写TwoPort类增加如下代码作为测试

<pre class="brush: java; ">
	public static native String getWords();
</pre>

> AndroidNDK.cpp实现代码

<pre class="brush: c; ">
#include "com_tu_test_androidndk_jni_TwoPort.h"
	//调用自己的C文件
	JNIEXPORT jstring JNICALL Java_com_tu_test_androidndk_jni_TwoPort_getWords
	  (JNIEnv *env, jclass clazz){
		Hello h;
		return env->NewStringUTF((const char *)h.getWords());
	}

</pre>

#### 6.运行	

	String words = TwoPort.getWords();//调用 

----

## 支持多CPU架构

**方法**:

> 在jni目录新创建一个 **Application.mk** 文件里面增加内容**APP_ABI := x86 armeabi**即可.   
> 这样就支持x86与armeabi的CPU架构了.
		

