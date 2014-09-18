define([
		'classy',
		'game/gameObjects/GameObject'
	], function( 
		Class,
		GameObject
){

	var Score = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super(100,0,ctx);
			this.ctx.font = 'bold 24px courier';
			this.ctx.textAlign = 'center';
			this.ctx.textBaseline = 'top';
			this.ctx.fillStyle = '#fff';
			this.score_num = 0;
		},

		draw : function() {
			this.ctx.fillText('Score: ' + this.score_num, this.x, this.y);
		},
		update : function(speed) {
			this.score_num += speed;
		},	
	})

	return Score;

});