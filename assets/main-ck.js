var music=document.getElementById("music"),musicControl=document.getElementById("music-control"),timeCount=document.getElementById("time-cunt");musicControl.addEventListener("click",function(){if(music.paused){music.play();musicControl.classList.remove("music-slient")}else{music.pause();musicControl.classList.add("music-slient")}},!1);