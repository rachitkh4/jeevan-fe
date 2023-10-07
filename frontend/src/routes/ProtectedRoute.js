import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Redirect, useNavigate } from "react-router-dom";
import PatientRegistration from "../pages/PatientRegistration";
import AppointmentPage from "../pages/AppointmentPage";
import CreateAppointment from "../pages/CreateAppointment";

import SignInPage from "../pages/SignIn";
import HospitalList from "../pages/HospitalList";
import Dashboard from "../pages/Dashboard";
import PatientPage from "../pages/PatientPage";
import PatientEMRDetails from "../pages/DoctorPage/EMRPage";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const userData = useSelector((state) => state?.auth?.user);
  const isAuthenticated = localStorage.getItem("accesstoken");
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/login" element={<SignInPage />} />
      {isAuthenticated ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient-list" element={<PatientPage />} />
          <Route
            path="/patient-registration"
            element={<PatientRegistration />}
          />
          <Route path="/appointment-list" element={<AppointmentPage />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/patient-details" element={<PatientEMRDetails />} />
        </>
      ) : (
        navigateToLogin()
      )}

      <Route path="/" element={<SignInPage />} />
    </Routes>
  );
};

export default ProtectedRoute;
