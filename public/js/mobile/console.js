define([
    'Connector',
    'QRCode'
], function(
    Connector,
    QRCode
){
	var Console = function(omMessageCallback) {
		
		var message = document.getElementById('message');
		var start, init, reconnect;

		// Создаем связь с сервером
		var server = new Connector({
				server: ['getToken', 'bind'],
				remote: '/console'
			}
		);

		// На подключении игрока стартуем игру
		server.on('player-joined', function(data){
			// Передаем id связки консоль-джостик
			start(data.guid);
		});

		// Инициализация
		init = function(){
			message.innerHTML = 'ready';

			var qrcode = new QRCode(document.getElementById('qrcode'), {
				width : 200, 
				height : 200
			});
			// Если id нет
			if (!localStorage.getItem('consoleguid')){
				// Получаем токен
				server.getToken(function(token){
					message.innerHTML = token;
					qrcode.makeCode("http://192.168.0.1:8000/joystick?token=" + token);
				});
			} else { // иначе 'token: '
				reconnect();
			}
		};
		// Переподключение
		reconnect = function(){
			// Используем сохранненный id связки
			server.bind({guid: localStorage.getItem('consoleguid')}, function(data){
				// Если все ок
				if (data.status == 'success'){
					// Стартуем
					start(data.guid);
				// Если связки уже нет
				} else if (data.status == 'undefined guid'){
					// Начинаем все заново
					localStorage.removeItem('consoleguid');
					init();
				}
			});
		};

		server.on('reconnect', reconnect);

		// Старт игры
		start = function(guid){
			console.log('start console');
			// Сохраняем id связки
			localStorage.setItem('consoleguid', guid);
			message.innerHTML = 'game';
			window.location = "#game";
		};

		init();

		// Обмен сообщениями
		server.on('message', function(data, answer){
			console.log('message', data);
			omMessageCallback(data);
			answer('answer');
		});

		window.server = server;

		/*
		server.send('message', function(answer){
			console.log(answer);
		});
		*/
	};
	return Console;
});
