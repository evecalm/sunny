;(function (window) {
	var $ = function (id) {
			return window.document.getElementById(id);
		},
		$heart = $('heart'),
		$garden = $('garden'),
		offsetX = $heart.clientWidth / 2,
		offsetY = $heart.clientHeight / 2 - 55,
		music = $('music'),
		musicControl = $('music-control'),
		gardenCtx, garden;

	if (!document.createElement('canvas').getContext) {
		document.body.innerHTML = "请使用支持HTML5的浏览器浏览本页！<br/>推荐使用Safari，Chrome，Firefox或IE9+。"; 
		document.execCommand("stop");
		return;
	}

	musicControl.addEventListener('click',function () {
		if (music.paused) {
			music.play();
		} else {
			music.pause();
		}
	});


	music.addEventListener('play',function () {
		musicControl.className = 'playing';
	});

	music.addEventListener('pause',function () {
		musicControl.className = 'stop';
	});

	music.addEventListener('error',function () {
		musicControl.className = 'stop';
	});

	function initGarden () {
		$garden.width = $heart.clientWidth;
		$garden.height = $heart.clientHeight;
		gardenCtx = $garden.getContext('2d');
		gardenCtx.globalCompositeOperation = "lighter";
		garden = new Garden(gardenCtx, $garden);
		setInterval(function () {
			garden.render();
		}, Garden.options.growSpeed);
	}

	function getHeartPoint(angle) {
		var t = angle / Math.PI;
		var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
		var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
		return [offsetX + x, offsetY + y];
	}

	function startHeartAnimation() {
		var interval = 50;
		var angle = 10;
		var heart = [];
		var animationTimer = setInterval(function () {
			var bloom = getHeartPoint(angle);
			var draw = true;
			for (var i = 0; i < heart.length; i++) {
				var p = heart[i];
				var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
				if (distance < Garden.options.bloomRadius.max * 1.3) {
					draw = false;
					break;
				}
			}
			if (draw) {
				heart.push(bloom);
				garden.createRandomBloom(bloom[0], bloom[1]);
			}
			if (angle >= 30) {
				clearInterval(animationTimer);
				showMessage();
			} else {
				angle += 0.2;
			}
		}, interval);
	}

	function _cuntTime (beginTime, timeCount) {
		var str = '',
			tmp = 0,
			stamp = (+new Date()) - beginTime;
		stamp = Math.floor(stamp / 1000);
		tmp = Math.floor(stamp / (60 * 60 * 24));
		str += tmp + '<span>' + (tmp > 1 ? ' days ' : ' day ') + '</span>';
		// hour
		stamp -= tmp * 60 * 60 * 24;
		tmp = Math.floor(stamp / (60 * 60));
		str += tmp + '<span>' + (tmp > 1 ? ' hours ' : ' hour ') + '</span>';
		// minute
		stamp -= tmp * 60 * 60;
		tmp = Math.floor(stamp / 60);
		str += tmp + '<span>' + (tmp > 1 ? ' minutes ' : ' minute ') + '</span>';
		// second
		stamp -= tmp * 60;
		tmp = stamp;
		str += tmp + '<span>' + (tmp > 1 ? ' seconds ' : ' second ') + '</span>';

		timeCount.innerHTML = str;
	}

	function cuntTime () {
		var beginTime = new Date(2013,10,22,21,10,12),
			timeCount = $('time-count');
		setInterval(_cuntTime, 1000,beginTime,timeCount);
	}

	function showMessage () {
		var words = $('words'),
			opacity = 0;
		words.style.opacity = 0;
		words.style.filter = '';
		var last = +new Date();
		var tick = function() {
			opacity += (new Date() - last) / 400;
			words.style.opacity = opacity;
			words.style.filter = 'alpha(opacity=' + (100 * opacity)|0 + ')';
			last = +new Date();
			if (opacity < 1) {
				(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
			}
		};
		tick();
	}

	function memorialDay (str) {
		var dayFrom = {
			lovetime: new Date(2013,10,22),
			meettime: new Date(2013,9,2),
			hugtime: new Date(2013,10,30),
			kisstime: new Date(2013,11,14)
		},
		dayCount = {},
		now = new Date(),
		key;
		for (key in dayFrom) {
			dayCount[ key ] = Math.floor( ( now - dayFrom[ key ]) / (1000 * 60 * 60 * 24) );
		}
		return str.replace(/{([^}]+)}/g, function ($0, $1) {
			return dayCount[$1] != null ? dayCount[$1] : '';
		});
	}

	function typewriter (el) {
		var str = memorialDay(el.innerHTML), progress = 0, timer;
		el.innerHTML = '';
		timer = setInterval(function() {
			var current = str.substr(progress, 1);
			if (current == '<') {
				progress = str.indexOf('>', progress) + 1;
			} else {
				++progress;
			}
			el.innerHTML = str.substring(0, progress) + (progress & 1 ? '_' : '');
			if (progress >= str.length) {
				clearInterval(timer);
			}
		}, 100);
	}

	initGarden();
	startHeartAnimation();
	cuntTime();
	typewriter($('notes'));
	// for mac safari
	music.play();
})(window);
