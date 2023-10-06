const mainEl = document.getElementById("aside");

function getDoctors() {
  return fetch("/api/doctor/")
  .then((response) => response.json());
}

function getOneDoctor(doctor_id) {
  return fetch(`/api/doctor/${doctor_id}`)
  .then((response) => response.json());
}

function getPatients(doctor_id) {
  return fetch(`/api/doctor/${doctor_id}/patient/`)
  .then((response) => response.json());
}

function getOnePatient(doctor_id, patient_id) {
  return fetch(`/api/doctor/${doctor_id}/patient/${patient_id}`)
  .then((response) => response.json());
}

function createDoctorList(doctors) {
  doctors.forEach((doctor) => {
    mainEl.innerHTML += `<section style="border: solid;">
            <h1>Dr. ${doctor.fullName}</h1>
          </section>`;
  });
}

function createPatientList(patients) {
  patients.forEach((patient) => {
    mainEl.innerHTML += `<section style="border: solid;">
        <h1>${patient.firstName} ${patient.lastName}</h1>
        <p>Age: ${patient.age}</p>
        <p>Weight: ${patient.weight}</p>
      </section>`;
  });
}

getPatients(3).then((patients) => {
  createPatientList(patients);
});
