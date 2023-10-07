import { Avatar, Typography, styled } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";

const DetailsHeaderContainer = styled("div")(({ theme }) => ({
  "&": {
    backgroundColor: theme.palette.primaryWhite,
    padding: theme.spacing(5, 6),
  },
  ".details-header": {
    display: "flex",
    alignItems: "center",
  },
  ".details-Patientdetails": {
    padding: theme.spacing(0, 6),
    borderRight: `1px solid ${theme.palette.primaryGrey}`,
  },
  ".details-emailContainer": {
    padding: theme.spacing(0, 6),
  },
  ".details-subContainer": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  ".details-patient-name": {
    "&.MuiTypography-root": theme.typography.h3,
  },
  ".details-patient-id": {
    "&.MuiTypography-root": theme.typography.body4,
  },
  "details-patient-email": {
    "&.MuiTypography-root": theme.typography.body3,
  },
}));

const PatientDetailsHeader = ({ patientDetails }) => {
  const patient = sessionStorage?.getItem("selectedPatient");
  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    const currentPatient = JSON.parse(patient);
    if (currentPatient && Object.keys(currentPatient)?.length) {
      setPatientData(currentPatient);
    } else {
      setPatientData({});
    }
  }, []);

  console.log(patientData, "patientData");

  return (
    <DetailsHeaderContainer>
      <div className="details-header">
        <div className="details-avatar-container">
          <Avatar />
        </div>
        <div className="details-Patientdetails">
          <Typography className="details-patient-name">
            {patientData?.patient_details?.name}
          </Typography>
          <div className="details-subContainer">
            <Typography className="details-patient-id">
              {patientData?.patientId}
            </Typography>
            <Typography className="details-patient-id">
              {patientData?.age}
            </Typography>
            <Typography className="details-patient-id">
              {patientData?.patient_details?.gender}
            </Typography>
          </div>
        </div>
        <div className="details-emailContainer">
          <Typography className="details-patient-email">
            {patientData?.patient_details?.email}
          </Typography>
          <Typography className="details-patient-email">
            {patientData?.mobileNumber}
          </Typography>
        </div>
      </div>
    </DetailsHeaderContainer>
  );
};

export default PatientDetailsHeader;
