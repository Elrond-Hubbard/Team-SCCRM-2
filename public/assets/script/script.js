const heartRateEl = document.querySelector('[name="BPM"]');
const bloodPressEl = document.querySelector('[name="mmHG"]');
const bodyTempEl = document.querySelector('[name="Temp"]');
const oxygenEl = document.querySelector('[name="O2"]');

function getLatestVitals(doctor_id, patient_id) {
  return fetch(`/api/doctor/${doctor_id}/patient/${patient_id}`)
    .then((response) => response.json())
    .then((data) => {
      const vitals = data.vitals.pop();
      return vitals;
    });
}

function updateMonitor(vitals) {
  heartRateEl.innerText = vitals.heartRate;
  bloodPressEl.innerText = `${vitals.systolic}|${vitals.diastolic}`;
  bodyTempEl.innerText = vitals.bodyTemp;
  oxygenEl.innerText = `${vitals.O2}%`;
  Tone.Transport.bpm.value = vitals.heartRate;
}

getLatestVitals(5, 10).then((vitals) => {
  updateMonitor(vitals);
});

///////////////////////////////////////////////////////////////////////////////////////
// PULSE OXIMETER ANIMATION //
///////////////////////////////////////////////////////////////////////////////////////

const containerEl = document.getElementById("canvasContainer");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = containerEl.offsetWidth ;
canvas.height = containerEl.offsetHeight ;

// HEARTBEAT
// Transport.bpm = patient_db/vitals/heartRate
Tone.Transport.bpm.value = 70;
const meter = new Tone.Meter();
const heart = new Tone.MembraneSynth().connect(meter);

const heartbeat = new Tone.Sequence(
  (time, note) => {
    heart.triggerAttackRelease(note, "4n", time);
  },
  ["C2", "C2", "C2", "C2"],
  "4n"
);

// terrible horrible global variables
var x = 0;
var y = 0;

function animate() {
  // translucent mask painted over each frame to "fade out" point
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // canvas cleared and point position reset when point reaches end of canvas
  if (x >= canvas.width) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    x = 0;
  }

  ctx.beginPath();
  ctx.moveTo(x, y);

  // increment point position
  x += 2;
  // y position determined by Tone.meter
  y = meter.getValue() * -1.5 + canvas.height / 3;

  ctx.lineTo(x, y);
  ctx.lineWidth = 3;
  ctx.strokeStyle = "lime";
  ctx.stroke();

  // run this function on each frame
  requestAnimationFrame(animate);
}

animate();

slider.addEventListener("input", () => {
  Tone.Transport.bpm.value = slider.value;
});

button.addEventListener("click", () => {
  Tone.start();
  Tone.Transport.start(0);
  heartbeat.start(0);
});
