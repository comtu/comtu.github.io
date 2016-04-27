---
layout : post
title : "Java线程可见性"
category : Java
duoshuo: true
date : 2014-12-15
tags : [synchronized,volatile ,ReentrantLock, 原子性,可见性,重排序]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark

---


目录:

	1. 共享变量在线程间的可见性
		1.1 Java内存模型(JMM)
		1.2 共享变量可见性实现的原理
		1.3 重排序
		1.4 as-if-serial语义

	2. synchronized实现可见性

	3. volatile实现可见性
		3.1 volatile适用场景
	4. synchoronized和volatile比较

<!-- more -->

---

# 共享变量在线程间的可见性 
	
	可见性:一个线程对共享变量值的修改,能够及时地被其他线程看到.
	共享变量: 如果一个变量在多个线程的工作中都存在副本,那么这个变量就是这个几个线程的共享变量.

## Java内存模型(JMM)
	
	Java内存模型(Java Memory Model)描述了Java程序中各种变量(线程共享变量)的访问规则,   
	以及在JVM中将变量存储到内存和从内存中读取出变量这样的底层细节.
	> 所有的变量都存储在主内存中
	> 每个线程都有自己独立的工作内存,里面保存该线程使用到的变量的副本(主内存中该变量的一份拷贝)



	线程1         线程2     线程3    
	↑↓             ↑↓         ↑↓    
	-------------------------------------    
	工作内存1  工作内存2   工作内存3    
	x的副本1   x的副本2    x的副本3    
	↑↓              ↑↓        ↑↓    
	-------------------------------------    
	        主内存   
	       共享变量x    

	两条规定
		
		> 线程对共享变量的所有操作都必须在自己的工作内存中进行,不能直接从主内存中读写
		> 不同线程之间无法直接访问其他线程工作内存中的变量,线程间变量值的传递需要通过主内存来完成.

## 共享变量可见性实现的原理
	
	线程1对共享变量的修改要想被线程2及时看到,必须要经过如下2个步骤:
	> 把工作内存1中更新过的共享变量刷新到主内存中
	> 将主内存中读取共享变量的值工作内存2中.


要实现共享变量的可见性,必须保证两点:

	> 线程修改后的共享变量值能够及时从工作内存刷新到主内存中
	> 其他线程能够及时把共享变量的最新值从主内存更新到自己的工作内存中.
	

## 重排序

	> 重排序:代码书写的顺序与实际执行的顺序不同,指令重排序是编译器或者处理器为了提高程序性能而做的优化
		1.编译器优化的重排序(编译器优化)
		2.指令级并行重排序(处理器优化)
		3.内存系统的重排序(处理器优化)


	例如:
		代码顺序:
		int number = 1
		int result = 0

		有可能执行顺序:
		int result = 0
		int number = 1

## as-if-serial

	无论如何重排序,程序执行的结果应该与代码顺序执行结果一致
	(Java编译器,运行时和处理器都会保证Java在单线程下遵循as-if-serial语义
	
	例如:
	int num1 = 1;//第1行代码
	int num2 = 2;//第2行代码
	int sum = num1+num2;//第3行代码 

	单线程:第1,2行的顺序可以重排,但第3行不能
	重排序不会给单线程带来内存可见性问题.
	多线程中程序交错执行时,重排序可能会造成内存可见性问题



可见性的实现方式

	Java语言层面(不包括jdk1.5之后的concurrent包下的高级特性)支持的可见性实现方式:
	> synchronized
	> voatile

---	

# synchronized实现可见性
	
	synchronized能够实现:
		> 原子性(同步)
		> 可见性

	JMM关于synchronized的两条规定:
		> 线程解锁前,(离开synchronized代码块前),必须把共享变量的最新值刷新到主内存中.
		> 线程加锁时,(进入synchronized代码块前),将清空工作内存中共享变量的值,    
			从而使用共享变量时需要从主内存中重新读取最新的值.
		(注意:加锁,解锁需要同一把锁)
		线程解锁前对共享变量的修改在下次加锁时对其他线程可见.

	synchronized实现可见性
		线程执行互斥代码的过程:
		1.获得互斥锁
		2.清空工作内存
		3.从主内存拷贝变量的最新副本到工作内存
		4.执行代码
		5.将更改后的共享变量的值刷新到主内存
		6.释放互斥锁
	
<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">	
	package com.tu.test.visibility;

	public class SynchronizedDemo {
		// 共享变量
		private boolean ready = false;
		private int result = 0;
		private int number = 1;

		// 写操作
		public void write() {
			ready = true; // 1.1
			try {//为了得到结果一
				Thread.sleep(100);
			} catch (InterruptedException e) {
			}
			number = 2; // 1.2
		}

		// 读操作
		public void read() {
			if (ready) {// 2.1
				result = number * 3;// 2.2
			}
			System.out.println("result的值为：" + result );
		}

		// 内部线程类
		private class ReadWriteThread extends Thread {
			// 根据构造方法中传入的flag参数,确定线程执行读操作还是写操作
			private boolean flag;

			public ReadWriteThread(boolean flag) {
				this.flag = flag;
			}

			@Override
			public void run() {
				if (flag) {
					write();
				} else
					read();
			}
		}

		public static void main(String[] args) {
			for (int i = 0; i < 100; i++) {
				SynchronizedDemo synDemo = new SynchronizedDemo();
				synDemo.new ReadWriteThread(true).start();
				synDemo.new ReadWriteThread(false).start();
				// 结果有可能会出现如下情况
				//结果一: 1.1->2.1->2.2->1.2 结果:result = 3  <-交错
				//结果二: 1.1->2.1->1.2->2.2 结果:result = 6  <-交错
				//结果三: 1.1->1.2->2.1->2.2 结果:result = 6
				//结果四: 2.1->1.1->1.2 结果:result = 0
			}
		}
	}

</pre>

可见性分析

	导致共享变量在线程间不可见的原因:
		1.线程的交叉执行
		2.重排序结合线程交叉执行
		3.共享变量更新后的值没有在工作内存与主内存间及时更新

	synchronized解决方案:
		1.原子性()
		2.原子性
		3.可见性


<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">	
	// 写操作
	public synchronized void write() {
		ready = true; // 1.1
		number = 2; // 1.2
	}

	// 读操作
	public synchronized void read() {
		if (ready) {// 2.1
			result = number * 3;// 2.2
		}
		System.out.println("result的值为：" + result );
	}
	//给代码加锁后结果就不同了.`
	// 结果有可能会出现如下情况
	//结果三: 1.1->1.2->2.1->2.2 结果:result = 6
	//结果四: 2.1->1.1->1.2 结果:result = 0
	//这两种结果是由线程间谁先争取到CPU的使用权而得出来的不同结果.
</pre>
	
---

# volatile实现可见性

	深入来说:通过加入内存屏障和禁止重排序优化来实现的.
	> 对volatile变量执行写操作时,会在写操作后加入一条store屏障指令
	> 对volatile变量执行读操作时,会在读操作前加入一条load屏障指令
	(Java提供了8条屏障指令)
	
	通俗地讲: volatile变量在第次被线程访问时,都强迫从主内存中重读该变量的值,
	而当该变量发生变化时,又会强迫线程将最新的值刷新到主内存.
	这样任何时刻,不同的线程总能看到该变量的最新值.

	线程写volatile变量的过程:
	1.改变线程工作内存中volatile变量副本的值
	2.将改变后的副本的值从工作内存刷新到主内存

	线程读volatile变量的过程
	1.从主内存中读取volatile变量的最新值到线程在工作内存中.
	2.从工作内存中读取volatile变量的副本

	
	volatile不能保证volatile变量复合操作的原子性:
	private int number = 0;
	number++; //不是原子操作, 多线程时有可能会交叉执行或重排序.
	1.读取number的值
	2.将number的值加1
	3.写入最新的number的值
	----
	synchronized(this){
		number++;
	}
	加入synchronized,变为原子操作
	1.读取number的值
	2.将number的值加1
	3.写入最新的number的值
	以上3步骤不会被交错执行不会被重排序
	----
	private volatile int number = 0;
	变为volatile变量,无法保证原子性


<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">
	package com.tu.test.visibility;

	public class VolatileDemo {
		private volatile int number = 0;

		public int getNumber() {
			return this.number;
		}

		public void increase() {
			try {
				Thread.sleep(100);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			this.number++;
		}

		public static void main(String[] args) {
			final VolatileDemo volMemo = new VolatileDemo();
			for (int i = 0; i < 500; i++) {
				new Thread() {
					public void run() {
						volMemo.increase();
					};
				}.start();
			}

			// 如果还有子线程在运行,主线程就让出CPU资源
			// 直到所有的子线程都运行完了,主线程再继续往下执行
			while (Thread.activeCount() > 1) {
				Thread.yield();
			}

			//正常应该打印number的值为500.但因为number++不是原子
			//操作所以值变的不确定,有可能会小于500的值
			System.out.println("number" + volMemo.getNumber());
		}
	}

</pre>

程序分析:

	假设number=5;
	1.线程A读取number的值
	2.线程B读取number的值
	3.线程B执行加1操作
	4.线程B写入最新的number的值
	5.线程A执行加1操作
	6.线程A写入最新的number的值.把线程B的值覆盖了.
	7.两次number++只增加了1
	这是因为number自增操作的原子性的原因.

解决方案有:

	> 保证number自增操作的原子性:
	> 使用synchronized关键字   
	> 使用JDK1.5后推出的 ReentrantLock (java.until.concurrent.locks包下)   
	> 使用JDK1.5后推出的 AtomicInterger (java.util.concurrent.atomic包下)   


<pre class="brush: java; ruler: true; first-line: 0; highlight: [] ; auto-links: true ; collapse: true ; gutter: true; ">

//原
//private volatile int number = 0;
//修改
private int number = 0;

//原
//public void increase() {
//	try {
//		Thread.sleep(100);
//	} catch (InterruptedException e) {
//		// TODO Auto-generated catch block
//		e.printStackTrace();
//	}
//	this.number++;
//}
//修改 使用 synchronized 实现原子性
public void increase() {
	try {
		Thread.sleep(100);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	synchronized (this) {
		this.number++;
	}
}

//修改使用 ReentrantLock 实现原子性
private Lock lock = new ReentrantLock();
public void increase() {
	try {
		Thread.sleep(100);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
	lock.lock();//加锁
	try {
		this.number++;
	} finally {
		lock.unlock();//解锁 .防止try有异常.JDK推荐写法try..finally
	}
}

</pre>



## volatile适用场景
	
	因volatile只能保证变量的可见性,不能保证操作的原子性.
	
	要在多线程中安全的使用volatile变量,必须同时满足:
	> 1.对变量的写入操作不依赖其当前值(即改变后的volatile的值与改变前的值不要有关系)
		不满足: number++ , count = count*5等这类操作.
		满足: boolean变量,记录温度变化的变量等.
	> 2.该变量没有包含在具有其他变量的不变式中.   
		(即程序中有多个volatile变量,那么,每个volatile变量的状态要独立其它volatile变量)
		例如:
		程序中有两个volatile变量low 与up
		不满足: 不变式low<up
		
---

# synchronized和volatile比较

	> volatile不需要加锁,比synchronized更轻量级,不会阻塞线程.
	> 从内存可见性角度讲,volatile读相当于加锁,volatile写相当于解释锁
	> synchronized即能保证可见性,又能保证原子性,而volatile只能保证可见性,无法保证原子性.

---

问题补充:

	即使没有保证可见性的措施,很多时候共享变量依然能够在主内存和工作内存见得到及时更新:
		一般只有在短时间内高并发的情况下才会出现变量得不到及时更新的情况,因为
		CPU在执行时会很快地刷新缓存,所以一般情况下很难看到这种问题.


	对64位(long,double)变量的读写可能不是原子操作:
		>Java内存模型允许JVM将没有被volatile修饰的64位数据类型的读写操作
		划分为两次32位的读写操作来进行.

		导致问题: 有可能会出现读取到" 半个变量 "的情况
		解决方法: 加volatile关键字 
		实际上很多商用JVM已经为long,double作为原子性来进行操作处理


---

# Demo下载

[本文案例Demo](/res/file/blog/2014/12/15/Java_Throad_Visibility/ThreadTheVisibility.rar)

