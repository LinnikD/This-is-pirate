define([
		'classy',
	], function( 
		Class
){

	var SpeedManager = Class.$extend({
		__init__ : function() {
			this.speed = 4;
			this.gen_code = 45;
			this.update = this.upSpeed();
		},
		upSpeed : function() {
			var speed_cnt = 0;
			var speed_max = 10;
			var updateSpeed = function() {
				if(this.speed == speed_max)
					return;
				speed_cnt++;
				if(speed_cnt == 300) {
					this.gen_code -= 5;
					this.speed += 1;
					speed_cnt = 0;
				}
			}
			return updateSpeed;
		},

			})

	return SpeedManager;

});