const scriptURL = "https://script.google.com/macros/s/AKfycbxfR5fMP9u_Izhyampa6JvP3q0YmB96FA7c06ECk-6SBDih0AxNwUVpvry3WWBdUKtn/exec";

const nameInput = document.getElementById("name");
const guestsInput = document.getElementById("guests");
const attendance = document.getElementById("attendance");

/* 🎵 MUSIC FADE IN */
const music = document.getElementById("bgMusic");
music.volume = 0;

function fadeIn(audio, target = 0.6, duration = 4000) {
  let step = 0;
  const interval = 100;
  const maxSteps = duration / interval;

  const fade = setInterval(() => {
    step++;
    audio.volume = Math.min(target, step / maxSteps);

    if (step >= maxSteps) clearInterval(fade);
  }, interval);
}

function startMusic() {
  music.play().then(() => fadeIn(music)).catch(() => {});
}

document.addEventListener("click", startMusic, { once: true });
document.addEventListener("touchstart", startMusic, { once: true });

/* POPUP */
function showPopup(msg) {
  const popup = document.createElement("div");
  popup.innerHTML = msg;

  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "rgba(255,245,247,0.95)";
  popup.style.padding = "20px";
  popup.style.borderRadius = "15px";
  popup.style.zIndex = "9999";
  popup.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";

  document.body.appendChild(popup);
  setTimeout(() => popup.remove(), 2000);
}

/* SUBMIT */
document.getElementById("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();

  if (!attendance.value) {
    showPopup("⚠️ Sila pilih kehadiran");
    return;
  }

  fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify({
      name: nameInput.value,
      guests: guestsInput.value,
      attendance: attendance.value,
    })
  });

  showPopup("💖 RSVP berjaya dihantar!");
  this.reset();
});