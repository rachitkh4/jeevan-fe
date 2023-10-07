import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorList } from "./AppointmentForm.slice";
import {
  appointmentType,
  billingType,
  encounterType,
  visitType,
} from "./constant";
import { ScheduleAppointmentActions } from "../ScheduleAppointment/scheduleAppointment.slice";
import PatientDetailsHeader from "../PatientDetailsHeader";

const AppointmentFormWrapper = styled("div")(({ theme }) => ({
  "&": {},
  ".doctorName-dd": {
    "& > .MuiFormControl-root": {
      width: "250px",
    },
  },
  ".appointmentForm-details-key": {
    "&.MuiTypography-root": theme.typography.body2,
  },
  ".appointmentForm-details-value": {
    "&.MuiTypography-root": theme.typography.body3,
  },
  ".field-title": {
    "&.MuiTypography-root": theme.typography.body2,
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
      marginTop: "16px",
      textTransform: "capitalize",
    },
  },
}));

const StyledCard = styled(Card)({
  minWidth: 275,
  marginTop: "24px",
});

const StyledTitle = styled(Typography)(({ theme }) => ({
  "&": theme.typography.body3,
}));
const StyledCardContent = styled(CardContent)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  rowGap: "32px",
});

const StyledFormControl = styled(FormControl)({
  margin: "16px",
});

const RadioFormControl = styled("div")({
  display: "flex",
  alignItems: "center",
});

const StyledFormLabel = styled(FormLabel)({
  marginBottom: "8px",
});

const KeyValueContainer = styled(Grid)({
  // marginTop: (props) => props.theme.palette.spacing(2),
});

function AppointmentForm(props) {
  const [doctorName, setDoctorName] = useState("");
  const [encounterTypeValue, setEncounterTypeValue] = useState("");
  const [appointmentTypeValue, setAppointmentTypeValue] = useState("");
  const [visitTypeValue, setVisitTypeValue] = useState("");
  const [billingTypeValue, setBillingTypeValue] = useState("");
  const dispatch = useDispatch();
  const hospital = localStorage?.getItem("selectedHospital");
  const [doctorList, setDoctorList] = useState([]);
  const dataState = useSelector((state) => state);
  const selectedPatient = dataState?.appointmentList?.patientDetails;
  const userDetails = [
    {
      label: "Name",
      value: selectedPatient?.name || "-",
    },
    {
      label: "Gender",
      value: selectedPatient?.gender || "-",
    },
    {
      label: "Date of Birth",
      value: selectedPatient?.DOB || "-",
    },
    {
      label: "Email ID",
      value: selectedPatient?.email || "-",
    },
  ];

  const handleDoctorNameChange = (event) => {
    setDoctorName(event.target.value);
  };

  useEffect(() => {
    let currentHospital = {};

    if (hospital) {
      currentHospital = JSON.parse(hospital);
      const payload = {
        hip_id: currentHospital?.hip_id,
      };

      dispatch(fetchDoctorList(payload)).then((res) => {
        const doctorData = res.payload;
        let drList = [];
        doctorData?.map((item) => {
          const data = {
            label: item?.doc_name,
            value: item?.id,
          };

          drList?.push(data);
        });
        setDoctorList(drList);
      });
    }
  }, []);

  const handleEncounterTypeChange = (event) => {
    console.log(event.target.value, "type");
    setEncounterTypeValue(event?.target?.value);
  };

  const handleVisitTypeChange = (event) => {
    setVisitTypeValue(event?.target?.value);
  };

  const handleBillingTypeChange = (event) => {
    setBillingTypeValue(event?.target?.value);
  };

  const handleAppointmentChange = (event) => {
    setAppointmentTypeValue(event?.target?.value);
  };

  const handleSubmit = () => {
    localStorage.setItem("appointment_doctor_id", doctorName);

    console.log(encounterTypeValue);
    const data = {
      doctorId: doctorName,
      appointmentType: appointmentTypeValue,
      encounterType: encounterTypeValue,
      visitType: visitTypeValue,
      billingType: billingTypeValue,
    };
    console.log(data);

    dispatch(ScheduleAppointmentActions.setAppointmentDetails(data));
    props?.setTab(1);
    props?.setCompleted(true);
  };

  console.log(selectedPatient);
  return (
    <AppointmentFormWrapper>
      <StyledCard>
        <CardContent>
          <Grid container>
            {userDetails?.map((pair, index) => (
              <Grid item xs={3}>
                <Typography className="appointmentForm-details-key">
                  {pair.label}
                </Typography>
                <Typography className="appointmentForm-details-value">
                  {pair.value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        {/* <PatientDetailsHeader /> */}
      </StyledCard>
      <StyledCard>
        <StyledCardContent>
          <div className="doctorName-dd">
            <Typography className="field-title">Doctor Name</Typography>
            <FormControl>
              <Select
                value={doctorName}
                onChange={handleDoctorNameChange}
                placeholder="Doctor Name"
              >
                {doctorList?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="doctorName-dd">
            <Typography className="field-title">Appointment Type</Typography>
            <FormControl>
              <Select
                value={appointmentTypeValue}
                onChange={handleAppointmentChange}
                placeholder="Appointment Type"
              >
                {appointmentType?.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="">
            <Typography className="field-title">Encounter Type</Typography>
            <FormControl>
              <RadioFormControl component="fieldset">
                <RadioGroup
                  row
                  value={encounterTypeValue}
                  onChange={handleEncounterTypeChange}
                >
                  {encounterType?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </RadioFormControl>
            </FormControl>
          </div>
          <div className="">
            <Typography className="field-title">Visit Type</Typography>
            <FormControl>
              <RadioFormControl component="fieldset">
                <RadioGroup
                  row
                  value={visitTypeValue}
                  onChange={handleVisitTypeChange}
                >
                  {visitType?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </RadioFormControl>
            </FormControl>
          </div>
          <div className="">
            <Typography className="field-title">Billing Type</Typography>
            <FormControl>
              <RadioFormControl component="fieldset">
                <RadioGroup
                  row
                  value={billingTypeValue}
                  onChange={handleBillingTypeChange}
                >
                  {billingType?.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      value={option.value}
                      control={<Radio />}
                      label={option.label}
                    />
                  ))}
                </RadioGroup>
              </RadioFormControl>
            </FormControl>
          </div>
        </StyledCardContent>
      </StyledCard>
      <div className="btn-wrapper">
        <Button className="submit-btn" onClick={handleSubmit}>
          Save & Next
        </Button>
      </div>
    </AppointmentFormWrapper>
  );
}

export default AppointmentForm;
