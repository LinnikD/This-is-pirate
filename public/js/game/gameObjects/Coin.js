define([
		'classy',
		'game/gameObjects/GameObject',
	], function( 
		Class,
		GameObject
){	

	var Coin = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super(0,-100,ctx);
			this.size = 50;
			this.img.src = 'img/game/Coin.png';
			this.visible = false;
			this.coin_gen_code = 5;
		 },

		 update : function(speed) {
		 	if (this.visible)  
		 		this.y += speed;
		 },
		 drawCoin : function() {
		 	if(this.visible)
		 		this.draw();
		 },
	})

	return Coin;

});