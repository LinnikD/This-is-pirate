define([
		'classy',
		'game/gameObjects/Sea',
		'game/gameObjects/Isle',
		'game/gameObjects/Life',
		'game/util/getRandomInt'
	], function( 
		Class,
		Sea,
		Isle,
		getRandomInt
	){
		var MapManager = Class.$extend({
			__init__:function(ctx) {
				this.ctx = ctx;
				this.isles = [];
				this.isle_code = 0;
				this.sea = [];
				this.sea[0] = new Sea(ctx);
				this.sea[1] = new Sea(ctx);
				this.sea[1].y = -this.ctx.canvas.height;

			},
			update:function(speed, gen_code, ship_x) {
				this.updateSea(speed);
				this.generateIsles(ship_x, gen_code);
				this.updateIsles(speed);
			},
			draw:function() {
				this.drawSea();
				this.drawIsles();
			},
			generateIsles : function(ship_x, gen_code) {
				this.isle_code += 1;
				if(this.isle_code >= gen_code) {
					for( i = 0; i < 2; i ++) {
						var tmp = new Isle(this.ctx);
						if( i == 0)
							tmp.x = ship_x - Math.floor(tmp.size/2);
						if( i == 1) {
							while( tmp.horizontalCollision(this.isles[this.isles.length - 1])  ) {
								tmp = new Isle(this.ctx);
							}
						}
						this.isles.push(tmp);
					}
					this.isle_code = 0;
				}	
				if(this.isles.length > 0 && this.isles[0].y > this.ctx.canvas.height + 100) {
					this.isles.shift();
				}
			},
			updateIsles : function(speed) {
				for(i = 0; i < this.isles.length; i++) {
	        		this.isles[i].update(speed);
    			}
			},
			updateSea : function(speed) {
				this.sea[0].update(speed);
				this.sea[1].update(speed);
			},
			drawIsles : function() {
				for(i = 0; i < this.isles.length; i++) {
	        		this.isles[i].draw();
    			}
			},
			drawSea : function() {
				this.sea[0].draw();
				this.sea[1].draw();
			},

	})

	return MapManager;

});