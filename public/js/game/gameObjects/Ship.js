define([
		'classy',
		'game/gameObjects/GameObject',
		'game/util/getRandomInt',
		'game/input'
	], function( 
		Class,
		GameObject,
		getRandomInt,
		input
){

	var Ship = GameObject.$extend({
		__init__ : function(ctx) {
			this.$super( ctx.canvas.width/2 - 50, ctx.canvas.height*3/4, ctx);
      this.img_left = new Image();
      this.img_left.src = 'img/game/ship_left.png';
      this.img_right = new Image();
      this.img_right.src = 'img/game/ship_right.png';
      this.img_direct = new Image();
      this.img_direct.src = 'img/game/ship.png';
		 	this.img.src = 'img/game/ship.png';
      this.lifes = 1;
      this.life_img = new Image();
      this.life_img.src = 'img/game/heart.png'
		 	this.size = 30;
		 	this.left = 0;
    	this.right = 0;
      this.killable = true;
      this.killable_cnt = 0;
      this.balance = 0;
		},
    draw : function() {
      this.ctx.drawImage(this.img, this.x, this.y);
    },
		update : function(speed) {
      if(this.balance != 0) {
        this.x += this.balance;
      }
      if(this.balance > 2) {
        this.img = this.img_right;
      }
      if(this.balance < -2) {
        this.img = this.img_left;
      }
      if(this.balance >= -2 && this.balance <= 2) {
        this.img = this.img_direct;
      }
      if( input.isDown('LEFT') ) {
        this.img = this.img_left;
        this.x -= 3;
        if(this.left > 10)
          this.x -=3;
        if(this.left > 20)
          this.x -=3;
        this.right = 0;
        this.left+=1;
      }
      if( input.isDown('RIGHT') ) {
        this.img = this.img_right; 
        this.x += 3;
      if(this.right > 10)
        this.x +=3;
      if(this.right > 20)
        this.x +=3;
      this.left = 0;
      this.right+=1;
      }
      if(!input.isDown('RIGHT') && !input.isDown('LEFT')) {
        
      this.left = 0;
      this.right = 0;
      } 
      this.borderCollision();
    },
    borderCollision : function() {
      if(this.x < 0)
        this.x = 0;
      if(this.x > this.ctx.canvas.width - this.size * 2)
        this.x = this.ctx.canvas.width - this.size * 2;
    },
    shake : function() {
      this.x += getRandomInt(-6, 6);
    },
    death : function() {
      this.x += getRandomInt(-6, 6);
      this.y += getRandomInt(-6, 6);
    }
	})

	return Ship;

});