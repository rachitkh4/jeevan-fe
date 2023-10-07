import { combineReducers } from "redux";
import authReducer from "../app/auth.slice";
import listReducer from "../pages/HospitalList/hospitalList.slice";
import patientListReducer from "../pages/PatientPage/patientpage.slice";
import PatientRegistrationReducer from "../pages/PatientRegistration/PatientRegistration.slice";
import AppointmentFormReducer from "../components/AppointmentForm/AppointmentForm.slice";
import ApppointmentSlotsReducer from "../components/ScheduleAppointment/scheduleAppointment.slice";
import appointmentListReducer from "../pages/AppointmentPage/AppointmentPage.slice";
import EMRPageSlice from "../pages/DoctorPage/EMRPage/EMRPage.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  hospitalList: listReducer,
  patientList: patientListReducer,
  appointmentList: appointmentListReducer,
  PatientRegistartion: PatientRegistrationReducer,
  appointmentForm: AppointmentFormReducer,
  appointmentSlots: ApppointmentSlotsReducer,
  SearchedEMRVitals: EMRPageSlice
});

export default rootReducer;
