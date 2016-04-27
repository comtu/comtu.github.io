---
layout : post
title : "Java线程池"
category : Java
duoshuo: true
date : 2014-12-16
tags : [ThreadPoolExecutor , Thread , ScheduledThreadPoolExecutor,newCachedThreadPool,newSingleThreadExecutor,newFixedThreadPool,ExecutorService,]
SyntaxHihglighter: true
shTheme: shThemeMidnight # shThemeDefault  shThemeDjango  shThemeEclipse  shThemeEmacs  shThemeFadeToGrey  shThemeMidnight  shThemeRDark

---

目录

	线程池的作用
	Executors提供四种线程池
		newCachedThreadPool
		newFixedThreadPool
		newScheduledThreadPool
		newSingleThreadExecutor
	ThreadPoolExecutor类
	

<!-- more -->

Jdk1.5之后加入了java.util.concurrent包，这个包中主要介绍java中线程以及线程池的使用。



# 线程池的作用

	线程池作用就是限制系统中执行线程的数量。   
	     根据系统的环境情况，可以自动或手动设置线程数量，达到运行的最佳效果；   
	     少了浪费了系统资源，多了造成系统拥挤效率不高。用线程池控制线程数量，其他线程排队等候。   
	     一个任务执行完毕，再从队列的中取最前面的任务开始执行。若队列中没有等待进程，线程池的这一资源处于等待。   
	     当一个新任务需要运行时，如果线程池中有等待的工作线程，就可以开始运行了；否则进入等待队列。   

# 使用线程池的好处
	
	1.减少了创建和销毁线程的次数，每个工作线程都可以被重复利用，可执行多个任务。
	2.可以根据系统的承受能力，调整线程池中工作线线程的数目，防止因为消耗过多的内存.


# 比较重要的几个类
		
	Java里面线程池的顶级接口是Executor，但是严格意义上讲Executor并不是一个线程池，
	而只是一个执行线程的工具。真正的线程池接口是ExecutorService。
|类名|说明
|---|:---|
|ExecutorService|真正的线程池接口。   
|ScheduledExecutorService|能和Timer/TimerTask类似，解决那些需要任务重复执行的问题。  
|ThreadPoolExecutor|ExecutorService的默认实现。   
|ScheduledThreadPoolExecutor|继承ThreadPoolExecutor的ScheduledExecutorService接口实现，周期性任务调度的类实现。

要配置一个线程池是比较复杂的，尤其是对于线程池的原理不是很清楚的情况下，
很有可能配置的线程池不是较优的，因此在Executors类里面提供了一些静态工厂，生成一些常用的线程池。

# Executors提供四种线程池

Java通过Executors提供四种线程池，分别为：

	> newCachedThreadPool
		创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程。
	> newFixedThreadPool 
		创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待。
	> newScheduledThreadPool	
		创建一个定长线程池，支持定时及周期性任务执行。
	> newSingleThreadExecutor 
		创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。


# (1). newCachedThreadPool

	创建一个可缓存线程池，如果线程池长度超过处理需要，可灵活回收空闲线程，若无可回收，则新建线程。
	线程池为无限大，当执行第二个任务时第一个任务已经完成，会复用执行第一个任务的线程，而不用每次新建线程。

```java	
	ExecutorService cachedThreadPool = Executors.newCachedThreadPool();
	for (int i = 0; i &lt; 10; i++) {
		final int index = i;
		try {
			Thread.sleep(index * 1000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	 
		cachedThreadPool.execute(new Runnable() {
	 
			@Override
			public void run() {
				System.out.println(index);
			}
		});
	}

	//==========================
	//实际调用
	class Executors {
		public static ExecutorService newCachedThreadPool() {
			return new ThreadPoolExecutor(0, 
			Integer.MAX_VALUE,
			60L, 
			TimeUnit.SECONDS,
			new SynchronousQueue&lt;Runnable>());
		}
	}

```


# (2). newFixedThreadPool

	创建一个定长线程池，可控制线程最大并发数，超出的线程会在队列中等待。
	定长线程池的大小最好根据系统资源进行设置。如Runtime.getRuntime().availableProcessors()。

```java	
	
	ExecutorService fixedThreadPool = Executors.newFixedThreadPool(3);
	for (int i = 0; i &lt; 10; i++) {
		final int index = i;
		fixedThreadPool.execute(new Runnable() {
			@Override
			public void run() {
				try {
					System.out.println(index);
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	}
	
	//==========================
	//实际调用 
	class Executors {
		public static ExecutorService newFixedThreadPool(int nThreads) {
			return new ThreadPoolExecutor(nThreads, 
			nThreads,
			0L,
			TimeUnit.MILLISECONDS,
			new LinkedBlockingQueue&lt;Runnable>());
		}
		
	}

```

# (3) newScheduledThreadPool
	
	创建一个定长线程池，支持定时及周期性任务执行。延迟执行

```java	
	ScheduledExecutorService scheduledThreadPool = Executors.newScheduledThreadPool(5);
	scheduledThreadPool.schedule(new Runnable() {
		@Override
		public void run() {
			System.out.println("delay 3 seconds");
		}
	}, 3, TimeUnit.SECONDS);//表示延时3秒执行

	scheduledThreadPool.scheduleAtFixedRate(new Runnable() {
 		@Override
		public void run() {
			System.out.println("delay 1 seconds, and excute every 3 seconds");
		}
	}, 1, 3, TimeUnit.SECONDS);//表示延迟1秒后每3秒执行一次.

	//==========================
	//实际调用
	class Executors{
		public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
			return new ScheduledThreadPoolExecutor(corePoolSize);
		}
	}

	class ScheduledThreadPoolExecutor 
		extends ThreadPoolExecutor 
		implements ScheduledExecutorService {
		public ScheduledThreadPoolExecutor(int corePoolSize) {
			super(corePoolSize, 
				Integer.MAX_VALUE, 
				0, 
				NANOSECONDS,
				new DelayedWorkQueue());
		}
	}
	//上面的super调用
	class ThreadPoolExecutor extends AbstractExecutorService{
		public ThreadPoolExecutor(int corePoolSize,
				      int maximumPoolSize,
				      long keepAliveTime,
				      TimeUnit unit,
				      BlockingQueue&lt;Runnable> workQueue) {
		this(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue,
		     Executors.defaultThreadFactory(), defaultHandler);//调用下面构造函数
		}

		 public ThreadPoolExecutor(int corePoolSize,
                              int maximumPoolSize,
                              long keepAliveTime,
                              TimeUnit unit,
                              BlockingQueue&lt;Runnable> workQueue,
                              ThreadFactory threadFactory,
                              RejectedExecutionHandler handler) {...}
	}


```


# (4)、newSingleThreadExecutor

创建一个单线程化的线程池，它只会用唯一的工作线程来执行任务，保证所有任务按照指定顺序(FIFO, LIFO, 优先级)执行。

```java	
	ExecutorService singleThreadExecutor = Executors.newSingleThreadExecutor();
	for (int i = 0; i &lt; 10; i++) {
		final int index = i;
		singleThreadExecutor.execute(new Runnable() {
	 
			@Override
			public void run() {
				try {
					System.out.println(index);
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		});
	}

	//==========================
	//实际调用
	class Executors {
		public static ExecutorService newSingleThreadExecutor() {
			return new FinalizableDelegatedExecutorService
			(new ThreadPoolExecutor(1, 1,
					    0L, TimeUnit.MILLISECONDS,
					    new LinkedBlockingQueue&lt;Runnable>()));
		}
	}

	static class FinalizableDelegatedExecutorService
		extends DelegatedExecutorService {
		FinalizableDelegatedExecutorService(ExecutorService executor) {
			super(executor);
		}
		protected void finalize() {
			super.shutdown();
		}
	}

	static class DelegatedExecutorService extends AbstractExecutorService{
	}

```

结果依次输出，相当于顺序执行各个任务。

现行大多数GUI程序都是单线程的。Android中单线程可用于数据库操作，文件操作，应用批量安装，应用批量删除等不适合并发但可能IO阻塞性及影响UI线程响应的操作。


# ThreadPoolExecutor

ThreadPoolExecutor 的完整构造方法的签名是：

```java	
	
	class ThreadPoolExecutor extends AbstractExecutorService {
		public ThreadPoolExecutor(int corePoolSize,
			int maximumPoolSize, 
			long keepAliveTime,
			TimeUnit unit, 
			BlockingQueue&lt;Runnable> workQueue, 
			ThreadFactory threadFactory,
			RejectedExecutionHandler handler) {...}
	}
	//corePoolSize - 池中所保存的线程数，包括空闲线程。
	//maximumPoolSize -池中允许的最大线程数
	//keepAliveTime - 当线程数大于核心时，此为终止前多余的空闲线程等待新任务的最长时间。
	//unit - keepAliveTime 参数的时间单位。
	//workQueue - 执行前用于保持任务的队列。此队列仅保持由 execute方法提交的 Runnable任务。
	//threadFactory - 执行程序创建新线程时使用的工厂。
	//handler - 由于超出线程范围和队列容量而使执行被阻塞时所使用的处理程序。
	

	 abstract class AbstractExecutorService implements ExecutorService {}
	 public interface ExecutorService extends Executor {}
	 public interface Executor {}
	 //以上关系可看出 ThreadPoolExecutor是Executors类的底层实现。
```

 参数 corePoolSize - 池中所保存的线程数，包括空闲线程。
	
	同时并发运行的核心线程数量.

 参数 maximumPoolSize -池中允许的最大线程数
	
	线程最大容纳线程数

 参数 keepAliveTime - 当线程数大于核心时，此为终止前多余的空闲线程等待新任务的最长时间。
	
	简时一点说就是,当核心线程空闲多长时间后自销毁.
	例如: 当corePoolSize为2个时,maximumPoolSize为3时,用户同时放入3个线程任务到池中.
		创建线程运行了前两个任务后,还需要运行一个任务,复用前面创建的线程运行
		最后一个任务,而还有一个线程闲置,keepAliveTime的参数就是当这个闲置线程等待
		多长时间内都无任务则销毁.而unit则是keepAliveTime的时间单位.

 参数 unit#  - keepAliveTime 参数的时间单位。

 参数 workQueue#  - 执行前用于保持任务的队列。此队列仅保持由 execute方法提交的 Runnable任务。

	排队
	所有 BlockingQueue 都可用于传输和保持提交的任务。可以使用此队列与池大小进行交互：
	
	> 如果运行的线程少于 corePoolSize，则 Executor 始终首选添加新的线程，而不进行排队。 
	> 如果运行的线程等于或多于 corePoolSize，则 Executor 始终首选将请求加入队列，而不添加新的线程。 
	> 如果无法将请求加入队列，则创建新的线程，除非创建此线程超出 maximumPoolSize，在这种情况下，任务将被拒绝。 
	
	排队Queue有三种通用策略： 
	> 直接提交。工作队列的默认选项是 SynchronousQueue ，它将任务直接提交给线程而不保持它们。
		在此，如果不存在可用于立即运行任务的线程，则试图把任务加入队列将失败，因此会构造一个新的线程。
		此策略可以避免在处理可能具有内部依赖性的请求集时出现锁。直接提交通常要求无界 maximumPoolSizes 
		以避免拒绝新提交的任务。当命令以超过队列所能处理的平均数连续到达时，此策略允许无界线程具有增长的可能性。
		
	> 无界队列。使用无界队列（例如，不具有预定义容量的 LinkedBlockingQueue）将导致在所有 corePoolSize 线
		程都忙时新任务在队列中等待。这样，创建的线程就不会超过 corePoolSize。（因此， maximumPoolSize 的
		值也就无效了。）当每个任务完全独立于其他任务，即任务执行互不影响时，适合于使用无界队列；
		例如，在 Web 页服务器中。这种排队可用于处理瞬态突发请求，当命令以超过队列所能处理的平均数连
		续到达时，此策略允许无界线程具有增长的可能性。 

	> 有界队列。当使用有限的 maximumPoolSizes 时，有界队列（如 ArrayBlockingQueue）有助于防止资源耗尽，
		但是可能较难调整和控制。队列大小和最大池大小可能需要相互折衷：使用大型队列和小型池可以最大
		限度地降低 CPU 使用率、操作系统资源和上下文切换开销，但是可能导致人工降低吞吐量。如果任务频
		繁阻塞（例如，如果它们是 I/O 边界），则系统可能为超过您许可的更多线程安排时间。使用小型队列
		通常要求较大的池大小，CPU 使用率较高，但是可能遇到不可接受的调度开销，这样也会降低吞吐量。 

 参数 threadFactory  - 执行程序创建新线程时使用的工厂。

	ThreadFactory 是一种在软件开发过程中封装对象创建过程的面向对象的设计模式。

 参数 handler  - 由于超出线程范围和队列容量而使执行被阻塞时所使用的处理程序。
	
	无法由 ThreadPoolExecutor 执行的任务的处理程序。

	当 Executor 已经关闭，并且 Executor 将有限边界用于最大线程和工作队列容量，且已经饱和时，
	在方法 execute(java.lang.Runnable) 中提交的新任务将被拒绝。
	在以上两种情况下，execute 方法都将调用其 RejectedExecutionHandler 的
	RejectedExecutionHandler.rejectedExecution(java.lang.Runnable, java.util.concurrent.ThreadPoolExecutor) 方法。
	下面提供了四种预定义的处理程序策略： 

	> 在默认的 ThreadPoolExecutor.AbortPolicy 中，处理程序遭到拒绝将抛出运行时 RejectedExecutionException 。 

```java	
 public static class AbortPolicy implements RejectedExecutionHandler {
        public AbortPolicy() { }
        public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
            throw new RejectedExecutionException("Task " +
		r.toString() +" rejected from " + e.toString());
        }
}
```

	> 在 ThreadPoolExecutor.CallerRunsPolicy 中，线程调用运行该任务的 execute 本身。
		此策略提供简单的反馈控制机制，能够减缓新任务的提交速度。 

```java	
public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
	if (!e.isShutdown()) {
		r.run();
	}
}
```

	> 在 ThreadPoolExecutor.DiscardPolicy 中，不能执行的任务将被删除。

```java	
 public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {}
```
	
	> 在 ThreadPoolExecutor.DiscardOldestPolicy 中，如果执行程序尚未关闭，
		则位于工作队列头部的任务将被删除，然后重试执行程序（如果再次失败，则重复此过程）。 

```java	
		public void rejectedExecution(Runnable r, ThreadPoolExecutor e) {
		    if (!e.isShutdown()) {
			e.getQueue().poll();
			e.execute(r);
		    }
		}
```

	定义和使用其他种类的 RejectedExecutionHandler 类也是可能的，但这样做需要非常小心，尤其是当策略仅用于特定容量或排队策略时。 

# Demo下载

在JDK帮助文档中，有如此一段话：  
“强烈建议程序员使用较为方便的Executors工厂方法    
	Executors.newCachedThreadPool()（无界线程池，可以进行自动线程回收）、   
	Executors.newFixedThreadPool(int)（固定大小线程池）   
	Executors.newSingleThreadExecutor()（单个后台线程）   
它们均为大多数使用场景预定义了设置。” 


![img](/res/img/blog/2014/12/16/Java_Thread_Pool/01.gif)
![img](/res/img/blog/2014/12/16/Java_Thread_Pool/02.gif)



[本文Demo下载](/res/file/blog/2014/12/16/Java_Thread_Pool/MyThread.rar)

本Demo中有Executors提供四种线程池的基本使用,以及自定义实现 ThreadPoolExecutor 线程池暂停,继续运行等介绍.