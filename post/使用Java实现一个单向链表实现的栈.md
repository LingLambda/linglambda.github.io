---
title: 使用Java实现一个单向链表实现的栈
date: 2025-07-04 14:53
description: java单向链表实现栈
image: "../public/assets/images/arch1.jpg"
category: 记录
tags:
  - Java
published: true
sitemap: true
---

```java

public class Node<T> {
  public T value;
  public Node<T> next;

  public Node(T value){
    this.value = value;
  }
}

public class LinkListStack<T> {
  public Node<T> head;

  public LinkListStack() {
    head = new Node<>(null);
  }

  public T pop() {
    T v = head.value;
    head = head.next;
    return v;
  }

  public void push(T value) {
    Node<T> node = new Node<T>(value);
    node.next = head;
    head = node;
  }
}

public class Main {
  public static void main(String[] args) {
    LinkListStack<Integer> stack = new LinkListStack<>();
    stack.push(100);
    stack.push(1145);
    while (stack.head.value != null) {
      System.out.println(stack.pop());
    }
  }
}
```

> 栽跟头在这种题上可以抽自己几嘴巴了