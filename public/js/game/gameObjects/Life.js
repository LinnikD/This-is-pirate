define([
		'classy',
		'game/gameObjects/GameObject',
	], function( 
		Class,
		GameObject
){	

	var Life = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super(0,-100,ctx);
			this.size = 50;
			this.img.src = 'img/game/heart.png';
			this.visible = false;
			this.life_gen_code = 5;
		 },

		 update : function(speed) {
		 	if (this.visible)  
		 		this.y += speed;
		 },
		 drawLife : function() {
		 	if(this.visible)
		 		this.draw();
		 },
	})

	return Life;

});