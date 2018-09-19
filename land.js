		//大地的设置
		function Land(ctx, img, speed){
			this.ctx = ctx;
			this.img = img;
			this.speed = speed || 2;
			this.height = this.img.height;
			Land.number++;

			this.x = this.img.width * (Land.number - 1) ;
			this.y = this.ctx.canvas.height - this.img.height;

			
		}

		//大地实例的数量
		Land.number = 0;
		
		extend( Land.prototype, {

			draw: function(){
				this.ctx.drawImage(this.img, this.x, this.y);
			},
			update: function(){
				this.x -= this.speed;
				this.x += this.x <= -this.img.width ? this.img.width * Land.number: 0;
			}
		});

		function extend(o1, o2){
			for(var key in o2){
				if( o2.hasOwnProperty(key) ){
					o1[key] = o2[key];
				}
			}
		}