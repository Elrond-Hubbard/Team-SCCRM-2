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

// send values through socket
function sendSocket(event, value) {
  socket.emit(event, value);
}

slider.addEventListener("input", () => {
  sendSocket("BPM", slider.value);
});

// Post vitals entry
function postVitals(vitals) {
  return fetch("api/vitals/", {
    method: "POST",
    body: JSON.stringify(vitals),
    headers: { "Content-Type": "application/json" },
  });
}
function getAllPatients() {
  return fetch("api/patient/").then((response) => response.json());
}
// autoseed rng
function rng(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// autoseed POST
function postAutoseed() {
  getAllPatients().then((patients) => {
    patients.forEach((patient) => {
      const vitals = {
        systolic: rng(90, 140),
        diastolic: rng(60, 90),
        heartRate: rng(60, 100),
        respRate: rng(12, 20),
        bodyTemp: parseFloat((Math.random() * (97.0 - 99.0) + 97.0).toFixed(1)),
        O2: rng(90, 99),
        patient_id: patient.id,
      };
      postVitals(vitals);
    });
    sendSocket("autoseed", "autoseed");
  });
}

// Handle autoseed button
const autoseedBtn = document.getElementById("autoseed");
autoseedBtn.addEventListener("click", () => {
  postAutoseed();
});
