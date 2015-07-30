---
layout : post
title : "Windows平台配置Jekyll环境并与GitHub连接"
category : Jekyll
duoshuo: true
date : 2014-10-18
tags : [Jekyll , GitHub]
---

******

###1.安装所需要的软件<br />
* **文本编辑器**(不要使用Windows自带的编辑器) 

	使用如:`notepad++` [http://www.notepad-plus-plus.org/](http://www.notepad-plus-plus.org/)<br />
* **Railsinstaller**    [http://railsinstaller.org/en](http://railsinstaller.org/en)
* **Python** [https://www.python.org/downloads/](https://www.python.org/downloads/)
	
	安装并为python配置环境变量,由于有部分的组件还会依赖到python，  
	所以这里建议也安装上python（例如:语法着色器pygments是python组件）
<!-- more -->

******

###2.安装完后生成SSH并导入到Github网站
* **生成SSH**<br />
	Railsinstaller安装(默认安装)完后软件提示输入name 其实是Github的用户名 , 输入完后提示输入邮箱 github注册使用的邮箱<br />
	以上操作完后会在 `C:\Users\用户名\.ssh文件夹\`下生成密钥与公钥 `id_rsa`(密钥) 与 `id_rsa.pub`(公钥) 

* **导入SSH公钥到GigHub网站** <br />
	(作用是使用git提交时可以使用 git@github.com:comtu/comtu.github.io.git 的地址,直接 push 数据到github网站,无需要使用Https链接每次push数据输入用户名密码)<br />
	公钥使用文本方式打开复制里面的所有内容(ctrl+A ->ctrl+C 包括空格和新行)--> 登录Gighub网站 --> `settings(设置)` --> `SSH keys` --> `Add SSH key` --> `输入Title`(可随便填写,但建议编写有意义的名字) --> 粘贴内容到`Key`中 --> `Add key`

******

###3.测试Git连接是否正常
运行Git Bash (`开始菜单--> RailsInstaller --> Git Bash`) 安装Railsinstaller后会默认在C盘根目录创建一个Sites目录 , 运行的GitBash也会自动定位到Sites目录

* 测试Git连接是否正常输入:`ssh -T git@github.com`

运行会提示:
	The authent icity of host 'github.com(204.232.175.90)' can't be established . 
	RSA key fingerprint is ......
	Ary you sure you want to continue connecting (yes/no)? 

输入 
	`yes`

之后会显示
	Warning: Permanently added 'github.com.204.232.175.90' (RSA) to the list of known hosts . 
	Permission denied (publickey).

******

###4.修改配置避免jekyll在windows下字符集错误
	4.1.修改bash的字符集
		Win7系统中(C:\Users\用户名),Xp系统中(C:\Documents and Settings\用户名)下,
		找到.bash_profile文件,在其内容里增加如下内容
			set LC_ALL=en_US.UTF-8
			set LANG=en_US.UTF-8
		注意:
			在Windows系统下没有办法创建.xxx的文件名,所以可以借用git bash命令行来创建:
			1. 输入 echo 'set LC_ALL=en_US.UTF-8' > .bash_profile 命令创建一个内容为''内容的文件
				comtu@CN-CS-PC73 /C/Sites
				$ echo 'set LC_ALL=en_US.UTF-8' > .bash_profile
			2.文件管理器打开文件目录C:\Sites 将文件.bash_profile使用文本编辑器的方式打开在内容里面
			增加成如下内容保存
				set LC_ALL=en_US.UTF-8
				set LANG=en_US.UTF-8
				还有一个行空行
			3.将.bash_profile文件拷贝到Win7系统中(C:\Users\用户名),
			Xp系统中(C:\Documents and Settings\用户名)下.

	4.2.所有文档使用UTF-8无BOM格式
		在windows下新建的文本文件默认为ANSI格式,而Jekyll只认UTF-8,可以使用第三方文本编辑器进行格式转换如,
			notepad++中转换
				格式-->转为UTF-8无BOM格式
			EditPlus中转换
				文件-->另存为-->编码(UTF-8)-->选择目录-->保存
	4.3.使用Unix换行符
		在notepad++中，可以开启“显示所有字符”选项，这样就可以看出文档用的是Windows的换行符还是Unix的换行符。
		在这种模式下，Windows的换行符显示的是CR LF，Unix的换行符显示的是LF , MAC 的换行符显示的是CR
			notepad++中转换
				编辑-->档案格式转换-->转换为Unix格式
		使用是使用Notepad++文档编辑器则可以在创建的时候就默认为Unix格式
			设置-->首选项-->新建-->格式-->Unix
			                       编码-->UTF-8(无BOM)
	4.4.注意YAML头部的格式
		模板文件的元数据以YAML的格式展现，YAML头部经常会出现三个问题：
			1.三短线前面不能有空格；
			2.“名: 值”对里冒号后面要有空格；
			3.回车后不要有Tab符；
			4.示数组成员开始的-号后面要有空格
	
******

###5.安装jekyll和相关的包
	在国内需要配置gem数据源地址,翻墙或者在国外则无需设置
		输入以下两条命令:
			命令: gem sources --remove http://rubygems.org/
			命令: gem sources -a http://ruby.taobao.org/
		然后用 命令: gem sources -l 看看现在源列表
			*** CURRENT SOURCES ***
			http://ruby.taobao.org
		如果显示如上信息则可以进行安装Jekyll了 
			命令: gem install jekyll
		Jekyll需要用到directory_watcher、liquid、open4、maruku和classifier这几个包，用上面的命令可以自动安装。
		Jekyll默认用maruku来解析markdown语言，你也可以用别的程序来解析，比如rdiscount或kramdown，都给装上吧：
			命令: gem install rdiscount kramdown

		以上命令涉及到gem install的时候，如果你用的是linux系统，就要用sudo gem install代替。


* **参考资料:**

> [Github Pages极简教程](http://yanping.me/cn/blog/2012/03/18/github-pages-step-by-step/)  
> [【译文】用Jekyll构建静态网站](http://yanping.me/cn/blog/2011/12/15/building-static-sites-with-jekyll/) [原文Building Static Sites with Jekyll](http://code.tutsplus.com/tutorials/building-static-sites-with-jekyll--net-22211)  
> [为 Jekyll 添加多说评论系统](http://havee.me/internet/2013-07/add-duoshuo-commemt-system-into-jekyll.html)  
> [在 Windows 上安装 Jekyll](http://cn.yizeng.me/2013/05/10/setup-jekyll-on-windows/#troubleshooting)  
> [Jekyll 中的语法高亮：Pygments](http://comtu.github.io/blog/2014/10/18/support-pygments-in-Jekyll.html)  
> [Jekyll 扩展的 Liquid 设计](http://havee.me/internet/2013-11/jekyll-liquid-designers.html)  [原文Liquid for Designers](https://github.com/shopify/liquid/wiki/liquid-for-designers)  

