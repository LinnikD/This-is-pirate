require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
	    jquery: "/js/lib/jquery",
        underscore: "/js/lib/underscore",
        backbone: "/js/lib/backbone",
        Connector: "/js/lib/Connector",
        FnQuery: "/js/lib/FnQuery",
        modernizr: "lib/modernizr",
        "socket.io": "lib/socket.io"
    },
    shim: {
	    'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        "socket.io": {
            exports: "io"
        },
        "modernizr": {
            exports: "modernizr"
        }
    }
});

define([
    'Connector',
    'modernizr'
], function(
    Connector,
    modernizr
){
	var message = document.getElementById('message');
	var input = document.getElementById('token');
	var start, init, reconnect;

	// Создаем связь с сервером
	var server = new Connector({
			server: ['bind'],
			remote: '/player'
		}
	);

	// Инициализация
	init = function(){
		if (Modernizr.touch) {
		}
		else {
			alert('Ты лалка без тача!! :D');
		}
		window.addEventListener('touchend', pause_reload);
		window.addEventListener('deviceorientation', handleOrientation);
		can = document.getElementById('rows');
		ctx = can.getContext('2d');
		img_bg = new Image();
		img_bg.src = '../img/joystick_background.png';
		img = new Image();
		img.src = '../img/GoldCoin2.png';
		ctx.drawImage(img, 400, 0);
		message.innerHTML = 'ready';
		var queryStr = parseQueryString(window.location.search)
		// Если id нет
		if (!localStorage.getItem('playerguid')){
			if (queryStr['token']) {
				//alert(queryStr['token'])
				var queryStr = parseQueryString(window.location.search)
				server.bind({token: queryStr['token']}, function(data){
					if (data.status == 'success'){ //  В случае успеха
						// Стартуем джостик
						start(data.guid);
					}
				});
			}	
			else {// Ждем ввода токена
				input.parentNode.addEventListener('submit', function(e){
					e.preventDefault();

					// И отправляем его на сервер
					server.bind({token: input.value}, function(data){
						if (data.status == 'success'){ //  В случае успеха
							// Стартуем джостик
							start(data.guid);
						}
					});
				}, false);
			}

		} else { // иначе
			// переподключаемся к уже созданной связке
			reconnect();
		} 
	};

	parseQueryString = function (strQuery) {
		var strSearch = strQuery.substr(1),
			strPattern = /([^=]+)=([^&]+)&?/ig,
			arrMatch = strPattern.exec(strSearch),
			objRes = {};
		while (arrMatch != null) {
			objRes[arrMatch[1]] = arrMatch[2];
			arrMatch = strPattern.exec(strSearch);
		}
		return objRes;
	};



	play = function(){
		
		ctx.drawImage(img_bg, 0, 0);
		ctx.drawImage(img, 0, 0);

	};
	function handleOrientation(event) {
		if(window.orientation == 90)
			x = event.beta;
		if(window.orientation == - 90)
			x = -event.beta;
		if(window.orientation == 180 || window.orientation == 0)
		//	server.send('bad_orientation');
		y = event.gamma;
		ctx.drawImage(img_bg, 0, 0);
		ctx.drawImage(img, x * 10 + 400, 0);
			server.send(x);
	};
	function pause_reload(event) {
		//alert(event.touches[]) ;
		server.send('pause');
	};


	// Переподключение
	// Используем сохранненный id связки
	reconnect = function(){
		server.bind({guid: localStorage.getItem('playerguid')}, function(data){
			// Если все ок
			if (data.status == 'success'){
				// Стартуем
				start(data.guid);
			// Если связки уже нет
			} else if (data.status == 'undefined guid'){
				// Начинаем все заново
				localStorage.removeItem('playerguid');
				init();
			}
		});
	};

	// Старт игры
	start = function(guid){
		console.log('start player');
		// Сохраняем id связки
		localStorage.setItem('playerguid', guid);
		message.innerHTML = 'game';
	};

	server.on('reconnect', reconnect);

	init();

	// Обмен сообщениями
	server.on('message', function(data, answer){
		console.log('message', data);
		answer('answer');
	});

	window.server = server;

	/*
	server.send('message', function(answer){
		console.log(answer);
	});
	*/
});
