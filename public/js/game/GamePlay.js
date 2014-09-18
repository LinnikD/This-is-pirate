define([
	'classy', 
	'game/gameObjects/Ship',
	'game/gameManagers/SpeedManager',
	'game/gameManagers/MapManager',
	'game/gameManagers/BonusManager',
	'game/gameManagers/ScoreManager',
	], 
function(
	Class, 
	Ship,
	SpeedManager,
	MapManager,
	BonusManager,
	ScoreManager
){

	var GamePlay = Class.$extend({
		__init__ : function(ctx, callback) {
			this.ctx = ctx;
			this.ship = new Ship(ctx);
			this.speedManager = new SpeedManager(); 
			this.mapManager = new MapManager(ctx);
			this.bonusManager = new BonusManager(ctx, this.mapManager.isles);
			this.scoreManager = new ScoreManager(ctx);
			this.callback = callback;
		},
		update : function() {
			this.checkCollisions();
			this.speedManager.update();
			this.mapManager.update(this.speedManager.speed, this.speedManager.gen_code, this.ship.x);
			this.bonusManager.update(this.speedManager.speed, this.mapManager.isle_code);
			this.scoreManager.update(this.speedManager.speed);
			this.ship.update();
		},
		draw : function() {
			this.mapManager.draw();
			this.bonusManager.draw(this.ship.lifes);
			this.scoreManager.draw();
			this.ship.draw();
		},
		checkCollisions : function() {
			var collision = this.checkIsleCollision()
			if (collision && this.ship.killable) {
				this.ship.lifes -= 1;
				this.ship.killable = false;
			}
			if (!collision && !this.ship.killable){
				this.ship.killable_cnt++;
				if(this.ship.killable_cnt >= 4) {
					this.ship.killable = true;
					this.ship.killable_cnt = 0;
				}
			}
			if(collision && !this.ship.killable) {
				this.ship.killable_cnt = 0;
			}
			this.checkBonusCollision();
		},
		checkIsleCollision : function() {
			for(i = 0; i < this.mapManager.isles.length; i++) {
				if(this.mapManager.isles[i].y + 25 > this.ship.y  && this.mapManager.isles[i].y < this.ship.y + 50) {
	        		if (this.ship.horizontalCollision(this.mapManager.isles[i]) ) {
	        			this.ship.shake();
						return true; 
					}
				}
			}
			return false;	
		},
		checkBonusCollision : function() {
			if( this.checkLIfeCollision() ) {
				if(this.ship.lifes < 5)
					this.ship.lifes += 1;
			}
			if( this.checkCoinCollision() ) {
				this.scoreManager.score.score_num += 750;
			}

		},
		checkLIfeCollision : function() {
			if( this.bonusManager.life.visible && 
				this.bonusManager.life.y + this.bonusManager.life.size >= this.ship.y && 
				this.bonusManager.life.y <= this.ship.y + this.ship.size ) {
				if( this.ship.horizontalCollision(this.bonusManager.life) ) {
					this.bonusManager.life.visible = false;
					return true;
				}
			}
			return false;
		},
		checkCoinCollision : function() {
			if( this.bonusManager.coin.visible && 
				this.bonusManager.coin.y + this.bonusManager.coin.size >= this.ship.y && 
				this.bonusManager.coin.y <= this.ship.y + this.ship.size ) {
				if( this.ship.horizontalCollision(this.bonusManager.coin) ) {
					this.bonusManager.coin.visible = false;
					return true;
				}
			}
			return false;
		},
		death_int : function() {
			var death_repeat = 100;
			var death_current = 0;
			a = function() {
				this.ship.death();
				this.draw();
				death_current++;
				if (death_current == death_repeat) {
					return true;
				}
				else {
					return false;
				}
			}
			return a;
		}
	})

	return GamePlay;

});
