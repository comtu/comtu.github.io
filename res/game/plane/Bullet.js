/**
子弹的文件
*/

		//写一个构造方法  子弹飞行构造方法
			var BulletFly=function(){
				//用于记录时间的成员属性
				this.lastBulletFlyTime=0;
			}
			//在圆形中写入方法
			BulletFly.prototype={
				execute:function(sprite,context,time){
					//检测动画是否开始运行(时间)
					if(this.lastBulletFlyTime!==0){
						//更新飞机的位置 top坐标
						sprite.top=sprite.top+sprite.moveY/1000*(time-this.lastBulletFlyTime);
						//判断当前子弹的位置 如果出了页面顶部 自动标注为不显示
						if(sprite.top