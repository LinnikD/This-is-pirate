define([
		'classy',
		'game/gameObjects/Score',
	], function( 
		Class,
		Score
){

	var ScoreManager = Class.$extend({
		__init__ : function(ctx) {
			this.ctx = ctx;
			this.score = new Score(ctx);
		},
		update : function(speed) {
			this.score.update(speed);
		},
		draw : function() {
			this.score.draw();
		},

	})

	return ScoreManager;

});