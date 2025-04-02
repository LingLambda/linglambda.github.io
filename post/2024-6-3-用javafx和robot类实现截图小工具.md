---
layout: post
title: 用javafx和robot类实现截图小工具（未完待续）
date: 2024-6-3 22:31
description: 用javafx和robot类实现截图小工具
category: 编程
tags:
- java
- javafx
published: true
sitemap: true
---



截图操作

首先初始化类和定义组件变量

`Robot robot=new Robot();`

需要使用一个工具类Toolkit,因为Toolkit是私有的,且没有子类,所以我们只能通过内置的getDefaultToolkit()方法获取它

`Toolkit toolkit=Toolkit.getDefaultToolkit();`

然后我们就可以通过Toolkit的gitScreensize()方法获取屏幕宽高

`Dimension screenSize = toolkit.getScreenSize();`

将宽高赋值到变量中

```java
int width=screenSize.width;
int height=screenSize.height;
```

使用robot的createScreenCapture()方法截图并接受它的返回图片到BufferedImage 类型里

`BufferedImage screenCapture = robot.createScreenCapture(new Rectangle(width, height));`

我们在应用中定义了一个ImageView控件,可以显示我们截图后的图片预览,但这个控件只能显示javafx里面的Image,所以我们需要将之前获取到java.awt.Image中的image(也就是前文的BufferedImage )转换为javafx里的image(WritableImage)

`WritableImage fxImage = SwingFXUtils.toFXImage(screenCapture, null);`

上面转换使用了SwingFXUtils这个类属于 javafx.embed.swing.SwingFXUtils ,这个类是默认不自带的,所以需要我们在maven里添加

```xml
<!– https://mvnrepository.com/artifact/org.openjfx/javafx-swing –>
<dependency>
<groupId>org.openjfx</groupId>
<artifactId>javafx-swing</artifactId>
<version>17.0.6</version>
</dependency>
```

然后就可以愉快的将它显示在imageview中了(这里的iv是ImageView类型,已经提前声明在Controller中了)

`iv.setImage(fxImage);`

运行后我们会发现,截图工具把自己的窗口也截进去了,为了解决这个问题,我们首先在Application类中声明我们的舞台

```java
public static Stage startup_stage=null;
startup_stage=stage;
```

然后在截图事件触发时调用如下方法,这样我们程序主窗口就隐藏起来了

`Application.startup_stage.hide();`

在截图完成后使用如下方法重新显示窗口

`HelloApplication.startup_stage.show();`

未完待续..
