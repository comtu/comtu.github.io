---
layout : post
title : "Github配置SSH key"
category : GitHub
duoshuo: true
date : 2014-10-18
tags : [GitHub]
---

# Github配置SSH key

作用是使用git提交时可以使用   
git@github.com:comtu/comtu.github.io.git 的地址,  
直接 push 数据到github网站,  
无需要使用Https链接每次push数据输入用户名密码

<!-- more -->

## 步骤一:

使用Git Bash生成新的ssh key。

	$ cd ~  #保证当前路径在”~”下
	$ ssh-keygen -t rsa -C "xxxxxx@yy.com"  #建议填写自己真实有效的邮箱地址

	Generating public/private rsa key pair.
	Enter file in which to save the key (/c/Users/xxxx_000/.ssh/id_rsa):   #不填直接回车
	Enter passphrase (empty for no passphrase):   #输入密码（可以为空）
	Enter same passphrase again:   #再次确认密码（可以为空）
	Your identification has been saved in /c/Users/xxxx_000/.ssh/id_rsa.   #生成的密钥
	Your public key has been saved in /c/Users/xxxx_000/.ssh/id_rsa.pub.  #生成的公钥
	The key fingerprint is:
	e3:51:33:xx:xx:xx:xx:xxx:61:28:83:e2:81 xxxxxx@yy.com
	*本机已完成ssh key设置，其存放路径为：c:/Users/xxxx_000/.ssh/下。
	注释：可生成ssh key自定义名称的密钥，默认id_rsa。
	$ ssh-keygen -t rsa -C "邮箱地址" -f ~/.ssh/githug_blog_keys #生成ssh key的名称为githug_blog_keys，慎用容易出现其它异常。

****************

## 步骤二:

添加ssh key到GItHub


公钥(id_rsa.pub)使用文本方式打开复制里面的所有内容(ctrl+A ->ctrl+C 包括空格和新行)  
 –> 登录Gighub网站 –> settings(设置) –> SSH keys –> Add SSH key   
–> 输入Title(可随便填写,但建议编写有意义的名字) –> 粘贴内容到Key中 –> Add key

****************

## 步骤三:

配置账户  

	$ git config --global user.name “your_username”  #设置用户名  
	$ git config --global user.email “your_registered_github_Email”  #设置邮箱地址
	$ git config --global core.longpaths true # git clone 时显示Filename too long的解决办法

测试ssh keys是否设置成功。
	
	$ ssh -T git@github.com
	The authenticity of host 'github.com (192.30.253.113)' can't be established.
	RSA key fingerprint is 16:27:xx:xx:xx:xx:xx:4d:eb:df:a6:48.
	Are you sure you want to continue connecting (yes/no)? yes #确认你是否继续联系，输入yes
	Warning: Permanently added 'github.com,192.30.253.113' (RSA) to the list of known hosts.
	Enter passphrase for key '/c/Users/xxxx_000/.ssh/id_rsa':  #生成ssh kye是密码为空则无此项，若设置有密码则有此项且，输入生成ssh key时设置的密码即可。
	Hi xxx! You've successfully authenticated, but GitHub does not provide shell access. #出现词句话，说明设置成功。


