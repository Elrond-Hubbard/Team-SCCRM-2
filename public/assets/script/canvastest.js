const button = document.getElementById("button");
const slider = document.getElementById("slider");

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// HEARTBEAT
// Transport.bpm = patient_db/vitals/heartRate
Tone.Transport.bpm.value = 85;
const meter = new Tone.Meter();
const heart = new Tone.MembraneSynth().connect(meter);

const heartbeat = new Tone.Sequence(
  (time, note) => {
    heart.triggerAttackRelease(note, "4n", time);
  },
  ["C2", "C2", "C2", "C2"],
  "4n"
);

slider.addEventListener("input", () => {
  Tone.Transport.bpm.value = slider.value;
});

button.addEventListener("click", () => {
  Tone.start();
  Tone.Transport.start(0);
  heartbeat.start(0);
});

// terrible horrible global variables
var x = 0;
var y = 0;

function animate() {
  // translucent mask painted over each frame to "fade out" point
  ctx.fillStyle = "rgba(0,0,0,0.005)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // canvas cleared and point position reset when point reaches end of canvas
  if (x >= canvas.width) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = 0;
  }

  ctx.beginPath();
  ctx.moveTo(x, y);

  // increment point position
  x += 1;
  // y position determined by Tone.meter
  y = meter.getValue() * -1.5 + canvas.height / 2;

  ctx.lineTo(x, y);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "red";
  ctx.stroke();

  // run this function on each frame
  requestAnimationFrame(animate);
}

animate();
