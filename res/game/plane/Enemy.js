			//新建飞机行为对象
			
			
			//-----------用于飞行的对象-------------------
			//写一个构造方法
			var EnemyFly=function(){
				//用于记录时间的成员属性
				this.lastEnemyFlyTime=0;
			}
			//在圆形中写入方法
			EnemyFly.prototype={
				execute:function(sprite,context,time){
					//检测动画是否开始运行(时间)
					if(this.lastEnemyFlyTime!==0){
						//更新飞机的位置 top坐标
						sprite.top=sprite.top+sprite.moveY/1000*(time-this.lastEnemyFlyTime);
						
						//判断当前飞机的位置是否飞出屏幕，如果已经离开屏幕  隐藏
						if(sprite.top>context.canvas.height){
							sprite.visible=false;
						}	
						
					}
					//记录每次动画的最后一次时间
					this.lastEnemyFlyTime=time;
					
				}
			
			}
			
			
			//---------------用于爆炸的行为对象------------------------
		
			//构造方法
			var EnemyBomb=function(){
				//记录最后一次时间
				this.lastEnemyBombTime=0;
				//每一个画面的时间
				this.cycle=300;
			}
		
			//对象圆形
			EnemyBomb.prototype={
				execute:function(sprite,context,time){
					//轮播每一个图片
					if(time-this.lastEnemyBombTime>this.cycle && sprite.hp==0){
						//更新当前绘图使用的图片
						
						sprite.painter.advance();
						//判断 如果当前飞机死亡hp=0 且爆炸效果播放完毕 删除该飞机
						if(sprite.painter.cellIndex==sprite.painter.cells.length-1){
							sprite.visible=false;
						}
						//重新记录最后一次执行时间
						this.lastEnemyBombTime=time;
					}
				
				}
			
			
			}
			
			
			//使用工厂模式来创建敌机(可以创建三种飞机的函数)
			/**
			参数:name  smallEnemy小飞机  middleEnemy中飞机  bigEnemy大飞机
			*/
			function createEnemy(name){
				//小飞机的信息
				var smallCells=[
						{x:80,y:655,w:35,h:30},//正常飞行
						{x:45,y:655,w:35,h:30},					
						{x:418,y:731,w:40,h:30},					
						{x:473,y:723,w:40,h:50}
					];
				//小飞机的配置
				var smallOption={w:40,h:50,moveY:100+Math.floor(Math.random()*100),hp:1,score:500}
					
				//中飞机的信息
				var middleCells=[
						{x:0,y:569,w:46,h:60},//正常飞行
						{x:432,y:413,w:46,h:61},
						{x:432,y:538,w:46,h:63},
						{x:432,y:599,w:46,h:58},
						{x:432,y:478,w:46,h:59}
					];
				//中飞机的配置
				var middleOption={w:46,h:63,moveY:80+Math.floor(Math.random()*100),hp:2,score:1000}
				
				//大飞机的信息
				var bigCells=[
						{x:110,y:736,w:110,h:170},//正常飞行
						{x:221,y:857,w:110,h:170},
						{x:310,y:680,w:110,h:170},
						{x:0,y:754,w:110,h:170},
						{x:322,y:340,w:110,h:170},										
						{x:322,y:170,w:110,h:170},										
						{x:322,y:340,w:110,h:170},										
						{x:322,y:510,w:110,h:170},									
						{x:322,y:0,w:110,h:170}
							
						
					];
					
				//大飞机的配置
				var bigOption={w:110,h:170,moveY:70+Math.floor(Math.random()*70),hp:3,score:2000}
					
				//判断飞机使用的图片对象集合
				if(name=='smallEnemy'){
					var cells=smallCells;
					var option=smallOption;
				}else if(name=='middleEnemy'){
					var cells=middleCells;
					var option=middleOption;
				}else{
					var cells=bigCells;
					var option=bigOption;
				}
				//实例化精灵对象
				var Enemy=new Sprite(name,new SpritePainter('gameArts.png',cells),[new EnemyFly(),new EnemyBomb()]);
				//属性初始化
				Enemy.left=Math.floor(Math.random()*320)-Enemy.width;
				Enemy.top=-option.h;
				Enemy.width=option.w;
				Enemy.hight=option.h;
				Enemy.moveY=option.moveY;
				Enemy.hp=option.hp;//气血属性
				Enemy.score=option.score;//积分属性
				
				//返回精灵对象
				return Enemy;
			}
			
			
			