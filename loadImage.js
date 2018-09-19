//保证五张图片加载完毕后才会进行游戏画面绘制。	 
		function loadImage(imgUrl, fn) {
			//遍历imaUrl，动态创建img对象，指定src为加载到的地址，得以加载图片。
			
			//存储图像
			var imgObj = {};
			var tempImg;

			//记录已经加载完毕的图像数量
			var loaded = 0;
			//统计要加载的图片数量
			var imgLength = 0;

			//遍历所有url，动态创建img
			for(var key in imgUrl){
				imgLength ++;

				//根据遍历到的url，加载图像
				tempImg = new Image();
				//给所有图片监听load事件
				tempImg.onload = function(){
					loaded++;
					//当满足这个条件时可以执行回调函数
					if (loaded >= imgLength){
						fn(imgObj);
					}
				};

				tempImg.src = imgUrl[key];

				//把当前图像存起来
				imgObj[key] = tempImg
			}
		}