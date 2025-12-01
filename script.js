// Your script here.
// Populate available voices
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set selected voice
function setVoice() {
  msg.voice = voices.find(voice => voice.name === voicesDropdown.value);
  restart();
}

// Speak the text
function speak() {
  msg.text = document.querySelector('[name="text"]').value;
  msg.rate = parseFloat(document.querySelector('[name="rate"]').value);
  msg.pitch = parseFloat(document.querySelector('[name="pitch"]').value);
  speechSynthesis.speak(msg);
}

// Stop speaking
function stop() {
  speechSynthesis.cancel();
}

// Restart speech with new settings
function restart() {
  stop();
  speak();
}

// Load voices when available
speechSynthesis.onvoiceschanged = populateVoices;

// Event listeners
voicesDropdown.addEventListener('change', setVoice);
speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);
options.forEach(option => option.addEventListener('change', restart));

