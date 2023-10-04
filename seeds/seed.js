const patientData = {
    PatientIdentification: {
      FullName: "John Doe",
      DateOfBirth: "1980-05-15",
      Gender: "Male",
      ContactInformation: {
        Email: "johndoe@email.com",
        Phone: "555-123-4567",
        Address: "123 Main Street, Cityville, State",
      },
    },
    ChiefComplaint: {
      Description: "Experiencing chest pain and shortness of breath.",
    },
    VitalSigns: {
      BloodPressure: {
        Systolic: 120,
        Diastolic: 80,
      },
      HeartRate: 75,
      RespiratoryRate: 18,
      BodyTemperature: 98.6,
      OxygenSaturation: 98,
    },
    MedicalHistory: {
      PastMedicalConditions: ["Diabetes", "Hypertension"],
      AllergiesToMedications: ["Penicillin"],
      PreviousSurgeriesOrProcedures: ["Appendectomy"],
      ChronicIllnessesOrOngoingTreatments: ["Asthma"],
    },
    Medications: [
      {
        Name: "Metformin",
        Dosage: "500mg",
        Frequency: "Once daily",
      },
      {
        Name: "Lisinopril",
        Dosage: "10mg",
        Frequency: "Once daily",
      },
      {
        Name: "Albuterol Inhaler",
        Dosage: "2 puffs",
        Frequency: "As needed for asthma",
      },
    ],
    PainAssessment: {
      PainLevel: 7,
      PainLocation: "Chest",
      PainCharacter: "Sharp",
      PainRadiation: "Radiating to left arm",
    },
  };
  
  console.log(patientData); // can use patientData as needed in JavaScript code.
  