function playAudio(url) {
  const audio = new Audio(url);

  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}
