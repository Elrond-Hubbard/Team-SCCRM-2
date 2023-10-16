const newPatientForm = document.getElementById("newPatientForm");
let newPatientFormData = {};

newPatientForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(newPatientForm);
  let newPatientFormData = Object.fromEntries(fd);

  const newPatientJson = JSON.stringify(newPatientFormData);

  try {
    const response = await fetch("/api/patient/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: newPatientJson,
    });
    if (response.ok) {
      const newPatient = await response.json();
      console.log("New Patient:", newPatient);

      const newVitalsJson = JSON.stringify({
        systolic: newPatientFormData.systolic,
        diastolic: newPatientFormData.diastolic,
        heartRate: newPatientFormData.heartRate,
        respRate: newPatientFormData.respRate,
        bodyTemp: newPatientFormData.bodyTemp,
        O2: newPatientFormData.O2,
        patient_id: newPatient.id,
      });
      try {
        const response = await fetch("/api/vitals/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: newVitalsJson,
        });
        if (response.ok) {
          const newVitals = await response.json();
          console.log("New vitals:", newVitals);
        } else {
          console.error("Failed to create a new vitals entry");
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("Failed to create a new patient");
    }
  } catch (err) {
    console.error(err);
  }

  // Reset and repopulate patient list sidebar
  choosePatientEl.innerHTML = ``;
  choosePatientEl.innerHTML += `<button type="button" id="newPatientBtn"class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal">Add New Patient</button>`;
  getPatientDropdown().then((patients) => {
    patients.forEach((patient) => {
      choosePatientEl.innerHTML += `
      <a href="#" class="w-100 list-group-item list-group-item-action " id="${patient.id}">${patient.lastName}, ${patient.firstName}</a>
      `;
    });
  });
});

// const createNewPatient = () => Patient.create(newPatientFormData)

// module.exports = createNewPatient
