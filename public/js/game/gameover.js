define(['classy', 'models/score', 'collections/scores'], 
	function(Class, Score, Scores) {

	var Handler = Class.$extend({
		__init__ : function() {
		},

		handle : function(form, event) {
			/*var data = $(form).serialize();
			alert($(".gameover__score").val());
			alert($(".save__input").val());
			var url = $(form).attr('action');
			var method = $(form).attr('method');
			var xhr = new XMLHttpRequest();*/

			Scores.add({
                name: $(".window__save_input").val(),
                score: $(".gameover__score").val()
            });
            $(".gameover__status").html("Saving ...");
			$('input').each(function(i, field) {
				$(this).prop("disabled", true);
			});

            //window.location = "#scoreboard";

			/*var self = this;
			xhr.onreadystatechange = function() {
				if (this.readyState == 1) {
					$(".gameover__status").html("Saving ...");
					$('input').each(function(i, field) {
						$(this).prop("disabled", true);
					});
				}

				if (this.readyState == 4) {
					if (this.status == 200) {
						self.loadHandler(this);
					} else {
						self.errorHandler(this);
					}
				}
			}

			xhr.open(method, url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			xhr.send(data);*/
		},

		/*loadHandler : function(xhr) {
			var data = JSON.parse(xhr.responseText);
			console.log(data);
			//Scores.add(new Score({name : data["name"], score : data["score"]}));
			window.location = "#scoreboard";
		},

		errorHandler : function(xhr) {
			if (xhr.status == 400) {
				$(".gameover__status").html("Invalid name. Try again!");
				$('input').each(function(i, field) {
					$(this).prop("disabled", false);
				});
			} else if (xhr.status == 404) {
				//TODO client save
				alert("Strange problem. Request code: " + xhr.status);
				$('input').each(function(i, field) {
					$(this).prop("disabled", false);
				});
			} else {
				alert("Strange problem. Request code: " + xhr.status);
				$('input').each(function(i, field) {
					$(this).prop("disabled", false);
				});
			}
		}*/
	});

	return new Handler();
});