---
layout : post
title : "PHP学习笔记-CI框架"
category : PHP
duoshuo: true
date : 2015-09-10
tags : [PHP ,CI, CodeIgniter ]
---

本人因公司需求.学习PHP的CI框架.本博文为学习笔记.   
CodeIgniter 是一套给 PHP 网站开发者使用的应用程序开发框架和工具包。   
它提供一套丰富的标准库以及简单的接口和逻辑结构，其目的是使开发人员更快速地进行项目开发。   
使用 CodeIgniter 可以减少代码的编写量，并将你的精力投入到项目的创造性开发上。

其中内容包括,CI_Controller对象 , 数据库访问 , AR模型(QB模型) , CI类库扩展 ,     
Url相关函数 , 设置路由 , 隐藏入口文件, 分页 , 文件上传 , Session , 验证码 , 语言包 等内容.

<!-- more -->


目录

* [CodeIgniter框架简介](#CodeIgniter框架简介)
* [MVC](#MVC)
	* [控制器-controllers](#控制器-controllers)
	* [视图-views](#视图-views) 
	* [模型-model](#模型-model)
* [CI的超级对象-(CI的控制器对象CI_Controller)](#CI的超级对象-(CI的控制器对象CI_Controller))
* [数据库访问](#数据库访问)
* [AR模型操作数据库增删改查 active_record (CI3.0之后改名 query_builder QB模型)](#AR模型操作数据库)
* [CI类库扩展](#CI类库扩展)
* [url相关函数](#url相关函数)
* [设置路由](#设置路由)
* [隐藏入口文件-index.php](#隐藏入口文件-index.php)
* [分页](#分页)
* [文件上传](#文件上传)
* [Session](#Session)
* [验证码](#验证码)
* [语言包](#语言包)

------------------------------------------
  

注:测试版本为CodeIgniter3.0.0框架 与CI2.x的有些不同.   
但都有标注不同点以及处理方法.笔记理论上基本适用于3.0.0(当前最新)之前的版本.  

中文教程地址:    
[http://codeigniter.org.cn/user_guide/index.html](http://codeigniter.org.cn/user_guide/index.html)

# <a id="CodeIgniter框架简介"></a>CodeIgniter框架简介 ( CI框架 ) 

	CodeIgniter是一个轻量级但功能强大的PHP框架是基于MVC设计模式.

	目录结构说明:
	    license.txt许可协议
	    user_guide 用户手册
	    system 框架目录
	    application 应用目录
	    index.php 入口文件

# <a id="MVC"></a>MVC 

	1. 入口文件 
		唯一一个让浏览器直接请求的脚本文件

	2. 控制器 controller
		协调模型和视图

	3. 模型 model 
		提供数据,保存数据,数据有效性认证

	4. 视图 view
		只负责显示,以及表单...

	5. 动作 action 
		是控制器中方法,用户被浏览器直接请求

	访问url使用的是pathinfo //http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/welcome/test  test是welcome的一个方法
	
	入口文件.php/控制器/动作

	application 应用目录
		controllers 控制器
		models 模型
		views 视图

	默认控制器是welcome
	默认动作是index 

# <a id="控制器-controllers"></a>控制器-controllers

	1.不需要加后缀 , 直接是类名.php (自己编写的控制器需要UserController.php)
	2.文件名全部小写 
	3.所有的控制器,直接或者间接继承自 CI_Controller 类
	4.尽量不要使用Index名作为控制器类名,因为与方法index与类名相同的,会被PHP当作构造方法void __construct(){}
	5.控制器中, 动作(函数,方法)要求:
		public 
		不能以_开头
		
		//不能被浏览器范围
		protected function test() {
			echo 'test';
		}
		
		//以下划线开头的方法,不能被浏览器请求
		public function _test1() {
			echo 'test1';
		}
		
		public function test2(){
			$this->_test1();
		}

# <a id="视图-views"></a>视图-views 

	
	1.在控制器中如果加载视图
		//直接写试图名字,不写扩展名,如果有子目录,则写上目录名
		$this->load->view ( 'user/index' ); //表示user目录下的index.php文件
		可以多次调用$this->load->view (视图); 

	2.试图中,直接使用原生PHP代码
	3.推荐使用
		<?php foreach ($list as $item):?>
		<?=$item["email"]?>
		<?php endforeach;?>

# <a id="模型-model"></a>模型-model
	
	模型文件名全部使用小写,建议使用_model为后缀,防止与控制器类名冲突,但里面的类名首字母大写
	在模型中,可以直接使用超级对象中的属性
	
	\application\models\user_model.php 模型
		<?php
			class User_model extends CI_Model{//继承自 CI_Model
				//返回所有用户
				public function getAll(){
					$res = $this->db->get('user');//在模型中,可以直接使用超级对象中的属性
					return $res;
				}
			}
	\application\controllers\my_model_demo.php 控制器
		<?php
			class My_model_demo extends CI_Controller {
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/my_model_demo
				public function index() {
					// 加载模型,加载后将自动成为超级对象的属性
					// $this->load->model ( 'User_model' );
					$this->load->model ( 'User_model', 'user' ); // 起个别名
										     
					// 调用模型获取数据
					// $list = $this->User_model->getAll();
					$list = $this->user->getAll (); // 使用别名

					// 加载视图
					$this->load->view ( 'user/my_model_view_demo', array ('list' => $list ) );
				}
			}
	\application\views\user\my_model_view_demo.php 视图
		<!DOCTYPE html>
		<html>
		<head>
			<title>View</title>
		</head>
		<body>
			<?php 
				var_dump( $list);
			?>
		</body>
		</html>
	
	建议使用这种这种MVC架构来编写代码,可维护性高一些.

# <a id="CI的超级对象-(CI的控制器对象CI_Controller)"></a>CI的超级对象-(CI的控制器对象CI_Controller)
	当前的控制器对象
	属性
	$this->load //  --> system/core/CI_Loader类装载器,类的加载,如视图,控制器等
		装载器类的实例system/core/CI_Loader.php
		装载器CI_Loader提供方法:
			view()	装载视图
			vars()  分配变量到视图
			database()  装载数据库操作对象
			model()  装载模型
			helper() 一些辅助函数

	$this->uri // 获取url参数等功能
		是CI_URI类的实例 --> system/core/CI_URI.php 
		CI_URI类提供方法:
			segment(n) 用于获取url中的第几个参数(值）
			传统的: 入口文件.php/控制器/动作/参数1/值1/参数2/值2
			CI的  : 入口文件.php/控制器/动作/值1/值2
			
			echo $this->segment(3);//值1
			echo $this->segment(4);//值2

			方式一: 
			// 使用CI的pathinfo
			// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/user/testURI/4
			echo $this->uri->segment(3); // 获取URI第几段的参数 可取得4 , 从user开始计算1,2,3
			
			方式一: 
			直接写在方法里面
			http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/user/testURI2/1/jack
			public function index($id = 0,$name=''){ //可以直接获取到id=1 ; name= jack ,如果id没有输入默认为0,默认name为空
				echo $id;//1
				echo $name; // jack
			}

	$this->input 获取用户输入信息 如,get put cookie等
		是CI_Input类的实例 --> system/core/CI_Input.php
		CI_Input类提供方法:
			$this->input->post('username');         //$_POST['username']
			$this->input->server('DOCUMENT_ROOT');	//$_SERVER['DOCUMENT_ROOT']

	在视图(view)中,直接使用$this来访问超级对象中的属性

# <a id="数据库访问"></a>数据库访问

	配置数据库文件
		可在 \system\database\drivers\目录下查看可被支持的数据库驱动
		application/config/database.php 数据库配置文件
		$db['default']= array(	//'default'表示默认数据库,当一个项目需要连接多个数据库的时候,可以增加多一个$db['新数据库别名']= array(....
			'hostname' => 'localhost',
			'username' => 'root',
			'password' => 'root',
			'database' => 'test',	//database数据库名
			'dbdriver' => 'mysql', //数据库驱动
			'dbprefix' => 'blog_', //表前缀 
			'swap_pre' => 'swap_', //表前缀 假设代码里面的都是使用swap_的前缀,而表是使用blog_前缀,则会自动替换成dbprefix的前缀,而无需修改源代码
		);
		
		表前缀
			'dbprefix' => 'blog_', 
			'swap_pre' => 'blog_', 
			配置为一样,代码中,直接硬编码表前缀就行了,如果以后项目数据库表前缀发生变化,
			只需要修改'dbprefix' => 'new_',  代码中的blog_会自动替换为new_

		/////数据库附件/////

	将数据库访问对象,装载到超级对象的属性中 $this->db
		方式一(PHP代码手动加载): 
			// 装载一个数据库操作类
			$this->load->database();//表示连接默认数据库
			//一个项目多个数据库时,表示连接其它数据库,配置文件\application\config\database.php中配置相对应别名
			//$this->load->database('新数据库别名');
		方式二(配置文件,自动加载):
			//因为每次使用数据库的时候都需要装载数据库操作类,所以在配置文件\application\config\autoload.php中配
			//置Auto-load Libraries 自动加载项,以后就可以不再需要手动加载,但对于多个数据库的还是需要指定数据库.
			//$autoload['libraries'] = array('database');//自动加载配置
			//$this->load->database();//以后编写都不需要这行代码.
		
		使用: 
			//装载成功后,会放入超级对象的属性中, 默认属性名是db
			// var_dump($this->db);//$this->db 返回的是 CI_DB_mysql_driver 对象 继承自 CI_DB
			
		CI_DB_mysql_driver 对象 --> \system\database\drivers\mysql\mysql_driver.php  

	$this->db->query()方法 增删改查
		查询数据 返回的是一个对象
			$sql = 'select * from blog_user';
			// 返回的是CI_DB_mysql_result 对象 - mysql_query()
			$res = $this->db->query ( $sql ); //返回的是 CI_DB_mysql_result 对象 继承自 CI_DB_result
			$res->result();//返回数组,数组中是一个一个的对象
			$res->result_array();//返回二维数组,里面是关联数组
			$res->row();//返回第一条数据,直接是一个对象
			
			//帮助文档中--> 数据库类-->查询-->query 
			//帮助文档中--> 数据库类-->生成查询结果集--> result_array() 等等的一些方法. 调用方法就如上所示
			//以上可取得如下php原生函数类似的结果
			//mysql_fetch_assoc()//关联数组 //http://www.w3school.com.cn/php/func_mysql_fetch_assoc.asp
			//mysql_fetch_object()//返回对象 //http://www.w3school.com.cn/php/func_mysql_fetch_object.asp

			CI_DB_mysql_result 对象 --> \system\database\drivers\mysql\mysql_result.php
			
		增删改数据 返回一个 boolean 布尔值
	
			// 插入数据
			// $name=$this->input->post('name');//假如获取用户post过来的数据.
			// $name = 'lili';
			// $pass = 'lili';
			
			// $data [0] = $name;
			// $data [1] = $pass;
			////参数绑定:
			// $sql = "insert into blog_user (name,password) values (?,me5(?))";
			// $bool = $this->db->query ( $sql, $data );//多个问号?参数时,需要传入一个索引数组
			
			// 删除数据
			// $sql = "delete from blog_user where id=?";
			// $bool = $this->db->query ( $sql, 2 );
			
			// 修改数据
			$data [0] = 'mary@gmail.com';
			$data [1] = 3;
			$sql = "update blog_user set email = ? where id=? ";
			$bool = $this->db->query ( $sql, $data );
			
			if ($bool) {
				// mysql_affected_rows
				echo '受影响行数:' . $this->db->affected_rows ();
				echo '自增ID:' . $this->db->insert_id ();
			}
		使用CI的db增加改查都是使用$this->db->query()来进行处理.

# <a id="AR模型操作数据库"></a>AR模型操作数据库 active_record (CI3.0之后改名 query_builder QB模型)
	
	配置
		\application\config\database.php 配置开启AR/QB模型(默认TRUE)
			$active_record = TRUE; 配置为TRUE表示开启这项功能. (AR模型)
			$query_builder = TRUE; 配置为TRUE表示开启这项功能. (QB模型)

			\system\database\DB_active_rec.php (为AR模型原代码)
			\system\database\DB_query_builder.php (为QB模型的原代码)

		\application\config\autoload.php 配置自动加载
			$autoload['libraries'] = array('database');
	
	使用增删改查
		在配置文件中,配置表前缀后,会自动添加前缀.
		
		插入:
			$bool = $this->db->insert('表名',关联数组);

			//TODO 通过AR/QB模型增加数据内容 insert 增加
			$data  = array(
				'name'=>'lili',
				'password'=>md5('lili')			
			);
			$bool = $this->db->insert('user',$data);
			var_dump($bool);
			echo '<hr>';

		更新:
			$bool = $this->db->update('表名',关联数组,条件);

			//TODO 通过AR/QB模型更新数据 update 更新
			$data = array(
					'email'=>'lili@gmail.com',
					'password'=>md5('123456'),
			);
			$bool =$this->db->update('user',$data,array('id'=>4));
			var_dump($bool);

		删除:
			$bool = $this->db->delete('表名',条件);
			
			//TODO 通过AR/QB模型删除数据 delete 删除
			$bool = $this->db->delete('user',array('id'=>4));
			var_dump($bool);
		
		查询:
			$res = $this->db->get('表名',['条件']);//返回结果集对象. '表名'会自动增加为'blog_表名'
			$res->result();//结合返回获取数据

			//TODO 通过AR/QB模型获取数据表内容-查询
			$res = $this->db->get ( 'user' );//AR模型可以自动处理表前缀.并直接获取bolg_user表的数据
			
			var_dump($res);
			echo '<hr>';
			foreach ($res->result() as $item){
				echo $item->name;
				echo '  ';
				echo $item->password;
				echo '  ';
				echo $item->email;
				echo '<br>';
			}

		连贯查询
			//TODO 连贯查询
			//SELECT `id`, `name` FROM `blog_user` WHERE `id` >= 3 ORDER BY `id` desc LIMIT 2, 3
			$res = $this->db->select('id,name')//
			->from('user')//表名
			->where('id >=' , 3)//'id >=' 符号前面需要一个空格,如果符号不写默认'='等于
			->limit(3,2)//跳过2条,取后3条数据
			->order_by('id desc')//通过id倒序
			->get();//获取数据
			
			var_dump($res->result());
			echo '<br>';
			echo $this->db->last_query();//显示最后一条执行的SQL语句
			//SELECT `id`, `name` FROM `blog_user` WHERE `id` >= 3 ORDER BY `id` desc LIMIT 2, 3
		
			更多where查询条件 
				//SELECT * FROM `blog_user` WHERE `name` = 'mary'
				$res = $this->db->where('name','mary')->get ('user');
				//SELECT * FROM `blog_user` WHERE `name` != 'mary'
				$res = $this->db->where('name !=','mary')->get ('user');
				//SELECT * FROM `blog_user` WHERE `name` = 'mary'
				$res = $this->db->where(array('name'=>'mary'))->get ('user');
				//SELECT * FROM `blog_user` WHERE `name` = 'mary' AND `id` > 3
				$res = $this->db->where(array('name'=>'mary','id >'=>3))->get ('user');
				echo $this->db->last_query();

				复杂的查询,则建议用$this->db->query($sql,$data);//使用问题?绑定参数的方式查询

# <a id="CI类库扩展"></a>CI类库扩展
	
	在system目录下的是CI框架的核心文件.如果需要进行扩展,只需要在对应的application目录下对应着system目录下的文件编写对应的类,即可扩展.
	例如: application 目录下有core helpers language libraries 目录均于system目录下的文件夹相一一对应.

	子类名前缀
		\application\config\config.php 子类名前缀
		$config['subclass_prefix'] = 'MY_';
		
	例如:扩展控制器
		在application/core/MY_Controller.php 创建自定义的类继承自application/core/Controller.php  (CI_Controller 类名与文件名不同)

		<?php
			class MY_Controller extends CI_Controller{
				//构造方法
				public function __construct(){
					parent::__construct();//调用父类的构造方法
					echo 'aaaaaaaaaaaaa';
					//登录验证
					//权限验证...等等
				}
			}
		然后在application/controllers/目录下的控制器中使用继承自My_Controller的类即可使用,自定义的控制器.
	其它类库均类似的扩展.
	
# <a id="url相关函数"></a>url相关函数
	
	http://codeigniter.org.cn/user_guide/helpers/url_helper.html

	//加载url帮助类 //默认在辅助函数/URL辅助函数中,默认不加载.
	$this->load->helper('url');//使用前需要加载标准类,或者配置自动加载
		\application\config\autoload.php 文件中配置
		$autoload['helper'] = array('url');

	site_url('控制器/方法') 
	base_url();//返回网站根目录
	
	案例:
	\application\controllers\url_demo_controllers.php
	<?php
		class Url_demo_controllers extends CI_Controller{
			//http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/Url_demo_controllers
			public function index(){
				//加载url帮助类
				$this->load->helper('url');
				$this->load->view('user/url_demo');
			}
			
			public function insert(){
				var_dump($this->input->post('name'));
			}
		}

	\application\views\user\url_demo.php 
	<!DOCTYPE html>
	<html>
	<head>
		<title>403 Forbidden</title>
	</head>
	<body>

	<!-- <form action="/CodeIgniter-3.0.0/index.php/Url_demo_controllers/insert" method="post"> -->
	<form action="<?php echo site_url('Url_demo_controllers/insert');?>" method="post">
		name<input type="text" name="name" /><br>
		password<input type="password" name="password" /><br>
		email<input type="text" name="email" /><br>
		<button type="submit">submit</button>
	</form>
		
	<!-- 	<img alt="" src="/CodeIgniter-3.0.0/uploads/logo.jpg"/> -->
		<img alt="" src="<?php echo base_url();?>uploads/logo.jpg" width="100"/>
	</body>
	</html>

# <a id="设置路由"></a>设置路由
	
	路由配置文件
		application/config/routes.php
	
	默认控制器 配置
		$route['default_controller'] = 'welcome';
	
	实现伪静态
		$route['news/[\d]{6}/([\d]+)/([^\s]+)']='routes_demo/showTwice/$1/$2';
		//URL中的地址=对应的控制器/方法/参数 --  第一个() 对应$1 以此类推
		
		案例: 

		<?php
			class Routes_demo extends CI_Controller {
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/routes_demo
				public function index() {
					echo 'routes_demo index ';
				}
				
				// 路由配置目录 application/config/routes.php
				
				// 原地址: http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/routes_demo/show/2
				// 路由映射地址:
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/news/2.html
				// 路由配置: $route['news/([\d]+)\.html']='routes_demo/show/$1';
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/news/201515/2.html
				// 路由配置: $route['news/[\d]{6}/([\d]+)\.html']='routes_demo/show/$1';
				public function show($id = 0) {
					echo '这是文章' . $id;
				}
				
				// 原地址:
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/routes_demo/showTwice/4/.jpg
				// 路由映射地址:
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/news/201501/4/.jpg
				// 路由配置: $route['news/[\d]{6}/([\d]+)/([^\s]+)']='routes_demo/showTwice/$1/$2';
				public function showTwice($id = 0, $res = '') {
					echo '这是文章' . $id . $res;
				}
			}

# <a id="隐藏入口文件-index.php"></a>隐藏入口文件-index.php
	
	如原地址为:
		http://127.0.0.1:8000/CodeIgniter-3.0.0/index.php/routes_demo
	隐藏入口文件后只需要把地址写成即可:
		http://127.0.0.1:8000/CodeIgniter-3.0.0/routes_demo

	1.需要开启Apache的 rewrite 功能 Apache2.2\conf\httpd.conf 修改如下: 
		修改前:
			#LoadModule rewrite_module modules/mod_rewrite.so
			
			...
			# AllowOverride controls what directives may be placed in .htaccess files.
			# It can be "All", "None", or any combination of the keywords:
			#   Options FileInfo AuthConfig Limit

			AllowOverride None
			...

		修改成:
			# 搜索 mod_rewrite 与 .htaccess 关键字来进行查询修改项
			LoadModule rewrite_module modules/mod_rewrite.so
			
			<Directory "E:/ComTu_Design/PHP/Apache2.2/htdocs">
				Options Indexes FollowSymLinks
				# AllowOverride controls what directives may be placed in .htaccess files.
				# It can be "All", "None", or any combination of the keywords:
				#   Options FileInfo AuthConfig Limit

				AllowOverride all
				Order allow,deny
				Allow from all
			</Directory>

		重启Apache.

	2.在入口文件同级目录(system/application同级目录)中,放入一个.htaccess 内容如下:
		(技巧如果自己编写创建一个点.开头的文件可以使用记事本另存为的方式输入双引号".htaccess"保存即可)
		<IfModule mod_rewrite.c>
			RewriteEngine on
			RewriteCond %{REQUEST_FILENAME} !-d
			RewriteCond %{REQUEST_FILENAME} !-f
			RewriteRule ^(.*)$ index.php/$1 [QSA,PT,L]
		</IfModule>
	
	3.配置索引页 \application\config\config.php 
		原: 
			$config['index_page'] = 'index.php';
		修改成: 
			$config['index_page'] = '';

# <a id="分页"></a>分页
	http://codeigniter.org.cn/user_guide/libraries/pagination.html
	直接见源代码:
	
	\application\controllers\paging_demo.php
	<?php
		class Paging_demo extends CI_Controller {
			public function index() {
			}
			//http://127.0.0.1:8000/CodeIgniter-3.0.0/paging_demo/paging
			public function paging() {
				// 装载类文件
				$this->load->library ( 'pagination' );
				// 每页显示10条数据
				$page_size = 10;
				
				$this->load->helper('url');
				//配置页面
				$config ['base_url'] = site_url('paging_demo/paging');
				//一共有多少条数据
				$config ['total_rows'] = '200';
				//每页显示条数
				$config ['per_page'] = $page_size;
				
				//分页的数据查询偏移量在哪一段上
				$config['uri_seqment'] = 3;
				
				$config['first_link'] = '首页';
				$config['next_link'] = '下一页';
				$config['last_link'] = '最后一页';
				
				$this->pagination->initialize ( $config );
				
				//http://127.0.0.1:8000/CodeIgniter-3.0.0/paging_demo/paging/190
				//获取链接地址第三段的参数190 与配置$config['uri_seqment']相对应
				$offset = intval($this->uri->segment(3));//intval函数获取数字,无则返回0
				
				//拼接Sql查询语句
				$sql = "select * from blog_user limit $offset , $page_size";
				echo $sql.'<br>';
				
				//生成链接
				$data['links']=$this->pagination->create_links ();
				//在页面中显示
				$this->load->view('user/paging_view',$data);
			}
		}

		\application\views\user\paging_view.php
		<!DOCTYPE html>
		<html>
		<head>
			<meta charset="utf-8">
			<title>分页</title>
		</head>
		<body>
			<?=$links ?>
		</body>
		</html>

# <a id="文件上传"></a>文件上传
	http://codeigniter.org.cn/user_guide/libraries/file_uploading.html
	
	案例见代码: 
	\application\controllers\upload_demo.php
	<?php
	class Upload_demo extends CI_Controller {
		public function index() {
		}
		
		// http://127.0.0.1:8000/CodeIgniter-3.0.0/upload_demo/file
		public function file() {
			$data ['error'] = '';
			$data ['upload_data'] = '';
			
			$this->load->helper ( 'url' );
			$this->load->view ( 'user/upload_view_demo', $data );
		}
		public function upload() {
			// 上传目录需要手动创建
			$config ['upload_path'] = './uploads/';
			$config ['allowed_types'] = 'gif|jpg|png';
			$config ['max_size'] = 100;//kb
			$config ['max_width'] = 1024;
			$config ['max_height'] = 768;
			// 上传后的文件名/不设置则默认原文件名,如果文件名冲突,则会在文件名中加入递增数字
			//$config ['file_name'] = uniqid (); 
			
			$this->load->library ( 'upload', $config );
			
			$this->upload->do_upload ( 'pic' );//上传的input name
			$this->upload->do_upload ( 'pic2' );//上传的input name
			
			$data = array (
					'upload_data' => $this->upload->data () ,//上传成功
					'error' => $this->upload->display_errors ()//错误信息
			);
			$this->load->view ( 'user/upload_view_demo', $data );
		}
	}

	\application\views\user\upload_view_demo.php
	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>文件上传</title>
	</head>
	<body>
		<?php 
		if($error){	echo $error;}
		?>

		<form action="<?php echo site_url('upload_demo/upload')?>" method="post" enctype="multipart/form-data">
			<input type="file" name="pic" /></br>
			<input type="file" name="pic2" /></br>
			<input type="submit" name="上传" />
		</form>
		
		<?php if ($upload_data):?>
			<?php foreach ($upload_data as $item => $value):?>
				<li><?php echo $item;?>: <?php echo $value;?></li>
			<?php endforeach; ?>
		<?php endif ?>
	</body>
	</html>

# <a id="Session"></a>Session
	http://codeigniter.org.cn/user_guide/libraries/sessions.html
	Session 类将每个用户的 session 信息序列化（serialize）后存储到到 cookie 中（并同时进行加密）。
	
	ci的Session是存储到cookie中.PHP原生的session是放到服务器中.
	所以需要加密.可查看值,但不能修改.因为提交时会通过密钥校验数据完整性.
	
	配置 \application\config\config.php
		
		配置Session加密(CI2.2可配置,CI3.0.0抛弃了此功能):
			原:
				$config['sess_encrypt_cookie']	= FALSE;
			修改为:
				$config['sess_encrypt_cookie']	= TRUE;


		配置Session密钥:
			
			原:
				$config['encryption_key'] = '';
			修改密钥(可用echo md5(uniqid());生成一个值当密钥):
				$config['encryption_key'] = '05c072360c5ac7e19d5b2566a995991c';
		
		配置Session文件路径:

			CI3.0.0版本需要配置此项,不然会出现 Message: mkdir() [function.mkdir]: Invalid argument 异常
			CI3.0.0之前版本可以不要设置.(CodeIgniter_2.2.0测试查看,无此参数)
			
			原:
				$config['sess_save_path'] = NULL;
			新session路径(注意~~些路径需要要使用绝对路径)
				创建目录用于存储Session:E:\ComTu_Design\PHP\Apache2.2\htdocs\CodeIgniter-3.0.0\application\session
				$config['sess_save_path'] = 'E:\ComTu_Design\PHP\Apache2.2\htdocs\CodeIgniter-3.0.0\application\session';
			
			可查看 sess_save_path 配置相关文档
				http://codeigniter.org.cn/user_guide/libraries/sessions.html
				http://php.net/manual/en/session.configuration.php#ini.session.save-path
	实现
		//加载模块
		$this->load->library('session');
		//存储session
		$user = $this->session->set_userdata ( 'user', $user );
		//取session
		$user = $this->session->userdata('user');
		//删除session
		$this->session->unset_userdata('user');
		$this->session->unset_userdata($array_items);//删除多个session

		案例见代码: 
		<?php
		class Session_demo extends CI_Controller {
			public function index(){}
			
			public function __construct(){
				parent::__construct();
				$this->load->library('session');
			}
			
			// 先存储session 
			// http://127.0.0.1:8000/CodeIgniter-3.0.0/session_demo/set_session
			// 在取出sesson(刷新演示一次性的数据)
			// http://127.0.0.1:8000/CodeIgniter-3.0.0/session_demo/show_session
			public function set_session() {
				//echo md5(uniqid());exit;
				
				$user = array('id'=>3,'name'=>'jack');
				
				// 相当于原生的:
				// session_start();
				// $_SESSION["user"] = $user;
				
				$user = $this->session->set_userdata ( 'user', $user );
				var_dump($user);//取出来NULL
				echo '<br>';
				
				//取session
				$user = $this->session->userdata('user');
				var_dump($user);
				
				//一次性的数据,只能读一次
				$this->session->set_flashdata('test','testdate-aaaaaaaaaaaa');
			}
			
			//http://127.0.0.1:8000/CodeIgniter-3.0.0/session_demo/show_session
			public function show_session(){
				//获取CI session中的数据
				$user = $this->session->userdata('user');
				var_dump($user);
				
				//只可以取一次,取完后就会被删除.
				$test=$this->session->flashdata('test');
				var_dump($test);
			}

			public function delete_session(){
				//删除单个session
				$this->session->unset_userdata('user');

				// //删除多个session
				// $array_items = array('user', 'test');
				// $this->session->unset_userdata($array_items);
			}

			public function originalPHPsession(){
				// 原生session
				session_start();
				//存储验证码信息到PHP原生的session中.
				$_SESSION["cap"] = 'abc';
				
				//获取Session
				$word = $_SESSION['cap'];
				echo $word;
				
				//终结 Session
				unset($_SESSION['cap']);
				//重置session  , 失去所有已存储的 session 数据。
				//session_destroy();
			}
		}
		
# <a id="验证码"></a>验证码
	ci的验证码会创建一个图片文件,所以需要创建文件夹用来存放
		E:\ComTu_Design\PHP\Apache2.2\htdocs\CodeIgniter-3.0.0\captcha

	使用CI验证码需要开启PHP的 GD 图像库
		可用PHP代码检测是否开启GD图像库
			if(extension_loaded('gd')){
				echo '你可以使用gd<br>';
				foreach (gd_info() as $cate=>$value)
					echo "$cate: $value<br>";
			}else echo '没有安装gd扩展';

		开启 GD 图像库 方法:
			E:\ComTu_Design\PHP\php-5.3.5\php.ini 配置文件修改如下:
			原: 
				;extension=php_gd2.dll
			修改成(去除前面的;分号): 
				extension=php_gd2.dll
			修改完后保存,重启apache
	实现
		//加载模块
		$this->load->helper('captcha');
		//创建验证码
		$cap = create_captcha($vals);
		//显示验证码
		echo $cap['image'];

		案例见代码: 
		<?php
		class Captcha_demo extends CI_Controller{
			public function index(){}
			
			public function test(){
				echo 'captcha_demo';
				   
				if(extension_loaded('gd')){
					echo '你可以使用gd<br>';
					foreach (gd_info() as $cate=>$value)
						echo "$cate: $value<br>";
				}else echo '没有安装gd扩展';
				
				$this->load->helper('url');
				$this->load->helper('captcha');
				$number = rand(1000,9999);//生成随机字符串
				$vals = array(
						'word'      => $number,//可指定验证码内容,如果是中文.需要有支持的字体
						'img_path'  => dirname(BASEPATH).'/captcha/',//生成的图片存放目录,手动创建
						'img_url'   => base_url('/captcha/'),//图片链接地址
						//'font_path' => './path/to/fonts/texb.ttf',//指定字体_如果使用中文需要指定字体
						'img_width' => '150',
						'img_height'    => 30,
						'expiration'    => 5,//图片存放时间,如果过期,只有在被再次请求才会删除.单位秒
						'word_length'   => 8,
						'font_size' => 16,
						'img_id'    => 'Imageid',
						'pool'      => '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
				
						// White background and border, black text and red grid
						'colors'    => array(
								'background' => array(255, 255, 255),
								'border' => array(255, 255, 255),
								'text' => array(0, 0, 0),
								'grid' => array(255, 40, 40)
						)
				);
				
				$cap = create_captcha($vals);
				echo $cap['word']."<br>";
				echo $cap['image'];
				
				$this->load->view('user/captcha_view_demo',array('cap'=>$cap['image']));
				
				// 原生session
				session_start();
				//存储验证码信息到PHP原生的session中.等待校验.
				$_SESSION["cap"] = $cap['word'];
				
				//获取Session
				$word = $_SESSION['cap'];
				echo $word;
			}
		}

# <a id="表单验证"></a>表单验证

	http://codeigniter.org.cn/user_guide/libraries/form_validation.html
	
	实现: 
		//加载模块
		$this->load->helper ( array ('form','url') );
		$this->load->library ( 'form_validation' );
		//设置校验规则,参数一:表单上的名称,参数二:错误信息显示的名称,参数三:校验的规则见标准文档
		//http://codeigniter.org.cn/user_guide/libraries/form_validation.html#id25
		$this->form_validation->set_rules('参数名','用户名','required');
		//表单校验 返回true表示校验通过
		$bool = $this->form_validation->run();
		//表单校验加载校验规则 使用配置文件 application/config/form_validation.php 如果没有自己创建.
		//$bool = $this->form_validation->run('demo');//参数名与config文件中的相对应.
		
		form表单中
			//自动回填内容项
			<?php echo set_value('参数名')?>
			//显示错误信息, 参数一:为form中的表单名,参数二,三:参数样式
			<?php echo form_error('参数名','<span>','</span>')?>
			//显示全部错误信息
			<?php echo validation_errors();?>

	案例见代码: 

		\application\controllers\form_demo.php
			<?php
			class Form_demo extends CI_Controller {
				public function index() {
				}
				// http://127.0.0.1:8000/CodeIgniter-3.0.0/form_demo/insert
				public function insert() {
					$this->load->helper ( array ('form','url') );
					//加载模块
					$this->load->library ( 'form_validation' );
					
					// 校验如果这样编写会编写很多规则代码.可以在config进行配置验证文件.也可实现重复利用的效果
					// $this->form_validation->set_rules('name','用户名','required');
					// $this->form_validation->set_rules('password','密码','required');
					// $this->form_validation->set_rules('email','邮箱',array('required','valid_email'));
					// // 表单验证
					// $bool = $this->form_validation->run();
					
					// 表单验证配置文件 application/config/form_validation.php
					$bool = $this->form_validation->run('demo');
					if ($bool) {
						// 调用模型保存数据库
						echo 'success';
					} else {
						// 显示错误信息
						$this->load->view ( 'user/form_view_demo' );
					}
					
					echo $bool;
				}
			}
		
		--------
		\application\views\user\form_view_demo.php
			<!DOCTYPE html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>表单验证</title>
			</head>
			<body>
			<?php echo validation_errors();?>

			<form action="<?php echo site_url('form_demo/insert');?>" method="post">
				name<input type="text" name="name" value="<?php echo set_value('name')?>"/>
				<?php echo form_error('name','<span>','</span>')?>
				<br>
				password<input type="password" name="password" />
				<?php echo form_error('password','<span>','</span>')?>
				<br>
				email<input type="text" name="email" value="<?php echo set_value('email')?>"/>
				<?php echo form_error('email','<span>','</span>')?>
				<br>
				<button type="submit">submit</button>
			</form>
			</body>
			</html>
		--------
		\application/config/form_validation.php
			<?php
				$config = array (
					'demo' => array (
							array (
									'field' => 'name',
									'label' => '用户名',
									'rules' => 'required' 
							) ,
							array (
									'field' => 'password',
									'label' => '密码',
									'rules' => 'required' 
							),
							array (
									'field' => 'email',
									'label' => '邮箱',
									'rules' => 'required|valid_email' 
							)
					),
					'signup'=>array( ....  )
				);

# <a id="语言包"></a>语言包
	如表单错误信息等语言.
		将语言包解压到
			\application\language\zh_cn
		配置语言:
			\application\config\config.php
			原:
				$config['language']	= 'english';
			改成
				$config['language']	= 'zh_cn';



///////////////////////////////数据库附件////////////////////////////////////////////////

	/*
	 查询数据库
	 
	 mysql> show databases;
	+--------------------+
	| Database           |
	+--------------------+
	| information_schema |
	| discuz             |
	| mysql              |
	| test               |
	| wordpress          |
	+--------------------+
	5 rows in set (0.00 sec)

	进入到test数据库

	mysql> use test   
	Database changed

	查看test数据库中的表

	mysql> show tables;
	Empty set (0.00 sec)

	创建表

	mysql> 
	mysql> CREATE TABLE IF NOT EXISTS bolg_user(
	    ->  id INT AUTO_INCREMENT PRIMARY KEY,
	    ->  name VARCHAR(255) NOT NULL UNIQUE,
	    ->  password CHAR(32) NOT NULL,
	    ->  email VARCHAR(255) NOT NULL DEFAULT ''
	    -> )ENGINE MyISAM DEFAULT CHARSET=UTF8;
	Query OK, 0 rows affected (0.05 sec)

	增加数据

	mysql>
	mysql> 
	mysql> INSERT INTO bolg_user (name,password) VALUES ('admin',md5('admin'));
	Query OK, 1 row affected (0.07 sec)

	查看数据库的表

	mysql> show tables;
	+----------------+
	| Tables_in_test |
	+----------------+
	| bolg_user      |
	+----------------+
	1 row in set (0.00 sec)

	查看数据库结构

	mysql> desc bolg_user;
	+----------+--------------+------+-----+---------+----------------+
	| Field    | Type         | Null | Key | Default | Extra          |
	+----------+--------------+------+-----+---------+----------------+
	| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
	| name     | varchar(255) | NO   | UNI | NULL    |                |
	| password | char(32)     | NO   |     | NULL    |                |
	| email    | varchar(255) | NO   |     | NULL    |                |
	+----------+--------------+------+-----+---------+----------------+
	4 rows in set (0.02 sec)

	查询数据库表中的内容

	mysql> select * from bolg_user;
	+----+-------+----------------------------------+-------+
	| id | name  | password                         | email |
	+----+-------+----------------------------------+-------+
	|  1 | admin | 21232f297a57a5a743894a0e4a801fc3 |       |
	+----+-------+----------------------------------+-------+
	1 row in set (0.00 sec)
	 * */




