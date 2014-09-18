define( function(){

			getRandomInt = function(min, max) {
				var a = Math.floor(Math.random() * (max - min + 1)) + min;
  				return a;
			}

	return  getRandomInt;
	
});