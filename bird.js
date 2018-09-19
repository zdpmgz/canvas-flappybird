		//小鸟构造函数
		// widthFrame:一排的帧数
		// heightFrame:一列的帧数
		function Bird(ctx, img, widthFrame, heightFrame, x, y){
			this.ctx = ctx;
			this.img = img;
			this.widthFrame = widthFrame;
			this.heightFrame = heightFrame;
			this.x = x;
			this.y = y;

			//一个小鸟的宽和高
			this.width = this.img.width / this.widthFrame;
			this.height = this.img.width / this.heightFrame;

			//当前小鸟渲染的帧数
			this.currentFrame = 0;

			//小鸟的下落速度
			this.speed = 2;
			//加速度
			this.speedPlus = 0.2;

			//绑定事件
			//this.bind();
		}	

		//原型的扩展方法
		Bird.prototype = {
			constructor : Bird,
			//绘制小鸟
			draw : function( ){

				//当下落速度为1的时候，旋转10°
				var baseRadian = Math.PI / 180 * 10;

				var maxRadian = Math.PI / 180 * 50;

				//根据速度计算旋转弧度
				var rotateRadian = baseRadian * this.speed;

				this.ctx.save();
				//1.坐标系平移到小鸟的中心点
				//2.根据下落速度旋转坐标系
				//3.绘制小鸟，但x,y坐标变为宽高的一半
				this.ctx.translate( this.x + this.width / 2, this.y + this.height / 2 );
				rotateRadian = rotateRadian >= maxRadian ? maxRadian : rotateRadian;
				
				this.ctx.rotate(rotateRadian);

				this.ctx.drawImage(this.img, 
					this.width * this.currentFrame, 0, this.width, this.height,						
					-this.width / 2, -this.height / 2, this.width, this.height );

				this.ctx.restore();
			},
			//计算下一帧绘制时的数据,this.currentFrame取值为0,1,2
			update : function( ){
				this.currentFrame = ++this.currentFrame >= this.widthFrame? 0 : this.currentFrame;
				this.y += this.speed;
				this.speed += this.speedPlus;
			},
			//小鸟的绑定事件
			bind: function(){

				var that = this;

				this.ctx.canvas.addEventListener('click', function(){
					that.speed = -3;
				});
			}
		}