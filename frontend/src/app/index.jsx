import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { makeStyles, styled } from "@mui/material";
import Header from "../components/Header";
import "./global.scss";
import SignInPage from "../pages/SignIn";
import HospitalList from "../pages/HospitalList";
import ProtectedRoute from "../routes/ProtectedRoute";
import { useSelector } from "react-redux";
import Dashboard from "../pages/Dashboard";
import PatientPage from "../pages/PatientPage";
import Sidebar from "../components/Sidebar";
import PatientRegistration from "../pages/PatientRegistration";
import AppointmentPage from "../pages/AppointmentPage";
import CreateAppointment from "../pages/CreateAppointment";
import PatientEMRDetails from "../pages/DoctorPage/EMRPage";
import RegisterationConfirmation from "../components/RegistrationConfirmation";
import PatientDetails from "../pages/PatientDetails";

const AppWrapper = styled("div")(({ theme }) => ({
  "&": {
    display: "flex",
    flexDirection: "column",
  },

  ".main-app": {
    display: "flex",
  },
  ".app-body": {
    flex: 1,
    position: "relative",
  },
  "app-content": {},
  // ".main-wrapper": {
  //   maxWidth: "1440px",
  //   margin: "0 auto",
  // },
}));

function App() {
  const dataState = useSelector((state) => state);
  const isAuthenticated = localStorage.getItem("accesstoken");
  // const navigate = useNavigate();
  useEffect(() => {
    console.log("reduxStore", dataState);
  }, [dataState]);

  // const navigateToLogin = () => {
  //   navigate("/");
  // };
  return (
    <Router>
      <AppWrapper>
        <Header />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 0.05 }}>
            <Sidebar />
          </div>

          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <div style={{ flex: 1, padding: "46px 32px" }}>
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
                      <Route
                        path="/appointment-list"
                        element={<AppointmentPage />}
                      />
                      <Route
                        path="/create-appointment"
                        element={<CreateAppointment />}
                      />
                      <Route
                        path="/patient-emr"
                        element={<PatientEMRDetails />}
                      />
                      <Route
                        path="/registered-patient"
                        element={<RegisterationConfirmation />}
                      />
                       <Route
                        path="/patient-details"
                        element={<PatientDetails />}
                      />
                    </>
                  ) : (
                    <Route path="*" element={<SignInPage />} />
                  )}

                  <Route path="/" element={<SignInPage />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </AppWrapper>
    </Router>
  );
}

export default App;
