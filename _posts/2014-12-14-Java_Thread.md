---
layout : post
title : "Java线程"
category : Java
duoshuo: true
date : 2014-12-14
tags : [Thread , Runnable ,多线程,死锁,synchronized ]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark
---

目录
	
	线程简介
	Java中的线程实现方式
	Thread常用方法
	线程同步(synchronized关键字)
	多线程间数据通信
	线程同步死锁


<!-- more -->

**线程简介**

	程序(Program)：
		计算机指令的集合，它以文件的形式存储在磁盘上。
	进程(Process)：
		一个程序在其自身的地址空间中的一次执行活动。
		资源申请、调度和独立运行的单位，因此，它使用系统中的运行资源；
		而程序不能申请系统资源，不能被系统调度，也不能作为独立运行的单位，因此，它不占用系统的运行资源。
	线程(Thread)：
		是进程中的一个单一的连续控制流程。一个进程可以拥有多个线程。
		线程又称为轻量级进程，它和进程一样拥有独立的执行控制，由操作系统负责调度，
		区别在于线程没有独立的存储空间，而是和所属进程中的其他线程共享一个存储空间，这使得线程间的通信远较进程简单。
	
	什么是线程： 
		线程是一个应用程序执行时候的多条路径。

	线程执行的原理：
	      在物理上只有一个CPU的情况下，JVM是采用抢占CPU资源，给不同的线程划分指定执行时间片的方式来实现。

	java中隐含的两个线程：
		主线程
			每个java应用程序都至少有一个线程。这就是所为的主线程。它由JVM创建并调用java应用程序的main方法。
		垃圾回收线程(后台线程)
			JVM还通常会创建一些其他的线程，不过这些线程对我们来说是不可见的.
				比如，用于自动垃圾收集的线程、对象终止或者其他的JVM处理任务相关的线程。

	
**Java中的线程实现方式**

	Thread ：线程
		  所在包: java.lang.*

	多线程实现方式: 
	 多线程的方式一:(继承)见下面例:
		1.1. 将类声明为 Thread 的子类。(继承)
		1.2. 该子类应重写 Thread 类的 run 方法。
		1.3. 接下来可以分配并启动该子类的实例。

	多线程的方式二:(接口)见下面例:
		2.1. 声明实现 Runnable 接口的类。
		2.2. 该子类应重写 Thread 类的 run 方法。
		2.3. 然后可以分配该类的实例，
		2.4. 在创建 Thread 时作为一个参数来传递并启动

	二种方式的区别:
		使用Runnable接口
			可以将CPU，代码和数据分开，形成清晰的模型；
			更加体现了面向对象的编程思想，线程运行的代码也是对象(Runnable)
			还可以从其他类继承；
			保持程序风格的一致性。
		直接继承Thread类
			不能再继承其他类；
			编写简单，可以直接操纵线程.


	 线程的使用细节：
	 
		1. 线程的启动使用父类的start()方法
		2. 如果线程对象直接调用run()，那么JVN不会当作线程来运行，会认为是普通的方法调用
		3. 匿名内部类的线程实现方式 
		4. 可以直接创建Thread类的对象并启动该线程，但是如果没有重写run()，什么也不执行。
		5. 同一个线程的启动只能有一次，否则抛出异常 (IllegalThreadStateException)
			Exception in thread "main" thread1: i=1java.lang.IllegalThreadStateException

	守护线程(后台线程)
		setDaemon (boolean on)
		用法:
			线程对象.setDaemon(true)
			在启动线程之前调用
		特点：
		和其他线程一起等待CPU执行
		当其他线程都结束后，后台线程默认结束
		查看API文档
		当正在运行的线程都是守护线程时，Java 虚拟机退出
		该方法必须在启动线程前调用

	线程的生命周期(lifecycle)

![线程的生命周期(lifecycle)](/res/img/blog/2014/12/14/Java_Thread/Thread_lifecycle.png)

	

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	package com.tu.mtar;

	public class ThreadAndRunnableDemo {
		// 主函数
		public static void main(String[] args) {
			// 方式一
			MyThread mt = new MyThread(); // 1.3.接下来可以分配并启动该子类的实例。
			// mt.setDaemon(true);//设置成后台线程必须在开户线程之前
			mt.start(); // 1.4.并调用实例的start()方法,start方法会调用run方法,如果直接调用run方法将不能实现多线程.

			// 方式二
			MyRunnable mr = new MyRunnable(); // 2.3. 然后可以分配该类的实例，
			new Thread(mr).start(); // 2.4 在创建 Thread 时作为一个参数来传递并启动

			for (int i = 0; i < 100; i++) {
				System.out.println("main -- i: " + i);
			}

			ro();// Override........

		}

		protected static void ro() {
			// 当执行的线程的时候如果同时指定了Runnable的实现类和重写了Thread的run()，
			// 那么一定执行重写的run方法，而不是实现的run();

			new Thread(new Runnable() {
				public void run() {
					System.out.println("Runnable........");
				}
			}) {
				public void run() {
					System.out.println("Override........");
				}
			}.start();
		}
	}

	// 方式一
	class MyThread extends Thread // 1.1.将类声明为 Thread 的子类。(继承)
	{
		public void run() // 1.2.该子类应重写 Thread 类的 run 方法。
		{
			for (int i = 0; i < 100; i++) {
				System.out.println(Thread.currentThread().getName() + "==>MyThread:   i :" + i);
			}
		}
	}

	// 方式 二
	class MyRunnable implements Runnable// 2.1. 声明实现 Runnable 接口的类。
	{
		public void run() // 2.2. 该类然后实现 run 方法。
		{
			for (int i = 0; i < 100; i++) {
				System.out.println(Thread.currentThread().getName() + "==>MyRunnable  -- i: " + i);
			}
		}
	}

</pre>



**Thread常用方法**


<table border="1px" cellpadding="5px"  cellspacing="1px" bgcolor="">

<tr><td><B>类别</B></td><td ><B>方法签名</B></td><td><B>简介</B></td></tr>
<tr><td rowspan="4">线程的创建</td><td>Thread()</td>	  <td></td></tr>
<tr>				   <td>Thread(String name)</td><td></td></tr>
<tr>				   <td>Thread(Runnable tagrget)</td><td></td></tr>
<tr>				   <td>Thread(Runnable target,String name)</td><td></td></tr>
<tr><td rowspan="7">线程的方法</td><td>void start()</td><td>启动线程</td></tr>
<tr>				   <td>static void sleep(long millis)</td><td rowspan="2">线程休眠</td></tr>
<tr>				   <td>static void sleep(long millis , int nanos)</td></tr>
<tr>				   <td>void join()</td><td rowspan="3">使其他线程等待当前线程终止</td></tr>
<tr>				   <td>void join(long millis)</td></tr>
<tr>				   <td>void join(long missis,int nanos)</td></tr>
<tr>				   <td>static void yield()</td><td>当前运行线程释放处理器资源</td></tr>
<tr><td>获取线程引用</td><td >static Thread currentThread()</td><td>返回当前运行的线程引用</td></tr>

</table>

	static yield()		暂停当前正在执行的线程对象，并执行其他线程

	join()		调用这个方法的主线程，会等待加入的子线程完成    例: 其它线程.join();
		特点：当A线程的执行遇到了B线程的join方法，那么就挂起A线程，直到B线程运行完毕,再继续执行A线程。

	getName()            返回线程的名字
	setName(String name) 设置线程对象名
	getId()              返回线程的标识  同一个线程对象的id不同
	getPriority()		返回当前线程对象的优先级   默认线程的优先级是5
	setPriority()		设置线程优先级当前线程对象的优先级   默认线程的优先级是5

	setPriority(int newPriority) 设置线程的优先级    虽然设置了线程的优先级，但是具体的实现取决于底层的操作系统的实现
	
	static int MAX_PRIORITY 
		线程可以具有的最高优先级。  max : 10
	static int MIN_PRIORITY 
		线程可以具有的最低优先级。  min : 1
	static int NORM_PRIORITY 
		分配给线程的默认优先级。  nor : 5

	wait()		线程进入等待状态，等待被notify，这是对象方法，不是线程方法,要配合同步一起才能使用
	notify()	唤醒其他的线程，这是一个对象方法，而不是线程方法,要配合同步一起才能使用
	notifyAll()	唤醒其他的所有线程,这是一个对象方法，而不是线程方法,要配合同步一起才能使用  例:同步锁对象.notifyAll();


**线程同步(synchronized关键字)**
      
	线程同步
		同步就是协同步调，按预定的先后次序进行运行。
			如：你说完，我再说。阻塞式的运行。
		主要用来解决线程的安全问题
	格式：
	synchronized (对象)
	{
	    // 需要同步的代码；
	    // 共享资源的操作
	}
	原理：
		同步可以解决安全问题的根本原因就在那个对象上。
		该对象如同锁的功能。
		对象的标志位

	线程同步特点
		线程同步的前提：
			同步需要两个或者两个以上的线程
			多个线程使用的是同一个锁
	线程同步的特点：
		即使获取了CPU的时间片，没有对象锁也无法执行
		单线程无需同步
	线程同步缺点：
		当线程相当多时，因为每个线程都会去判断同步上的锁，这是很耗费资源的，无形中会降低程序的运行效率。



	同步函数:
		使得整个函数加锁同步
	实现
		在函数上加上synchronized修饰符即可
		    如：public synchronized void run(){  }
	


	创建锁对象：

	       如果加锁的代码中访问的是非静态变量，那么优先使用this关键字作为锁对象
		   如果加锁的代码中访问的是静态变量，那么优先使用所在类的字节码文件对应的Class对象作为锁对象
		   1. 类名.class        静态属性
		   2. 对象.getClass()   

	思考
		同步函数用的是哪个锁呢？  this
		同步静态函数用的是哪个锁呢？Class   
			该方法所在的函数中的类的Class对象，类.class

**多线程间数据通信**

	其实就是多个线程在操作同一个资源,但是操作的动作不同.如果同时操作会出现错乱.

	wait();释放资源，释放锁。
	notify();唤醒资源
	notifyAll();唤醒全部资源

	sleep():释放资源，不释放锁。


	wait,notify,notifyAll都使用在同步中,因为要对持有监视器(锁)的线程操作所以要使用在同步中,因为只有同步才具有锁.

	为什么这些操作线程的方法要定义Object类中呢?
		因为这些方法在操作同步中的线程时,都必须要标识它们所操作线程只有的锁.
		只有同一个锁上的被等待线程,可以被同一个锁上notify唤醒.
		不可以对不同锁中的线程进行唤醒.	也就是说,等待和唤醒必须是同一个锁.
		而锁可以是任意对象,所以可以被任意对象调用的方法定义在Object类中.



案例: 输入名字,打印名字(两线程同步操作查询数据)

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	package com.tu.mtar;

	//主线程,调用输入输出线程
	public class InputOutputDemo {
		public static void main(String[] args) {
			Res r = new Res();
			Input in = new Input(r);// 3.然后可以分配该类的实例，
			Output out = new Output(r);// 输入与输出需要的是同一个对象r

			Thread t1 = new Thread(in);// 4.在创建 Thread 时作为一个参数来传递并启动
			Thread t2 = new Thread(out);

			// 启动线程
			t1.start();
			t2.start();
		}
	}

	class Res // 定义一个两个线程需要同时操作的数据
	{
		String name; // 名字 未做封装,为了简化代码
		String sex; // 性别
		int index = 1; // 计数当前第几个客户ID
		boolean flag = false; // 定义一个标记
	}

	class Input implements Runnable// 1.声明实现 Runnable 接口的类。
	{
		private Res r;

		Input(Res r) // 构造函数
		{
			this.r = r;
		}

		public void run()// 2.该类然后实现 run 方法。
		{
			int x = 0;// 用于让线程每次写入的数据不同而定的标记
			for (int i = 0; i < 100; i++)// 循环写入100次数据
			{
				synchronized (r)// 同步 使用的锁是main函数中传入的与输出线程同一个锁r, 锁也叫监视器
				{
					if (r.flag)// 标记 如果我已经输入过了数据,那么:当前线程等待,并释放锁让被唤醒的线程可以拿到锁进行数据的查询.
						try {
							r.wait();
						} catch (InterruptedException e) {
						}// (线程等待);线程池中休息,wait()会有(如果当前线程不是此对象监视器的所有者)InterruptedException异常
					if (x == 0) {
						r.name = "mike";
						r.sex = "man";
						System.out.println("我输入了第" + r.index + "个客户,名字为:" + r.name + "性别为:" + r.sex + "的靓仔.");
					} else {
						r.name = "丽丽";
						r.sex = "女女";
						System.out.println("我输入了第" + r.index + "个客户,名字为:" + r.name + "性别为:" + r.sex + "的靓女.");
					}
					r.index++;// 只做计数
					x = (x + 1) % 2;// 为了辨别每次输入的数据不同.也可以使用boolean的方法代替
					r.flag = true;// 作标记,我已经输入过数据了.
					r.notify();// 唤醒再等待的最优先的线程, r为锁////notifyAll();全部叫醒线程池中的所有线程
				}
			}
		}
	}

	// 输出线程
	class Output implements Runnable {
		private Res r;

		Output(Res r) {
			this.r = r;
		}

		public void run() {
			for (int i = 0; i < 100; i++) {
				synchronized (r)// 同步 使用的锁是main函数中传入的与输入线程同一个锁r.
				{
					if (!r.flag)// 如果我已经查询过 , 当前线程等待,并释放锁
						try {
							r.wait();
						} catch (Exception e) {
						}
					System.out.println("I query the named : " + r.name + " , gender:" + r.sex + " customers . Id:" + (r.index - 1));
					r.flag = false;// 标记已经查询过
					r.notify();// 唤醒r中等待的线程.
				}
			}
		}
	}

</pre>

案例: 多线程数据通信之生产者消费者例(大于两线程同步 操作查询数据)

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	package com.tu.mtar;

	/*
	 * 对于多个生产者和消费者. 为什么要定义while判断标记. 原因:让被唤醒的线程再一次判断标记.
	 * 
	 * 为什么定义notifyAll,因为需要唤醒对方线程. 因为只用notify,容易出现只唤醒本方线程的情况.导致程序中的所有线程都等待.
	 */
	public class ProducerConsumerDemo // 主线程main分别开启四个线程 两进 两出
	{
		public static void main(String[] args) {
			Resource r = new Resource();

			Producer pro = new Producer(r);// 3. 然后可以分配该类的实例，
			Consumer con = new Consumer(r);

			Thread t1 = new Thread(pro);// 4 在创建 Thread 时作为一个参数来传递并启动
			Thread t2 = new Thread(pro);

			Thread t3 = new Thread(con);
			Thread t4 = new Thread(con);
			// 启动线程.
			t1.start();
			t2.start();

			t3.start();
			t4.start();
		}
	}

	// 将生产线程与消费线程运行方式封装起来.
	class Resource {
		private String name;
		private int count = 1;
		private boolean flag = false;

		public synchronized void set(String name) {
			/* if */while (flag)
				try {
					wait();
				} catch (Exception e) {
				}
			this.name = name + "--" + count++;
			System.out.println(Thread.currentThread().getName() + "...生产者.." + this.name);
			flag = true;
			// this.notify();
			this.notifyAll();
		}

		public synchronized void out()// 当消费者方法都是{}里的内容都是需要同步时可以将函数定义为同步,些时使用的锁是this
		{
			/* if */while (!flag)
				// 不断循环判断本线程是否将生产出来的东西消费了.当出现多个相同线程时.因为有可以再次出现消费线程.
				try {
					wait();
				} catch (Exception e) {
				}// 如果已经消费或是又是消费线程(第二个消费线程),那么消费线程等待,并释放锁.
			System.out.println(Thread.currentThread().getName() + "...消费者...." + this.name);
			flag = false;// 更改标记,记录已经消费过.
			// this.notify();//当只有两线程时
			this.notifyAll();// 多个线程最好是使用些方法.要不然会出现全部线程等待的问题
		}
	}

	// 生产者线程
	class Producer implements Runnable// 1.声明实现 Runnable 接口的类
	{
		private Resource res;

		Producer(Resource res) {
			this.res = res;
		}

		public void run()// 2. 该类实现 run 方法。
		{
			while (true)// 循环生产,,,,注,如果使用的是控制台CMD窗口,可以使用Ctrl+C键停止.
			{
				res.set("+商品+");// 将需要运行的线程内容封装起来
			}
		}
	}

	// 消费者线程
	class Consumer implements Runnable {
		private Resource res;

		Consumer(Resource res) {
			this.res = res;
		}

		public void run() {
			while (true)// 循环消费,循环次数增加才看得出问题.
			{
				res.out();// 将需要运行的线程内容封装起来
			}
		}
	}

</pre>


**线程同步死锁**

	线程同步死锁是指两个或两个以上的进程在执行过程中，因争夺资源而造成的一种互相等待的现象，
		若无外力作用，它们都将无法推进下去。此时称系统处于死锁状态或系统产生了死锁，这些永远在互相等待的进程称为死锁进程。
		当多个线程完成功能需要同时获取多个共享资源的时候可能会导致死锁。

	死锁无法解决，只能避免。
	特定的资源分配方式才会导致线程的死锁，所以可以进行资源的分配前的死锁检测来避免死锁的发生。


	预防死锁的算法： 银行家算法。

		银行家算法
			银行家算法是一种最有代表性的避免死锁的算法。在避免死锁方法中允许进程动态地申请资源，
			但系统在进行资源分配之前，应先计算此次分配资源的安全性，若分配不会导致系统进入不安全状态，则分配，否则等待。

		算法原理
			我们可以把操作系统看作是银行家，操作系统管理的资源相当于银行家管理的资金，
			进程向操作系统请求分配资源相当于用户向银行家贷款。 　

		为保证资金的安全,银行家规定: 　　
			(1) 当一个顾客对资金的最大需求量不超过银行家现有的资金时就可接纳该顾客; 　　
			(2) 顾客可以分期贷款,但贷款的总数不能超过最大需求量; 　
			(3) 当银行家现有的资金不能满足顾客尚需的贷款数额时,对顾客的贷款可推迟支付,但总能使顾客在有限的时间里得到贷款; 　　
			(4) 当顾客得到所需的全部资金后,一定能在有限的时间里归还所有的资金. 　　
		操作系统按照银行家制定的规则为进程分配资源，当进程首次申请资源时，要测试该进程对资源的最大需求量，
		如果系统现存的资源可以满足它的最大需求量则按当前的申请量分配资源，否则就推迟分配。当进程在执行中继续申请资源时，
		先测试该进程本次申请的资源数是否超过了该资源所剩余的总量。若超过则拒绝分配资源，
		若能满足则按当前的申请量分配资源，否则也要推迟分配。 

死锁案例

<pre class="brush: java; ruler: true;  highlight: [] ; auto-links: false ; collapse: true ; gutter: false;">
	package com.tu.mtar;

	public class DeadLockDemo {
		public static void main(String[] args) {
			//如果没有出现死锁,请多运行几次试试.
			DeadLock d = new DeadLock();

			Thread th1 = new Thread(d, "张三");
			Thread th2 = new Thread(d, "李四");

			th1.start();
			th2.start();
			
			System.out.println("finish.............");
		}
	}

	// 出现死锁案例 死锁无法解决，只能避免。
	class DeadLock implements Runnable {
		// 定义资源
		String controller = "遥控器";
		String battery = "2节7号电池";

		public void run() {
			// 需要抢资源
			if (Thread.currentThread().getName().equals("张三")) {
				synchronized (controller) {// 同步嵌套
					System.out.println("张三拿着遥控器，准备获取电池");

					synchronized (battery) {// 同步嵌套

						System.out.println("张三拿着遥控器，拿到电池");
						System.out.println("张三看电视");
					}
				}
			} else {
				synchronized (battery) {// 同步嵌套

					System.out.println("李四拿着电池，准备获取遥控器");

					synchronized (controller) { // 同步嵌套
						System.out.println("李四拿着电池，拿到遥控器");
						System.out.println("李四看电视");
					}
				}
			}
		}
	}

</pre>



[本文案例Demo](/res/file/blog/2014/12/14/Java_Thread/MyThreadAndRunnable.rar)



	
