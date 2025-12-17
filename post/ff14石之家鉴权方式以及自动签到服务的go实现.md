---
title: ff14石之家鉴权方式以及自动签到服务的go实现
date: 2025-12-17 10:12
description: 本文记录石之家论坛使用的接口鉴权技术，尽量让草履虫开发都能看懂。
image: "../public/assets/images/arch1.jpg"
category: 记录
tags:
  - 石之家
  - ff14
  - 爬虫
  - 自动签到
published: true
sitemap: true
---

## 鉴权

石之家论坛的鉴权机制很简单，两个点：临时token 和 user-agent

在石之家登录后，你的 cookie 里会多一大坨你的相关信息，

```txt
userinfo=userid=xxxxxxx-xxxxxxxxxxx-xxxxxxxxx&siteid=xxx-08132-01; hasAdsr=1; ff14risingstones=s%xxxxxxx.xxxxxx%xxxxxxxx; NSC_JOyjyufgb1jqla5dwyzke3dddubgec0=xxxxxxxxxxxxx; sdo_dw_track=xxxxxxx==; CAS_LOGIN_STATE=0; SECURE_CAS_LOGIN_STATE=0; __wftflow=558033295=1
```

乍一看可能会一脸懵，但真正与鉴权相关的只有 ff14risingstones，ff14risingstones 的值即上文中的 临时token。

然后是 user-agent，即用户代理，简单来说是你的浏览器标识，这个标识是由你使用的系统和浏览器版本决定的，比如你使用 MacOS 上的 Firefox 浏览器，这个值就可能是 `Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:145.0) Gecko/20100101 Firefox/145.0`。

请注意：**user-agent 和 临时token 具有绑定关系。**

登录获取的 临时token 是和登录浏览器的 user-agent 绑定的，请求鉴权时，会校验 user-agent 与 临时token 是否对应，**如不对应则会鉴权失败**。

cookie 和 user-agent 会在请求头中一齐发送到石之家的服务端，所以我们伪造请求时候，只需要在请求头中加入你的 user-agent 和 cookie，cookie 中只需要 ff14risingstones 一个字段即可

curl 示例：

```shell
curl 'https://apiff14risingstones.web.sdo.com/api/home/GHome/isLogin?tempsuid=e8c5be6f-13ab-44a9-aba6-a5df4d989a23' \
  -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:145.0) Gecko/20100101 Firefox/145.0' \
  -H 'Cookie: ff14risingstones=s%3AY3WkasdgfzgasR_fpDswrxUhZGAiFaX.chlwL0fwigSDG22GmE0eOQadvOJGasf2Qqm%2F9Q' \
```

> 请注意，如果你在不同的设备上登录石之家，之前获取的 临时token 会立刻失效。

## 请求结构

有想要的接口可以直接用浏览器 f12 -> 网络 -> 右键复制为curl命令，一般看 Query 参数和 Body 参数即可。

比如 `/api/home/sign/signRewardList` 这个接口，是个GET接口，可以抓到 Query 参数

再比如 `/api/home/sign/signRewardList` 这个接口，是个POST接口，可以抓到 Body 参数

以上只是一些例子，具体可在浏览器自由探索。

## 碎碎念

GET接口有些时候会携带 tempsuid，根据形状可以判断出是 uuid4 ，猜测是石之家用来做错误追踪的，咱们用uuid库随机生成一个即可（甚至不传这个字段也没任何影响，但是出于尊重还是传了比较好）。

点名表扬下石之家的开发，接口相当的规范整洁，并且几乎没有什么并发限制，我喜欢你你喜欢我。

另外声明，编写本文的最终目的只是互联网开发学习交流。

相关技术交流代码可见：[llmaget](https://github.com/LingLambda/go-llmaget)
