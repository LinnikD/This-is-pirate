define([
    'backbone',
    'tmpl/console'
], function (
    Backbone,
    tmpl
) {
    var ConsoleView = Backbone.View.extend({
        template: tmpl,
        initialize: function () {
            _.bindAll(this, 'hide', 'show', 'render');
            $("#page").append(this.el);
            this.render();
            this.hide();
        },

        show: function () {
            this.trigger('show', this);
            if (!localStorage.getItem('consoleguid'))
                this.$el.show();
            else
                window.location = "#game";
        },

        render: function () {
            this.$el.html(this.template());
        },
        
        hide: function () {
            this.$el.hide();
        }
    });
    return new ConsoleView();
});