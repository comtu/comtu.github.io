---
layout : post
title : "单例设计模式"
category : 设计模式
duoshuo: true
date : 2014-10-20
tags : [设计模式 , 单例设计模式 , Singleton , 饿汉式 , 懒汉式 , Double-checked locking , 双重检查锁定]
---


# 单例设计模式

**意图**

	保证一个类仅有一个实例，并提供一个访问它的全局访问点。

**适用性**

	当类只能有一个实例而且客户可以从一个众所周知的访问点访问它时。
	当这个唯一实例应该是通过子类化可扩展的，并且客户应该无需更改代码就能使用一个扩展的实例时。

<!-- more -->

**单例的设计模式**

	问题：可以通过new关键字调用构造函数对类的对象进行初始化	
		单例中如果解决了无法对创建的对象进行初始化，那么就不会将对象赋值给引用变量。
		(保持对象的唯一性)

**单例的实现步骤**

	私有化构造函数 ， 禁止直接通过构造函数创建实例
	在类中自定义一个对象
	对外提供该对象的公共访问方式

**单例的一般实现有两中模式**

> 1. `饿汉式`  指全局的单例实例在类装载时构建。(存在对象生命周期过长问题)    
> 2. `懒汉式`  指全局的单例实例在第一次被使用时构建。(存在线程安全问题,使用锁后推荐使用)     
> 3. `内部类`  
> 4. `枚举`  

例:

**饿汉式**

```java
public class SingletonHungry{	//饿汉式
	// 1. 提供显示的私有的构造函数
	private SingletonHungry(){}
	// 2. 定义一个该类的引用变量并调用构造函数初始化非静态成员属性
	private static SingletonHungry instance = new SingletonHungry();  //饿汉式单例
	// 3. 对单例的对象进行封装
	public static SingletonHungry getInstance(){
	  return instance;
	}
	// 提供服务
	public void getService(){
	   System.out.println( "提供服务........" );
	}
}
```

---

**懒汉式**


```java
public class SingletonLazy1{ //懒汉式 _ 双重检查锁定
	// 1. 提供显示的私有的构造函数
	private SingletonLazy1(){}
	// 2. 定义一个该类的引用变量并调用构造函数初始化   非静态成员属性
	private static SingletonLazy1 instance = null;  // 懒汉式单例
	// 3. 对单例的对象进行封装
	public  static SingletonLazy1 getInstance(){	//需要用到的时候进行调用
		if(instance == null ){//查看是否有实例,有则直接返回
			synchronized(SingletonLazy1.class ){//多线程操作,有可能会出现多个线程同时必发范围_加锁.
				if(instance == null ){
					synchronized(SingletonLazy1.class ){	//线程同步
						if(instance == null){
							instance = new SingletonLazy1 ();
						}
					}
				}
			}
		}
	  return instance;
	}
	// 提供服务
	public void getService(){
	   System.out.println( "提供服务........" );
	}
}
```

---

```java
public class SingletonLazy2{  // 双重检查锁定 
	//注意在JDK1.4以及更早版本的Java中许多JVM对于 volatile 关键字的实现会导致双重检查加锁失效,此种方法只能用在JDK5及以后版本
	private volatile static SingletonLazy2 UNIQUE_INSTANCE; //注意 volatile 关键字

	private SingletonLazy2(){}

	public static SingletonLazy2 getInstance(){
		if(UNIQUE_INSTANCE == null){
			synchronized(SingletonLazy2.class){
				if(UNIQUE_INSTANCE == null){
					UNIQUE_INSTANCE = new SingletonLazy2();
				}
			}
		}
		return UNIQUE_INSTANCE;
	}
}

```

---

**内部类**

```java
public class SingletonInnerClass {  //内部类
    private static class SingletonHolder {  
	private static final SingletonInnerClass INSTANCE = new SingletonInnerClass();  
    }  
    private SingletonInnerClass (){}  
    public static final SingletonInnerClass getInstance() {  
	 return SingletonHolder.INSTANCE;  
    }  
}  
```


---

**枚举**


```java
public enum SingletonEnum {   //枚举
    INSTANCE;  
    public void whateverMethod() {  
    }  
} 
```

---

```java
class Demo { //调用测试
	public static void main(String[] args) {
		SingletonLazy2 s1 =  SingletonLazy2.getInstance();
		SingletonLazy2 s2 =  SingletonLazy2.getInstance();
		System.out.println( s1 == s2 );
	
		

		SingletonEnum.INSTANCE.whateverMethod();//枚举
	}
}
```




**参考文档链接**

[“双重检查锁定"会发生非预期行为声明](http://www.cs.umd.edu/~pugh/java/memoryModel/DoubleCheckedLocking.html)

[深入浅出单实例Singleton设计模式](http://blog.csdn.net/haoel/article/details/4028232)

[单例模式的七种写法](http://cantellow.iteye.com/blog/838473)

[枚举增强单例模式的可靠性](http://blog.csdn.net/java2000_net/article/details/3983958#)
