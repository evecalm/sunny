;(function (window) {
	var music = document.getElementById('music'),
		musicControl = document.getElementById('music-control'),
		timeCount = document.getElementById('time-cunt'),
		beginTime = new Date(2013,8,21,0,21,12);

	if (!music || !music.canPlayType) {
		document.body.innerText = 'Please use browser supports html5, such as Chrome, Firefox, Safari.'
		console.log('nono');;
	}

	musicControl.addEventListener('click',function () {
		if (music.paused) {
			music.play();
			musicControl.classList.remove('music-slient');
		} else {
			music.pause();
			musicControl.classList.add('music-slient');
		}
	},false);

	function cuntTime () {
		var str = '',
			tmp = 0;
			stamp = (+new Date()) - beginTime;
		stamp = Math.floor(stamp / 1000);
		// year
		tmp = Math.floor(stamp / (60 * 60 * 24 * 365));
		str += tmp + (tmp > 1 ? ' years ' : ' year ');
		// day
		stamp -= tmp * 60 * 60 * 24 * 365;
		tmp = Math.floor(stamp / (60 * 60 * 24));
		str += tmp + (tmp > 1 ? ' days ' : ' day ');
		// hour
		stamp -= tmp * 60 * 60 * 24;
		tmp = Math.floor(stamp / (60 * 60));
		str += tmp + (tmp > 1 ? ' hours ' : ' hour ');
		// minute
		stamp -= tmp * 60 * 60;
		tmp = Math.floor(stamp / 60);
		str += tmp + (tmp > 1 ? ' minutes ' : ' minute ');
		// second
		stamp -= tmp * 60;
		tmp = stamp;
		str += tmp + (tmp > 1 ? ' seconds ' : ' second ');

		timeCount.innerHTML = str;
	}

	setInterval(cuntTime, 1000);
})(window);

