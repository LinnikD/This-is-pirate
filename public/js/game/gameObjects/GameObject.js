define([
		'classy',
	], function( 
		Class
){

	var GameObject = Class.$extend({
		__init__ : function(x, y, ctx) {
			this.ctx = ctx;
			this.x = x;
			this.y = y;
			this.size;
			this.img = new Image();
		},
		draw : function() {
			this.ctx.drawImage(this.img, this.x, this.y);
		},
		update : function(){

		},
		horizontalCollision : function(obj) {
			if(this.x >= obj.x) {
				if(this.x < obj.x + 2*obj.size) {
					return true;
				}
				return false;
			}
			else {
				if(this.x +  this.size > obj.x) { 
					return true;
				}
				return false;
			}
		},
		verticalCollision : function(obj) {
			alert('lal');
			if(this.y >= obj.y + obj.size && this.y + this.size <= obj.y) {
				return true;
			}
			else
				return false;
		},
	})

	return GameObject;

});
