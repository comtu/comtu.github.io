/**
	精灵对象的构建(构造方法&对象原型)
	对象原型（类）-->对象实例（对象）
*/
/*****
@param name ：当前对象的名称
@param painter ：用于绘制当前对象的绘制器（对象类型）
@param behaviors ：当前对象的行为数组
*/

var Sprite=function(name,painter,behaviors){
	if(name!==undefined){
		this.name=name;//当前对象的名称 (可以不设置)
	}
	
	if(painter!==undefined){
		this.painter=painter;//外部传入的绘制器对象(该对象提供了对象的绘制功能)
	}
	
	

	this.left=0;//当前对象的横坐标
	this.top=0;//当前对象的纵坐标
	this.width=10;//当前对象的纵坐标
	this.height=10;//当前对象的纵坐标
	this.moveX=0;//当前对象的横向移动速度 正数 向右  负数 向左
	this.moveY=0;//当前对象的纵向移动速度 正数 向下  负数 向上
	this.visible=true;//当前对象的可见状态
	this.animating=false;//当前对象是否处于动画状态
	this.behaviors=behaviors || [];//当前对象的行为数组 （对象数组） [飞,爆炸,起落...]
}

//由于成员方法是多个对象公用的,将方法写入对象的原型中(类似PHP中的静态方法)
Sprite.prototype={
	//对象的绘制方法
	//@param context :绘图环境
	paint:function(context){
		//判断是否存在绘制器   判断当前元素是否可以显示
		if(this.painter!==undefined && this.visible){
			//调用绘制器对象中的paint绘图方法  传入  this->当前对象(飞机)  context(绘图环境)
			this.painter.paint(this,context);
		}
	},
	//更新动画行为的方法 需要使用behaviors 成员
	update:function(context,time){
		for(var i=0;i<this.behaviors.length;i++){
			this.behaviors[i].execute(this,context,time);
		}
	}

}


//创建一个精灵绘制器   (描边和填充绘制器 (简单动画) 图像绘制器（背景）)
			//构造方法（该对象的成员属性）
			/**
				url 当前精灵使用的图片
				cells  
			*/
			/*cells=[
				{x:11,y:1,w:1,h:1},
				{x:12,y:1,w:1,h:1},
				{x:21,y:1,w:1,h:1},
				{x:12,y:1,w:1,h:1}
				]
			
			*/
			var SpritePainter=function(url,cells){
				//加载图片
				this.img=new Image();//图片属性对象
				this.img.src=url;//为当前图片的路径
				
				this.cells=cells || [] ;//传入的图像坐标数组(所有图片信息)
				this.cellIndex=0;//当前绘图对象使用的图片信息
			}
			//讲当前对象的方法打入原型当中
			SpritePainter.prototype={
				//更新使用的图片（下标）
				advance:function(){
					if(this.cellIndex==this.cells.length-1){
						//还原图片设置 从第一张图开始使用
						this.cellIndex=0;
					}else{
						//更新图片索引，没有到达最后一张图 索引+1
						this.cellIndex++;
					}
				},
				//图像绘制方法
				paint:function(sprite,context){
					//保证在图片加载完毕的情况下绘制图片
					if(this.img.complete){
						//获取当前绘制使用的图片信息
						var cell=this.cells[this.cellIndex];
						//使用图像信息数组中的某个图片绘制到canvas中
						context.drawImage(this.img,cell.x,cell.y,cell.w,cell.h,sprite.left,sprite.top,cell.w,cell.h);
					}
				}
			}






