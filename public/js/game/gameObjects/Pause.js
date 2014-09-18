define([
		'classy',
		'game/gameObjects/GameObject'
	], function( 
		Class,
		GameObject
){

	var Score = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super(340,270,ctx);
			this.ctx.font = 'bold 32px courier';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'top';
			this.ctx.fillStyle = '#fff';
		},

		draw : function() {
			this.ctx.fillText('PAUSED', this.x, this.y);
		},
		update : function(speed) {

		},	
	})

	return Score;

});