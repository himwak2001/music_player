const music = document.querySelector('.audio');
const play = document.getElementById("play");
const music_image = document.getElementById("music-image");
let title_music = document.getElementById("title");
let artist_music = document.getElementById("artist");
let previous = document.getElementById("back");
let next = document.getElementById("for");
let progress_bar = document.getElementById("progress-bar");
let duration_time = document.getElementById("duration");
let current_time = document.getElementById("current-time");
let progress_div = document.getElementById("progress-div");
let isPlaying = false;

const songs = [{
	name: 'wada_karo',
	title: 'Wada Karo',
	artist: 'Kishore Kumar | Lata Mangeshkar',
	musicImg: 'music_1'
},
{
	name: 'dekhte_dekhte',
	title: 'Dekhte Dekhte',
	artist: 'Atif Aslam',
	musicImg: 'music_2'
},
{
	name: 'pal',
	title: 'Pal',
	artist: 'Arijit Singh | Shreya Ghoshal',
	musicImg: 'music_3'
},
{
	name: 'dilbar_mere_kab_tk',
	title: 'Dilbar Mere',
	artist: 'Anette | Kishore Kumar',
	musicImg: 'music_4'
},
{
	name: 'muskurata_hua_mera_yaar',
	title: 'Muskurata Hua',
	artist: 'Kishore Kumar',
	musicImg: 'music_5'
},
{
	name: 'pyar_manga_hai',
	title: 'Pyar Manga Hai Tumhi Se',
	artist: 'Kishore Kumar',
	musicImg: 'music_6'
},
{
	name: 'keh_du_tumhe',
	title: 'Keh Du Tumhe',
	artist: 'Asha Bhosle | DJ Aqeel | Kishore Kumar',
	musicImg: 'music_7'
},
{
	name: 'lekhe_jo_khat_tujhe_Trim',
	title: 'Likhe Jo Khat Tujhe',
	artist: 'Mohammed Raf',
	musicImg: 'music_1'
},
{
	name: 'mere_sapno_ki_rani',
	title: 'Mere Sapnon Ki Rani',
	artist: 'Kishore Kumar',
	musicImg: 'music_1'
},
{
	name: 'ye_reshmi_julfe',
	title: 'Yeh Reshmi Zulfein',
	artist: 'Mohammed Rafi',
	musicImg: 'music_1'
},
{
	name: 'jab_se_tumko',
	title: 'Jabse Tumko Dekha Hai Sanam',
	artist: 'Kumar Sanu | Sadhana Sargam | Alka Yagnik',
	musicImg: 'music_3'
}]

// Play functionality
const playMusic = () => {
	isPlaying = true;
	music.play();
	play.innerHTML = "pause";
	music_image.classList.toggle('anime');
}

// Pause functionality
const pauseMusic = () => {
	isPlaying = false;
	music.pause();
	play.innerHTML = "play_arrow";
	music_image.classList.toggle('anime');
}

play.addEventListener('click', () => {
	isPlaying ? pauseMusic() : playMusic();

})

const loadSongs = (songs) => {
	title_music.textContent = songs.title;
	artist_music.textContent = songs.artist;
	music.src = songs.name + ".mp3";
	music_image.src = songs.musicImg + ".jpg";
}

songIndex = 0;

const nextSong = () => {
	songIndex = (songIndex + 1) % songs.length;
	loadSongs(songs[songIndex]);
}

const previousSong = () => {
	songIndex = (songIndex - 1 + songs.length) % songs.length;
	loadSongs(songs[songIndex]);
}

// Progress Bar
// When the time will update by a second the event will be fired
music.addEventListener('timeupdate', (event) => {
	const { currentTime, duration } = event.srcElement;
	let progress_limit = (currentTime / duration) * 100;
	progress_bar.style.width = `${progress_limit}%`;

	// Music duration update
	let duration_min = Math.floor(duration / 60);
	let duration_sec = Math.floor(duration % 60);
	let total_duration = `${duration_min}:${duration_sec}`
	if (duration) {
		duration_time.textContent = `${total_duration}`;
	}

	// Current duration update
	let currentTime_min = Math.floor(currentTime / 60);
	let currentTime_sec = Math.floor(currentTime % 60);
	if (currentTime_sec < 10) {
		currentTime_sec = `0${currentTime_sec}`;
	}
	let total_currentTime = `${currentTime_min}:${currentTime_sec}`;
	current_time.textContent = `${total_currentTime}`;
})

// Progress onclick functionality
progress_div.addEventListener('click', (event) => {
	const { duration } = music;
	let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
	music.currentTime = move_progress;
});

// // call nextSong function if music will end
// music.addEventListener('ended', nextSong);

next.addEventListener('click', nextSong);
previous.addEventListener('click', previousSong);