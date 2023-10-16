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
const choosePatientEl = document.getElementById("availablePatientList");
const logoutEl = document.getElementById('logoutBtn')
const historyEl = document.getElementById('commentContainer')
const saveCommentBtn = document.getElementById('commentSave')
const deleteBtn = document.getElementById('deletePatientBtn')
// logout logic
const logoutScript = async () => {
  const response = await fetch('api/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'}
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    console.log('There was an error...')
    return;
  }
}

logoutEl.addEventListener('click', logoutScript)

///////////////////////////////////////////////////////////////////////////////////////
// WEBSOCKET CLIENT //
///////////////////////////////////////////////////////////////////////////////////////
const clientEl = document.getElementById("clients");
// Initialize socket
const socket = io();
// receive heart rate value through socket
socket.on("BPM", (data) => {
  Tone.Transport.bpm.value = data;
  heartRateEl.innerText = data;
});
let patientId = 1;
// listen for autoseed and update page
socket.on("autoseed", (data) => {
  console.log(data, "client");
  getPatient(patientId).then((patient) => {
    updatePatient(patient);
    updateTimeline(patient.vitals);
    const currentVitals = patient.vitals.pop();
    updateMonitor(currentVitals); 
    if (currentVitals.heartRate > 100 || currentVitals.heartRate < 60) 
    {
      socket.emit("HRALERT", data) 
    }
    if (currentVitals.respRate > 20 || currentVitals.respRate < 12)
    {
      socket.emit("RRALERT", data)
    }
    if (currentVitals.systolic > 120 || currentVitals.diastolic > 90) 
    {
    socket.emit("HIGHBPALERT", data)
    }
    if (currentVitals.systolic < 90 || currentVitals.diastolic < 60) 
    {
    socket.emit("LOWBPALERT", data)
    }
    if (currentVitals.bodyTemp > 100 || currentVitals.bodyTemp < 95)
    {
    socket.emit("TEMPALERT", data)
    }
    if (currentVitals.O2 < 90 || currentVitals.O2 > 100) 
    {
    socket.emit("O2ALERT", data)
    }
  });
});
///////////////////////////////////////////////////////////////////////////////////////
const welcomeEl = document.getElementById('welcome')
// Get current session doctor
function getSessionDoctor() {
  return fetch('api/doctor/session').then((response) => response.json())
}
// Display doctor name in header
getSessionDoctor().then((doctor) => {
  welcomeEl.innerText = `Welcome, Dr. ${doctor.fullName}`
})

// Call API to get list of current doctor's patients
function getPatientList() {
  return fetch(`api/doctor/session/patient`).then((response) =>
    response.json()
  );
}
getPatientList().then((patients) => console.log(patients))

function getPatientDropdown() {
  return fetch(`api/patient`).then((response) =>
    response.json()
  );
}
// Call API to get one specified patient
function getPatient(patient_id) {
  return fetch(`/api/patient/${patient_id}`).then(
    (response) => response.json()
  );
}

function updateHistory(patient) {
  if(patient.comment === null){
    historyEl.value = ''
  } else{
  historyEl.value = `${patient.comment}`
  }
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
  recentVitals = vitals.slice(Math.max(vitals.length - 10, 1));
  recentVitals.forEach((entry) => {
    const timestamp = new Date(entry.createdAt);
    const time = timestamp.toLocaleTimeString('en-US');
    timelineEl.innerHTML += `
    <tr>
    <td>${entry.heartRate}</td>
    <td>${entry.systolic}|${entry.diastolic}</td>
    <td>${entry.bodyTemp}</td>
    <td>${entry.O2}%</td>
    <td>${time}</td>
    </tr>
    `;
  });
}

// Update patient info element
function updatePatient(patient) {
  // historyEl.innerHTML = `${patient.comment}`
  patientInfoEl.innerHTML = `
  <th class="col-md-6 col-12" scope="col">${patient.firstName} ${patient.lastName}</th>
  <th class="col-md-3 col-12" scope="col">Age: ${patient.age}</th>
  <th class="col-md-3 col-12" scope="col">Weight: ${patient.weight}</th>`
}

// Placeholder value until user auth works
// const doctorId = 4;

getPatientList().then((patients) => {
  patients.forEach((patient) => {
    choosePatientEl.innerHTML += `
    <a href="#" class="w-100 list-group-item list-group-item-action " id="${patient.id}">${patient.lastName}, ${patient.firstName}</a>
    `;
  });
});

deleteBtn.addEventListener('click', async ()=> {
  try {
    const response = await fetch(`/api/patient/${patientId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      
      
    });
    console.log(response)

    if (response.ok) {
     
      console.log('Patient deleted successfully');
    } else {
      // Failed to delete the patient
      console.error('Failed to delete the patient');
    }
  } catch (err) {
    console.error(err);
  }
});



// create variable to store previous target
let previousTarget = null;

choosePatientEl.addEventListener("click", (event) => {
  if (event.target && event.target.nodeName === "A") {
    // Check if the clicked element is an <a> tag
    patientId = event.target.id;
    console.log(patientId);
    // attempts to remove active from previous target if it exists
    if (previousTarget) {
      previousTarget.classList.remove("active");
    }
    // adds the class active to the currently selected <a> tag
    event.target.classList.add("active");
    // sets current target as previous target to be used the next time a tag is clicked
    previousTarget = event.target;
    // updates patient timeline, vitals, monitor, patient list. also starts the hearbeat animation
    getPatient(patientId).then((patient) => {
      updateHistory(patient)
      updatePatient(patient);
      updateTimeline(patient.vitals);
      const currentVitals = patient.vitals.pop();
      updateMonitor(currentVitals);
      Tone.start();
      Tone.Transport.start(0);
      heartbeat.start(0);
    });
  }
});

saveCommentBtn.addEventListener('click', async (e) => {
  e.preventDefault(); 
  const commentInput = document.getElementById("commentContainer").value;



  // Update the patient's comment by sending a request to the server
 
  try {
    const response = await fetch(`/api/patient/${patientId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: commentInput }),
    });

    if (response.ok) {
      getPatient(`${patientId}`).then((patient) =>{

        patient.comment = commentInput;
        
        // Update the history element to display the updated comment
        // historyEl.innerHTML = `${commentInput}`;
        updateHistory(patient)
      })

    } else {
      console.error('Failed to update comment');
    }
  } catch (err) {
    console.error(err);
  }
});



// newPatientFormData.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const fd = new FormData(newPatientFormData)
//   const obj = Object.fromEntries(fd)

//   const json = JSON.stringify(obj)
//   console.log(json)
// })

///////////////////////////////////////////////////////////////////////////////////////
// PULSE OXIMETER ANIMATION //
///////////////////////////////////////////////////////////////////////////////////////

const containerEl = document.getElementById("canvasContainer");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = containerEl.offsetWidth;
canvas.height = containerEl.offsetHeight;
window.addEventListener("resize", () => {
  canvas.width = containerEl.offsetWidth;
  canvas.height = containerEl.offsetHeight;
});

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
