---
layout : post
title : "hello world"
category : Jekyll
duoshuo: true
date : 2014-10-18
tags : [Jekyll , Demo , Test , SyntaxHihglighter , pygments , Markdown]
SyntaxHihglighter: true
shTheme: shThemeEclipse # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark

---

#H1  

##H2  

###H3

####H4

#####H5

######H6

默认字号字体

**加粗**

<!-- more -->

*斜体*
_斜体_

***加粗斜体***

内容`颜色`背景

> 内容加边  

> 再加边  
> 再再加边  
> 再再再加边  
> 注意事项**`"内容后面有两个空格"`**  




---

	缩进

---

[我是链接,下面的是图片链接](http://comtu.github.com)

![图片链接](/res/img/icon.jpg)

---

* #1.H1内容

	* ##1.1H2内容
	* ###1.2H3内容
		* ####1.2.1H4内容
		* #####1.2.2H5内容
			* ######1.2.2.1H6内容
			* 01.2.2.2默认什么字号内容

		* **1.2.3加粗内容**
		* *1.2.4斜体内容*

* ***2.加粗斜体内容***
* 3.内容`颜色`背景
* 4.[我是链接](http://comtu.github.com)

1. 内容1
2. 内容2
4. 内容(注意这里的Markdown源代码)
23. 内容x

---

下面是表格

|head1|head2|head3|head4
|---|:---|---:|:---:|
|row1text1|row1text2|row1text3|row1text4
|row2text1|row2text2|row2text3|row2text4
|row3text1|row3text2|row3text3|row3text4

---

**[使用 pygments 高亮](http://pygments.org/)**

{% highlight c linenos %}
/* hello world demo 代码高亮*/
#include <stdio.h>
int main(int argc, char **argv)
{
    printf("Hello, World!\n");
    return 0;
}
{% endhighlight %}


---

{% raw %}
	{% highlight c %} 
	/* hello world demo 禁止解析*/
	#include <stdio.h>
	int main(int argc, char **argv)
	{
	    printf("Hello, World!\n");
	    return 0;
	}
	{% endhighlight %}
{% endraw %}

<hr id="line"/><br/>

**[用 SyntaxHihglighter 高亮](http://alexgorbatchev.com/SyntaxHighlighter/)**

<pre class="brush: js; ">
function helloSyntaxHighlighter()
{
	return "hi!";
}
</pre>

{% raw %}
	<pre class="brush: js; "><!--禁止解析-->
	function helloSyntaxHighlighter()
	{
		return "hi!";
	}
	</pre>
{% endraw %}

<pre class="brush: java; ruler: true; first-line: 0; highlight: [2, 4, 6] ; auto-links: false ; collapse: true ; gutter: false; ">
/*http://comtu.githut.io*/
class SingletonTest {
	private static class SingletonHolder {
		private static final SingletonTest INSTANCE = new SingletonTest();
	}

	private SingletonTest() {
	}

	public static final SingletonTest getInstance() {
		return SingletonHolder.INSTANCE;
	}
}

</pre>




<pre class="brush: java;  collapse: true ; first-line: 10; highlight: [11, 13, 15] " >
/**
 * 枚举_单例
 */
enum SingletonEnum {  
    INSTANCE;  
    public void whateverMethod() {  
    }  
}  
</pre>

---

**[使用 script 方式高亮](http://alexgorbatchev.com/SyntaxHighlighter/manual/installation.html)**

<script type="syntaxhighlighter" class="brush: php ; html-script: true ; collapse: true "><![CDATA[
  <html>
  <body>
      <div style="font-weight: bold"><?= str_replace("\n", "<br/>", $var) ?></div>
       
      <?
      /***********************************
       ** Multiline block comments
       **********************************/
       
      $stringWithUrl = "http://alexgorbatchev.com";
      $stringWithUrl = 'http://alexgorbatchev.com';
           
      ob_start("parseOutputBuffer");      // Start Code Buffering
      session_start();
      ?>
  </body>
  </html>
]]></script>

---

**[使用 pre 方式高亮 . 不支持 < 符号,需要进行转义为 &lt ; (但能很好的支持RSS订阅)](http://alexgorbatchev.com/SyntaxHighlighter/manual/installation.html)**

<pre class="brush: html;  collapse: true">
  &lt;html>
  &lt;body>
      &lt;div style="font-weight: bold">&lt;?= str_replace("\n", "&lt;br/>", $var) ?>&lt;/div>
       
      &lt;?
      /***********************************
       ** Multiline block comments
       **********************************/
       
      $stringWithUrl = "http://alexgorbatchev.com";
      $stringWithUrl = 'http://alexgorbatchev.com';
           
      ob_start("parseOutputBuffer");      // Start Code Buffering
      session_start();
      ?>
  &lt;/body>
  &lt;/html>
</pre>
	
[SyntaxHihglighter使用方法](http://alexgorbatchev.com/SyntaxHighlighter/manual/installation.html)

[SyntaxHihglighter参数](http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/)

---

**视频**

<video controls="controls" poster="/res/video/2014-10-18-hello world/anim_page_transformer_zoomout.jpg" width="320" height="auto">
    <source src="/res/video/2014-10-18-hello world/anim_page_transformer_zoomout.mp4" type="video/mp4">
    <source src="/res/video/2014-10-18-hello world/anim_page_transformer_zoomout.webm" type="video/webm">
    <source src="/res/video/2014-10-18-hello world/anim_page_transformer_zoomout.ogv" type="video/ogv">
</video>

---


**Markdown 免费编辑器**

Windows 平台

- [MarkdownPad](http://markdownpad.com/)
- [MarkPad](http://code52.org/DownmarkerWPF/)


Linux 平台

- [ReText](http://sourceforge.net/p/retext/home/ReText/)

Mac 平台

- [Mou](http://mouapp.com/)

在线编辑器

- [Markable.in](http://markable.in/)
- [Dillinger.io](http://dillinger.io/)

浏览器插件

- [MaDe](https://chrome.google.com/webstore/detail/oknndfeeopgpibecfjljjfanledpbkog) (Chrome)

高级应用

- [Sublime Text 2](http://www.sublimetext.com/2) + [MarkdownEditing](http://ttscoff.github.com/MarkdownEditing/) / [教程](http://lucifr.com/2012/07/12/markdownediting-for-sublime-text-2/)


---

<section>
<h3><b>最新评论</b></h3>
<ul class="ds-recent-comments" data-num-items="10" data-show-avatars="0" data-show-time="0" data-show-title="0" data-show-admin="0" data-excerpt-length="18"></ul>
</section>

<section style="width:250px;">
<h3><b>最近访客</b></h3>
<ul class="ds-recent-visitors" data-num-items="4" data-avatar-size="45" style="margin-top:10px;"></ul>
</section>

---


