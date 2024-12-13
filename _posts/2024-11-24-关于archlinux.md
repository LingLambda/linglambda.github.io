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

检查是否安装了`linux-headers`，`alsa-firmware`，一些较新型号
的笔记本电脑（2019年底/2021）需要`sof-firmware` 和
`alsa-ucm-conf`，它们使用 Sound Open Firmware
提供的固件实现驱动程序。安装完成后重启电脑。
[来源](https://wiki.archlinuxcn.org/wiki/ALSA#%E6%8E%92%E9%99%A4ALSA%E6%95%85%E9%9A%9C)

## 3. qq中无法使用fcitx输入法

编辑 /usr/bin/linuxqq 在该启动脚本第一行加上

`export GTK_IM_MODULE=fcitx`

## 4. “电源管理方案”无法调整，调整会回弹回平衡

安装 `powerdevil`包和`power-profiles-daemon`包，
启动`power-profiles-daemon`的systemd服务
（`systemctl enable power-profiles-daemon`）然后重启  
[archlinux-电源管理](https://wiki.archlinuxcn.org/wiki/%E7%94%B5%E6%BA%90%E7%AE%A1%E7%90%86)

## 5. 使用wqy-microhei时，韩文字体堆叠在一块，不正常显示

该字体有缺陷，安装`wqy-microhei-kr-patched `(aur)字体包可修复

> 持续更新
