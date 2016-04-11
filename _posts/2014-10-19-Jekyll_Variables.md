---
layout : post
title : "Jekyll目录结构与变量"
category : Jekyll
duoshuo: true
date : 2014-10-19
tags : Jekyll
---

**Jekyll 目录及一些说明**

Jekyll 标准目录树

	_config.yml   Jekyll的配置文件
	_includes     include 文件所在的文件夹
	_layouts      模版文件夹
	_posts        自己要发布的内容
	_sites        预览时产生的文件都放在该文件夹中

<!-- more -->

Jekyll的安装及配置

> * _includes文件夹中所放的文件是最终要放到模版中的一些代码片段。 

> * _layouts中放的一些模版，模版是用包含page或post内容的。Jekyll的模版使用HTML语法来写，并包含YAML Front Matter。所有的模版都可用Liquid来与网站进行交互。所的的模版都可以使用全局变量site和page，site变量包含该网站所有可以接触得到的内容和元数据(meta-data)，page变量包含的是当前渲染的page或post的所有可以接触得到的数据。 

> * _post文件夹中放的是自己要发布的post文章。post文件的命名规则为YEAR-MONTH-DATE-title.MARKUP，使用rake post会自动将post文件命名合适。而对于page，所有放在根目录下或不以下划线开头的文件夹中有格式的文件都会被Jekyll处理成page。这里说的有格式是指文件含有YAML Front Matter。所有的post和page都要用markdown或者texile或者HTML语法来写，并可以包含Liquid模版的语法。还要有 YAML Front Matter (Jekyll只处理具有YAML Front Matter的文件)。YAML Front Matter必须放在文件的开头，一对---之间，用户可在这一对---间设置预先定义的变量或用户自己的数据

---

**Jekyll模板全局变量**

|变量|描述|
|---|:---|---:|:---:|
|site|全站的信息+_config.yml文件中的配置选项
|page|这个变量中包含YAML前置数据,另外加上两个额外的变量值:url和content。
|content|在布局模板文件中，这里变量包含了页面的子视图。这个变量将会把渲染后的内容插入到模板文件中。这个变量不能在文章和页面文件中使用。
|paginator|一旦paginate配置选项被设置了，这个变量才能被使用。


---

**Jekyll模板Site变量**

|变量|描述|
|---|:---|---:|:---:|
|site.time|当前的时间(当你运行Jekyll时的时间)
|site.posts|一个按时间逆序的文章列表。
|site.related_posts|如果当前被处理的页面是一个文章文件，那这个变量是一个包含了最多10篇相关文章的列表。默认来说，这些相关文章是低质量但计算快的。为了得到高质量但计算慢的结果，运行Jekyll命令时可以加上--lsi选项。(潜在语意索引)
|site.categories.CATEGORY|所有在CATEGORY分类中的文章列表
|site.tags.TAG|所有拥有TAG标签的文章的列表
|site.[CONFIGURATION_DATA]|截止0.5.2版本，所有在_config.yml中的数据都能够通过site变量调用。举例来说，如果你有一个这样的选项在你的配置文件中:url: http://higrid.net，那在文章和页面文件中可以这样调用{ { site.url } }。Jekyll并不会自动解析修改过的_config.yml文件，你想要启用新的设置选项，你需要重启Jekyll

---


**Jekyll模板Page变量**

|变量|描述|
|---|:---|---:|:---:|
|page.content|	页面中未渲染的内容
|page.title|	文章的标题
|page.url|	除去域名以外的URL，例子:/2013/12/14/higrid-net.html
|page.date|	指定每一篇文章的时间，这个选项能够覆盖一篇文章中前置数据设置的时间，它的格式是这样的:YYYY-MM-DD HH:MM:SS
|page.id|	每一篇文章的唯一标示符(在RSS中非常有用) 例子：/2008/12/14/higrid-net
|page.categories|	这篇文章隶属的分类的一个列表，分类是通过在_post目录中的目录结构推导而来的。举例来说，在路径/work/code/_posts/2008-12-24-closures.textile下的文件，这个变量将会是[work,code]。这个变量也能在YAML前置数据中被指定。
|page.tags|	这篇文章的标签的列表。这些数据能够在YAML前置数据中指定
|page.next|	按时间序的下一篇文章
|page.content|按时间序的上一篇文章

> 注意:任何你自己指定的自定义前置数据都能够通过page调用。举例来说，如果你在页面的前置数据中设置了custom_css: true，那这个值可以在模板可以这样调用:page.custom_css

---

**Jekyll模板Paginator变量**

|变量|描述|
|---|:---|---:|:---:|
|paginator.per_page|	每一个页面上文章的数量
|paginator.posts|	当前页面上可用的文章
|paginator.total_posts	|所有文章的数量
|paginator.total_pages|	所有页面的数量
|paginator.page	|当前页面的数量
|paginator.previous_page|	前面的页面的数量
|paginator.next_page	|接下来的的页面的数量


---

**Post或Page的创建及发布**

创建Post文章

	rake post title="文章标题"

会自动创建一个具有合适文件名和YAML Front Matter的文件(使用时将"文章标题"替换成你要创建的文章的标题)。

创建Page页面

	rake page name="页面名称.md"   或者
	rake page name="pages/页面名称.md"


发布Post或Page

	git add .
	git commit -m '一些说明'
	git push origin master

---

**[[原文地址](http://jekyllrb.com/docs/variables/)]**