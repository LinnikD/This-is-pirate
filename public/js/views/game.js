define([
    'backbone',
    'tmpl/game',
    'game/game', 
    'views/gameover',
    'mobile/console',
    'views/console'
], function(
    Backbone,
    tmpl,
    Game, 
    gameOver,
    Console,
    console_view
){
    var GameView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            _.bindAll(this, 'hide', 'show', 'render');
            $("#page").append(this.el);
            this.render();
            this.game = new Game(
                document.getElementById('game'),
                function(score) {
                    gameOver.show(score);
                }
            );
            var self = this;
            this.console = new Console( function(data) {


                if(data == 'pause'){
                    if(self.game.ended) {
                        self.show();
                    }
                    else {
                        if(self.game.pause_int)
                            self.game.release();
                        else
                            self.game.pause();
                    }
                    return;
                }
//                if(data == 'bad_orientation'){

  //              }
                self.game.gamePlay.ship.balance = data/ 6;
                
            });
        },
        events: {
            "click a.button": "soundClick"          
        },

        soundClick: function (event) {
            event.preventDefault();
            var $C = $(event.currentTarget);
            var audio = $C.data('audio');
            var goto = function(){
                window.location.hash = $C.attr('href');
            };
            var delay = 0;
            switch(audio){
            case 'Standart':
                document.getElementById(audio).play();
                delay = 700;
            break;
            }
            setTimeout(goto, delay);
        },
        render: function () {
            this.$el.html(this.template());
        },
        show: function () {
            this.$el.show();
            this.trigger('show', this);
            this.game.__init__(document.getElementById('game'),
                function(score) {
                    gameOver.show(score);
                });
            this.game.start();
        },
        hide: function () {
            this.$el.hide();
            this.game.stop();
        }
    });
    return new GameView();
});