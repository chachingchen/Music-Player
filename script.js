const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress'); 
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const randomBtn = document.getElementById('random');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'Electric Chill Machine',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-2',
		displayName: 'Seven Nation Army',
		artist: 'Jacinto Design'
	},
	{
		name: 'jacinto-3',
		displayName: 'Goodnight, Disco Queen',
		artist: 'Jacinto Design'
	},
	{
		name: 'metric-1',
		displayName: 'Front Row',
		artist: 'Jacinto Design'
	}
];

// Check if Playing
let isPlaying = false;

//Play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

//Pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

//Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpg`;
}


// current song
let songIndex = 0;

// randomly select a song in list
function randomSong() {
	let pickASong = getRandom(0, songs.length-1);
	loadSong(songs[pickASong]);
	playSong();
	// if pickASong === currentTrack, pick next song
// 	let i = 0;
// 	for(i; i <= songs.length-1; i++) {
// 		if(title.textContent === songs[i].displayName) return i;
// }
// 	let pickASong = getRandom(0, songs.length-1);
// 	console.log('pickASong: ',getRandom(0, songs.length-1));
// 	(pickASong === i) ? loadSong(songs[pickASong+1]) : loadSong(songs[pickASong]);
// 	playSong();
}

//generate random number
function getRandom(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max-min +1) + min); //max min are inclusive
}

// previous song
function prevSong() {
	songIndex--;
	if(songIndex < 0) {
		songIndex = songs.length -1;
	}
	loadSong(songs[songIndex]);
	playSong();
}

// next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length -1) {
		songIndex = 0;
	}
	loadSong(songs[songIndex]);
	playSong();
}
// on load= select first song
loadSong(songs[songIndex]);

// update Progress Bar & time

function updateProgressBar(e) {
  if(isPlaying) {
  	const {duration, currentTime} = e.srcElement;
  	// update progress bar width
  	const progressPercent = (currentTime / duration) *100;
  	progress.style.width = `${progressPercent}%`;
  	// calculate displey for duration
  	const durationMinutes = Math.floor(duration / 60);
  	let durationSeconds = Math.floor(duration % 60);
  	if(durationSeconds < 10) {
  		durationSeconds = `0${durationSeconds}`
  	}
  	
  	// Delay switching duration element to avoid NaN
  	if(durationSeconds) {
  		durationEl.textContent = `${durationMinutes}:${durationSeconds}`; 
  	}
  	// calculate displey for currentTime
  	const currentMinutes = Math.floor(currentTime / 60);
  	let currentSeconds = Math.floor(currentTime % 60);
  	if(currentSeconds < 10) {
  		currentSeconds = `0${currentSeconds}`
  	}
  	currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`; 
  }
}

// set progress bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const {duration} = music;
	music.currentTime = (clickX / width) * duration;
}
// Event Listeners
randomBtn.addEventListener('click', randomSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);