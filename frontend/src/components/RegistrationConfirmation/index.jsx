import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Grid, styled, Button } from "@mui/material";
import { useSelector } from "react-redux";

const RegisterationConfirmationWrapper = styled("div")(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.primaryWhite,

    marginTop: theme.spacing(8),
  },
  ".registration-success-text": {
    "&.MuiTypography-root": theme.typography.successText,
  },
  ".registeration-success-key": {
    "&.MuiTypography-root": theme.typography.customKeys,
  },
  ".registration-success-header": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(6),
  },
  ".submit-btn": {
    "&.MuiButtonBase-root": {
      display: "flex",
      float: "right",
      justifyContent: "center",
      alignItems: "center",
      border: `1px solid ${theme.palette.primaryBlack}`,
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      backgroundColor: theme.palette.primaryBlack,
      color: theme.palette.primaryWhite,
      padding: "8px 32px",
      height: "40px",
      marginTop: theme.spacing(8),
      textTransform: "capitalize",
    },
  },
}));

const RegisterationConfirmation = ({
  appointmentDetails,
  isAppointment = false,
  onSubmit,
}) => {
  console.log(appointmentDetails, "details");
  const dataState = useSelector((state) => state);
  const doctorId = localStorage.getItem("appointment_doctor_id");
  const selectedPatient = dataState?.appointmentList?.patientDetails;
  const patientData =
    Object.keys(selectedPatient)?.length > 0 && isAppointment
      ? selectedPatient
      : dataState.PatientRegistartion.registeredPatientDetails;
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let pageData = [
      { key: "Patient Name", value: patientData?.name || "-" },
      {
        key: "Patient Id",
        value: patientData?.id || "-",
      },
      { key: "Gender", value: patientData?.gender || "-" },
      { key: "Date Of Birth", value: patientData?.DOB || "-" },
      { key: "Email Address", value: patientData?.email || "-" },
      { key: "AABHA Address", value: patientData?.abha_address || "-" },
    ];
    if (isAppointment) {
      const appointmentData = [
        { key: "Appointment Type", value: appointmentDetails?.appointmentType },
        { key: "Encounter Type", value: appointmentDetails?.encounterType },
        { key: " Visit Type", value: appointmentDetails?.visitType },
        {
          key: "Billing Type",
          value: appointmentDetails?.billingType,
        },
      ];

      pageData = [...pageData, ...appointmentData];
    }

    setData(pageData);
  }, [patientData]);

  const navigateToNext = () => {
    if (isAppointment) {
      navigate("/appointment-list");
    }
    navigate("/create-appointment");
  };
  return (
    <RegisterationConfirmationWrapper>
      <Box padding={8} marginTop={4} marginBottom={4}>
        <div className="registration-success-header">
          <Typography
            variant="h6"
            color="primary"
            gutterBottom
            className="registration-success-text"
          >
            Success
          </Typography>
          {/* <Button
            onClick={() => navigateToAppointment()}
            variant="contained"
            className="success-appointment-btn"
          >
            Create Appointment
          </Button> */}
        </div>
        <Grid container spacing={4} xs={12}>
          {data?.map((item) => (
            <Grid item key={item.key} xs={4}>
              <Typography
                variant="subtitle1"
                gutterBottom
                className="registeration-success-key"
              >
                {item?.key}
              </Typography>
              <Typography
                variant="body1"
                gutterBottom
                className="registeration-success-value"
              >
                {item?.value}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
      <div className="btn-wrapper">
        <Button className="submit-btn" onClick={navigateToNext}>
          {isAppointment ? "Go to appointment list" : "Create Appointment"}
        </Button>
      </div>
    </RegisterationConfirmationWrapper>
  );
};

export default RegisterationConfirmation;
