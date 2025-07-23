---
title: Java相关小知识点记录
date: 2025-06-25 10:35
description: Java 知识点太多太多了，手写记录理解一下印象更深刻
# image: "../public/assets/images/arch1.jpg"
category: 记录
tags:
  - Java
published: false
sitemap: false
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
- 使用了模糊查询，除了 like% 值 , 百分号在右边时可以命中索引
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

## 7.Vue 有哪些钩子函数

| Vue2          | Vue3            | 调用时机                                     |
| ------------- | --------------- | -------------------------------------------- |
| beforeCreate  | (setup 前)      | 实例刚创建，data 和 methods 还未初始化       |
| created       | (setup 中)      | 实例已创建，data 可访问，适合发起初始请求    |
| beforeMount   | onBeforeMount   | 模板编译完成还未挂载，$el 不可操作           |
| mounted       | onMounted       | DOM 挂载完成，适合操作 DOM、调用第三方库     |
| beforeUpdate  | onBeforeUpdate  | 响应式数据变更后、DOM 更新前触发             |
| updated       | onUpdated       | DOM 更新后；注意避免死循环（不建议修改数据） |
| beforeDestroy | onBeforeDestroy | 组件销毁前，适合清理定时器、事件等资源       |
| destroyed     | onDestroyed     | 组件已完全销毁，所有绑定解绑                 |
| errorCaptured | onErrorCaptured | 子组件出错时                                 |
| activated     | onActivated     | keep-alive 组件重新激活时                    |
| deactivated   | onDeactivated   | keep-alive 组件被挂起时                      |

## 8.MySQL的case when函数用法

```sql
# 简单 CASE 表达式
CASE 表达式
    WHEN 值1 THEN 结果1
    WHEN 值2 THEN 结果2
    ...
    ELSE 默认结果
END

SELECT name,
    CASE gender
        WHEN 'M' THEN '男'
        WHEN 'F' THEN '女'
        ELSE '未知'
    END AS gender_text
FROM users;

# 搜索型 CASE WHEN
CASE
    WHEN 条件1 THEN 结果1
    WHEN 条件2 THEN 结果2
    ...
    ELSE 默认结果
END

SELECT name,
    CASE
        WHEN score >= 90 THEN '优秀'
        WHEN score >= 60 THEN '及格'
        ELSE '不及格'
        END AS grade
FROM student
```

## 9.SQL中的事务隔离级别

### 隔离级别

- READ_UNCOMMITTED：读未提交，可能出现脏读。
- READ_COMMITTED：读提交，解决了脏读，可能出现不可重复读。
- REPEATABLE_READ：可重复读，解决不可重复读，可能出现幻读。
- SERIALIZABLE：串行化，解决了可重复读，但效率很低。

### 可能的异常读取

- 脏读：A事务修改了数据，还没提交，此时B事务去读取数据，读到了A还没提交的数据，然后A回滚了，此时B读取的数据是错误的(脏读)。
- 不可重复读：A事务查询了一次数据，中途B事务修改了A查询后的数据，A事务在此之后又读取了一次，发现两次查询的结果不一样(不可重复读)。
- 幻读：A事务查询了一次数据，中途B事务在A查询后的数据中新增了数据，A事务在此之后又读取了一次，发现多了数据（幻读）。

## 10.Spring中的事务

### 事物的隔离级别

Spring的事务隔离机制相比SQL的隔离级别多了一个Default，即使用数据库默认的隔离级别

### 事务的传播机制

事务的传播机制即包含多个事务的方法在相互调用时，事务是如何在这些方法之间传播的。

事务传播机制使用@Transactional(propagation.REQUIRED)来设置。

传播机制有以下几种枚举：

#### 支持当前事务

- REQUIRED：事务的默认传播级别，表示如果当前存在事务，则加入该事务；如果没有事务，则创建一个新的事务。
- SUPPORTS：如果当前存在事务，则加入该事务；如果没有事务则以非事务方式运行。
- MANDATORY：使用当前的事务，如果当前没有事务，就抛出异常。

#### 不支持当前事务

- REQUIRES_NEW：新建事务执行，如果当前存在事务，把当前事务挂起。
- NOT_SUPPORTED：以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
- NEVER：以非事务方式执行，如果存在当前事务，则抛出异常。

#### 嵌套事务

- NESTED：如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则执行与REQUIRED类似的操作。

## 11.SQL中的索引

### 索引的作用

索引可以显著提升大数据量下的查找速度。

### 如何建立索引

单列索引

```sql
ALTER TABLE students
ADD INDEX idx_score(score);
```

多列索引

```sql
ALTER TABLE students
ADD INDEX idx_name_score (name, score);
```

### 什么情况下不应建立索引

索引基于Hash，如果一个列存在大量相同的值（如性别枚举），索引无法起到有效的效率优化作用。

### 创建多个索引

创建多个索引可以有效提高查询效率，但对于经常需要修改的列来说，每次新增修改删除时都需要同步修改索引，反而会拖慢速度。

### 如何检查索引是否生效

在查询语句前使用`EXPLAIN`语句

```sql
EXPLAIN SELECT * FROM your_table WHERE some_column = 'xxx';

```

可能会有以下输出

| key        | type | rows | Extra       |
| ---------- | ---- | ---- | ----------- |
| `idx_name` | ref  | 10   | Using index |

其中，主要看Extra和type列。Extra显示索引的使用情况，type列表示索引的使用效率。其次，当key为NULL，type为ALL，Extra含Using file sort时，表示未使用索引，rows很大时，表示扫描行数过多，效率较差。

| type 值   | 含义                     |
| -------- | ---------------------- |
| `system` | 表只有一行（常数）              |
| `const`  | 使用主键或唯一索引查询单行          |
| `eq_ref` | 使用主键/唯一索引做 join 查询     |
| `ref`    | 使用普通索引等值匹配             |
| `range`  | 范围查询，如 `BETWEEN` / `<` |
| `index`  | 全索引扫描（没过滤，但没走全表）       |
| `ALL`    | **全表扫描（索引无效）**         |

## 12.卡夫卡相关

## 13.多线程如何实现同步

### synchronized 实现同步

多线程运行状态下，要保证逻辑正确，对共享变量进行读写时，必须保证一组指令以原子方式执行。

保证一段代码的原子性可通过加锁和解锁实现，在Java程序中使用`synchronized`关键字对对象进行加锁：

```java
synchronized(lock) {
    n = n + 1;
}
```

`synchronized`保证了在任意时刻最多只有一个线程能执行。

一个基本的多线程执行例子

```java
public class Main {
    public static void main(String[] args) throws Exception {
        var add = new AddThread();
        var dec = new DecThread();
        add.start();
        dec.start();
        add.join();
        dec.join();
        System.out.println(Counter.count);
    }
}

class Counter {
    public static final Object lock = new Object();
    public static int count = 0;
}

class AddThread extends Thread {
    public void run() {
        for (int i = 0; i<10000; i++) {
            synchronized(Counter.lock) {
                Counter.count += 1;
            }
        }
    }
}

class DecThread extends Thread {
    public void run() {
        for (int i=0; i<10000; i++){
            synchronized(Counter.lock) {
                Counter.count +=1;
            }
        }
    }
}
```

在组之间不存在竞争时，应当使用两个不同的锁以提升效率。

### 不需要synchronized的操作

JVM规范定义了几种原子操作：

- 基本类型赋值（除了`long`和`double`），如`int n = m`
- 引用类型赋值，例如`List<String> List = anotherList`

为什么唯独是`long`和`double`不算？因为`long`和`double`是64位数据类型，现代cpu大多数可以对32位数据类型进行原子读写操作，但对于64位变量，在32位JVM上可能需要分两次进行（高32位和低32位）。所以其他线程可能会看到“写了一半”的值。

想要让`long`和`double`拥有原子性操作，可以使用`volatile`保证改变量的读写是原子性操作：

```java
volatile long counter;
```

或者在另一种情况，即64位JVM（现在大多都是）上，`long`和`double`属于原子操作，不需要额外加上`volatile`关键字。

如果操作属于上述基本的原子操作，就不需要使用`synchronized`来实现同步了。

如果操作的对象属于不可变对象，同样也不用担心同步问题。

## 16.上线的项目出现oom之后，如何仅使用命令行诊断

### 1.通过JVM日志判断OOM类型

### 2.查看当前Java进程信息 `jps`

```bash
jps -l
```

会输出类似于 `<pid> [类名]`:

```bash
123321 com.example.MyApp
```

### 3.获取内存快照（Heap Dump）

在Java启动时加上`-XX:+HeapDumpOnOutOfMemoryError`和`-XX:HeapDumpPath`，JVM会自动在OOM时生成`.hprof`文件。

或是手动生成：

```bash
jmap -dump:format=b,file=heapdump.hprof <pid>
```

### 4.检查堆内存调用情况

```bash
jstat -gc <pid> 1000 5
```

### 5.查看对象占用情况

```bash
jmap -histo:live <pid> | head -n 50
```

输出类似：

```bash
num     #instances         #bytes  class name
----------------------------------------------
1:      102400             8192000 java.lang.String
2:      10240              4096000 [I
3:      2048               2048000 java.util.HashMap
```

可观察是否有对象存在异常占用。

### 6.查看线程是否正常

```bash
top -H -p <pid>
```

或者

```bash
ps -eLf | grep <pid> | wc -l
```

查看线程数是否异常

### 7.使用可视化监控

在有图形界面时可使用`jconsole`查看堆内存使用情况和Full GC情况