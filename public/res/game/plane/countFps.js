		var lastFpsTime=0;
		
		function countFps(){
			//获取当前的时间
			var now=new Date();
			var frameTime=now-lastFpsTime
			var fps=Math.floor(1000/frameTime);//计算帧率
			//计算完毕之后将获取的时间保存到lasttime中作为下一帧的开始时间
			lastFpsTime=now;
					
			return fps;
				
		}