
const newPatientForm = document.getElementById('newPatientForm')
let newPatientFormData = {}

newPatientForm.addEventListener('submit', async (e) => {
  e.preventDefault()
  const fd = new FormData(newPatientForm)
  let newPatientFormData = Object.fromEntries(fd)

  const newPatientJson = JSON.stringify(newPatientFormData)
  console.log(newPatientJson)

  try {
    const response = await fetch('/api/patient/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newPatientJson,
    });

    if (response.ok) {
      const newPatient = await response.json();
      console.log('New Patient:', newPatient);
    } else {
      console.error('Failed to create a new patient');
    }
  } catch (err) {
    console.error(err);
  }
});







// const createNewPatient = () => Patient.create(newPatientFormData)

// module.exports = createNewPatient