var music = $('music')
var musicControl = $('music-control')
var $countOn = $('time-count')

musicControl.addEventListener('click',function () {
  if (music.paused) {
    music.play()
  } else {
    music.pause()
  }
})


music.addEventListener('play',function () {
  musicControl.className = 'playing'
})

music.addEventListener('pause',function () {
  musicControl.className = 'stop'
})

music.addEventListener('error',function () {
  musicControl.className = 'stop'
})

var STARTED_AT = new Date('2019/4/7 1:02:12 GMT+8')

function countOn() {
  var gap = Math.floor((Date.now() - STARTED_AT) / 1000)
  var html = ''
  var DAY_LONG = 24 * 60 * 60
  html += Math.floor(gap / DAY_LONG) + '<span> days </span>'
  gap %= DAY_LONG
  var HOUR_LONG = 60 * 60
  html += Math.floor(gap / HOUR_LONG) + '<span> hours </span>'
  gap %= HOUR_LONG
  var MINUTE_LONG = 60
  html += Math.floor(gap / MINUTE_LONG) + '<span> minutes </span>'
  gap %= MINUTE_LONG
  html += gap + '<span> seconds </span>'
  $countOn.innerHTML = html
}

function init() {
  countOn()
  setInterval(countOn, 500)
  music.play()
  new Board(Love).run()
}

init()