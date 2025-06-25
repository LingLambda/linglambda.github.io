---
title: Java相关小知识点记录
date: 2025-06-25 10:35
description: Java 知识点太多太多了，手写记录理解一下印象更深刻
# image: "../public/assets/images/arch1.jpg"
category: 记录
tags:
  - Java
published: true
sitemap: true
---

## 1.重写 equals 时为什么一定要重写 hashCode

`equals` 和 `hashCode` 方法用来协同判断两个 `Object` 是否相等。假如只重写了 `equals`，乍一看方法是可以正确判断对象是否相等的，但当对象被 `HashMap`，`HashSet`等集合使用时，就会出现问题。

比如 `HashMap.get()` 会无法根据哈希找到存在的 key 对应的元素， `HashSet` 无法自动去重。所以务必记得使用 `Objects.hash()` 方法对 `hashCode()` 方法进行重写。

## 2.String、StringBuilder、StringBuffer 的区别和使用场景

性能上，`StringBuilder` > `StringBuffer` > `String`，在需要较多的对字符串进行拼接等操作时，仅使用 `String` 会严重拖慢运行速率。更好的实践是使用后两者。

而后两者的区别在于：StringBuffer 的很多方法带有 `synchronized` 关键字，具有线程安全的特性， `StringBuilder` 则不具有，假如是多线程使用场景，更推荐使用 `StringBuffer` 。

## 3.Java 中的四种引用类型：强引用、软引用、弱引用、虚引用

除了强引用，剩下的三种引用都对应下面几种 Java 类

|                                |        |
| ------------------------------ | ------ |
| java.lang.ref.SoftReference    | 软引用 |
| java.lang.ref.WeakReference    | 弱引用 |
| java.lang.ref.PhantomReference | 虚引用 |

### 强引用

最常见的， `Object obj = new Object();` 这个 obj 就是一个强引用对象，当其存在时，永远不会被垃圾回收器回收。当对象出作用域，或你手动将其 `obj = null;` 时，其才会解除强引用状态，从而可被垃圾回收器回收。

### 软引用

软引用用来描述一些有用但非必须的对象，通常情况不会被 JVM 回收，但当内存不足时，软引用对象会被 JVM 回收。调用`System.gc()`（手动执行一次垃圾回收）函数不会回收软引用对象。

### 弱引用

弱引用也用来描述一些非必须的对象，是对于软引用更弱的引用关系，当垃圾回收器扫描到弱引用对象时，弱引用对象会被直接回收，同理`System.gc()`会直接回收弱引用对象。

典型例子是 `WeakHashMap` 类， `WeakHashMap` 是一个基于弱引用键的 Map 实现， `WeakHashMap` 的 key 是被 `WeakReference<K>` 包装的。在 `HashMap` 对象的某个键设为 null 时，对应的键值对不会被垃圾回收器回收，但 `WeakHashMap` 对象的某个键设为 null 时，对应的键值会被垃圾回收器回收。

### 虚引用

虚引用是最弱的引用关系，必须配合 `ReferenceQueue` （引用队列）使用才有意义。虚引用一般用来检测对象存活状态，当对象被回收时，可以从引用队列中获取通知，从而实现一些对象回收后的操作。相较于 `finalize()` ，虚引用是一种更可靠，性能更好的回调触发方式。

## 4.会使 Sql 索引失效的情景

- 使用 or 连接词连接了非索引列。
- 在 where 中使用了函数或算术运算，表达式。
- 使用了模糊查询。
- 使用了 NULL 值比较。
- 索引字段重复值过多，查询优化器可能选择全表扫描。
- 数据类型转换，查询条件与索引数据类型不一致时会发生强制类型转换导致索引失效。

## 5.创建对象的方法

- `new`关键字。
- 反射机制中的 `Class.newInstance()`。
- 反射机制中的 `Constructor.newInstance()`
- 实现`Cloneable`接口并重写`clone()`方法。
- 反序列化过程中产生的对象。

## 6.抽象类和接口的区别

### 定义

- 抽象类不能被实例化，可以包含实现和抽象方法。
- 接口只定义行为规范（方法签名），Java8 之后可包含默认实现。

| 比较维度             | 抽象类                           | 接口                                |
| -------------------- | -------------------------------- | ----------------------------------- |
| 是否可实例化         | 不可                             | 不可                                |
| 是否可包含构造函数   | 是                               | 不                                  |
| 是否可定义字段       | 可定义成员变量（包括静态和实例） | 只能定义 `public static final` 常量 |
| 是否支持多继承       | 只能继承一个抽象类               | 支持多个接口实现                    |
| 是否可包含方法实现   | 可以（抽象 + 普通方法）          | Java 8+ 支持 `default` 方法         |
| 成员方法修饰符默认   | 默认 `protected/public`          | 默认 `public abstract`              |
| 是否可以定义静态方法 | 可以                             | Java 8+ 可以                        |
| 继承方式             | `extends`                        | `implements`                        |
| 适合描述             | **“是什么”**（比如父类）         | **“能做什么”**（比如能力/规范）     |
