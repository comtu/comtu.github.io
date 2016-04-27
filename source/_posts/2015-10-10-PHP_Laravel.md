---
layout : post
title : "PHP学习笔记-Laravel框架"
category : PHP
duoshuo: true
date : 2015-10-10
tags : [PHP ,Laravel ,artisan,Integration/Image]
---

本人因公司的需要.学习PHP的Laravel框架.本博文为学习笔记.     
本博文中包含有 `Laravel安装配置环境部署`,`路由`,`控制器`,`视图`,`模型`,`MVC` ,`数据库`,`请求`,`Session`,`表单研制`,   
`中间件`,`哈希`,`辅助函数`,以及`图片处理库Integration/Image`的使用.`artisan`常用命令等内容.   

<!-- more -->

目录:

* [安装Laravel](#安装Laravel)
* [Laravel目录结构](#Laravel目录结构)
* [路由](#路由)
* [控制器(Controller)](#控制器(Controller))
* [视图(Views)](#视图(Views))
* [模型(model)](#模型(model))
* [环境与部署](#环境与部署)
* [数据库](#数据库)
* [请求](#请求)
* [Session](#Session)
* [表单验证](#表单验证)
* [中间件](#中间件)
* [哈希](#哈希)
* [辅助函数](#辅助函数)
* [在 Laravel 中使用图片处理库 Integration/Image](#图片处理库Integration/Image)
* [我遇到的错误](#我遇到的错误)
* [artisan命令](#artisan命令)
* [Demo](#Demo)

# <a id="安装Laravel"></a>安装Laravel

	1.1.下载安装PHP

		http://windows.php.net/download/

		IDE (https://www.jetbrains.com/phpstorm/)

		本人使用的PHP版本为:php-5.5.28-nts
		Laravel框架要求PHP 版本 >= 5.4

	1.2.安装Composer 

		Composer  
		官网: https://getcomposer.org/
		GitHub: https://github.com/composer/composer
		中文: http://www.phpcomposer.com/ 中国镜像

		Composert官方下载地址: https://getcomposer.org/Composer-Setup.exe

		如果出现如下安装错误:

			Some settings on your machine make Composer unable to work properly.
			Make sure that you fix the issues listed below and run this script again:
			The openssl extension is missing, which means that secure HTTPS transfers are impossible.
			If possible you should enable it or recompile php with --with-openssl

			缺失openssl扩展
			
			处理方式: 
				找到php目录下的php.ini文件(如果没有则把php.ini-development拷贝重命名为php.ini)
				用编辑器打开 php.ini 文件，修改以下配置： 
				去掉 extension=php_mbstring.dll 前面的分号（888 行左右） 
				去掉 extension=php_openssl.dll 前面的分号（893 行左右） 
				去掉 extension_dir = "ext" 前面的分号（736 行左右）
			然后重试即可.安装完全成后使用cmd输入composer显示如下内容表示安装成功.

		C:\Users\comtu>composer
		   ______
		  / ____/___  ____ ___  ____  ____  ________  _____
		 / /   / __ \/ __ `__ \/ __ \/ __ \/ ___/ _ \/ ___/
		/ /___/ /_/ / / / / / / /_/ / /_/ (__  )  __/ /
		\____/\____/_/ /_/ /_/ .___/\____/____/\___/_/
				    /_/

		....省略.....

	1.3.在项目中创建 Composer 

		使用cmd定位到项目目录下.如:
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm>

		使用命令:
			cmd(或者使用PHPStorm的Terminal本人使用的IDE就是PHPStorm)	

			composer create-project laravel/laravel --prefer-dist my_laravel
		
			回车后会自动下载laravel框架.下载目录生成在firstPHPStorm目录下.
				laravel/laravel 指下载laravel目录下的laravel
				--prefer-dist下载的文件为压缩过的.
				my_laravel 为安装到的文件目录名(自定义).

			如果没有代理下载速度就呵呵了.(本人大概花费15分钟左右时间.)
			最后提示如下内容表示下载成功:
				Application key [xxxxxxxxxxxxxxxxxxxx] set successfully. 

		一键安装包
			故有了一键安装包.rar里面的内容就是通过命令下载下来的文件.免去了再龟速的下载.

			Laravel一键安装包下载地址: http://www.golaravel.com/download/
		
	1.4.测试运行Laravel

	测试运行方式1:

		cmd(或者使用PHPStorm的Terminal本人使用的IDE就是PHPStorm)
		
		php -S localhost:80 -t my_laravel\public

		提示出现:
			PHP 5.5.28 Development Server started at Sat Oct 10 10:20:28 2015
			Listening on http://localhost:80
			Document root is E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel\public
			Press Ctrl-C to quit.
		
		打开浏览器:
		地址栏输入:localhost
		界面中显示出"Laravel 5"大字表示运行成功.
		
		但如果你的是使用linux或者其它系统.如果出现浏览器显示出白屏或者其它内容.则可能是因为有两个文件夹的权限的原因
		需要为 my_laravel/storage (日志,session,等目录)  与 my_laravel/vendor (Composer下载的支持库,或者自己的第三方库目录)
		有写入的权限

		Linux设置对应的权限命令如下:

			chown -R apache:apache /var/www/my_laravel/storage
			chown -R apache:apache /var/www/my_laravel/vendor


	测试运行方式2(PHP版本5.4之后的版本):
	
		artisan 的 serve 命令还支持两个参数：

		host 设置主机地址
		port 设置 web server 监听的端口号
		例如：php artisan serve --port=8888


		cmd 定位目录到my_laravel 输入 php artisan serve (PHP5.4之后开始支持内置web Server 同时Laravel也支持)
		E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel>php artisan serve 回车(默认8000接口可指定)
		Laravel development server started on http://localhost:8000/ 提示

		打开浏览器，在地址栏输入 localhost:8000 于方式1运行出相同的效果.
		
		如你电脑上有运行Apache 并且端口也是8000那么会出现如下提示,需要关闭Apache或者指定其它接口后再试.
		[Sat Oct 10 10:39:21 2015] Failed to listen on localhost:8000 
		(reason: 以一种访问权限不允许的方式做了一个访问套接字的尝试。)

# <a id="Laravel目录结构"></a>Laravel目录结构

	本学习笔记使用到的文件目录

	my_laravel
		|-->app
		|    |--->Http 
		|    |     |---->Controllers 控制器目录
		|    |     |       |-----> 控制器文件
		|    |     |---->Middleware
		|    |     |       |-----> 中间件文件
		|    |     |---->routes.php 路由配置文件
		|    |     |---->Kernel.php 中间件配置文件
		|    |---> 根目录Model默认目录
		|-->bootstrap
		|-->config  配置文件
		|    |--> app.php
		|    |--> database.php
		|    |--> ....
		|-->database 数据库
		|-->public 对外开放目录
		|-->resources
		|    |--->views 视图View目录
		|          |---->xxxx.blade.php 视图文件
		|          |---->errors 目录
		|                  |-----> 503.blade.php 文件当artisan命令使用 php artisan down 时会网站全部连接转向此文件.
		|-->storage 日志,session等缓存目录
		|-->tests 
		|-->vendor 自己的第三方库目录与Composer下载的支持库
		|    |--->laravel 框架目录
		|    |--->intervention 图片处理库,需要下载
		|-->.env 文件 环境配置文件.
		|-->Composer.json 环境库配置文件 

# <a id="路由"></a>路由
	
	路由作用是宏观的分发和限制请求

	http://laravel-china.org/docs/5.0/routing 中文文档

	http://laravel.com/docs/5.0/routing 原版文档
	http://laravel.com/docs/5.1/routing 原版文档

	3.1 配置基本路由
		文件目录:my_laravel/app/Http/routes.php	
		
		选择get/post/any 等等
			一般get是向服务器要数据
			post是向服务器发数据
			any就是通过全部请求类型

		//get
			Route::get('/','WelcomeController@index');
			//意思是如果通过get访问/域名就交给WelcomeController控制器的index方法进行处理.

			//通过 http://localhost/home 访问.可进入到登录页面
			Route::get('home', 'HomeController@index');

			也可以使用函数的方式直接返回视图(可加快测试速度)

			Route::get('/',	function () {
					return view('welcome');
					//视图文件目录位于:my_laravel/resources/views/welcome.blade.php
				}
			);
			//意思是如果访问/域名 显示视图welcome
				
		//post方式 路由使用函数
			Route::post('test',function (){
				return view('welcome');
			});
		
		//any(不管用什么方式get/post等请求都通过),对于不敏感的信息都可以使用这种模式.
			Route::any('testAny',function (){
				return 'any请求,注册路由响应所有 HTTP 请求';
			});
		
		//match 为多种请求注册路由
			Route::match(['get', 'post'], '/', function()
			{
			    return 'Hello World';
			});

		//resource 请求控制器中的所有方法
			//http://localhost/user
			//http://localhost/user/create
			//http://localhost/user/destroy
			//http://localhost/user/update
			//http://localhost/user/show
			//资源 不用像WelcomeController@index指定方法,直接可以调用. 但在项目中不够灵活.
			Route::resource('user','UserController');

	3.2 CSRF保护
		跨站攻击保护机制(跨网站请求伪造))
		例如:原本一个post请求的链接,用户使用第三方工具(如chrome浏览器的Postman插件)伪造post请求
		有CSRF则会对这种请求进行拦截.
	
	3.3 路由传参
		基础路由参数
			Route::get('user/{id}', function($id){
			    return 'User '.$id;
			});

		可选择的路由参数
			Route::get('user/{name?}', function($name = null){
			    return $name;
			});

		带默认值的路由参数	
			Route::get('user/{name?}', function($name = 'John'){
			    return $name;
			});

		使用正则表达式限制参数
			Route::get('user/{name}', function($name){
			    //
			})
			->where('name', '[A-Za-z]+');

			Route::get('user/{id}', function($id){
			    //
			})
			->where('id', '[0-9]+');

		使用条件限制数组
			Route::get('user/{id}/{name}', function($id, $name){
			    //
			})
			->where(['id' => '[0-9]+', 'name' => '[a-z]+']);
		
		定义全局模式
			如果你想让特定路由参数总是遵询特定的正则表达式，可以使用 pattern 方法。在 RouteServiceProvider 的 boot 方法里定义模式：

			$router->pattern('id', '[0-9]+');
			定义模式之后，会作用在所有使用这个特定参数的路由上：

			Route::get('user/{id}', function($id)
			{
			    // 只有 {id} 是数字才被调用。
			});

		取得路由参数

			如果需要在路由外部取得其参数，使用 input 方法：

			if ($route->input('id') == 1){
			    //
			}
			你也可以使用 Illuminate\Http\Request 实体取得路由参数。
			当前请求的实例可以通过 Request facade 取得，或透过类型提示 Illuminate\Http\Request 注入依赖：

			use Illuminate\Http\Request;

			Route::get('user/{id}', function(Request $request, $id){
			    if ($request->route('id')){
				//
			    }
			});
	
	
	还有如:	方法欺骗 , 命名路由 , 路由群组 , 路由模型绑定 , 抛出 404 错误 等内容 ,见官方文档.

# <a id="控制器(Controller)"></a>控制器(Controller)
	
	控制器的作用是请求二级分发者

	控制器目录
		my_laravel/app/Http/Controllers/目录下

	创建控制器
		手动模式创建:
			例如新创建: my_laravel/app/Http/Controllers/MyController1.php 内容如下
				<?php namespace App\Http\Controllers;
				class MyController1 extends Controller {
				    public function getAbout(){
					return 'MyController1@ABOUT gogogo';

					//到视图
					//return view('my_welcome');//跳转到my_welcome.blade.php视图View中.
					//传参数方式1 //跳转到my_welcome.blade.php视图View中并带一个参数$name = 'comtu'.
					//return view('my_welcome')->with('name','comtu');
					//传参数方式2 //跳转到my_welcome.blade.php视图View中并带一个参数$name = 'name'.
					//$name = 'lala';
					//return view('my_welcome',compact('name'/*['name'->'lala']*/);
					//传参数方式3
					//$data=[
					//	'name' => 'comtu',
					//	'age' => 128
					//];
					//return view('my_welcome',$data);//传多参数.视图View中直接使用$name , $age即可.
				    }
				}
			配置路由
				//http://localhost/myController1
				Route::get('myController1','MyController1@getAbout');
	
		命令模型创建(推荐,更准确):

			使用Terminal定位(cmd)目录文件到 my_laravel 目录下 使用artisan命令
			使用命令:
				E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel>
				php artisan make:controller MyController
			
			提示:Controller created successfully. 创建成功.
			查看my_laravel/app/Http/Controllers/MyController.php
			发现会生成生成MyController.php文件 文件里会自动生成类,以及一些方法:
			如:index() , create() , store() , show($id) , edit($id) , update($id) , destroy($id)
			但都是空实现.
	
# <a id="视图(Views)"></a>视图(Views)
	
	MVC显示层

	my_laravel/resources/views/xxxx.blade.php
	
	创建View视图
		一般流程为: 创建控制器-->配置路由-->创建视图.
		
		1.在创建的控制器 MyController.php 中增加如下方法:
			<?php namespace App\Http\Controllers;
			class MyController1 extends Controller {
				public function index(){
					//到视图
					return view('my_welcome');//跳转到my_welcome.blade.php视图View中.
				}

				//传参数方式1
				public function parameter(){
					$data=[
						'name' => 'comtu',
						'age' => 128,
					        'people'=>['张三','李四','王五']
					];
					return view('my_welcome',$data);//传多参数.视图View中直接使用$name , $age即可.
				}
				//传参数方式2
				public function parameter1(){
					$name = 'lala';
					//跳转到my_welcome.blade.php视图View中并带一个参数$name = 'lala'.
					return view('my_welcome',compact('name')/*等同于['name'->'lala']*/);
				}
				//传参数方式3
				public function parameter2(){
					//跳转到my_welcome.blade.php视图View中并带一个参数$name = 'comtu'.
					return view('my_welcome')->with('name','comtu');
				}
			}
		
		2.配置路由:
			//http://localhost/my_home
			Route::get('my_home','MyController@index');
			Route::get('my_home1','MyController@parameter');
			Route::get('my_home2','MyController@parameter1');
			Route::get('my_home3','MyController@parameter2');

		3.创建视图文件 
			目录结构为my_laravel/resources/views/my_welcome.blade.php
			<html>
				<head>
					<title>my_welcome</title>
				</head>
				<body>
					<div class="title">my_welcome-->
						<?php if(!empty($name)):?>
							<?php echo $name;?>
						<?php endif;?>
					</div>
					<?php if(!empty($age)):?>
						<div class="title">age:<?php echo $age;?></div>
					<?php endif;?>
				</body>
			</html>

	Blade模板

		官方文档: http://laravel.com/docs/5.1/blade
		中文文档: http://www.golaravel.com/laravel/docs/5.0/templates/
		
		模板:

			{{ }} 
			{!! !!}
			{{{ }}}
			@include
			@if()
			@else
			@endif
			@foreach
			@endforeach
			@for
			@endfor
			@while
			@endwhile
			等
		
		案例:

		新创建 my_laravel/resources/views/compontents/myHead.blade.php 文件.(用于演示 @include('components.myHead'))
			<html>
				<body>
					<!--头部文件使用 include 在其它地方引用 -->
					<h1>高大上的头Head</h1>
					<hr>

				</body>
			</html>

		演示代码 my_laravel/resources/views/my_view.blade.php
			<html>
				<head>
					<meta charset="utf-8">
					<title>MyView</title>
				</head>
				<body>
					<!--引用包含其它文件.-->
					@include('components.myHead')
					MyView-->

					<!--调用函数 跨站点请求伪造保护码-->
					{{csrf_token()}} 等同于 <?php echo csrf_token();?>

					<h1>{{ $name or 'Default' }}</h1>

					<h1>{{ $name or '无名英雄1' }}</h1>

					<h1>{{ $name or '无名英雄2'}} - {{$age or 0}}</h1>

					以上等同于
					<h1><?php echo !empty($name)?$name:'无名英雄3'?></h1>


					<!--不解析,原样输出-->
					@{{$name}}
							
					<!--加载代码-->
					{!! '<script>var g = "comtu";document.write("<br />加载代码"+g+"<br />");</script>' !!}
					{!! '<h1>h1</h1>' !!}

							<!--代码转义-->
					{{{'<html lang="en">打印HTML comtu</html>'}}}

					
					<!--Blade的if判断,如果$name未定义会抛错误-->
					<h1>
					@if($name)
						你好{{$name}}
					@else
						未登录
					@endif
					</h1>

					
					@foreach($people as $person)
						<li>{{$person}}</li>
					@endforeach

					@for($i = 0 ; $i<3; $i++)
					xx
					@endfor

					@while(false)
					xxx
					@endwhile

				</body>
			</html>
	
		以上在浏览器中输出
			高大上的头Head

			MyView--> YNJhQ4GgCCuZ5qyPNhTwvFvWfYLduxUOFvEz0vnZ 等同于 YNJhQ4GgCCuZ5qyPNhTwvFvWfYLduxUOFvEz0vnZ
			Default

			无名英雄1

			无名英雄2 - 0

			以上等同于
			无名英雄3

			{{$name}} 
			加载代码comtu
			h1

			<html lang="en">打印HTML comtu</html>

			未登录

			张三
			李四
			王五
			xx xx xx

# <a id="模型(model)"></a>模型(model)
	
	模型层
		一般model在 my_laravel/app/目录下
		直接或间接继承Model;
		原代码目录:
		//my_laravel/vendor/laravel/framework/src/Illuminate/Database/Eloquent/Model.php
		Laravel的Model比CI的Model内容可多很多.里面包含了查询数据库等等的函数实现.
		8.Eloguent里面有Demo


	创建模型
		手动模式创建:
			例如新创建: my_laravel/app/Demo.php内容如下:		

			修改Model的文件目录,新创建 my_laravel/app/Model 在Model里面创建Model文件.
			并在 文件头<?php namespace App\Model;//指定目录即可			

			<?php namespace App;
				use Illuminate\Database\Eloquent\Model;
				class Demo extends Model {
				    use Authenticatable, CanResetPassword;
				    /**使用的数据库表模式。*/
				    protected $table = 'demo';

				    /**属性可分配。*/
				    //表示那些字段是可以被laravel填写的.
				    protected $fillable = ['name', 'email', 'password'];

				    //表示这些字段是被保护的,存储数据库时不填写此数据
				    protected $guarded = ['demo_id'];

				    /** 排除在模型的JSON形式的属性。*/
				    protected $hidden = ['password', 'remember_token'];

				     //修改默认的 id 主键
				    protected $primaryKey = 'demo_id';
					
				    //不使用时间戳_见下面创建模型
				    public $timestamps = false;
				}
		
		命令模型创建:
			使用Terminal定位(cmd)目录文件到 my_laravel 目录下 使用artisan命令
				php artisan make:model Demo
				创建在 my_laravel/app/Demo.php 文件如下:

				<?php namespace App;
				use Illuminate\Database\Eloquent\Model;
				class Demo extends Model {
					//....
				}
	
# <a id="环境与部署"></a>环境与部署

	.env 环境配置文件.
		
		文件目录 my_laravel/.env

		作用到全局的一些参数
		例如:
		APP_ENV=local   全称APP_Envirment 程序环境=local表示环境在本地.server表示运行在服务器.debug需要改成0或false
		APP_DEBUG=true  是否在开发模式下.如果true,则是开发模式,出错时会报错,并会尽量多打印信息.0或false表示正式模式.
		APP_KEY=asdf    应用的加密key,标记唯一性,例如框架需要加密时,有可能会使用到,当做参数使用.
		
		DB_HOST=localhost 数据库地址 这些参数会被 database.php 等配置文件调用.
		DB_DATABASE=my_laravel 数据库名
		DB_USERNAME=root  数据库用户名
		DB_PASSWORD=root  数据库密码

		CACHE_DRIVER=file   缓存使用文件形式
		SESSION_DRIVER=file Session使用文件形式
		QUEUE_DRIVER=sync   队列使用同步

		MAIL_DRIVER=smtp      邮件配置
		MAIL_HOST=mailtrap.io
		MAIL_PORT=2525
		MAIL_USERNAME=null
		MAIL_PASSWORD=null
		

		先创建数据库 见下面的"数据库CMD"
		//路由中,尝试连接数据库
		Route::get('myDatabase',function(){
		    $name = DB::connection()->getDatabaseName();
		    echo $name; //打印出 数据库名 my_laravel 表示成功 如果遇见PDOException错误见"我遇到的错误"中的解决方法
		});
	
	数据库
		my_laravel/config/database.php
		
		一般不用配置当前文件,配置 my_laravel/.env 文件即可.

		'default' => 'mysql' 默认使用的数据库
		'connections' => [
			'mysql' => [
				'driver'    => 'mysql',
				//引用my_laravel/.env 环境配置文件的配置,如果没有找到则使用默认的'localhost'.
				'host'      => env('DB_HOST', 'localhost'), 
				'database'  => env('DB_DATABASE', 'forge'),
				'username'  => env('DB_USERNAME', 'forge'),
				'password'  => env('DB_PASSWORD', ''),
				'charset'   => 'utf8',
				'collation' => 'utf8_unicode_ci',
				'prefix'    => '', //前缀
				'strict'    => false,
			],
		]

	Session

		配置文件 my_laravel/config/session.php 一般此文件不需要配置

			//可支持配置 "file", "cookie", "database", "apc","memcached", "redis", "array"
			'driver' => env('SESSION_DRIVER', 'file'),
		
	down/up
		一整个程序停止解析(使用场景如,网站遇到攻击,网站需要维护等)
		配置后访问网站的所有地址都会被跳转到 my_laravel/resources/views/errors/503.blade.php 网站全部连接转向此文件.

			//停止服务,
			php artisan down 
			
			//恢复服务
			pup artisan up 
	
	自定义配置属性
		1.在.env中增加属性
			MY_DIY_CONFIG='test_env'
		2.在config/app.php内容里增加属性(参数1为.env文件下的配置名,如果未配置.则使用参数2默认值)
			'my_diy_config' =>env('MY_DIY_CONFIG','test_app'),
		3.使用 例如在Controllers中使用:
			use Illuminate\Support\Facades\Config;//引入包
			//code...
			$diyConfig = Config::get('app.my_diy_config');//使用
			//code...
	
	自动加载类
		使用场景:当某一个方法函数经常会被多个不同的类调用时.可做成自动加载的类,减少代码编写量
		1.创建文件 例如:在app/Libraries/function/functions.php (自定义)里面有如下代码:
			<?php 
			funcion abc(){
				return 'abc';
			}
		2.在工程 /bootstrap/autoload.php 中增加如下代码(对应自定义的文件目录):
			require __DIR__.'/../app/Libraries/function/functions.php';
		3.使用 例如在Controllers中使用
			直接使用方法名调用: $data = abc();
		
		
# <a id="数据库"></a>数据库

	与数据库交互的机制.
		http://www.golaravel.com/laravel/docs/5.0/eloquent/
	
	目录my_laravel/vendor/laravel/framework/src/Illuminate/Database/Eloquent/包含多文件,Model属于此包
	
	
	Eloguent 使用(增删改查):
		配置数据库信息
			my_laravel/.env
				DB_HOST=localhost
				DB_DATABASE=my_laravel
				DB_USERNAME=root
				DB_PASSWORD=root

		配置路由: 
			//http://localhost:8888/myDatabase 查看连接数据库是否成功
			Route::get('myDatabase',function(){
			    $name = DB::connection()->getDatabaseName();
			    echo $name;
			});

			//http://localhost:8888/myDatabase/add 增
			Route::get('myDatabase/add',function(){
			    $user = new App\User();
			    $user->userAdd();
			    return $user->userRead();
			});

			//http://localhost:8888/myDatabase/delete 删
			Route::get('myDatabase/delete',function(){
			    $user = new App\User();
			    $user->userDelete();
			    return $user->userRead();
			});

			//http://localhost:8888/myDatabase/update 改
			Route::get('myDatabase/update',function(){
			    $user = new App\User();
			    $user->userDelete();
			    return $user->userRead();
			});

			//http://localhost:8888/myDatabase/read 查
			Route::get('myDatabase/read',function(){
			    $user = new App\User();
			    return $user->userRead();
			});

			//http://localhost:8888/myDatabase/read_dd 查
			Route::get('myDatabase/read_dd',function(){
			    $user = new App\User();
			    $users = $user->all();
			    dd($users); // dd=> var_dump() ; and die(); 打印出数据类型与信息.
			    // $users->toArray();//转成数组
			    // $users->all();//返回数据库原型 , 默认调用了tojson();
			    // return $user->userRead();

			    //数组
			    $arr = ['one','two','three'];
			    $collection = collect($arr);
			    //查找数组是否包含对应的值
			    $bool = $collection->contains('one');
			    //取数组的前2个数据
			    $res = $collection->take(2);
			    //取后面两个数据
			    $res = $collection->take(-2);

			    //键值对
			    $arr = ['one'=>1,'two'=>2,'three'=>3];
			    $collection = collect($arr);
			    //查找是否有对应的键key
			    $bool = $collection->has('one');

			    return $collection->all();
			});

		创建模型:

			<?php namespace App;

			use Illuminate\Auth\Authenticatable;
			use Illuminate\Database\Eloquent\Model;
			use Illuminate\Auth\Passwords\CanResetPassword;
			use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
			use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;

			//Laravel的Model已经实现了一些对数据库的操作,如增删改查.
			class User extends Model implements AuthenticatableContract, CanResetPasswordContract {
				use Authenticatable, CanResetPassword;
				
				//数据库名 重写Model的数据库名
				protected $table = 'users';

				//表示那些数据库字段是可以被laravel填写.
				protected $fillable = ['username', 'age'];

				//表示这些字段是被保护的,存储数据库时不填写此数据(主键自动增长)
				protected $guarded = ['demo_id'];
				
				// 排除在模型的JSON形式的属性。如调用$this->all()生成的Json不生成在Json中的字段名
				protected $hidden = [];

				//修改默认的 id 主键名称
				protected $primaryKey = 'user_id';

				////model自带的方法 public static function all($columns = array('*')) 函数
				//详情见 my_laravel/vendor/laravel/framework/src/Illuminate/Database/Eloquent/Model.php
				//查询数据《-----------------------
				public function userRead(){
					//查询出所有数据
					//return $this->all();

					//查找user_id为1的数据 如果没有打到数据,返回的空数据
					//return $this->find(1);
					//如没有找到数据直接抛异常.查id为4的数据
					//return $this->findOrFail(4);

					//返回对应条件的数据 select * from users where username='comtu';
					//return $this->where('username','comtu')->get();

					//返回对应条件的数据 select * from users where user_id>1; 
					// return $this->where('user_id','>',1)->get();

					//查询出所有数据 等同于 $this->all();
					return $this->get();
				}

				//insert数据时model基类默认数据库中有时间戳字段,更新时间,创建时间
				//处理方式有两种,一种是为数据库中增加这两个字段`updated_at`, `created_at`
				//另一种是取消Model中的数据库时间戳字段如下:
				public $timestamps = false;

				//增加数据《-----------------------
				public function userAdd(){

					//增加数据方式1 
					//$this->username = 'user00000';
					//$this->age = 1;
					//$this->save();
					//增加数据后如果表是自动增长的可获取到增加后的id
					$id = $this->user_id;//新增加后的id值

					//增加数据方式2  批量赋值 
					//protected $fillable = ['username', 'age']; //需要有配置自动填充的字段
					$user_data = ['username'=>'user111','age'=>256];
					$this->fill($user_data);
					$this->save();
				}

				//更新数据《-----------------------
				public function userUpdate(){
					//修改对应的数据 方式一
					//$user = $this->find(1);//查询-》保存
					//$user->username = 'comtu0000';
					//$user->age = '512';
					//$user->save();

					//修改对应的数据 方式二
					$users = $this->where('user_id','<','3'); //查询-》更新
					//更新不需要调用save()
					$users->update(['username'=>'comtu1111','age'=>1024]);
				}

				//删除数据《-----------------------
				public function userDelete(){
					$user = $this->find(3);//查询-》删除
					$user->dalete();
				}
			}
	
		Demo:
			模型:
				<?php namespace App\Model;
				use Illuminate\Database\Eloquent\Model;

				class Person extends Model  {

				     //数据库表
				    protected $table = 'person';
				    //修改默认的 id 主键
				    protected $primaryKey = 'pid';

				    //表示那些字段是可以被laravel填写的.fill()
				    protected $fillable = ['name', 'sex','age','salary','occ_id','dep_id'];

				    //表示这些字段是被保护的,存储数据库时不填写此数据
				    protected $guarded = ['pid'];

				    //生成JSON时隐藏的字段
				    protected $hidden = [];

				    //insert数据时model基类默认数据库中有时间戳字段,更新时间,创建时间
				    //处理方式有两种,一种是为数据库中增加这两个字段`updated_at`, `created_at`
				    //另一种是取消Model中的数据库时间戳字段如下:
				    public $timestamps = false;

				    //表结构对应关系 occupation另外一张表app/model/occupation.php
				    public function occupation(){
					return $this->hasOne('App\Model\occupation', 'occ_id', 'occ_id');
				    }

				    //表结构对应关系
				    public function department(){
					return $this->hasOne('App\Model\department', 'dep_id', 'dep_id');
				    }
				}

			控制器:
				app/Http/Controllers/DemoDataBaseController.php
					<?php namespace App\Http\Controllers;
					use App\Http\Requests;
					use App\Http\Controllers\Controller;

					use App\Model\Occupation;
					use App\Model\Department;
					use App\Model\Person;
					use Illuminate\Support\Facades\Input;
					use Illuminate\Support\Facades\Request;
					use Illuminate\Support\Facades\Session;


					class DemoDataBaseController extends Controller{

					    public function index() {
						//$data['person'] = Person::find(array('1'));//简单条件查询 select * from person where id = 1;
						//$data['person'] = Person::whereRaw('pid > 1 and salary > 1700')->get();//条件查询全部

						//连表查询~~需要在Person里面配置表的关系
						$data['person'] = Person::with('occupation', 'department')->paginate(10);//连表查询并 paginate分页功能,每页10条.
						//$data['person'] = Person::with('occupation','department')->get();//连表查询 //只能使用get,all获取不到数据
						//<?php foreach ($person as $v):?>//视图中获取连表的数据
						//<?php echo $v['occupation']->name;?> 
						//<?php endforeach;?>
						$data['count']  =  Person::all()->count();
						$data['occupation'] = Occupation::get();//查询全部
						$data['department'] = Department::all();//查询全部

						return view('demo.demo_index_database',$data);
					    }

					    public function addPerson(){
						$data['occupation'] = Occupation::get();//查询全部
						$data['department'] = Department::all();//查询全部
						return view('demo.demo_add_update_database',$data);
					    }

					    public function postAddPerson(){
						$person = new Person();
						//增加数据方式2
						$person->name = Request::input('name', 'default');//获取Post请求的数据
						$person->age = Request::input('age', 20);
						$person->sex = Request::input('sex', 0);
						$person->salary = Request::input('salary', 1800);
						$person->occ_id = Request::input('occ_id');
						$person->dep_id = Request::input('dep_id');
						$person->save();
						//$person->pid; 可获取到增加后的自动增长id.
						return redirect('myDatabase/Demo');
					    }

					    public function deletePerson($rid,$_token = ''){
						if(Session::token() !== $_token) {
						    echo '非法请求';
						    return;
						}

						$person = Person::find($rid);
						$person->delete();
						return redirect('myDatabase/Demo');
					    }

					    //http://localhost/myDatabase/DemoUpdatePerson?pid=6&_token=7jcZiP2wv0nIpxrA4KUqn9sBRaU7YXpcc8M0zrue
					    public function updatePerson(){
						$_token = Input::get('_token');//获取get请求的数据
						if(Session::token()!=$_token){
						    echo '非法请求';
						    return ;
						}
						$pid = Input::get('pid');

						$data['person'] = Person::find($pid);
						$data['occupation'] = Occupation::all();//查询全部
						$data['department'] = Department::get();//查询全部
						return view('demo.demo_add_update_database',$data);
					    }

					    public function postUpdatePerson(){
						$person = Person::find(Request::input('pid'));
						if(!$person){
						    echo '修改错误';
						    return;
						}

						//修改数据方式
						$person->name = Request::input('name');
						$person->age = Request::input('age');
						$person->sex = Request::input('sex');
						$person->salary = Request::input('salary');
						$person->occ_id = Request::input('occ_id');
						$person->dep_id = Request::input('dep_id');
						$person->save();
						return redirect('myDatabase/Demo');
					    }
					}
			
			路由:
				app/Http/routes.php

					//显示列表 http://localhost/myDatabase/Demo
					Route::get('myDatabase/Demo','DemoDataBaseController@index');
					//增加数据
					Route::get('myDatabase/DemoAddPerson','DemoDataBaseController@addPerson');
					Route::post('myDatabase/DemoAddPerson','DemoDataBaseController@postAddPerson');
					//删除数据 使用函数参数方式并参数使用正则匹配.
					Route::get('myDatabase/DemoDeletePerson/{pid}/{_token}','DemoDataBaseController@deletePerson')->where(['pid' => '[0-9]+']);
					//更新数据 此处使用获取get请求的方式获取数据
					Route::get('myDatabase/DemoUpdatePerson','DemoDataBaseController@updatePerson');
					Route::post('myDatabase/DemoUpdatePerson','DemoDataBaseController@postUpdatePerson');

					//scrf验证
					Route::filter('csrf',function(){
					    if (Session::token() !== Input::get('_token')) {
						throw new Illuminate\Session\TokenMismatchException;
					    }
					});

			视图:
				resources/views/demo/demo_index_database.blade.php 显示列表
					<html>
					<head>
					    <meta charset="utf-8">
					    <title>MyView</title>
					    <link rel="stylesheet" href="/css/style.css">
					</head>
					<body>
					@include('components.myHead')

					<h1>resources/views/demo_database.blade.php</h1>

					调用函数@{{csrf_token}} 跨站点请求伪造保护码
					{{csrf_token()}} 等同于 <?php echo csrf_token();?>

					<table   border="1px" cellpadding="2px"  cellspacing="1px" bgcolor="#FFFFF0">
					    <tr align="center">
						<td>pid(count:{{$count}})</td>
						<td>name</td>
						<td>age</td>
						<td>sex</td>
						<td>salary</td>
						<td>occ_id</td>
						<td>dep_id</td>
						<td>操作</td>
					    </tr>
					    @foreach($person as $p)
					    <tr align="center">
						<td>{{$p->pid}}</td>
						<td>{{$p->name}}</td>
						<td><?php echo $p->age?></td>
						<td>{{$p->sex==0?'男':'女'}}</td>
						<td>{{$p->salary}}</td>
						<td>{{$p->occupation->name}}</td><!--连表查询,预载入的关联对象-->
						<td>{{$p->department->name}}</td>
						<td><a href="{{url('myDatabase/DemoUpdatePerson?pid='.$p->pid.'&_token='.csrf_token())}}">修改</a> &nbsp <a href="{{url('myDatabase/DemoDeletePerson').'/'.$p->pid .'/'.csrf_token()}}">删除</a></td>
					    </tr>
					    @endforeach

					    @if($person->render())
					    <tr ><td colspan="9" align="center" width="100%"><?php echo $person->render(); ?><!--分页--></td></tr>
					    @endif
					</table>

					<div style="clear: both"></div>

					<a href="{{url('myDatabase/DemoAddPerson')}}">增加</a>

					<hr>

					</body>
					</html>
				
				resources/views/demo/demo_add_update_database.blade.php 增加/修改页
					<html>
					<head>
					    <meta charset="utf-8">
					    <title>{{empty($person)?'增加':'更新'}}数据</title>
					    <link rel="stylesheet" href="/css/style.css">
					</head>
					<body>

					<form action="{{empty($person)?url('myDatabase/DemoAddPerson'):url('myDatabase/DemoUpdatePerson')}}" method="post" >
					    <input type="hidden" name="_token" value="{{csrf_token()}}">
					    <?php echo empty($person)?'':'<input type="hidden" name="pid" value="'.$person->pid.'">' ;?>
					    <table border="1px" cellpadding="2px"  cellspacing="1px" bgcolor="#FFFFF0">
						<tr><td>名称</td><td><input type="text" name="name" value="{{empty($person)?'':$person->name}}"/></td></tr>
						<tr><td>年龄</td><td>
							<select name="age" >
							    @for ($i = 1; $i <= 110; $i++)
								<option value="{{ $i }}" <?php echo $i==(empty($person)?24:$person->age) ?'selected="selected"':''?>>{{ $i }}</option>
							    @endfor
							</select>
						    </td></tr>
						<tr><td>性别</td><td>
							<select name="sex">
							    <option value="0" <?php echo empty($person)?'selected="selected"':$person->sex==0?'selected="selected"':''?>>男</option>
							    <option value="1" <?php echo empty($person)?'':$person->sex==1?'selected="selected"':''?>>女</option>
							</select>
						    </td></tr>
						<tr><td>薪资</td><td><input type="text" name="salary" value="{{empty($person)?'':$person->salary}}" /></td></tr>
						<tr><td>职业</td><td>
							<select name="occ_id">
							    @for($i = 0 ; $i< count($occupation);$i++)
								<option value="{{$occupation[$i]->occ_id}}" <?php echo empty($person)?'':$occupation[$i]->occ_id==($person->occ_id)?'selected="selected"':''?>>{{$occupation[$i]->name}}</option>
							    @endfor
								{{--@foreach($occupation as $occ)--}}
								{{--<option   value="{{$occ->occ_id}}" >{{$occ->name}}</option>--}}
								{{--@endforeach--}}
							</select>
						    </td></tr>
						<tr><td>部门</td><td>
							<select name="dep_id" >
							    @for($i = 0 ; $i< count($department);$i++)
								<option value="{{$department[$i]->dep_id}}" <?php echo empty($person)?'':$department[$i]->dep_id==($person->dep_id)?'selected="selected"':''?>>{{$department[$i]->name}}</option>
							    @endfor
							    {{--@foreach($department as $dep)--}}
								{{--<option value="{{$dep->dep_id}}" >{{$dep->name}}</option>--}}
							    {{--@endforeach--}}
							</select>
						    </td></tr>
						<tr><td colspan="2" align="center"><input type="submit" value="{{empty($person)?'增加':'更新'}}">&nbsp<input type="reset" value="重置"></td></tr>
					    </table>
					</form>

					</body>
					</html>

# <a id="请求"></a>请求

	Demo:
		控制器:
			app/Http/Controlers/DemoMyRequestController.php 
				<?php namespace App\Http\Controllers;

				use App\Http\Requests;
				use App\Http\Controllers\Controller;

				use Illuminate\Support\Facades\Input;
				use Illuminate\Support\Facades\Request;
				use Illuminate\Support\Facades\Session;

				class DemoMyRequestController extends Controller{

				    //请求
				    public function myrequest(){
					//获取表单发送过来的所有数据,不管是get,post还是其它请求的数据.
					$input = Request::all();//返回json数据
					var_dump($input);
					echo '<br>';

					$value = Request::query();//获取get请求?后面的所有参数
					var_dump($value);
					echo '<br>';
					$value = Request::query('name');//获取get请求后面的指定参数
					var_dump($value);
					echo '<br>';

					//get请求方式,如果没有name键则取默认值comtu
					$value = Request::get('name','comtu');
					var_dump($value);
					echo '<br>';

					//-----判断-------
					//判断参数是否存在返回布尔值
					$bool = Request::has('name');
					var_dump($bool);
					echo '<br>';

					//http://localhost/myrequest?name=&age=11
					//检查是否存在键,有则返回true,不检查键对应的值是否存在.
					$bool = Request::exists('name');
					var_dump($bool);
					echo '<br>';

					//-------请求检索-------
					//过滤值,只取对应的键值
					$value = Request::only('name');
					var_dump($value);
					echo '<br>';
					$value = Request::only('name','age');//如果有多个参数,则只取这两个值
					var_dump($value);
					echo '<br>';

					//过滤值,除了对应的键不取,其它数据获取,用法与only类似
					$value = Request::except('name');
					var_dump($value);
					echo '<br>';

					//-----------url---------
					//返回请求的url前缀_不包括参数
					$url = Request::url();
					var_dump($url);
					echo '<br>';

					//返回请求的全部url_包含参数
					$url = Request::fullUrl();
					var_dump($url);
					echo '<br>';

					//----------请求历史----------
					//将请求的所有数据存储到session数据中.
					Request::flash();
					//Request::flashOnly('name');//只存储指定的键值
					//Request::flashExcept('name');//除了指定的键值,其它都存储

					//返回上一次请求的数据,可在不同页面中获取,前提是需要调用了Request::flash()
					$value = Request::old();//可用于保存用户提交失败时恢复历史数据的功能
					var_dump($value);

					/*
					请求: http://localhost/myrequest?name=comtu&age=11

					array(2) { ["name"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					array(2) { ["name"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					string(5) "comtu"
					string(5) "comtu"
					bool(true)
					bool(true)
					array(1) { ["name"]=> string(5) "comtu" }
					array(2) { ["name"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					array(1) { ["age"]=> string(2) "11" }
					string(26) "http://localhost/myrequest"
					string(44) "http://localhost/myrequest?age=11&name=comtu"
					array(2) { ["name"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					*/

					/*
					  请求http://localhost/myrequest?nae=comtu&age=11
					array(2) { ["nae"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					array(2) { ["nae"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					NULL
					string(5) "comtu"
					bool(false)
					bool(false)
					array(1) { ["name"]=> NULL }
					array(2) { ["name"]=> NULL ["age"]=> string(2) "11" }
					array(2) { ["nae"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					string(26) "http://localhost/myrequest"
					string(43) "http://localhost/myrequest?age=11&nae=comtu"
					array(2) { ["name"]=> string(5) "comtu" ["age"]=> string(2) "11" }
					*/
				    }

				    //显示上传页面
				    public function uploadFile(){
					return view('demo.demo_index_MyRequest');
				    }

				    //提交上传数据
				    public function postUploadFile(){
					//返回post上来的数据 返回数组
					var_dump(Request::file());
					echo '<br>'; echo '<br>';

					//返回对象
					var_dump(Request::file('my_file'));
					echo '<br>'; echo '<br>';

					//返回布尔值,是否包含文件
					$bool = Request::hasFile('my_file');
					var_dump($bool);
					echo '<br>'; echo '<br>';

					//返回文件大小
					$size = Request::file('my_file')->getClientSize();
					var_dump($size);
					echo '<br>'; echo '<br>';

					//返回上传时的文件名
					$name = Request::file('my_file')->getClientOriginalName();
					var_dump($name);
					echo '<br>'; echo '<br>';

					//返回文件格式
					$extension = Request::file('my_file')->getClientOriginalExtension();
					var_dump($extension);
					echo '<br>'; echo '<br>';

					//判断上传的文件是否有效
					if (Request::file('my_file')->isValid()){
					    //移动上传的文件到指定目录 人在public目录下自动创建uploads目录并把文件存储到当前目录中.
					    $destinationPath = 'uploads/';
					    Request::file('my_file')->move($destinationPath, uniqid().'.'.$extension); //md5 uniqid 唯一标识
					}
				    }


				}
		
		路由:
			app/Http/routes.php	

				//http://localhost/myrequest
				//http://localhost/myrequest?name=&age=11
				//http://localhost/myrequest?name=comtu&age=11
				//http://localhost/myrequest?na2me=comtu&age=11
				Route::any('myrequest','DemoMyRequestController@myrequest');

				//文件上传
				Route::any('uploadFile','DemoMyRequestController@uploadFile');
				Route::post('uploadFile','DemoMyRequestController@postUploadFile');

		视图:
			resources/views/demo/demo_index_MyRequest.blade.php
				<html>
				<head>
				    <meta charset="utf-8">
				    <title>MyView</title>
				    <link rel="stylesheet" href="/css/style.css">
				</head>
				<body>
				{{--<form action="uploadFile" method="post" enctype="application/x-www-form-urlencoded">--}}
				    <form action="uploadFile" method="post" enctype="multipart/form-data">
				    <input type="hidden" name="_token" value="{{csrf_token()}}">
				    <fieldset style="width:230px" >
					<legend>上传文件</legend>
					选择文件:<input type="file" name="my_file" multiple />  <br />
					{{--选择文件:<input type="file" name="my_file" />  <br />--}}
					<input type="submit" value="提交" />
				    </fieldset>
				</form>
				</body>
				</html>

# <a id="Session"></a>Session
	
	方式一:使用文件.(默认)
		.env文件中配置Session存储方式
			CACHE_DRIVER=file
			SESSION_DRIVER=file
			QUEUE_DRIVER=sync

	方式二:使用数据库
		.env文件中配置Session存储方式
			CACHE_DRIVER=file
			SESSION_DRIVER=database
			QUEUE_DRIVER=sync
		使用PHPStorm自带的lerminal工具或者计算机命令行cmd定位到项目目录下.
		
		使用命令生成数据库表:
			php artisan session:table
			
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel>php artisan session:table

			当输出 Migration created successfully!时 
			可查看到database/migrations目录下会新创建一个PHP文件类名为CreateSessionTable

			再输入 composer dump-autoload
				当输出 Generating autoload files 表示成功.

			再输入 php artisan migrate	
				当输出如下表示成功
				Migrated: 2015_11_02_092311_create_session_table

			查看数据库表多了一个sessions表
				里面有id , payload , last_activity 三个字段
			注: 执行php artisan migrate时有异常可查看"我遇到的错误解决问题"

			
			生成表之后就可以使用Session了`~增删改查都无需要人工控制.

	控制器
		app/Http/Controlers/DemoSessionController.php
			<?php namespace App\Http\Controllers;
			use App\Http\Controllers\Controller;
			use Illuminate\Support\Facades\Session;
			class DemoSessionController extends Controller{

			    public function session(){
				//查看全部Session数据
				var_dump(Session::all());

				/*
				 起初Session就有默认值
				_previous : 上一次请求的地址
				flash: 保存的数据
				old:历史数据
				new:新数据
				例:
				 array:3 [▼
				  "_token" => "7jcZiP2wv0nIpxrA4KUqn9sBRaU7YXpcc8M0zrue"
				  "_previous" => array:1 [▼
				    "url" => "http://localhost/uploadFile"
				  ]
				  "flash" => array:2 [▼
				    "old" => []
				    "new" => []
				  ]
				]
				 */
				echo '<br>'; echo '<br>';

				//增加/修改Session _ 方式一
				Session::put('username','comtu');

				//增加Session _ 方式二
				session(['username'=>'comtu1']);

				//获取值_不删除
				$username = Session::get('username');
				//获取值_后删除_只用一次
				$username = Session::pull('username');
				var_dump($username);
				echo '<br>'; echo '<br>';

				//判断是否存在
				$bool = Session::has('username');
				var_dump($bool);

				//删除Session值
				$value = Session::forget('username');
				var_dump($value);
			    }
			}

	路由
		app/Http/routes.php	
			Route::any('session','DemoSessionController@session');

# <a id="表单验证"></a>表单验证

	需要引入use Request,Validator; 包
	$validator = Validator::make(数据,规则,自定义错误信息);
	$validator->fails();验证表单
	$validator->errors();//获取错误信息

	例:修改8.数据库中的Demo
	    public function postAddPerson(){
		//存储提交数据到Session
		Request::flash(); //见9.请求

		//必填 required
		//长度 between:最小,最大
		//最小长度 min:4
		//最大长度 max:16
		//数字 numeric
		//唯一性 unique:表名 会自动查询表对应字段是否存在有当前值
		//检查值是否在table表中column字段中存在 exists:table,column 自动查询table表column字段是否包含值
		//更多配置 http://laravel-china.org/docs/5.0/validation

		//表单验证请求
		$rq = Request::all();
		$rules = [//规则
		    'name' => 'required|between:4,16|unique:person' ,
		    'age' => 'required|numeric',
		    'sex' => 'required|numeric',
		    'salary' => 'required|numeric',
		   'occ_id' => 'required|numeric|exists:occupation,occ_id',
			'dep_id' => 'required|numeric|exists:department,dep_id',
		];
		$messages = [//自定义错误信息
		    'required' => 'The :attribute field is required.',
		    'between' => 'The :attribute must be between :min - :max.'
		];
		$validator = Validator::make($rq,$rules,$messages);//可三个参数
		//$validator = Validator::make($rq,$rules);//可两个参数

		if($validator->fails()){//表单验证
		    $person = new Person();//重新封装历史数据
		    $person->name = Request::old()['name'];//表单验证失败,返回用户之前输入的信息
		    $person->age = Request::old()['age'];
		    $person->sex = Request::old()['sex'];
		    $person->salary = Request::old()['salary'];
		    $person->occ_id = Request::old()['occ_id'];
		    $person->dep_id = Request::old()['dep_id'];

		    $data ['person'] = $person;
		    $data['occupation'] = Occupation::get();
		    $data['department'] = Department::all();
		    //错误信息 Illuminate\Support\MessageBag 对象类型 head($validator->get('key'))获取键值
		    $data['validator'] = $validator->errors();
		    return view('demo.demo_add_update_database',$data);
		}

		$person = new Person();
		//增加数据方式2
		$person->name = Request::input('name', 'default');//获取Post请求的数据
		$person->age = Request::input('age', 20);
		$person->sex = Request::input('sex', 0);
		$person->salary = Request::input('salary', 1800);
		$person->occ_id = Request::input('occ_id');
		$person->dep_id = Request::input('dep_id');
		$person->save();
		return redirect('myDatabase/Demo');
	    }

# <a id="中间件"></a>中间件

	HTTP 中间件提供一个方便的机制来过滤进入应用程序的 HTTP 请求，
	例如，Laravel 默认包含了一个中间件来检验用户身份验证，如果用户没有经过身份验证，
	中间件会将用户导向登录页面，然而，如果用户通过身份验证，中间件将会允许这个请求进一步继续前进。

	当然，除了身份验证之外，中间件也可以被用来执行各式各样的任务，CORS 中间件负责替所
	有即将离开程序的响应加入适当的响应头，一个日志中间件可以记录所有传入应用程序的请求。 
	Laravel 框架已经内置一些中间件，包括维护、身份验证、CSRF 保护，等等。
	所有的中间件都位于 app/Http/Middleware 目录内。

	使用步骤
		1.创建中间件
			使用命令: php artisan make:middleware AdminPrivilegeMiddleware
			在app/Http/Middleware文件夹中创建中间件文件
			如:AdminPrivilegeMiddleware.php
				<?php
				namespace App\Http\Middleware;
				use Closure;
				use Illuminate\Support\Facades\Session;
				class AdminPrivilegeMiddleware
				{
				    /**
				     * Handle an incoming request.
				     * @param  \Illuminate\Http\Request  $request
				     * @param  \Closure  $next
				     * @return mixed
				     */
				    public function handle($request, Closure $next)
				    {
					//权限认证
					$bool = Session::has('admin_user');
					if(!$bool)
					    return redirect('admin/privilege/login');
					return $next($request);
				    }
				}
		2.注册中间件 
			在app/Http目录下的Kernel.php增加如下内容
			 protected $routeMiddleware = [
				//注册中间件
				'auth.admin' => \App\Http\Middleware\AdminPrivilegeMiddleware::class,
			 ];
		3.使用中间件
			在app/Http目录下的routes.php使用:
			//中间件,权限控制
			Route::group(['middleware' => 'auth.admin'], function() {
				Route::get('admin/main/index','admin\MainController@index');
				Route::get('admin/categroy/index','admin\CategroyController@index');
			}

# <a id="哈希"></a>哈希

	可用于加密用户的敏感信息或者密码
	需要导入 use Illuminate\Support\Facades\Hash; 包
	使用方法: 
		$password = '123';
		$pass = Hash::make($password);//加密
		$password2 = '123';
		$bool = Hash:check($pass,$password2);检查是否相同

# <a id="辅助函数"></a>辅助函数

	array 数组相关

		head
			$arr = [1,2,3];
			$value = head($arr);//打印1 返回数组第一个元素
		
		last 
			$arr = [1,2,3];
			$value = last($arr);//打印3 返回数组第一个元素

		array_only
			$arr = ['name'=>'comtu','age'=>10,'job'=>'manager'];
			$value = array_only($arr,['name','age']);//返回数组中指定的数据
			//打印 array(2) { ["name"]=> string(5) "comtu" ["age"]=> int(10) } 

		array_first //返回满足条件的第一条数据
			$arr = [10,20,30];
			$value = array_first($arr,function($key,$v){
				return $v >10; 
			});
			//打印 20

		array_add
			$arr = ['name'=>'comtu','age'=>10];
			$value = array_add($arr,'job','manager');//给数组增加字段 
			// 返回 ['name'=>'comtu','age'=>10,'job'=>'manager']

		array_set //修改数组中对应的值
			$arr = ['start_time'=>'2009-06-01','end_time'=>'2014-11-30'];
			array_set($rq,'start_time',strtotime(Request::input('start_time')));  //strtotime时间转时间戳
			//返回 ['start_time'=>1243814400,'end_time'=>'2014-11-30'];;

		array_except
			$arr = ['name'=>'comtu','age'=>10,'job'=>'manager'];
			$value = array_except($arr,'job');//返回数组中除指定键后的数据 
			//返回 ['name'=>'comtu','age'=>10]

		array_flatten
			$arr = [
				'a' =>1,
				'b' =>[
					'a'=>2,
					'b'=>3
					]
				];
			$value = aray_flatten($arr);//返回$arr内的所有值 
			//返回 array(3) { [0]=> int(1) [1]=> int(2) [2]=> int(3) } 

		array_where
			$arr = ['name' => 'comtu','age'=>18,'job'=>'manager'];
			$value = array_where($arr,function($k,$v){
				return is_string($v);
			});//返回满足条件的新数组 返回全是String类型的数据
			//返回 ['name' => 'comtu','job'=>'manager']
	
	Path 辅助函数
		echo app_path();// 项目绝对路径 项目绝对路径
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel\app

		echo config_path(); 项目下的配置目录的绝对路径
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel\config

		echo public_path(); 项目下的public目录的绝对路径
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel\public

		echo storage_path(); 项目下的storage目录的绝对路径
			E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\my_laravel\storage


	字符串 辅助函数
		str_plural 单词单数变复数
			例如 $value = str_plural('apple'); //返回apples
			     $value = str_plural('sheep');// 返回sheep 
			     $value = str_plural('ability');// 返回abilities

		starts_with
			//字符串是否是与指定的内容开头
			var_dump( starts_with('abcd','ab'));//返回true

		ends_with
			//字符串是否是与指定的内容结束
			var_dump( ends_with('abcd','b'));//返回false

		camel_case
			//将字符串替换成驼峰命名法
			echo camel_case('hello_world');//返回helloWorld

		class_basename
			//返回 命名空间的类名
			echo class_basename('App\Controller\DemoDataBaseController');//返回DemoDataBaseController

		str_limit
			//限制字符串的长度_返回指定长度的字符串
			echo str_limit('abcdefg',3);//返回abc... 后面有省略号
			
		str_is
			//判断字符串是否满足条件 是否是与ab开头e结尾_参数一是条件,参数二是判断的值
			var_dump(str_is('ab*e','abcde')); //返回true

# <a id="图片处理库Integration/Image"></a>在 Laravel 中使用图片处理库 Integration/Image 

	系统需求

		 PHP >= 5.3
		 Fileinfo Extension
		 GD Library (>=2.0) … or …
		 Imagick PHP extension (>=6.5.7)

	安装部署 Integration/image

		在 composer.json [require] 节增加""intervention/image": "2.*""，之后执行 composer update 我当时下载的是2.3.2
		
		如果出现错误信息: (PHP版本5.5.28)
				E:\ComTu_Design\PHP\Apache2.2\htdocs\firstPHPStorm\myLaravelShop>composer update
				> php artisan clear-compiled
				Loading composer repositories with package information
				Updating dependencies (including require-dev)
				Your requirements could not be resolved to an installable set of packages.

				  Problem 1
				    - Installation request for intervention/image 2.0.17 -> 
						satisfiable by intervention/image[2.0.17].
				    - intervention/image 2.0.17 requires ext-fileinfo * -> 
						the requested PHP extension fileinfo is missing from your system.
			解决方法:
				找到PHP环境目录 --> 打开 php.ini 文件 找到 ;extension=php_fileinfo.dll (PHP5.5.28-nts 862行) 
				去除前面的;号~~重新运行即可. 会在后台下载,等待.

	Laravel 配置

		安装部署 Integration/image 完成后，打开配置文件 config/app.php 在相应位置添加代码，
		然后 Image 类就能自动加载并可供使用了。其功能强大到可以处理你的几乎所有图片处理需求。
			//服务提供器 Laravel 5.1.23 	在 providers  中配置
			 Intervention\Image\ImageServiceProvider::class,

			//别名配置 Laravel 5.1.23  在 aliases 中配置 
			'Image'     => Intervention\Image\Facades\Image::class,

	配置设置
		默认情况下， Integration/Image 使用PHP的GD库扩展。
		如果你想切换到 imagick，你可以使用 php artisan 创建一个配置文件以添加相应的配置。
		$ php artisan config:publish intervention/imag

	基本使用

		这里列出几个基本功能，更详细使用说明请查看相关接口文档。
		文档地址: http://image.intervention.io/  墙
		
			Demo
			//1、显示一张图片
			Route::get('imageRead',function(){
			    $img = Image::make(public_path().'/uploads/43195301.jpg');//读取图片
			    return $img->response();//返回图片资源在浏览器中显示
			});

			//2、创建缩略图
			Route::get('imageThumbnail',function(){
			    if (!file_exists(public_path().'/uploads/thumbnail')){ //创建文件夹
				mkdir (public_path()."/uploads/thumbnail");
			    }

			    $rawFilePath = public_path().'/uploads/43195301.jpg';
			    $thumbnailFilePath = public_path().'/uploads/thumbnail/'.uniqid().'.jpg';

			    //生成缩略图
			    $img = Image::make($rawFilePath);//读取图片文件
			    $img->resize(120,120);//缩略图大小 宽/高
			    $img->save($thumbnailFilePath);//需要保存在已有的目录中
			    echo $rawFilePath.'生成缩略图到'.$thumbnailFilePath;
			});

			//3、绘制一张图片
			Route::get('imageCanvas',function(){
			    $img = Image::canvas(800, 600, '#ccc');
			    return $img->response();
			});

			//4.插入一个水印
			Route::get('imageInsert',function(){
			    $rawFilePath = public_path().'/uploads/43195301.jpg';
			    $watermark = public_path().'/uploads/563b24c067472.jpg';//水印
			    //top-left (default)
			    //top
			    //top-right
			    //left
			    //center
			    //right
			    //bottom-left
			    //bottom
			    //bottom-right
			    // $img->insert($watermark, 'bottom-right', 10, 10);//其它位置
			    // $img->insert($watermark, 'center');//中间
			    $img = Image::make($rawFilePath)->resize(800, 600)->insert($watermark);//打水印,默认左上角

			    return $img->response();
			});
		
	
		如果运行时页面中出现如下错误:
			NotSupportedException in Driver.php line 18:
			GD Library extension not available with this PHP installation.
			in Driver.php line 18
			at Driver->__construct() in ImageManager.php line 107
			at ImageManager->createDriver() in ImageManager.php line 50
			at ImageManager->make('/public/uploads/43195301.jpg') in Facade.php line 214
			....
		解决方案
			开启PHP的GD功能
			找到PHP环境目录 --> 打开 php.ini (PHP5.5.28-nts 863行) 文件 
			找到 ;extension=php_gd2.dll 去除前面的;号~~重新启动服务运行即可. 

# <a id="我遇到的错误"></a>我遇到的错误
	
	链接数据库时异常.
		//路由中,尝试连接数据库
		Route::get('myDatabase',function(){
		    $name = DB::connection()->getDatabaseName();
		    echo $name; //打印出 数据库名 my_laravel 表示成功
		});

		PDOException in Connector.php line 47:
		could not find driver
		in Connector.php line 47
		at PDO->__construct('mysql:host=localhost;dbname=my_laravel',
		'root', 'root', array('0', '2', '0', false, false)) in Connector.php line 47
		.....

		解决办法:
		php环境中找到 php.ini文件并找到 ;extension=php_pdo_mysql.dll 
		并去除前面的;号.然后重启服务器.如apache 或者 关闭服务重新启动服务 php -S localhost:80 -t my_laravel\public

	Session生成数据库表异常
		错误原因1.可能存在冲突的表原因.
			database/migrations 目录下的文件是需要生成的表.
			如果出现错误警告,可查看当前目录下的文件是否是自己需求要创建的表.
			如果里面存在冲突的表,如我当时有两个users表
			查打开查看文件是否是自己的内容.如果不是.~~可删除文件,需要注意的是
			删除后需要在	my_laravel/vendor/composer/autoload_classmap.php 
			文件中找到相同的一条记录一并删除重新执行即可.

	还有遇到的一些错误见功能模块,有解决方案

# <a id="artisan命令"></a>artisan命令
	
	谨慎操作还原回清静 php artisan fresh
		
	创建控制器
		php artisan make:controller MyController
	
	创建model
		php artisan make:model User

	查看当前所有路由列表
		php artisan route:list

	一整个程序停止解析(使用场景如,网站遇到攻击,网站需要维护等)
		配置后访问网站的所有地址都会被跳转到Beright back
		php artisan down 
		php artisan up

	生成Session数据库表
		php artisan session:table  //1
		composer dump-autoload     //2
		php artisan migrate        //3
	
	创建中间件
		php artisan make:middleware MyMiddleware



英文文档   
[http://laravel.com/docs/5.1](http://laravel.com/docs/5.1)   

中文文档:     
[http://www.golaravel.com/](http://www.golaravel.com/)   
[http://laravel-china.org/docs/5.0/middleware](http://laravel-china.org/docs/5.0/middleware)   
[http://www.golaravel.com/post/install-and-run-laravel-5-x-on-windows/](http://www.golaravel.com/post/install-and-run-laravel-5-x-on-windows/)   

# <a id="Demo"></a>Demo下载

本博文的案例Demo下载地址如下:

[本文案例Demo](/res/file/blog/2015/10/10/PHP_Laravel/laravel-v5.0.22_Demo.rar)

[本文案例Demo_购物商场](/res/file/blog/2015/10/10/PHP_Laravel/myLaravelShop_Demo.rar)

刚学PHP的两个框架Laravel与CI,个人对这两个框架的感觉如下~

| |Laravel|Codeigniter
|---|:---|---:|:---:|
|开发效率|★★★★|★★★
|运行效率|★★★|★★★★
|学习成本|★★☆|★


