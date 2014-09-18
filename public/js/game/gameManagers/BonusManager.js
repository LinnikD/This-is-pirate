define([
		'classy',
		'game/gameObjects/Life',
		'game/gameObjects/Coin',
		'game/util/getRandomInt',
	], function( 
		Class,
		Life,
		Coin,
		getRandomInt
){

	var BonusManager = Class.$extend({
		__init__ : function(ctx, isles) {
			this.ctx= ctx;
			this.isles = isles;
			this.life = new Life(ctx);
			this.coin = new Coin(ctx);
			this.img = new Image();
			this.img.src = 'img/game/heart.png';
			this.current_bonus = 'nothing';
			this.bonus_gen = 0;
			this.BONUS_REDY_TO_GENERATE = 5;
		},
		update : function(speed, gen_code) {
			this.generateBonus(gen_code);
			this.coin.update(speed);
			this.life.update(speed);
		},
		draw : function(lifes) {
			for(i = lifes; i > 0; i--) {
				x = this.ctx.canvas.width - 2 * this.life.size * i;
				this.ctx.drawImage(this.img, x, 0);
			}
			this.coin.drawCoin();
			this.life.drawLife();
		},
		generateBonus : function(gen_code) {
			if( gen_code == 0) {
				this.bonus_gen++;
				if(this.bonus_gen == this.BONUS_REDY_TO_GENERATE) {
					if(getRandomInt(0,4) >= 3) {
						this.setBonusPlace(this.life);
						this.current_bonus = 'life';
					}
					else {
						this.setBonusPlace(this.coin);
						this.current_bonus = 'coin';
					}
					this.bonus_gen = 0;
				}
			}
		},
		setBonusPlace : function(bonus) {
			do {
				bonus.x = getRandomInt(0, this.ctx.canvas.width - bonus.size * 2) 
			}
			while( this.collisionWithLastIsles(bonus, 2) )
			bonus.y = -100;
			bonus.visible = true;
		},
		collisionWithLastIsles : function(obj,cnt) {
			for(i = 0; i < cnt; i++) {
				if( obj.horizontalCollision( this.isles[this.isles.length - 1 - i] ))
					return true;
			}
			return false;
		},
	})

	return BonusManager;

});