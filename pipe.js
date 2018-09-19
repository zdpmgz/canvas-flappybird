		/*
		管道的特点：
		1.管道成对出现，可共享X轴，管道之间间隙固定
		2.管道高度随机生成，只需要生成上管道，下管道可以计算出来
		3.当管道出去画布，高度需要重新生成
		 */
		

		//imgDown:口朝下的管道，在画布上方。
		//imgUp:口朝上的管道，在画布下方。
		//space:上下管道间距。
		//speed:管道的速度。
		function Pipe(ctx, imgDown, imgUp, space, landHeight, speed) {
			this.ctx = ctx;
			this.imgDown = imgDown;
			this.imgUp = imgUp;
			this.space = space;
			this.landHeight = landHeight;
			this.speed = speed;

			this.downY = 0;
			this.upY = 0;
			this.height2 = this.imgUp.height;
			//管道最小高度
			this.minHeight = 100;

			this.width = this.imgDown.width;
			this.height = this.imgDown.height;

			Pipe.number++;

			//两个管道中间隔2隔管道的宽度
			this.x = 450 + this.width * 4 * (Pipe.number - 1);
			this.y = 0;

			//初始化管道坐标
			this.init();
			
		}

		//管道实例的数量
		Pipe.number = 0;

		//扩展原型方法
		extend( Pipe.prototype, {
			//初始化管道坐标
			init: function() {
				//单个管道的最大高度
				var maxHeight = this.ctx.canvas.height - this.landHeight - this.space - this.minHeight;

				//随机生成的上管道高度在 50 到 maxHeight 之间
				var randomHeight = Math.random() * maxHeight;
				if(randomHeight < this.minHeight){
					randomHeight = this.minHeight;
				} 

				//上管道Y坐标 = 随机生成的高度 - 默认的管道高度
				this.downY = randomHeight - this.imgDown.height;

				//下管道Y坐标 = 随机生成的高度 + 两管道之间的空隙
				this.upY = randomHeight + this.space;

				//注意不能直接drawImage(this.img2,this.x,this.y2);
				//因为下面管子的下半部分应该被截取了，但是它现在是全部显示的
				//得做计算求出现在需要剩余的下管子的高度
				this.height2 = this.ctx.canvas.height - this.upY - this.landHeight;
			},

			//绘制管道
			draw: function(){

				this.ctx.drawImage( this.imgDown, this.x, this.downY );
				this.ctx.drawImage( this.imgUp, this.x, this.upY, this.width, this.height2 );

				this.drawPath();
			},


			//根据管道的宽高和坐标绘制对应的路径
			drawPath: function() {
				this.ctx.rect(this.x, this.downY, this.width, this.height);
				this.ctx.rect(this.x, this.upY, this.width, this.height2);
				//this.ctx.stroke();
			},

			//更新下一帧数据
			update: function() {

				this.x -= this.speed;

				//管道离开画布，需要初始化并返回画布右端
				if(this.x <= -this.width){
					this.init();
					this.x += this.width * 4 * Pipe.number;
				}
			}
		});

		function extend(o1, o2){
			for(var key in o2){
				if( o2.hasOwnProperty(key) ){
					o1[key] = o2[key];
				}
			}
		}