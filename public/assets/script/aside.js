const mainEl = document.getElementById("aside");

function getPatients() {
  return fetch("/api/doctor/5/patient/", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
}

function createPatientList(patients) {
  patients.forEach((patient) => {
    mainEl.innerHTML += (
      `<section style="border: solid;">
        <h1>${patient.firstName} ${patient.lastName}</h1>
        <p>Age: ${patient.age}</p>
        <p>Weight: ${patient.weight}</p>
      </section>`
    );
  });
}

getPatients()
.then(patients => {
    createPatientList(patients)
})
