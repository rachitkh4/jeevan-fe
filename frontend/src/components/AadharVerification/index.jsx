import {
  Button,
  CircularProgress,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React from "react";
import OtpInput from "../OTPValidation";
import { useSelector } from "react-redux";

const AadharVerificationWrapper = styled("div")(({ theme }) => ({
  ".validate-aadhar-form": {
    display: "flex",
    alignItems: "center",
    marginBottom: "24px",
    gap: "24px",
  },
  ".verification-btn": {
    "&.MuiButtonBase-root": theme.typography.primaryButton,
  },
  ".aadhar-text": {
    "&.MuiFormControl-root": {
      "& > .MuiInputBase-root": {
        display: "flex",
        height: "48px",
        width: "320px",
        justifyContent: "center",
        alignItems: "center",
        flex: "1 0 0",
        alignSelf: "stretch",
      },
    },
  },
  ".otp-title": {
    "&.MuiTypography-root": theme.typography.body3,
  },
}));

const AadharVerification = ({
  aadhar,
  handleAadharChange,
  handleSubmit,
  setSixDigitOTP,
  verifyOTP,
}) => {
  const dataState = useSelector((state) => state);
  const fetchingAadharOtp = dataState?.PatientRegistartion?.loading;

  console.log(fetchingAadharOtp, "loading");
  return (
    <AadharVerificationWrapper>
      <div className="validate-aadhar-form">
        <TextField
          type="text"
          value={aadhar}
          onChange={handleAadharChange}
          className="aadhar-text"
        />
        <Button
          onClick={() => handleSubmit("aadhar")}
          variant="contained"
          className="verification-btn"
        >
          {fetchingAadharOtp ? <CircularProgress size={24} /> : " Get OTP"}
        </Button>
      </div>
      <div>
        <Typography className="otp-title">Enter OTP</Typography>
        <OtpInput
          setSixDigitOTP={setSixDigitOTP}
          verifyOTP={verifyOTP}
          type="aadhar"
        />
      </div>
    </AadharVerificationWrapper>
  );
};

export default AadharVerification;
