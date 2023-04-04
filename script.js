const nowPlaying = document.querySelector('.now-playing');
const trackName = document.querySelector('.track-name');
const trackArt = document.querySelector('.track-art');
const trackArtist = document.querySelector('.track-artist');

const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

const seekSlider = document.querySelector('.seek_slider');
const volume = document.querySelector('.volume_slider');
const currentTime = document.querySelector('.current-time');
const totalDuration = document.querySelector('.total-duration');
const wave = document.querySelector('wave');
const randomIcon = document.querySelector('.fa-random');
const currentSong = document.createElement('audio');

const songsList = [
  {
    img : 'images/Carry on Wayward Son.JPG',
    name : 'Carry on Wayward Son',
    artist : 'Kansas',
    music : 'music/Carry on Wayward Son.mp3'
  },
  {
    img : 'images/Girls Just Want to Have Fun.JPG',
    name : 'Girls Just Want to Have Fun',
    artist : 'Cyndi Lauper',
    music : 'music/Girls Just Want to Have Fun.mp3'
  },
  {
    img : 'images/You Make Me Feel.JPG',
    name : 'You Make Me Feel',
    artist : 'Sylvester',
    music : 'music/You Make Me Feel.mp3'
  }
];

let songIndex = 2;
let isPlaying = false;
let isRandom = false;
let updateTimer;

loadSong(songIndex);

function loadSong(songIndex) {
  clearInterval(updateTimer);
  reset()

  audio.src = songsList[songIndex].music;
  audio.load();

  trackArt.style.background = "url(" + songsList[songIndex].img + ")";
  trackName.textContent = songsList[songIndex].name;
  trackArtist.textContent = songsList[songIndex].artist;
  nowPlaying.textContent = "Tocando musica " + (songIndex + 1) + "de" + songsList.length;
  
  updateTimer = setInterval(setUpdate, 1000);

  currentSong.addEventListener('ended', nextTrack)
  random_bg_color();
}

// Colocar em uma função esse topico 
// melhorar a semantic do html trocando as div pelo seu respectivo tags container pode ser section 
// Texto ser um texto padrão ex vazio
// pensar em um index mais dinâmico.
// add a lista de musicas do lado
// ler e entender funções anonimas

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
    currentTime.textContent = "00:00";
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

function repeatTrack(){
    let index = songIndex;
    loadSong(index);
    playSong();
}

function playpauseSong(){
    isPlaying ? pauseSong() : playSong();
}

function playSong(){
  currentSong.play();
  isPlaying = true
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  musicContainer.classList.add('play');
  playBtn.innerHTML = '<i class="fas fa-pause fa-2x"></i>';

}

function pauseSong(){
  currentSong.pause();
  trackArt.classList.add('rotate');
  wave.classList.add('loader');
  musicContainer.classList.add('play');
  playBtn.innerHTML = '<i class="fas fa-play fa-2x"></i>';

}


function prevSong(){
  songIndex--

  if(songIndex > 0){
    songIndex -= 1;
  }else{
    songIndex = songsList.length -1;
  }

  loadSong(songsList[songIndex]);

  playSong();
}

function nextSong(){
  songIndex++

  if(songIndex < songsList.length -1 && isRandom === false){
    songIndex += 1;
  }else if(songIndex < songsList.length -1 && isRandom === true){
    let random = Number.parseInt(Math.random() * songsList.length);
    songIndex = random;
  }else{
    songIndex = 0;
  }

  loadSong(songsList[songIndex]);
  playSong();

}

function seekTo(){
    let seekto = currentSong.duration * (seekSlider.value / 100);
    currentSong.currentTime = seekto;
}

function setVolume(){
    currentSong.volume = volume.value / 100;
}

function updateProgress(e){
  
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

        currentTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

