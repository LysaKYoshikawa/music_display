const nowPlaying = document.querySelector('.now-playing');
const dataName = document.querySelector('.music-name');
const trackArt = document.querySelector('.music-art');
const dataArtist = document.querySelector('.music-artist');

const playBtn = document.querySelector('.playpause-track');
const prevBtn = document.querySelector('.prev-track');
const nextBtn = document.querySelector('.next-track');

const seekSlider = document.querySelector('.seek-slider');
const volumeSlider = document.querySelector('.volume-slider');
const currTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const wave = document.getElementById('wave');
const randomIcon = document.querySelector('.fa-random');
const currentSong = document.createElement('audio');

let songIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const songsList = [
  {
    img : 'images/Carry.png',
    name : 'Carry on Wayward Son',
    artist : 'Kansas',
    music : 'music/Carry.mp3'
  },
  {
    img : 'images/Girls.png',
    name : 'Girls Just Want to Have Fun',
    artist : 'Cyndi Lauper',
    music : 'music/Girls.mp3'
  },
  {
    img : 'images/You.png',
    name : 'You Make Me Feel',
    artist : 'Sylvester',
    music : 'music/You.mp3'
  }
];

loadSong(songIndex);

function loadSong(songIndex) {
  clearInterval(updateTimer);
  reset()

  currentSong.src = songsList[songIndex].music;
  
  currentSong.load();

  trackArt.style.background = "url(" + songsList[songIndex].img + ")";
  dataName.textContent = songsList[songIndex].name;
  dataArtist.textContent = songsList[songIndex].artist;
  nowPlaying.textContent = "Tocando musica " + (songIndex + 1) + " de " + songsList.length;
  
  currentSong.addEventListener('ended', nextSong)
  random_bg_color();
}


function random_bg_color(){
  let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
  let a;

  function populate(a){
    for(let i=0; i<6; i++){
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let Color1 = populate('#');
  let Color2 = populate('#');
  var angle = 'to right';

  let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
  document.body.style.background = gradient;
}

function reset(){
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function randomTrack(){
  isRandom ? pauseRandom() : playRandom();
}

function playRandom(){
  isRandom = true;
  randomIcon.classList.add('randomActive');
}

function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatSong(){
    let index = songIndex;
    loadSong(index);
    playSong();
}

function playpauseSong(){
  isPlaying ? pauseSong() : playSong();
}

function playSong(){
  currentSong.play();
  console.log('É  current',currentSong)
  isPlaying = true
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  playBtn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';

}

function playListSong(index){
  currentSong.src = songsList[index].music;
  
  currentSong.play();
  
  isPlaying = true
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  playBtn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';

  trackArt.style.background = "url(" + songsList[index].img + ")";
  dataName.textContent = songsList[index].name;
  dataArtist.textContent = songsList[index].artist;

}

function pauseSong(){
  currentSong.pause();
  isPlaying = false;
  trackArt.classList.remove('rotate');
  wave.classList.remove('loader');
  playBtn.innerHTML = '<i class="fas fa-play fa-2x"></i>';
}


function prevSong(){
  if(songIndex > 0){
    songIndex -= 1;
  }else{
    songIndex = songsList.length -1;
  }

  loadSong(songIndex);
  playSong();
}

function nextSong(){
  if(songIndex < songsList.length -1 && isRandom === false){
    songIndex += 1;
  }else if(songIndex < songsList.length -1 && isRandom === true){
    let random = Number.parseInt(Math.random() * songsList.length);
    songIndex = random;
  }else{
    songIndex = 0;
  }

  loadSong(songIndex);
  playSong();
}

function seekTo(){
    let seekto = currentSong.duration * (seekSlider.value / 100);
    currentSong.currentTime = seekto;
}

function setVolume(){
    currentSong.volume = volumeSlider.value / 100;
}

function updateProgress(){
  let seekPosition = 0;
    if(!isNaN(currentSong.duration)){
        seekPosition = currentSong.currentTime * (100 / currentSong.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currentSong.currentTime / 60);
        let currentSeconds = Math.floor(currentSong.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currentSong.duration / 60);
        let durationSeconds = Math.floor(currentSong.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

