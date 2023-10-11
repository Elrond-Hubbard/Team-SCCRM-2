const heartRateEl = document.querySelector('[name="BPM"]');
const bloodPressEl = document.querySelector('[name="mmHG"]');
const bodyTempEl = document.querySelector('[name="Temp"]');
const oxygenEl = document.querySelector('[name="O2"]');
const timelineEl = document.getElementById("timeline");
const patientInfoEl = document.getElementById("patInfo");
const patientSelect = document.getElementById("patient-select");
const patientDropdown = document.getElementById("patientDropdown");
const choosePatientBtn = document.getElementById("choosePatientBtn");
const choosePatientModal = document.getElementById("patientModal2");
///////////////////////////////////////////////////////////////////////////////////////
// WEBSOCKET CLIENT //
///////////////////////////////////////////////////////////////////////////////////////
const clientEl = document.getElementById("clients");
// Initialize socket
const socket = io();
// listen for login/logout events defined in server.js and print client total
socket.on("login", (data) => {
  clientEl.innerText = `Clients Connected: ${data}`;
});
socket.on("logout", (data) => {
  clientEl.innerText = `Clients Connected: ${data}`;
});
// receive heart rate value through socket
socket.on("BPM", (data) => {
  Tone.Transport.bpm.value = data;
  heartRateEl.innerText = data;
});
// listen for autoseed and update page
socket.on("autoseed", (data) => {
  console.log(data, 'client')
  getPatient(doctorId, patientDropdown.value).then((patient) => {
    updatePatient(patient);
    updateTimeline(patient.vitals);
    const currentVitals = patient.vitals.pop();
    updateMonitor(currentVitals);
    if (currentVitals.heartRate > 90) {
      console.log("ALERT HAS BEEN CAUGHT...")
      socket.emit("ALERT", data);
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////

// Call API to get list of current doctor's patients
function getPatientList(doctor_id) {
  return fetch(`api/doctor/${doctor_id}/patient`).then((response) =>
    response.json()
  );
}

function getPatientDropdown(doctor_id) {
  return fetch(`api/doctor/${doctor_id}/patient`).then((response) =>
    response.json()
  );
}
// Call API to get one specified patient
function getPatient(doctor_id, patient_id) {
  return fetch(`/api/doctor/${doctor_id}/patient/${patient_id}`).then(
    (response) => response.json()
  );
}

// Update vitals monitor to reflect most recent vitals data
function updateMonitor(vitals) {
  heartRateEl.innerText = vitals.heartRate;
  bloodPressEl.innerText = `${vitals.systolic}|${vitals.diastolic}`;
  bodyTempEl.innerText = vitals.bodyTemp;
  oxygenEl.innerText = `${vitals.O2}%`;
  Tone.Transport.bpm.value = vitals.heartRate;
}

// Update timeline to list current patient's history
function updateTimeline(vitals) {
  timelineEl.innerHTML = ``;
  recentVitals = vitals.slice(Math.max(vitals.length - 5, 1));
  recentVitals.forEach((entry) => {
    timelineEl.innerHTML += `
    <tr>
    <td>${entry.heartRate}</td>
    <td>${entry.systolic}|${entry.diastolic}</td>
    <td>${entry.bodyTemp}</td>
    <td>${entry.O2}%</td>
    <td>${entry.createdAt}</td>
    </tr>
    `;
  });
}

// Update patient info element
function updatePatient(patient) {
  patientInfoEl.innerHTML = `
    <ul class="list-group list-group-flush">
    <li class="list-group-item">Patient Name: ${patient.firstName} ${patient.lastName}</li>
    <li class="list-group-item">Age: ${patient.age}</li>
    <li class="list-group-item">Weight: ${patient.weight}</li>
    <li class="list-group-item">isSleepy:</li>
  </ul>`;
}

// Placeholder value until user auth works
const doctorId = 4;

// The select menu is populated with a list of patients
// getPatientList(doctorId).then((patients) => {
//   patients.forEach((patient) => {
//     patientSelect.innerHTML += `
//     <option value="${patient.id}">${patient.lastName}, ${patient.firstName}</option>
//     `;
//   });
// });

getPatientDropdown(doctorId).then((patients) => {
  patients.forEach((patient) => {
    patientDropdown.innerHTML += `
    <option value="${patient.id}">${patient.lastName}, ${patient.firstName}</option>
    `;
  });
});
patientDropdown.addEventListener("click", () => {
  console.log(patientDropdown.value);
  getPatient(doctorId, patientDropdown.value).then((patient) => {
    getPatientDropdown();
  });
});
patientDropdown.addEventListener("change", function () {
  console.log(patientDropdown.value);
  if (patientDropdown.value !== "View Patients") {
    choosePatientBtn.removeAttribute("disabled");
  } else {
    choosePatientBtn.setAttribute("disabled", "true");
  }
});
choosePatientBtn.addEventListener("click", () => {
  getPatient(doctorId, patientDropdown.value).then((patient) => {
    updatePatient(patient);
    updateTimeline(patient.vitals);
    const currentVitals = patient.vitals.pop();
    updateMonitor(currentVitals);
  });
});

// newPatientFormData.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const fd = new FormData(newPatientFormData)
//   const obj = Object.fromEntries(fd)

//   const json = JSON.stringify(obj)
//   console.log(json)
// })


// When a patient is selected, update functions are called
// patientSelect.addEventListener("change", () => {
//   getPatient(doctorId, patientSelect.value).then((patient) => {
//     updatePatient(patient);
//     updateTimeline(patient.vitals);
//     const currentVitals = patient.vitals.pop();
//     updateMonitor(currentVitals);
//   });
// });

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
  speed: 2,
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

button.addEventListener("click", () => {
  Tone.start();
  Tone.Transport.start(0);
  heartbeat.start(0);
});
