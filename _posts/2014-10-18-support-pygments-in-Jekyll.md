---
layout : post
title : "Jekyll中的语法高亮:Pygments"
category : Jekyll 
duoshuo: true
date : 2014-10-18
---

******


在安装成功Jekyll环境的情况下.

##一.安装Pygments

Jekyll 里默认的语法高亮插件是 [Pygments](http://pygments.org/)。Pygments [支持多种语言高亮](http://pygments.org/docs/lexers/)。

**一.1)如果你是linux**


* **1.安装 pygments**

archlinux:

	$ sudo pacman -S python2-pygments

<!-- more -->

或直接通过 pip 来安装

	$ pip install pygments --user


* **2.安装 pygments.rb**

命令使用: 

	$ gem install pygments.rb



---

**一.2)如果你是Windows**

它需要安装 Python 并在网站的配置文件`_config.yml` 里将 `highlighter` 的值设置为`pygments`。

不久之前，Jekyll 还添加另一个高亮引擎名为 [Rouge](https://github.com/jayferd/rouge)， 

尽管暂时不如 Pygments 支持那么多的语言，但它是原生 [Ruby](https://www.ruby-lang.org/zh_cn/) 程序，而不需要使用 [Python](https://www.python.org/download/) 。 

---

* **一.2)1.安装 Python**

前往 [http://www.python.org/download/](http://www.python.org/download/)
下载合适的 Python windows 安装包，如 Python 2.7.8 Windows Installer。

请注意，Python 2 可能会更合适，因为暂时 Python 3 可能不会正常工作。

安装

	添加安装路径 (如： C:\Python27) 至 PATH。

检验 Python 安装是否成功

	python –V

输出示例：

	Python 2.7.8

---

* **一.2)2.安装 ‘Easy Install’**

浏览 [https://pypi.python.org/pypi/setuptools#installation-instructions](https://pypi.python.org/pypi/setuptools#installation-instructions) 来查看详细的安装指南。

对于 Windows 7 的机器，下载 [ez_setup.py](https://bootstrap.pypa.io/ez_setup.py) 并保存，例如，至C:\。 然后从命令行使用 Python 运行此文件：

	python C:\ez_setup.py

添加 ‘Python Scripts’ 路径 (如： C:\Python27\Scripts) 至 PATH


---

* **一.2)3.安装 Pygments**


确保 easy_install 已经正确安装

	easy_install --version

输出示例：

	setuptools 7.0

使用 “easy_install” 来安装 Pygments

	easy_install Pygments

---

##二.配置

---
* **1.配置_config.yml文件**

在 Jekyll 的配置文件 _config.yml 中设置打开 Pygments

	pygments: true
	mardown: redcarpet

> 注意：新版本 Jekyll 中，`pygments: true` 替换为 `highlighter: pygments`。  

---
* **2.生成css文件**

进到我们的网站目录，运行下面代码生成 Pygments 样式

	$ pygmentize -S default -f html > your/path/pygments.css

---
* **3.导入css文件**

生成的样式文件加到我们的网页中

	<link rel="stylesheet" href="/your/path/pygments.css">

---

##三. 使用

{% raw %}
语法高亮的代码片段要放在标签对 `{% highlight language %}` 和 `{% endhighlight %}` 之间，其中的 language 为[多种语言高亮](http://pygments.org/docs/lexers/)页面中的 Short names。
{% endraw %}

{% raw %}
	{% highlight c %}
	/* hello world demo */
	#include <stdio.h>
	int main(int argc, char **argv)
	{
	    printf("Hello, World!\n");
	    return 0;
	}
	{% endhighlight %}
{% endraw %}


也可以采用这样的写法

	```c
	/* hello world demo */
	#include <stdio.h>
	int main(int argc, char **argv)
	{
	    printf("Hello, World!\n");
	    return 0;
	}
	```

```符号需要markdownx解释引擎，

	markdown: redcarpet
	redcarpet:
		extensions: ["fenced_code_blocks", "tables", "highlight", "strikethrough"]


---

生成的 html 高亮结果  以下结束是使用Pygments 样式的 default 与 vs 的并集样式

C
{% highlight c %}
/* hello world demo */
#include <stdio.h>
int main(int argc, char **argv)
{
    printf("Hello, World!\n");
    return 0;
}
{% endhighlight %}



Java 
{% highlight java %}
package com.pexcn.activity.demo;
import android.app.Activity;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends Activity {
	private static final String TAG = "ActivityDemo";
	
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main);
        Log.e(TAG, "onCreate() start...");
    }
}
{% endhighlight %}

---

##四. Pygments 样式

Pygments 样式 默认提供了 monokai、manni、rrt、perldoc、borland、colorful、default 等等，多种的样式。

可以通过 Python Shell 中用以下命令列出当前 Pygments 支持的样式：

{% highlight python %}
>>> from pygments.styles import STYLE_MAP
>>> STYLE_MAP.keys()
['manni', 'igor', 'xcode', 'vim', 'autumn', 'vs', 'rrt', 'native', 'perldoc', 'borland', 'tango', 'emacs', 'friendly', 'monokai', 'paraiso-dark', 'colorful', 'murphy', 'bw', 'pastie', 'paraiso-light', 'trac', 'default', 'fruity']
>>> 
{% endhighlight %}

通过 -S 来选择，需要生成 monokai 的样式：

	$ pygmentize -S monokai -f html > your/path/pygments.css

下面是 pygments 个各样式 show：

* **monokai**


	![pygments-monokai](/res/img/blog/2014/11/18/pygments-monokai.png)  


* **autumn**


	![pygments-autumn](/res/img/blog/2014/11/18/pygments-autumn.png)  


* **borland**


	![pygments-borland](/res/img/blog/2014/11/18/pygments-borland.png)  


* **bw**


	![pygments-bw](/res/img/blog/2014/11/18/pygments-bw.png)  


* **colorful**


	![pygments-colorful](/res/img/blog/2014/11/18/pygments-colorful.png)  



* **default**


	![pygments-default](/res/img/blog/2014/11/18/pygments-default.png)  


* **emacs**


	![pygments-emacs](/res/img/blog/2014/11/18/pygments-emacs.png)  


* **friendly**


	![pygments-friendly](/res/img/blog/2014/11/18/pygments-friendly.png)  


* **fruity**


	![pygments-fruity](/res/img/blog/2014/11/18/pygments-fruity.png)  


* **manni**


	![pygments-manni](/res/img/blog/2014/11/18/pygments-manni.png)  


* **monokai**


	![pygments-monokai](/res/img/blog/2014/11/18/pygments-monokai.png)  


* **murphy**


	![pygments-murphy](/res/img/blog/2014/11/18/pygments-murphy.png)  


* **native**


	![pygments-native](/res/img/blog/2014/11/18/pygments-native.png)  


* **pastie**


	![pygments-pastie](/res/img/blog/2014/11/18/pygments-pastie.png)  


* **perldoc**


	![pygments-perldoc](/res/img/blog/2014/11/18/pygments-perldoc.png)  


* **rrt**


	![pygments-rrt](/res/img/blog/2014/11/18/pygments-rrt.png)  


* **tango**


	![pygments-tango](/res/img/blog/2014/11/18/pygments-tango.png)  


* **trac**


	![pygments-trac](/res/img/blog/2014/11/18/pygments-trac.png)  


* **vim**


	![pygments-vim](/res/img/blog/2014/11/18/pygments-vim.png)  


* **vs**


	![pygments-vs](/res/img/blog/2014/11/18/pygments-vs.png)  



##参考:

**[http://pygments.org/docs/cmdline/](http://pygments.org/docs/cmdline/)**
