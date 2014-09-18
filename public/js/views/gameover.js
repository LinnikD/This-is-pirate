define([
    'backbone',
    'tmpl/gameover',
    'game/gameover'
],  function (
    Backbone,
    tmpl,
    gameOverHandler
) {  
    var View = Backbone.View.extend({
        template: tmpl,
        
        initialize: function () {
            _.bindAll(this, 'hide', 'show', 'render');
            $("#page").append(this.el);
            this.render();
            this.hide();
        },

        render : function (score) {
            this.$el.html(tmpl({
                score : score
            }));
        },

        show : function (score) {
            this.render(score);
            $(".gameover__form").submit(function (event) {
                event.preventDefault();
                gameOverHandler.handle(this, event);
            });
            this.$el.show();
            this.trigger("show", this);
        },

        hide : function () {
            this.$el.hide();
        }
    });
    return new View();
});