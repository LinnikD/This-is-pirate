define([
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function (
    Backbone,
    tmpl,
    scores
){
    var ScoreboardView = Backbone.View.extend({
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
            case 'Standart':
                document.getElementById(audio).play();
                delay = 700;
                break;
            }
            setTimeout(goto, delay);
        },
        render: function () {
            this.$el.html(this.template({scores: scores.toJSON()}));
        },
        show: function () {
            this.checkModelsInLocalStorage();
            scores.fetch({
                data: {
                    limit: 10
                },
                success: this.render.bind(this),
                error: this.showErrorMessage.bind(this)
            });
            this.$el.show();
            this.trigger('show', this);
        },

        showErrorMessage: function() {
            alert("Связь с сервером потеряна\nданные сохранены в локальном хранилище");
            window.location = "#";
        },
        
        checkModelsInLocalStorage: function() {
            var localScores;
            if (localStorage["pirate.scores"]) {
                localScores = JSON.parse(localStorage["pirate.scores"]);
            } else {
                localScores = [];
            }
            localStorage.removeItem("pirate.scores");
            localScores.forEach(function(element, index, array) {
                scores.add({
                    name: element["name"],
                    score: element["score"]
                })
            });
        },

        hide: function () {
            this.$el.hide();
        }
    });
    return new ScoreboardView();
});