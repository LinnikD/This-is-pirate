define([
    'backbone',
    'tmpl/main'
], function (
    Backbone,
    tmpl
) {
    var MainView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            _.bindAll(this, 'hide', 'show', 'render');
            $("#page").append(this.el);
            this.render();
            this.hide();
        },
        events: {
            "click a.button": "soundClick"
        },

        soundClick: function (event) {
            event.preventDefault();
            var $C = $(event.currentTarget),
                audio = $C.data('audio'),
                goto = function () {
                    window.location.hash = $C.attr('href');
                },
                delay = 0;
            switch (audio) {
            case 'Start':
            case 'Standart':
                document.getElementById(audio).play();
                delay = 1000;
                break;
            }
            setTimeout(goto, delay);
        },

        show: function () {
            this.$el.fadeIn(2400);
            this.trigger('show', this);
        },
        render: function () {
            this.$el.html(this.template());

        },
        hide: function () {
            this.el.style.display = "none";
        }
    });
    return new MainView();
});