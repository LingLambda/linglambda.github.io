---
layout: post
title: 关于archlinux
date: 2024-11-24 19:28
description: 在使用archlinux时遇到的一些问题和解决方案
image: "../images/arch1.jpg"
category: 记录
tags:
- Linux
- GNU/Linux
- archlinux
published: true
sitemap: true
---


## 1. nvidia，nvidia-open驱动都无法调用显卡

如果你不是`linux`内核或者`linux-lts`内核，你需要安装`linux-dkms`

## 2. 检测不到音频设备，音频无声

检查是否安装了`linux-headers`，如果是其他内核，以zen内核举例，
安装`linux-zen-headers`

## 3. qq中无法使用fcitx输入法

编辑 /usr/bin/linuxqq 在该启动脚本第一行加上

`export GTK_IM_MODULE=fcitx`

## 4. “电源管理方案”无法调整，调整会回弹回平衡

安装 `powerdevil`包和`power-profiles-daemon`包，
启动`power-profiles-daemon`的systemd服务（`systemctl enable power-profiles-daemon`）然后重启  
[archlinux-电源管理](https://wiki.archlinuxcn.org/wiki/%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86)


> 持续更新
