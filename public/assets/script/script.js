const patientInfoEl = document.getElementById("patInfo");

const heartRateEl = document.querySelector('[name="BPM"]');
const bloodPressEl = document.querySelector('[name="mmHG"]');
const bodyTempEl = document.querySelector('[name="Temp"]');
const oxygenEl = document.querySelector('[name="O2"]');

function getAllPatients(doctor_id) {
  return fetch(`api/doctor/${doctor_id}/patient`)
  .then((response) => response.json())
}

function getPatient(doctor_id, patient_id) {
  return fetch(`/api/doctor/${doctor_id}/patient/${patient_id}`).then(
    (response) => response.json()
  );
}

function updateMonitor(vitals) {
  heartRateEl.innerText = vitals.heartRate;
  bloodPressEl.innerText = `${vitals.systolic}|${vitals.diastolic}`;
  bodyTempEl.innerText = vitals.bodyTemp;
  oxygenEl.innerText = `${vitals.O2}%`;
  Tone.Transport.bpm.value = vitals.heartRate;
}

function updatePatient(patient) {
  patientInfoEl.innerHTML = `
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Patient Name: ${patient.firstName} ${patient.lastName}</li>
    <li class="list-group-item">Age: ${patient.age}</li>
    <li class="list-group-item">Weight: ${patient.weight}</li>
    <li class="list-group-item">isSleepy:</li>
  </ul>`;
}

const doctorId = 2;

const patientSelect = document.getElementById('patient-select')
getAllPatients(doctorId)
.then((patients) => {
  patients.forEach((patient) => {
    patientSelect.innerHTML += (`
    <option value="${patient.id}">${patient.lastName}, ${patient.firstName}</option>
    `)
  })
})

patientSelect.addEventListener('change', () => {
  getPatient(doctorId, patientSelect.value).then((patient) => {
    console.log(patient)
    updatePatient(patient);
    const vitals = patient.vitals.pop();
    updateMonitor(vitals);
  });
})

getPatient(doctorId, 1).then((patient) => {
  updatePatient(patient);
  const vitals = patient.vitals.pop();
  updateMonitor(vitals);
});

///////////////////////////////////////////////////////////////////////////////////////
// PULSE OXIMETER ANIMATION //
///////////////////////////////////////////////////////////////////////////////////////

const containerEl = document.getElementById("canvasContainer");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = containerEl.offsetWidth;
canvas.height = containerEl.offsetHeight;

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

const pen = {
  x: 0,
  y: 0,
  speed: 2
};

function animate() {
  // translucent mask painted over each frame to "fade out" point
  ctx.fillStyle = "rgba(0,0,0,0.01)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // canvas cleared and pen position reset when pen reaches end of canvas
  if (pen.x >= canvas.width) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pen.x = 0;
  }
  ctx.beginPath();
  ctx.moveTo(pen.x, pen.y);
  // increment pen position
  pen.x += pen.speed;
  // y position determined by Tone.meter
  pen.y = meter.getValue() * -1.5 + canvas.height / 3;
  ctx.lineTo(pen.x, pen.y);
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
