define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/gameover',
    'views/viewManager',
    'views/console'
], function (
    Backbone,
    MainView,
    ScoreboardView,
    GameView,
    GameoverView,
    viewManager,
    ConsoleView
) {
    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'console': 'consoleAction',
            '*default': 'defaultActions'
        },
        initialize: function () {
            viewManager.addView(MainView);
            viewManager.addView(ScoreboardView);
            viewManager.addView(GameView);
            viewManager.addView(GameoverView);
            viewManager.addView(ConsoleView);
        },
        defaultActions: function () {
            MainView.show();
        },
        scoreboardAction: function () {
            ScoreboardView.show();
        },
        consoleAction: function () {
            ConsoleView.show();
        },
        gameAction: function () {
            GameView.show();
        }
    });
    return new Router();
});