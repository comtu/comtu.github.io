/**
	声明背景精灵对象

*/

//声明构造方法(只存对象的成员属性)
//option 传入对象相关成员初始值
//{x,y,w,h,Mx,My,url} JSON对象
var BgSprite=function(option){
	this.left=option.x || 0;//背景的横向坐标
	this.top=option.y || 0;//背景的纵向坐标
	this.width=option.w || 0;//背景图片的宽度
	this.height=option.h || 0;//背景图片的高度
	this.moveX=option.Mx || 0;//背景图片的水平移动速度  像素/秒
	this.moveY=option.My || 0;//背景图片的垂直移动的速度  像素/秒
	
	this.img=new Image();//声明image对象
	this.img.src=option.url;//为当前对象制定图片资源
	
	//记录上一帧的执行结束时间点
	this.lastBgTime=0;

}
BgSprite.prototype={
	//更新对象状态  比如位置移动
	update:function(context,time){//time由 动画播放方法 requestNextAnimationFrame提供
		//判断当前时间是否==0
		if(this.lastBgTime!=0){
			//如果lastBgTime!=0 不是第一帧
			var frameTime=time-this.lastBgTime;
			
			//更新纵坐标 this.top    当前高度=当前的高度+每秒移动的速度/1000*每一帧的时间(毫秒)
			this.top=this.top+(this.moveY/1000)*frameTime;
			//判断当前第一张背景图片是否已经到达canvas最下端不显示
			if(this.top>=context.canvas.height){
				this.top=0;
			}
		}
		//将时间记录到最后执行时间属性中
		this.lastBgTime=time;	
		
	},
	//将图片绘制到canvas中
	paint:function(context){
		//绘制第一张背景图
		//context.drawImage(图片对象,来源图x,来源图y,宽度,高度,画布x,画布,y,宽度,高度);
		context.drawImage(this.img,0,0,this.width,this.height,this.left,this.top,this.width,this.height);
		//绘制第二张背景图
		context.drawImage(this.img,0,0,this.width,this.height,this.left,this.top-this.height,this.width,this.height);
	}

}


//实例化一个对象

var bgSprite=new BgSprite({w:320,h:568,My:30,url:'gameArts.png'});



