define([
		'classy',
		'game/gameObjects/GameObject',
		'game/util/getRandomInt'
	], function( 
		Class,
		GameObject,
		getRandomInt
){

	var Isle = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super( getRandomInt(0, ctx.canvas.width - 100), -100, ctx);
			this.size = 45;
			this.img_num = getRandomInt(1,1);
		 	this.img.src = 'img/game/isle_' + this.img_num + '.png';
		 },
		 update : function(speed) {
		 	this.y += speed;
		 },
	})

	return Isle;

});