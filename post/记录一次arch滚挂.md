---
title: 记录一次arch滚挂
date: 2025-02-14 09:35
description: arch于2025-02-14滚挂了：`can't access tty job control turned off`，望周知
category: 记录
tags:
  - ArchLinux
published: true
sitemap: true
---

## 1.起因

arch 可能有两个月没滚，今天突然想滚一下。于是......

![gungua1](../public/assets/images/gungua1.jpg)

![gungua2](../public/assets/images/gungua2.jpg)

因为 gem 包滚失败了。我想着滚了一部分包了应该已经，所以重启了下，然后就这样了。

![gungua3](../public/assets/images/gungua3.jpg)

## 2.解决

根据 [csdn](https://blog.csdn.net/nangonggoudan/article/details/126813206) 发现是很常见的问题。

**磁盘检测不能通过**，于是一行命令解决:

```shell
fsck -y /dev/sda3  #这里写系统提示的分区
```

![gungua4](../public/assets/images/gungua4.jpg)

再次重启就完事了。
