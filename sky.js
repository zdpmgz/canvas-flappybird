		//背景构造函数
		function Sky(ctx, img, speed){
			this.ctx = ctx;
			this.img = img;
			this.width = this.img.width;
			this.height= this.img.height;
			this.speed = speed || 10;
			//创建一个实例自增一次
			Sky.number++;
			//根据背景数量动态计算起始的X轴坐标
			this.x = this.img.width * (Sky.number - 1);
			this.y = 0;
		}

		//Sky实例默认的数量
		Sky.number = 0;

		//给原型扩充方法
		Sky.prototype = {

			constructor: Sky,
			//绘制背景
			draw : function( ){
				this.ctx.drawImage(this.img, this.x, this.y);
			},
			update : function( ){
				this.x -= this.speed;
				if(this.x <= -this.width){
					this.x += this.width * Sky.number;
				} 
			}
		};