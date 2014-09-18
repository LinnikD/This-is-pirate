define([
    'backbone',
    'models/score'
], function(
    Backbone,
    Score
){

    var Collection = Backbone.Collection.extend({
		model: Score,
		url: "/scores",

		comparator: function(Score) {
			return -Score.get("score");
		},

		initialize: function(){
			this.on('add', this.addScore, this);
		},
		addScore: function (model) {
			//alert("Добавление результата");
			model.save(null, {
				wait: true,
				success: this.successAdd.bind(this),
				error: this.saveLocalStorage.bind(this)
			});



		},
		successAdd: function (model, response, options) {
			//alert('Успешное добавление');
			window.location = "#scoreboard";
		},
		saveLocalStorage: function (model, xhr, options) {
			//alert('Сервер не ответил, сохраняем в локальное хранилище')
			$(".gameover__status").html("Сервер не ответил, результат будет сохранен в локал сторедж");
				$('input').each(function(i, field) {
					$(this).prop("disabled", false);
			});
			
			var scores;
				if (localStorage["pirate.scores"]) {
					scores = JSON.parse(localStorage["pirate.scores"]);
				} else {
					scores = [];
				}
				scores.push(model);
				localStorage["pirate.scores"] = JSON.stringify(scores);
				window.location = "#scoreboard";
		}
    });
    return new Collection();
});