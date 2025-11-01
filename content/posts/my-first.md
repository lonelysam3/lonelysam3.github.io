---
title: 'Hugo + PaperMod + Github Pages 搭建一个完善的个人博客(以 Windows11 为例)'
date: 2025-03-02T11:01:38+08:00
categories: ["日记"]
tags: ["Github","博客"]
---

第一次做个人博客啊

先简单说一下各种教程

首先百度上搜出来的教程大概率是无效或者过时的，即使它看起来离现在很近

比如这个教程：

[在github.io用hugo部署个人博客，2023新教程 - 知乎](https://zhuanlan.zhihu.com/p/649542248)

最后编辑时间是2025年1月，但是所介绍的方法是无效的，实操后发现各hugo模板的安装方式不尽相同，所以需要改变策略针对一个模板找寻方法

[Hugo + PaperMod + Github Pages 搭建一个完善的个人博客 | LFL's Blog](https://lflmlxy.github.io/posts/create-blog/#1-前言)

这个是我实测找到的有效教程，但还要注意一些问题：

1.dev/hugo.yaml里有一个参数重复了，需要手动注释，如图所示：

![image-20251101182154321](C:\Users\LonelySam8\AppData\Roaming\Typora\typora-user-images\image-20251101182154321.png)

![image-20251101182230276](C:\Users\LonelySam8\AppData\Roaming\Typora\typora-user-images\image-20251101182230276.png)

2.文中提到的.gitignore等文件都是在visual code里新建文件，粘贴代码再以.gitignore格式保存，使用.txt改后缀名会无法读取

现在还存在一些问题:

1.域名无法绑定，cname记录绑定的域名报404

2.页面太丑

什么时候来解决一下吧

