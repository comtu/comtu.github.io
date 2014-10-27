---
layout : post
title : "Jekyll中的语法高亮:Pygments"
category : Jekyll 
duoshuo: true
date : 2014-10-18
---
<!-- more -->
******


在安装成功Jekyll环境的情况下.

##安装Pygments

Jekyll 里默认的语法高亮插件是 [Pygments](http://pygments.org/)。<br />
它需要安装 Python 并在网站的配置文件_config.yml 里将 highlighter 的值设置为pygments。

不久之前，Jekyll 还添加另一个高亮引擎名为 [Rouge](https://github.com/jayferd/rouge)， 尽管暂时不如 Pygments 支持那么多的语言，但它是原生 Ruby 程序，而不需要使用 Python。 更多信息请点此关注。

---

* ###1.安装 Python

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

* ###2.安装 ‘Easy Install’

浏览 [https://pypi.python.org/pypi/setuptools#installation-instructions](https://pypi.python.org/pypi/setuptools#installation-instructions) 来查看详细的安装指南。

对于 Windows 7 的机器，下载 [ez_setup.py](https://bootstrap.pypa.io/ez_setup.py) 并保存，例如，至C:\。 然后从命令行使用 Python 运行此文件：

	python C:\ez_setup.py

添加 ‘Python Scripts’ 路径 (如： C:\Python27\Scripts) 至 PATH


---

* ###3.安装 Pygments


确保 easy_install 已经正确安装

	easy_install --version

输出示例：

	setuptools 7.0

使用 “easy_install” 来安装 Pygments

	easy_install Pygments

{% highlight java %}
public class Activity extends ApplicationContext {
	protected void onCreate(Bundle savedInstanceState);
	protected void onStart();
	protected void onRestart();
	protected void onResume();
	protected void onPause();
	protected void onStop();
	protected void onDestroy();
}
{% endhighlight %}
