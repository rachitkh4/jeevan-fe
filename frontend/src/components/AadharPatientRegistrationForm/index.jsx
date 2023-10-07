import React, { useState } from "react";
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Grid,
} from "@mui/material";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { registerPatient } from "../../pages/PatientRegistration/PatientRegistration.slice";
import { apis } from "../../utils/apis";
import { AppointmentPageActions } from "../../pages/AppointmentPage/AppointmentPage.slice";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../CustomSnackbar";

const AadharPatientRegForm = ({ setUserCreated, txnId }) => {
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    middlename: "",
    abhaAddress: "",
    email: "",
    password: "",
  });
  const hospital = localStorage?.getItem("selectedHospital");
  const dispatch = useDispatch();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let currentHospital = {};

    if (hospital) {
      currentHospital = JSON.parse(hospital);
      const payload = {
        firstName: formData?.firstname,
        middleName: formData?.middlename,
        lastName: formData?.lastname,
        email: formData?.email,
        healthId: formData.abhaAddress,
        password: formData?.password,
        hip_id: currentHospital?.hip_id,
        txnId: txnId,
      };
      console.log(payload);
      dispatch(
        registerPatient({ payload, url: apis.registerAadharPaient })
      ).then((res) => {
        if (res?.error && Object.keys(res?.error)?.length > 0) {
          setShowSnackbar(true);
          return;
        }
        const userDetails = {
          name: formData?.firstname + " " + formData?.lastname,
          email: formData?.email,
          gender: formData?.gender,
          healthId: formData.abhaAddress,
          password: formData?.password,
          hip_id: currentHospital?.hip_id,
        };
        setUserCreated(true);
        dispatch(AppointmentPageActions.setSelectedPatientData(userDetails));
        navigate("/registered-patient");
      });
    }
  };

  const formatDob = (date) => {
    return format(new Date(date), "yyyy-MM-dd");
  };

  const onSnackbarClose = () => {
    setShowSnackbar(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <CustomSnackbar
        message="Something went wrong"
        open={showSnackbar}
        status={"error"}
        onClose={onSnackbarClose}
      />
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <TextField
            placeholder="First Name"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Middle Name"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Last Name"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Enter ABHA Address"
            name="abhaAddress"
            value={formData.abhaAddress}
            onChange={handleChange}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={5}></Grid>
        <Grid item xs={5}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AadharPatientRegForm;
