---
layout : post
title : "Android多渠道打包"
category : Android
duoshuo: true
date : 2016-09-29
tags : [Android , 多渠道打包 ]
---

Android多渠道打包
* Gradle方式
* Python脚本方式



<!-- more -->

# 通过Gradle多渠道打包

## 配置步骤

### 1. 在`AndroidManifest.xml` 配置**占位符**

```xml
<application
  ...>
      ...
      <!-- 渠道商编号 增加占位符-->
      <meta-data
      android:name="XXXX_CHANNEL"
      android:value="${XXXX_CHANNEL_VALUE}"/>
      ...    
</application>
```

### 2. 在app的`build.gradle`文件中配置**签名**

```java
android {
...  
    /**签名配置 需要在引用的前面进行配置,不然编译不通过*/
    signingConfigs {
        releasekey {
             storeFile file('./keystore/release.keystore')  //key文件目录
             storePassword "testres"  //key密码
             keyAlias "testres"       //Alias名称
             keyPassword "testres"    //Alias密码
        }
        debugkey {
            storeFile file('./keystore/debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
....    
}    
```

### 3. 在app的`build.gradle`文件中配置**build类型**

```java
android{
  ...
      buildTypes {
          release {
              buildConfigField "boolean", "CONFIG_LOG_DEBUG", "false"
              minifyEnabled true
              shrinkResources true

              proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
              signingConfig signingConfigs.releasekey
          }

          debug {
              buildConfigField "boolean", "CONFIG_LOG_DEBUG", "true"
              minifyEnabled false
              signingConfig signingConfigs.debugkey
          }
      }
  ...
}
```

### 4. 在app的`build.gradle`文件中配置**渠道包名以及输出的文件名**

```java
android{
  ...
  /**可定义的产品特性 功能强大*/
 productFlavors {
     //渠道包名
     xiaomi {
         //修改占位符
         //manifestPlaceholders = [XXXX_CHANNEL_VALUE: xiaomi]
         //还有很多功能可以配置
     }
     qh360 {}
     baidu {}
     wandoujia {}
       //... 还需要增加哪些渠道包只需要 xxx{}即可
 }
 /**批量遍历修改AndroidManifest.xml中的XXXX_CHANNEL_VALUE占位符值*/
 productFlavors.all {
     flavor -> flavor.manifestPlaceholders = [XXXX_CHANNEL_VALUE: name]
 }
 /**自定义输出文件配置*/
 applicationVariants.all { variant ->
     variant.outputs.each { output ->
         def outputFile = output.outputFile
         if (outputFile != null && outputFile.name.endsWith('.apk')) {
             def appId = defaultConfig.applicationId;
             def vName = defaultConfig.versionName;
             def channelName = variant.productFlavors[0].name;
             def buildType = variant.buildType.name;
             def signed = variant.apkVariantData.signed?"_signed":"_unsigned";
             /**输出apk名称*/
             def fileName = "${appId}_v${vName}_${channelName}_${buildType}${signed}.apk"
             output.outputFile = new File(outputFile.parent, fileName)
         }
     }
 }
    ...
}    
```

### 5. 打包

通过**AndroidStudio**的`Terminal`或者`Gradle环境`进行打包

  **Terminal**打包时使用gradle的如下命令即可批量打包

> gradle assembleRelease    

![目录结构](/res/img/blog/2016/09/29/android_multi_channel/as_terminal.png)


  **Gradle工具**一键打包.

![目录结构](/res/img/blog/2016/09/29/android_multi_channel/gradle_tool_build.png)

打包出来的的各大渠道包


![目录结构](/res/img/blog/2016/09/29/android_multi_channel/build_complete.png)


---

## 配置的完整文件

### `AndroidManifest.xml`配置

```xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.tu.test.multichannel">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".activity.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN"/>

                <category android:name="android.intent.category.LAUNCHER"/>
            </intent-filter>
        </activity>
        <!-- 渠道商编号 增加占位符-->
        <meta-data
            android:name="XXXX_CHANNEL"
            android:value="${XXXX_CHANNEL_VALUE}"/>
    </application>

</manifest>
```

### `app/build.gradle`配置

```java
apply plugin: 'com.android.application'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.0"

    /**签名配置 注意这个位置.需要配置在引用的前面,不然编译不通过*/
    signingConfigs {
        releasekey {
            storeFile file('./keystore/release.keystore')  //key文件目录
            storePassword "testres"  //key密码
            keyAlias "testres"      //Alias名称
            keyPassword "testres"   //Alias密码
        }
        debugkey {
            storeFile file('./keystore/debug.keystore')
            storePassword 'android'
            keyAlias 'androiddebugkey'
            keyPassword 'android'
        }
    }
    defaultConfig {
        applicationId "com.tu.test.multichannel"
        minSdkVersion 14
        targetSdkVersion 24
        versionCode 1
        versionName "1.2"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        //编译release 发布时的配置环境
        release {
            //自定义属性详情见MainActivity.java的使用
            buildConfigField "boolean", "CONFIG_LOG_DEBUG", "false"
            //开启混淆
            minifyEnabled true
            //跳过无用的资源文件
            shrinkResources true
            //混淆文件配置
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
            //配置签名
            signingConfig signingConfigs.releasekey
        }
        //编译debug测试时的环境
        debug {
            buildConfigField "boolean", "CONFIG_LOG_DEBUG", "true"
            minifyEnabled false
            signingConfig signingConfigs.debugkey
        }
    }

    /**可定义的产品特性*/
    productFlavors {
        //渠道包名
        xiaomi {
            //manifestPlaceholders = [XXXX_CHANNEL_VALUE: xiaomi]
            //还有很多功能可以配置
        }
        qh360 {}
        baidu {}
        wandoujia {}
    }
    /**批量遍历修改AndroidManifest.xml中的XXXX_CHANNEL_VALUE占位符值*/
    productFlavors.all {
        flavor -> flavor.manifestPlaceholders = [XXXX_CHANNEL_VALUE: name]
    }
    /**自定义输出文件配置*/
    applicationVariants.all { variant ->
        variant.outputs.each { output ->
            def outputFile = output.outputFile
            if (outputFile != null && outputFile.name.endsWith('.apk')) {
                def appId = defaultConfig.applicationId;
                def vName = defaultConfig.versionName;
                def channelName = variant.productFlavors[0].name;
                def buildType = variant.buildType.name;
                def signed = variant.apkVariantData.signed?"_signed":"_unsigned";
                /**输出apk名称*/
                def fileName = "${appId}_v${vName}_${channelName}_${buildType}${signed}.apk"
                output.outputFile = new File(outputFile.parent, fileName)
            }
        }
    }

}
dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:24.2.1'
    testCompile 'junit:junit:4.12'
}

```

![目录结构](/res/img/blog/2016/09/29/android_multi_channel/config_multi_channel.png)


## 注意项

build.gradle的配置项是分先后顺序的,如果调用某个配置,必须在调用前进行声明.否则抛无法获取属性.

Error:(29, 1) A problem occurred evaluating project ':app'.
 Could not get unknown property 'releasekey' for SigningConfig container.

---

# 通过Python批量打包

* 这个方案没法解决不同渠道使用渠道自己SDK的问题，友盟的SDK提供了在代码中设置渠道的方式，所以再获取到渠道号后再调用SDK相关设置渠道的方法就可以了
* apk用的是java那一套签名，放在META-INF文件夹里的文件原则上是不参与签名的。如果Google修改了apk的签名规则，这一套可能就不适用了。

## 1.安装Python环境

本人下载的python-2.7.12.msi

下载地址:[https://www.python.org/downloads/](https://www.python.org/downloads/)

## 2.在项目中增加获取渠道的方法
	
在项目中增加ChannelUtil.java在Demo文件中可以找到.并通过如下代码获取渠道

	String channel = ChannelUtil.getChannel(this);//调用方法


## 3.为app打签名包.
	
	为App打的签名包放到Python脚本文件的同目录.

## 4.配置需要的渠道
	
	channel.txt 里面的就是渠道,一个渠道一行.

## 5.运行Python脚本
	
	双击MultiChannelBuildTool.py文件运行脚本

## 6.关键实现代码

Java代码
```java
private static String getChannelFromApk(Context context, String channelKey) {
		//从apk包中获取
        ApplicationInfo appinfo = context.getApplicationInfo();
        String sourceDir = appinfo.sourceDir;
        //默认放在meta-inf/里， 所以需要再拼接一下
        String key = "META-INF/" + channelKey;
        String ret = "";
        ZipFile zipfile = null;
        try {
            zipfile = new ZipFile(sourceDir);
            Enumeration<?> entries = zipfile.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = ((ZipEntry) entries.nextElement());
                String entryName = entry.getName();
                if (entryName.startsWith(key)) {
                    ret = entryName;
                    break;
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (zipfile != null) {
                try {
                    zipfile.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        String[] split = ret.split("_");
        String channel = "";
        if (split != null && split.length >= 2) {
        	channel = ret.substring(split[0].length() + 1);
        }
        return channel;
	}
```

Python代码

```python
#!/usr/bin/python
# coding=utf-8
import zipfile
import shutil
import os

# 空文件 便于写入此空文件到apk包中作为channel文件
src_empty_file = 'info/c.txt'
# 创建一个空文件（不存在则创建）
f = open(src_empty_file, 'w') 
f.close()

# 获取当前目录中所有的apk源包
src_apks = []
# python3 : os.listdir()即可，这里使用兼容Python2的os.listdir('.')
for file in os.listdir('.'):
    if os.path.isfile(file):
        extension = os.path.splitext(file)[1][1:]
        if extension in 'apk':
            src_apks.append(file)

# 获取渠道列表
channel_file = 'info/channel.txt'
f = open(channel_file)
lines = f.readlines()
f.close()

for src_apk in src_apks:
    # file name (with extension)
    src_apk_file_name = os.path.basename(src_apk)
    # 分割文件名与后缀
    temp_list = os.path.splitext(src_apk_file_name)
    # name without extension
    src_apk_name = temp_list[0]
    # 后缀名，包含.   例如: ".apk "
    src_apk_extension = temp_list[1]
    
    # 创建生成目录,与文件名相关
    output_dir = 'output_' + src_apk_name + '/'
    # 目录不存在则创建
    if not os.path.exists(output_dir):
        os.mkdir(output_dir)
        
    # 遍历渠道号并创建对应渠道号的apk文件
    for line in lines:
        # 获取当前渠道号，因为从渠道文件中获得带有\n,所有strip一下
        target_channel = line.strip()
        # 拼接对应渠道号的apk
        target_apk = output_dir + src_apk_name + "-" + target_channel + src_apk_extension  
        # 拷贝建立新apk
        shutil.copy(src_apk,  target_apk)
        # zip获取新建立的apk文件
        zipped = zipfile.ZipFile(target_apk, 'a', zipfile.ZIP_DEFLATED)
        # 初始化渠道信息
        empty_channel_file = "META-INF/channel_{channel}".format(channel = target_channel)
        # 写入渠道信息
        zipped.write(src_empty_file, empty_channel_file)
        # 关闭zip流
        zipped.close()

```

[Python脚本详情](https://github.com/GavinCT/AndroidMultiChannelBuildTool)

# Demo下载

[本文Demo下载](/res/file/blog/2016/09/29/android_multi_channel/AndroidMultiChannelBuildToolAndDemo.rar)