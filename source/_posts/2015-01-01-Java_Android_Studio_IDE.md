---
layout : post
title : "Android Studio 笔记"
category : Android
date : 2015-01-01
tags : [Android,Android studio,IDE]

---

Android studio 使用笔记.    
其中内容包括AS基本设置,创建项目,引用第三方类库,导入Eclipse项目,   
Gradle,加速AS运行速度,Eclipse中使用Gradle,以及一些AS的常见错误.   

<!-- more --> 

目录

* [基本设置](#基本设置)
* [创建工程](#创建工程)
* [引用第三方类库(模块)](#引用第三方类库(模块))
* [导入Eclipse项目](#导入Eclipse项目) 
* [Android-Studio目录结构(Project视图)](# <android-Studio目录结构(Project视图))
* [Gradle](#Gradle)
* [settings.gradle](#settings.gradle)
* [项目根节点下的build.gradle](#项目根节点下的build.gradle)
* [模块根节点下的build.gradle](#模块根节点下的build.gradle)
* [Gradle命令行](#Gradle命令行)
* [加速Android-Studio/Gradle构建](#加速Android-Studio/Gradle构建)
* [Eclipse-中使用-Gradle](#Eclipse-中使用-Gradle)
* [一些常见错误](#一些常见错误)

Android Studio下载   

[http://www.androiddevtools.cn/](http://www.androiddevtools.cn/)

安装完AS后第一次运行会自动下载一些组建,建议进行翻墙. 

---

# <a id="基本设置"></a>基本设置
	
	一些常用设置项罗列

	  File --> Settings  
			|-->Appearance & Behavior 
			|	|---> Appearance 
			|	|	|---> UI Options 
			|	|	|	|----> Threme: 有三种IDE主题供选择.
			|	|	|	|----> * Override default fonts by (not recomended)一整个软件的字体
			|	|	|	|----> Cyclic scrolling in list 内勾选后内容滚动支持滚动尾部跳顶部,顶部跳尾部.
			|	|	|---> Window Options 
			|	|	|	|----> Allow merging buttons on dialogs (勾选合并相类似的按钮到一个按钮中.) 
			|	|---> Menus and Toolbars --> 自定义增减菜单内容.
			|	|---> System Settings 
			|	|	|	|----> Startup/Shutdown
			|	|	|	|		|-----> Reopen last project on startup (勾选打开IED时是否直接进入到上一次关闭时的项目工程)
			|	|	|	|		|-----> Confirm application exit (退出提示两次)
			|	|	|	|----> project opening 项目工程的打开方式.
			|	|	|	|		|-----> 打开新的窗口,在相同的窗口打开,经过确定打开窗口
			|	|	|	|----> Synchronization 
			|	|	|			|-----> Synchronize files on frame activation (勾选,自动同步文件到项目中,
			|	|	|			|	例如,当IDE切换到后台,项目过程中有某个文件被其它方式修改了,切换到IDE时自动更新.)
			|	|	|			|-----> Save files on frame deactivation (勾选,IDE切换到后台时自动保存文件)
			|	|	|			|-----> Save files automatically if application is ide for 15 sec 
			|	|	|			|	当ide在15秒内无操作时,自动保存文件.
			|	|	|			|-----> Use "safe write" (save changes to a temporary file first) 保存时保存临时文件.
			|	|	|---> Passwords --> Password storage policy
			|	|	|			|-----> Do not remember passwords 每次都需要输入密码
			|	|	|			|-----> Remember passwords until the application is closed 
			|	|	|			|	打开过一IDE输入过一次密码后,直到关闭IDE都无需再输入密码.
			|	|	|			|-----> Save on disk with master password protection 保存磁盘,无需要再输入 .
			|	|	|---> * Http Proxy 代理 (红杏有免费提供AS的代理) 主机名为: hx.gy 端口为:1080 
			|	|	|---> Updates 软件更新,有自动更新,可选择版本类型,等.
			|	|---> File Colors 文件颜色
			|	|---> Scopes 定义范围
			|	|	|---> 点击 + 新创建 --> 输入名称如App --> 窗口中间的结构中选择不需要的范围可以进行,Exclude 排除
			|	|		|--> 使用时.在编程界面ctrl+shift+F弹出搜索框
			|	|		|	|--> Scope --> 选择Custom: App . 搜索的内容就是经过自定义筛选的.
			|	|		|--> Analyze --> Inspect Code --> 也可以选择Custom scope  ,在指定范围内做代码检查. 
			|	|---> Notifications 通知栏气泡. 定义提示不提示通知项.
			|	|---> Quick Lists 宏 
			|---> Keymap 快捷键设置 --> Keymaps: 中有很多种选择.,下面的栏目则可以修改快捷键的按键.
			|	|---> 常用的快捷键:
			|	|---> * 快速输入多行内容 ctrl+shift+alt+鼠标点击多行 , 出现多个光标,然后输入内容. 
			|	|---> * 删除整行 Ctrl+Y
			|	|---> * 复制当前行 Ctrl+D
			|	|---> * 剪切当前行 Ctrl+X
			|	|---> * 交换位置 Ctrl+Shift+箭头 如果是方法体内,上下交换代码,方法则交换方法位置
			|	|---> * 呼出大纲 Ctrl+F12 
			|	|---> * 查找引用 Alt+F7 查找出来的结果会分为读与写
			|	|---> * 重命名 Shift+F6 会重名名引用的名称
			|	|---> * 格式化代码 Ctrl+Alt+L 
			|	|---> 移动鼠标,单词间跳跃 Ctrl +箭头 
			|	|---> 快速定义常量 Ctrl+Alt+C 如: int i = 100; 选中100后使用快捷键
			|	|---> 其它更多
			|---> Editor 编辑器设置 
			|	|--> General --> 子内容
			|	|	|	|--> mouse 
			|	|	|	|	|--> Honor"CamelHumps"words settings when selecting on 双击选择的是一个变量,还是变量中的一个单词 . 
			|	|	|	|	|	支持此功能需要在General/Smark Keys中Rus"camelHumps"words打勾,默认没勾选
			|	|	|	|	|--> Change font size (Zoom) with Ctrl+Mouse Wheel 通过Ctrl加鼠标滚轮放大缩小字体
			|	|	|	|	|--> Enable Drag'n'Drop functionality in editor 拖拽模式,鼠标选中的内容用鼠标点中后拖拽到其它地方. 
			|	|	|	|--> Soft Wraps
			|	|	|	|	|--> Use soft wraps in Editor 软回车
			|	|	|	|--> Other 
			|	|	|	|	|--> Strip trailing spaces on Save: ... 保存时删除行尾的空格
			|	|	|	|	|--> Show quick doc on mouse move Delay(ms)500 勾选后通过鼠标悬浮到内容上显示文档(默认关闭)
			|	|	|	|--> * Highlight on Caret Movement 高亮显示
			|	|	|	|	|--> * Highlight matched brace 高亮显示括号
			|	|	|	|	|--> * Highlight current scope 选中的范围是否高亮显示
			|	|	|	|	|--> * Highlight usages of element at caret 选中的元素是否高亮显示
			|	|	|	|--> Formatting  格式化代码时是否显示通知
			|	|	|	|--> Refactorings 重构相关
			|	|	|	|	|--> Enable in-Place mode 启动重构模式 Ctrl+Alt+C
			|	|	|	|--> Limits
			|	|	|	|	|--> Maximum number of contents to keep in clipboard: 5 粘贴板的数量. 可以同时拷贝的数据. 
			|	|	|	|	|	使用方法: 多次拷贝内容后,需要粘贴指定次内容时,Ctrl+Shift+V 在呼出的对话框中选择粘贴内容
			|	|	|	|	|--> Recent files limit 50 最近打开的文件限制个数
			|	|	|	|	|-->　console commands history size: 300 命令行面板上下键切换使用过的命令
			|	|	|	|--> Rich-text copy 拷贝内容样式 默认激活,用处是拷贝一些代码到Word文档的时候保持原有的字体颜色样式.
			|	|	|--> Smart Keys 
			|	|	|	|----> Home 键 定位 尝试点多几次Home键
			|	|	|	|----> End 键 定位
			|	|	|	|----> Insert pair bracket 自动补全括号
			|	|	|	|----> Insert pair quote 自动补全引号
			|	|	|	|----> Reformat block on typing"}" 当我们输入括号}结尾时,格式化代码
			|	|	|	|----> Use "camelHumps" words 见上面mouse
			|	|	|	|----> Surround selection on typing quote or brace 
			|	|	|	|	勾选后, 选择代码后,输入一个{括号可以把所选择的代码加入到{里面} ,也可以使用"号 把内容"引起来"
			|	|	|	|----> Enter 回车键功能
			|	|	|	|----> Smart indent  缩进
			|	|	|	|----> Insert pair "}" 补全大括号
			|	|	|	|----> Insert documentation comment stub 自动生成注释文档
			|	|	|	|----> 后面对于Xml/Html/Css等的配置
			|	|	|--> Appearance 编辑器外观的一些设置
			|	|	|	|----> Use anti-aliased font 是否启用抗锯齿字体
			|	|	|	|----> Caret blinking(ms) 500 光标闪烁速度
			|	|	|	|----> * Show line numbers 显示代码行数(默认未勾选) 
			|	|	|--> Editor Tabs 编辑器Tab的
			|	|	|	|----> Tab Appearance 外观
			|	|	|	|	|-----> Placement: 标签Tab显示位置
			|	|	|	|	|-----> Show Tabs in single row 显示单行 Hide tabs if there is no space 没有空间,隐藏标签
			|	|	|	|	|-----> Hide file extension in editor tabs 隐藏文件后缀
			|	|	|	|	|-----> Show directory in editor tabs for non-unique filenames 文件名相同显示文件路径
			|	|	|	|	|-----> mark modified tabs with asterisk 用星号标记修改标签(未保存显示*,可结合不自动保存)
			|	|	|	|----> Tab Closing Policy 标签关闭策略
			|	|	|	|	|-----> Tab limit 10 标签最大上限 ,后面的选项为优先关闭选项
			|	|	|--> Code Folding 代码的折叠 设置
			|	|	|--> Code Completion 
			|	|	|	|----> code Completion
			|	|	|	|	|-----> Case sensitive completion : All / None / First letter 代码提示对大小写的要求
			|	|	|	|	|	三种选项, 意思是编辑器在输入代码时代码提示的内容要求.其中None最为宽松 , 
			|	|	|	|	|-----> Auto-insert when only one choice on : 
			|	|	|	|	|	|--> Basic Completion(Ctrl+Space), 重新唤醒代码提示框  
			|	|	|	|	|-----> 自动弹出时间等设置
			|	|	|--> Auto Import 自动导入设置
			|	|	|--> Postfix Completion 代码完成的快捷方式
			|	|	|	|----> Expend templates with : Tab / Space / Enter
			|	|	|--> Console Folding 控制台代码折叠 设置
			|	|--> *Colors & Fonts 编辑器主题颜色字体设置 Scheme	
			|	|	|--> Font 设置编辑器字体大小
			|	|	|--> Android Logcat 设置Logcat的颜色,默认比较单调.可在些处进行修改
			|	|--> Code Style 代码风格 一般由整个项目组决定
			|	|--> Inspections 代码检查配置
			|	|	|--> 例如: Android Lint / addJavasriptInterface Called 很常见的开启WebView的JavaScript的一个报警 
			|	|	|	勾选则如果编写此代码警告 Severity: 可自定义选择错误级别.以及检查范围 
			|	|--> * File and Code Templates 文件代码模板
			|	|	|---> Templates / Includes / Code / Other 四种 
			|	|--> * File Encodings 文件编码方式 通常设置成UTF-8
			|	|	|--> IDE Encoding : UTF-8  
			|	|	|--> Project Encoding : UTF-8（默认GBK）
			|	|	|--> Default encoding for properties files: UTF-8 (默认<System Default> (now GBK))
			|	|--> * Live Templates 动态模板 快速创建模板 如geti 快速编写出getInstance()方法
			|	|--> File Types 打开文件类型
			|---> Plugins 插件 可在线下载或使用本地插件
			|	|--> 介绍几个插件 : JsonFormat 插件 快速把Json字符串生成一个对象类 ; 使用步骤:
			|	|	1. 拷贝需要生成对象的Json字符串,
			|	|	2.在已创建的一个类中点击右键>Generate>JsonFormat>粘贴到弹出框中>ok>自动创建代码.
			|---> Version control 版本控制配置
			|---> Build,Execution,Deployment 构建、执行部署 Gradle配置 等
			|---> Languages&Frameworks 语言与框架
			|---> Tools 工具
			|	|--> 外部工具的配置等
	Edit 
		|--> Copy Reference 拷贝包含包名类名的字符串 
		|	例如: 一个Activity类,全选类名,使用些种拷贝方式,粘贴到AndroidManifest.xml时,内容为包名.类名
		|--> Copy from History 粘贴历史拷贝
		|--> * Column Selection Mode 列选择模式 可进行多行部分选择.批量处理. 
		|--> Toggle Case 转换大小写
	Navigate
		|--> 导航 , 跳转 也可以使用Ctrl+鼠标点击对应方法,或属性
	Code 
		|--> Override Methods 实现父类方法
		|--> Generate...  生成方法. 如 hashCode equals 等方法,并会自动实现方法
		|--> Surround With.. 生成代码 , 如if,try catch 语句等

	编辑器右击选项中:
		|--> refactor --> Encapsulap Fields  生成get set方法
		|--> Lacal History 自带版本控制,可查看历史修改记录等

其它快捷键:     
Alt+Enter 万能键 / 如导入包, 错误解决方案提示等.     
Ctrl+Q 查看代码中的图片   
双击Shift 会弹出搜索框   

泛型 @StringRes @ColorRes 要求参数类似   
例: private void showToast(@StringRes int stringId){...}   


代码扫描查找代码潜在错误

	Analyze  --> Inspect Code --> 选择扫描对象 --> ok 


---

# <a id="创建工程"></a>创建工程

File-->New-->New Project-->输入项目名,包名,项目存放地址等信息-->   
选择开发的设备,并选择支持最小SDK版本-->点击"Help me choose"可查看版本目前支持的版本占用情况     
-->Next-->选择模板-->Next-->输入Activity与Layout的名称-->Finish-->一个新的项目工程就创建完毕.      

---

# <a id="引用第三方类库(模块)"></a>引用第三方类库(模块)

	创建一个类库
		File->New-->New Module-->其中可以选择多种类型,    
		如果Android Library新创建一个,Import Existing Project导入Eclipse或者Gradle项目 等-->    
		假设新创建一个类库-->与创建项目一个,输入项目包等-->选择模板-->Finish

	引入类库(远程,jar,本地库)
		选择需要引用类库的项目-->右击-->Open Module Settings 或者使用快捷键(F4)
		-->Project Structure窗口-->选择需要引入类库的项目-->右边点击 Dependencies   
		-->点击右边的+号-->三种选择 Lrbrary(远程) , File(jar) , module(本地) ,
		--> 选择最后一种 module dependencies 引入本地库   
		-->选择上面新创建的类库-->OK-->这样就关联了一个第三方模块,类库了.   

---

# <a id="导入Eclipse项目"></a>导入Eclipse项目

	File-->New-->Import Project-->选择Eclipse项目工程-->提示导入的项目存放地址(建议不要与原项目使用相同的目录
	,因为会重新拷贝一份代码并修改成Android Studio的环境)-->弹出一提示,说之前引用的jar包以及一些引用的类库,
	都会被替换成dependencies ,如果能找到源.-->Finish-->引入完成会弹出一个导入报告-->报告里面有说明一些没有导入进来的文件名称
	-->因为这些文件不是工程项目的文件.项目外的文件.-->如果有重要的文件需要自己手动拷贝到项目中.

---

# <a id="Android-Studio目录结构(Project视图)"></a>Android Studio目录结构(Project视图)

	目录结构视图
	Android studio project 相当于 eclipse workspace   
	Android studio module 相当于 eclipse project 


	∨MyApplication  --> 项目根节点
		|＞ .gradle -->Gradle的临时文件
		|＞ .idea --> 
		|∨* app --> 主要的模块,如果配置正常时字体为粗体 
		|	|＞ build  --> 模块的临时文件与最终的apk文件
		|	|	|＞outputs ＞apk ＞目录下生成apk文件
		|	|＞* libs --> 存放jar包, 不能存so文件
		|	|∨* src --> 源代码目录
		|		|＞ androidTest --> 测试源代码
		|		|∨ main --> 源代码
		|		|	|＞ aidl --> 是aidl文件源代码目录,AIDL:即Android接口定义语言。
		|		|	|＞ assets --> 资源目录
		|		|	|＞ java --> 源代码
		|		|	|＞ jni --> 存放C语言文件
		|		|	|＞* jniLibs --> 存放so文件
		|		|	|＞ res --> 资源文件
		|		|	|AndroidManifest.xml 
		|		|.gitignore
		|		|app.iml
		|		|* build.gradle --> Gradle构建脚本,对当前模块设置的Gradle文件
		|		|proguard-rules.pro --> 代码混淆配置文件
		|＞ build --> 编译过程中的一些临时文件
		|＞ gradle --> 默认生成的一个本地的Gradle引导语,如果机器没有Gradle环境,会通过下载
		|＞ library --> 如果项目中有多个模块,官方建议创建一个目录library目录下存放其它模块
		|	＞ myLibrary --> 其它第三方模块 .
		|.gitignore
		|*build.gradle --> Gradle构建脚本,全局Gradle
		|build.gradle.bk
		|gradle.properties --> Gradle属性文件
		|gradlew
		|gradlew.bat --> gradle批处理文件
		|local.properties --> Android ADT bundle SDK目录配置文件
		|MyApplication.iml
		|*settings.gradle --> 项目模块配置文件

---

# <a id="Gradle"></a>Gradle 
	
Gradle是一种动态脚本语言, 基于Groovy  [http://www.groovy-lang.org/](http://www.groovy-lang.org/)   
能够很方便的通过Maven/lvy管理依赖   
使用非常灵活,一种效果可以有多种实现   

[http://gradle.org/](http://gradle.org/)   


---

# <a id="settings.gradle"></a>settings.gradle

案例: 

<pre class="brush: shell;">
	include ':app', ':library:mylibrary'  
</pre>

	":"是一个路径的分割线

	注意: 当 Open Module Settings  --> Project Structure 
		--> Dependencies 有配置过库 :mylibrary 直接修改settings.gradle成:library:mylibrary会编译异常

	Error:(25, 0) Project with path ':mylibrary' could not be found in project ':app'.

	这时,需要在Open Module Settings  -- > Project Structure --> app 
		--> Dependencies --> + module Dependencies 中的:mylibrary删除 即可,并重新增加:library:mylibrary

---

# <a id="项目根节点下的build.gradle"></a>项目根节点下的build.gradle

案例: 

<pre class="brush: java;">

	// Top-level build file where you can add configuration options common to all sub-projects/modules.
	buildscript { //
	    repositories {
		jcenter() //依赖库
	    }
	    dependencies { 
		classpath 'com.android.tools.build:gradle:1.2.2'//当前工程需要依赖的插件

		// NOTE: Do not place your application dependencies here; they belong
		// in the individual module build.gradle files
	    }
	}

	allprojects { //所有工程 
	    repositories {
		jcenter()//依赖库 --> 默认使用的是https加密库,当使用代理时,有可能不支持https ,则有可能出错
	    }
	}
</pre>

---

# <a id="模块根节点下的build.gradle"></a>模块根节点下的build.gradle

案例: 

<pre class="brush: java;">	
	//声明是一个Application 最终会生成一个apk
	//如果是一个库 'com.android.library' 这样就不会输出apk,
	//只会输出 jar 包或者 aar (aar是包含文件与资源的一个包,Eclipse不支持)
	apply plugin: 'com.android.application'  

	android { //安卓编译环境设置
		compileSdkVersion 22 //需要与自己的已下载的Build版本对应
		buildToolsVersion "22.0.1" 
		//注意,如果是网络下载下来的项目,需要查看自己的AS是否有相同Build的版本,没有则修改,否则报错

		sourceSets{ //配置不同版本原代码不同.与productFlavors对应
			phone{
				manifest.srcFile 'src/phone/AndroidManifest.xml'
				assets.srcDirs = ['src/phone/assets']
				//java.srcDirs = ['src']
				//resources.srcDirs = ['src']
				//aidl.srcDirs = ['src']
				//renderscript.srcDirs = ['src']
				//res.srcDirs = ['src']
			}

			pad{
				manifest.srcFile 'src/pad/AndroidManifest.xml'
				assets.srcDirs = ['src/pad/assets']
			}

		}

		signingConfigs{ //签名配置
			releasekey{ //名称自定义
				storeFile file('MyKey.keystore') //文件名
				storePassword 'android' // key密码
				keyAlias 'androiddebugkey' //别名
				keyPassword 'android' //密钥
			}

			debugkey{
				storeFile file('debug.keystore')
				storePassword 'android'
				keyAlias 'androiddebugkey'
				keyPassword 'android'
			}
		}

		defaultConfig { //生成的apk的更多信息配置 ,会覆盖AndroidManifest.xml的信息
			applicationId "com.tu.myapplication" //包名 会覆盖AndroidManifest.xml的包名
			minSdkVersion 8
			targetSdkVersion 22
			versionCode 1
			versionName "1.0"

			signingConfig signingConfigs.releasekey //签名配置  指定签名
		}

		productFlavors { //产品配置
			//与buildTypes的每一项结合生成包,会在build/outputs/apk/生
			//成 (productFlavors项*buildTypes的项*2)个apk
			phone {
				applicationId 'com.tu.myapplication' //不同包名
				signingConfig signingConfigs.debugkey //不同签名
			}
			pad {
				applicationId 'com.tu.myapplication.hd'
				signingConfig signingConfigs.debugkey
			}
		}

		buildTypes { //编译类型, 主要用于你这个包编译出来是做什么用的.
			//通常系统默认有两种,一种是release 二种是debug 生成4个apk包  , 
			//如果 productFlavors 有配置项如2个,buildTypes默认的2个则会生成2*2*2=8个apk包

			release { //为默认项配置混淆文件
			    minifyEnabled false
			    proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
			}

			//        //会生成两个包 app-fordebug.apk , app-fordebug-unaligned.apk
			//        fordebug {
			//            applicationIdSuffix '.debug'
			//		//包名会加.debug后缀即: com.tu.myapplication.debug
			//        }
			//
			//        //会生成两个包 app-fordailybuild.apk , app-fordailybuild-unaligned.apk
			//        fordailybuild{
			//            applicationIdSuffix '.db'//包名会加.db后缀
			//        }
			//
			//        //会生成两个包 app-formonkeytest.apk , app-formonkeytest-unaligned.apk
			//        formonkeytest{
			//            applicationIdSuffix '.monkey'
			//        }
		}
	}

	dependencies {	//依赖关系
		//单独引入jar包 --> Open Module Settings  -- > Project Structure -->
		//app --> Dependencies --> + File Dependencies -->选择jar包
		//compile files('libs/gson-2.2.4.jar') //使用单独引入jar包的方式

		//动态引入包
		//表示引入libs目录下的所有jar包 , 并且是动态的.
		compile fileTree(include: ['*.jar'], dir: 'libs') 

		//引入Libaray v7包 Open Module Settings  -- > Project Structure --> 
		//app --> Dependencies --> + Library Dependencies
		compile 'com.android.support:appcompat-v7:22.1.1' //这种方式表示引入单个包.

		//引入 本地包 Open Module Settings  -- > Project Structure --> app --> 
		//Dependencies --> + module Dependencies
		compile project(':library:mylibrary') //这种方式表示引入一个本地库(本地模块)

		//引入远程库 Open Module Settings  -- > Project Structure --> app --> 
		//Dependencies --> + Library Dependencies 搜索框内直接搜索
		//搜索 httpmime 后选择库即可. Gradle会后台下载jar包. 但如果你没有代理
		compile 'org.apache.httpcomponents:httpmime:4.5' 

		//红杏有提供给开发都一个免费代理,主机名为: hx.gy 端口为:1080
		//File--> settings --> Appearance & Behavior --> 
		//System Settings --> HTTP Proxy --> 勾选manual proxy configuration 
		//--> HTTP --> Host name:输入 hx.gy --> Port number:输入 1080 -->ok
	}
</pre>

---

# <a id="Gradle命令行"></a>Gradle命令行
	
	> gradle命令行运行需要下载一个gradle 并把gradle目录下的bin目录配置到环境变量中. 然后使用cmd

	> Android Studio目录下一般也会有个gradle / gradle-x.x/ 也可以配置这个bin目录 然后使用cmd
	
	> 也可以定位到项目目录下有 gradlew.bat 文件是 gradle批处理文件 定位后cmd中运行 gradlew命令

	> Android studio中有Terminal 窗口 也可以直接使用命令,而不用进入到cmd 
	
	常用命令: 
	gradle tasks 罗列可执行的任务   
	gradle build 编译全部脚本   
	gradle clean 清除项目
	gradle 加tasks列出的名称,指定编译内容 如: gradle assembleDebug   

---

# <a id="加速Android-Studio/Gradle构建"></a>加速Android Studio/Gradle构建
	
	优化对电脑配置要求比较高.
	
	1> 开启gradle单独的守护进程
		在下面的目录下面创建gradle.properties文件：
		/home/<username>/.gradle/ (Linux)
		/Users/<username>/.gradle/ (Mac)
		C:\Users\<username>\.gradle (Windows)
		并在文件中增加:

<pre class="brush: java;">
org.gradle.daemon=true
</pre>
	
	2> 同时修改项目下的 gradle.properties 文件也可以优化(也可以在步骤1>里面直接加入,变成全局,针对所有项目生效)：
	
<pre class="brush: java;">
org.gradle.daemon=true

org.gradle.jvmargs=-Xmx2048m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8

org.gradle.parallel=true

org.gradle.configureondemand=true
</pre>	

	3> 对Android Studio构建优化

	> File --> settings 
			|--> Build,Execution,Deployment 
				|--> Build Tools 
					|--> Gradle --> 项中勾选 Offline work  (离线工作模式)
					|		|--> Gradle VM options :  -Xmx2048m -XX:MaxPermSize=512m
					|--> Compiler 
						|--> 勾选 Compile independent modules in parallel (may require larger heap size)
						|--> VM Options:输入 -Xmx2048m -XX:MaxPermSize=512m
						|--> Command-line Options:输入 --offline

	4> 命令行构建
		
		在构建命令后面加 --daemon --parallel --offline 
		例如
		gradle build --daemon --parallel --offline
		1) Total time: 34.133 secs 第一次构建
		3) Total time: 12.748 secs 未修改任何内容第三次构建
		5) Total time: 12.639 secs
		7) Total time: 12.201 secs

		gradle build
		2) Total time: 21.371 secs 未修改任何内容第二次构建
		4) Total time: 18.891 secs
		6) Total time: 18.823 secs
		8) Total time: 18.79 secs

	5> 引入依赖库时使用aar
		如果库项目工程为 apply plugin: 'com.android.library' 的,则会在目录
		库/build/outputs/arr/xxxx.aar 生成文件

---

# <a id="Eclipse-中使用-Gradle"></a>Eclipse 中使用 Gradle

在Eclipse项目根目录下创建build.gradle文件

<pre class="brush: java;">	
	apply plugin: 'com.android.application'
	//让Eclipse的项目使用gradle进行编译, cmd 定位到项目根目录,
	//使用gradle build进行编译 . 
	//生成到build目录中, 
	android{
		compildSdkVersion 21
		buildToolsVersion "21.1.2"
		
		sourceSets{
			main{
				manifest.srcFile 'AndroidManifest.xml'
				java.srcDirs = ['src']
				resources.srcDirs = ['src']
				aidl.srcDirs = ['src']
				renderscript.srcDirs = ['src']
				res.srcDirs = ['src']
				assets.srcDirs = ['src']
			}
		}
	}

	dependencies{
		//...一些引入包
	}
</pre>

---

# <a id="一些常见错误"></a>一些常见错误

出现gradle无法下载等时可以尝试修改一些代码如: 

	修改MyApplication/gradle/wrapper/gradle-wrpper.properties文件
	distributionUrl=https\://services.gradle.org/distributions/gradle-2.2.1-all.zip
	修改https为http: distributionUrl=http\://services.gradle.org/distributions/gradle-2.2.1-all.zip

代理下载错误

<pre class="brush: java;">	
	appcenter
	buildscript{
		repositories{
			maven{url "http://repo1.maven.org/maven2"}
			jcenter{
				url "http://jcenter.bintray.com"
			}
		}
		dependencies {classpath 'com.android.tools.build:gradle:1.1.0+'}
	}
</pre>

安卓ADT的目录错误 修改local.properties 

---

更多内容后续补上.

[本文案例Demo](/res/file/blog/2015/01/01/Java_Android_Studio_IDE/MyApplication.rar)



	









