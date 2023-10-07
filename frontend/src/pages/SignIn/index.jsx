import React, { useEffect, useState } from "react";
import StepperComponent from "../../components/CustomStepper";
import LoginPage from "../../components/Login";
import HospitalList from "../HospitalList";
import banner from "../../assets/side-banner-login.jpg";
import { styled } from "@mui/material";

const LoginPageWrapper = styled("div")(({ theme }) => ({
  // "&": {
  //   padding: theme.spacing(20),



  // },
  // ".login-page-container": {
  //   display: "flex",
  //   gap: theme.spacing(10)
    

  // },
  // ".login-left-banner": {
  //   flex: "0.4",
  // },
}));

function SignInPage() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("accesstoken");
    if (token) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  }, []);

  return (
    <LoginPageWrapper>
      <div className="login-page-container">
        {/* <div className="login-left-banner">
          <img src={banner} />
        </div> */}
        <div>
          {index === 0 && <LoginPage setIndex={setIndex} />}
          {index === 1 && <HospitalList setIndex={setIndex} />}
        </div>
      </div>
    </LoginPageWrapper>
  );
}

export default SignInPage;
