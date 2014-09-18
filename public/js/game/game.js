define([
	'classy', 
	'game/GamePlay',
	'game/gameObjects/Pause',
	'game/input'
	], 
function(
	Class, 
	GamePlay,
	Pause,
	input
) {
	
	var Game = Class.$extend({
		__init__ : function(_canvas, callback) {

			this.canvas = _canvas;
			this.canvas.width = 660;
			this.canvas.height = 500;
			this.ctx = _canvas.getContext('2d');
			this.gamePlay = GamePlay(this.ctx, callback);
			this.interval;
			this.pause_obj = new Pause(this.ctx);
			this.callback = callback;
			this.death_time = 0;
			this.pause_int = false;
			this.ended = true;

		},

		start : function() {
			var game = this;
			this.ended = false;
			game.interval = setInterval( function(){ game.play() }, 1000/60);
		},

		play : function() {
			if(this.gamePlay.ship.lifes <= 0) {
				var game = this;
				clearInterval(game.interval);
				this.interval = setInterval(function(){ game.death() },1000/60);
			}
			this.gamePlay.update();
			this.gamePlay.draw();
		},
		death : function() {
			this.gamePlay.ship.death();
			this.gamePlay.draw();
			this.death_time++;
			if(this.death_time >= 80) {
				this.stop();
				this.ended = true;
				this.callback(this.gamePlay.scoreManager.score.score_num);
			}
		},
		pause : function() {
			    var game = this;
				this.stop();
				this.pause_int = setInterval(function(){ game.pause_obj.draw(); }, 1000/60);
		},
		release : function() {
			clearInterval(this.pause_int);
			this.pause_int = false;
			this.start();
		},
		stop : function() {
			clearInterval(this.interval);
		},

		initToken: function() {
            console.log('initToken')
            this.message.innerHTML = 'ready';
            var self = this;
            // Если id нет
            if (!localStorage.getItem('consoleguid')) {
                // Получаем токен
                this.server.getToken(function(token) {
                    $('#message').html('token: ' + token);
                    // self.gameToken = token
                });
            } else { // иначе
                // переподключаемся к уже созданной связке
                this.message.innerHTML = 'already connected';
                this.reconnect();
            }
        },
	})

	return Game;
});