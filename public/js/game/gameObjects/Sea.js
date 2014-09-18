define([
		'classy',
		'game/gameObjects/GameObject'
	], function( 
		Class,
		GameObject
){

	var Sea = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super(0,0,ctx);
		 	this.img.src = 'img/game/sea.jpg';
		 },
		 update : function(speed) {
		 	this.y += speed;
		 	if(this.y >= this.ctx.canvas.height)
		 		this.y = - this.ctx.canvas.height;
		 },
	})


	return Sea;

});