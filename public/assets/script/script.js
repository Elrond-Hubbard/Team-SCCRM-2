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
}

getLatestVitals(5, 10).then((vitals) => {
  updateMonitor(vitals)
});

// 