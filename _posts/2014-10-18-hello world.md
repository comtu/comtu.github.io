---
layout : post
title : "hello world"
category : demo
duoshuo: true
date : 2014-10-18
---

<!-- more -->

---

#特大字

##大字

###中字

####小字

#####特小字

######再小点?

默认什么字号

**加粗**

*斜体*

***加粗斜体***

内容`颜色`背景

[我是链接](http://comtu.github.com)

---

	伸进

---

![图片链接](/res/img/icon.jpg)

---

* #1.特大字内容

	* ##1.1大字内容
	* ###1.2中字内容
		* ####1.2.1小字内容
		* #####1.2.2特小字内容
			* ######1.2.2.1再小点?内容
			* 01.2.2.2默认什么字号内容

		* **1.2.3加粗内容**
		* *1.2.4斜体内容*

* ***2.加粗斜体内容***
* 3.内容`颜色`背景
* 4.[我是链接](http://comtu.github.com)


---

{% highlight c %}
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

