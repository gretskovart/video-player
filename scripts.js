const video = document.querySelector(".video");
const playButton = document.querySelector(".playback-button");
const videoControls = document.querySelector(".video-controls");
const playbackIcons = document.querySelectorAll(".playback-button use");
const remainingTine = document.querySelector(".time__remaining");
const volummerControl = document.querySelector(".volummer-control");

const isVideoWork = !!document.createElement("video").canPlayType;

if (isVideoWork) {
  video.controls = false;
  videoControls.classList.remove("hidden");
}

function togglePlay() {
  if (video.paused || video.ended) {
    video.play();
  } else {
    video.pause();
  }
}

function updatePlayButton() {
  playbackIcons.forEach((icon) => icon.classList.toggle("hidden"));
}

function formatTime(timeInSeconds) {
  const result = new Date(timeInSeconds * 1000).toISOString().substring(14, 19);

  return {
    minutes: result.substring(0, 2),
    seconds: result.substring(3, 6),
  };
}

function applyTimeRemaining(time) {
  remainingTine.innerText = `${time.minutes}:${time.seconds}`;
  remainingTine.setAttribute("datetime", `${time.minutes} ${time.seconds}`);
}

function initializeVideo() {
  const videoDuration = Math.round(video.duration);
  const time = formatTime(videoDuration);

  applyTimeRemaining(time);
}

function updateVideo() {
  if (isNaN(video.duration)) {
    return;
  }

  const time = formatTime(Math.round(+video.duration - +video.currentTime));

  applyTimeRemaining(time);
}

function loadVideo() {
  video.load();
}

function updateVolume(evt) {
  video.volume = evt.target.value;
}

playButton.addEventListener("click", togglePlay);
video.addEventListener("play", updatePlayButton);
video.addEventListener("pause", updatePlayButton);
video.addEventListener("loadedmetadata", initializeVideo);
video.addEventListener("timeupdate", updateVideo);
video.addEventListener("ended", loadVideo);
volummerControl.addEventListener("input", updateVolume);
