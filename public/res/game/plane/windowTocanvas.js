	//坐标转换方法
			function windowToCanvas(element,x,y){
				//元素独有的获取坐标的方法
				var box=element.getBoundingClientRect();
				var cx=x-box.left;
				var cy=y-box.top;
				return {x:cx,y:cy}
			
			}