---
layout : post
title : "Mac支持NTFS格式"
category : Mac
date : 2017-10-05
tags : [Mac , NTFS,苹果 ]
---


开启流程简介

1. 挂载上你的NTFS硬盘，查看硬盘名称

2. 编辑/etc/fstab文件，使其支持NTFS写入

3. 将/Volumes中的NTFS磁盘快捷方式到Finder

<!-- more -->

详细流程

1.插上硬盘后，查看你的硬盘名称，这里假设名称是 `USB HD`  

2.打开Applications的`Terminal`, 你也可以直接spotlight输入terminal打开   

3.在终端输入`sudo nano /etc/fstab` 敲击回车   

4.现在你看到了一个编辑界面，输入`LABEL=USB\040HD none ntfs rw,auto,nobrowse`后，敲击回车，再`Control+X`，再敲击`Y`，再敲击`回车`  (\040表示空格,如果有多个移动设备则多输入多项)

```python
LABEL=USB\040HD none ntfs rw,auto,nobrowse
LABEL=ComtuUseHD none ntfs rw,auto,nobrowse
```

5.此时，退出你的移动硬盘，再重新插入，你会发现磁盘没有显示再桌面或是Finder之前出现的地方，别慌   

6.打开Finder，`Command+Shift+G`，输入框中输入`/Volumes`，回车，你就可以看到你的磁盘啦！是可以读写的.   

7.方便起见，你可以直接把磁盘拖到Finder侧边栏中，这样下次使用就不用进入到/Volumes目录打开了


(注: 以上操作在使用OS X EI Capitan 版本10.11.6 成功)

**内容摘自**:

[如何将 Mac 里的文件复制到 NTFS 格式的移动硬盘里？](https://www.zhihu.com/question/19571334)
[Mac下挂载NTFS移动硬盘的可写入方法（更新NTFS分区dirty的修复方法）](https://segmentfault.com/a/1190000005850790)





