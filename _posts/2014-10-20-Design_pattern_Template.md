---
layout : post
title : "模板设计模式"
category : 设计模式
duoshuo: true
date : 2014-10-20
tags : [设计模式 , 模板模式 , 模板方法模式 , Template]
---


#模板设计模式

**模版模式设计步骤**

		1. 写出解决某一类问题的固有的模版代码
		2. 抽取模版代码中可变的部分，形成独立的函数
		3. 可变部分抽取的函数定义为抽象函数，类定义为抽象类
		4. 创建实现类继承并实现父类的未实现的函数
		5. 为了避免子类重写父类的模版代码，需要将模版代码修饰为final


{% highlight java %}
	abstract class RunCode //3.有抽象方法code()所以必须定义为抽象类
	{
		// 1.计算一段代码的运行时间
		public final void getRuntime(){	//5.方法为最终代码final修饰
		    // 获取运行前系统的当前时间  毫秒  一秒 = 1000毫秒
		long start = System.currentTimeMillis(); 
			// 测试代码
			code();		//2.调用需要测试运行时间的方法,
			// 运行结束后获取系统的当前时间
		long end = System.currentTimeMillis(); 
			//结束时间减开始时间等于运行用时
		   System.out.println("运行时间： " + ( end - start ) );
		}
		public abstract void code();//3.不知这方法如何实现,定义成抽象
	}

{% endhighlight %}

{% highlight java %}

	class MyRunCode extends RunCode	//4.实现类 继承抽象类
	{
	    public void code(){			//4.实现抽象方法
			 for (int i = 0;i<100 ;i++ )
			 {
				 System.out.println("目前打印的是第"+i+"次");
			 }
		}
	}

{% endhighlight %}

{% highlight java %}
	class Demo		//演示类 
	{
		public static void main(String[] args) 
		{
			new MyRunCode().getRuntime();		//调用
		}
	}
{% endhighlight %}

---

**模板设计模式方式二: 接口版**
	
接口版比较适合在同一个类中出现重复代码时 将重复代码封装成一个函数.定义接口,与接口实现类进行实现

案例:

{% highlight java %}
	package com.tu.test;
	import org.junit.Test;
	/***
	 * 模板设计模式基于接口版
	 * @author ComTu
	 */
	public class Template_Inter {
		//接口
		public interface RunCode_inter{  //1.编写接口
			void code();  //2.编写抽象方法 (接口中方法默认是abstract)
		}
		//模板块  //3.编写一个模板代码方法需要带接口类型的参数.
		public void RunCode(RunCode_inter runcode){
			//运行时的毫秒数
			long start = System.currentTimeMillis();
			runcode.code();  //4.调用接口的code方法 
			//结束运行的毫秒数
			long end = System.currentTimeMillis();
			System.out.println("运行时间: "+(end-start));
		}
		//测试函数
		@Test
		public void startFor(){ 
			RunCode(new RunCode_inter(){ //5.模板块 ( 创建接口实现类 )
				@Override
				public void code() { //6.需要在模板中执行的代码

					for (int i = 0; i < 10000; i++) {
						System.out.println("i : "+i);
					}
				}
			});
		}
	}
{% endhighlight %}



如果非要在其它类中进行调用的话可以使用如下方法:

{% highlight java %}
	package com.tu.test;
	public class Test {
		public static void main(String[] args) {
			//导入  类名.接口名  类似与java.util.Map.Entry  Map接口.Entry接口
			new Template_Inter().RunCode(new com.tu.test.Template_Inter.RunCode_inter(){ //5.模板块 (创建接口实现类)
				@Override
				public void code() {//6.模板中执行的代码.
					System.out.println("运行的代码...");
				}
			});
		}
	}

{% endhighlight %}

---
