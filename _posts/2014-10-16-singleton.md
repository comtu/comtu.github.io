---
layout: post
category : 设计模式
tagline: "Head First"
tags : [设计模式]
---
{% include JB/setup %}


设计模式就是一帮人总结出来用来解决特定问题的固定的解决方案。

	 1. new关键字永远在堆内存中创建新的对象
	 2. ==如果比较的是两个对象的引用变量，其实比较的是两个引用变量指向的对象的堆内存地址
	 3. 如果按照原来的描述类的方式，一个类无法实现单例的设计模式
	    因为任何的使用者可以通过new关键字任意的创建多个对象。

 单例的设计模式：

	问题：可以通过new关键字调用构造函数对类的对象进行初始化	
		单例中如果解决了无法对创建的对象进行初始化，那么就不会将对象赋值给引用变量。
		(保持对象的唯一性)

单例的实现步骤：

	私有化构造函数 ， 禁止直接通过构造函数创建实例
	在类中自定义一个对象
	对外提供该对象的公共访问方式

单例的实现有两中模式

	1. 饿汉式  存在对象生命周期过长问题
	2. 懒汉式  存在线程安全问题,使用线程后推荐使用

例:饿汉式:

	class Service{
		// 1. 提供显示的私有的构造函数
		private Service(){}
		// 2. 定义一个该类的引用变量并调用构造函数初始化非静态成员属性
		private static Service service = new Service();  //饿汉式单例
		// 3. 对单例的对象进行封装
		public static Service getInstance(){
		  return service;
		}
		// 提供服务
		public void getService(){
		   System.out.println( "提供服务........" );
		}
	}

例:懒汉式:

	class Service2{
		// 1. 提供显示的私有的构造函数
		private Service2(){}
		// 2. 定义一个该类的引用变量并调用构造函数初始化   非静态成员属性
		private static Service2 service = null;  // 懒汉式单例
		// 3. 对单例的对象进行封装
		public  static Service2 getInstance(){	//需要用到的时候进行调用
			if(service == null ){
				synchronized(Service2.class ){
					if(service == null ){
						synchronized(Service2.class ){	//线程同步
							if(service == null){
								service = new Service2 ();
							}
						}
					}
				}
			}
		  return service;
		}
		// 提供服务
		public void getService(){
		   System.out.println( "提供服务........" );
		}
	}

调用测试

	class Demo{
		public static void main(String[] args){
			Service2 s1 =  Service2.getInstance();
			Service2 s2 =  Service2.getInstance();
			System.out.println( s1 == s2 );
		}
	}
