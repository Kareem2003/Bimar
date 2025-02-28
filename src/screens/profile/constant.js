export const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" }
];

export const BLOOD_TYPE_OPTIONS = [
  { label: "AB+", value: "AB+" },
  { label: "A+", value: "A+" },
  { label: "B+", value: "B+" },
  { label: "O+", value: "O+" },
  { label: "AB-", value: "AB-" },
  { label: "A-", value: "A-" },
  { label: "B-", value: "B-" },
  { label: "O-", value: "O-" }
];

export const INITIAL_STATE = {
  currentStep: 1,
  isDatePickerVisible: false,
  id: "",
  userName: "",
  userEmail: "",
  userPhone: "",
  formData: {
    medicalRecord: {
      bloodType: ""
    },
    personalRecords: {
      City: "",
      Area: "",
      userWeight: "",
      userHeight: "",
      DateOfBirth: "",
      Gender: "",
    }
  }
};