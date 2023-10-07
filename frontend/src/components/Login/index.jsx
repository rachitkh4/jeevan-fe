import React, { useState } from "react";
import { TextField, Button, Typography, styled, Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../app/auth.slice";
import { useNavigate } from "react-router-dom";

const LogInWrapper = styled("div")(({ theme }) => ({
  "&": {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
  },

  ".login-heading": {
    marginBottom: "48px",
  },
  ".login-content": {
    marginTop: "10%",
  },
  ".login-form": {
    "& > .MuiFormControl-root": {
      marginBottom: "32px",
    },

  },
  ".login-btn": {
    "&.MuiButtonBase-root": theme.typography.primaryButton,
},
  ".login-title": {
    "&.MuiTypography-root": theme.typography.h1,
  },
  ".login-subTitle": {
    "&.MuiTypography-root": theme.typography.h2,
  },
  ".login-field-title": {
    "&.MuiTypography-root": theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
  ".login-text-field":{
    "&.MuiFormControl-root > .MuiInputBase-root > input":{
      width:"410px"
    }
  }
}));

const LoginPage = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.auth?.user);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    // Handle sign-in logic here
    console.log(password, email, "password");
    // let urlencoded = new URLSearchParams();
    // urlencoded.append("username", email);
    // urlencoded.append("password", password);

    const payload = {
      username: email,
      password: password,
    };
    dispatch(loginUser(payload)).then((response) => {
      const resData = response?.payload;
      console.log(resData, "data");
      if (resData?.access_token) {
        localStorage.setItem("accesstoken", resData?.access_token);
        localStorage.setItem("userRole", resData?.user_role);
        props?.setIndex(1);
      }
    });
  };

  return (
    <LogInWrapper>
      <div className="login-content">
        <div className="login-heading">
          <Typography variant="h2" align="center" className="login-title">
            Welcome Back
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            className="login-subTitle"
          >
            Please enter your details to continue login
          </Typography>
        </div>

        <div className="login-form">
          <Typography className="login-field-title">Username</Typography>
          <TextField
            value={email}
            onChange={handleEmailChange}
            fullWidth
            variant="outlined"
            placeholder="Enter Your username"
            className="login-text-field"
          />
          <Typography className="login-field-title">Password</Typography>
          <TextField
            value={password}
            onChange={handlePasswordChange}
            fullWidth
            variant="outlined"
            type="password"
            placeholder="Enter your password"
            className="login-text-field"
          />
          {/* <div>
              <div className="flex items-center space-x-2">
                <Checkbox />
                <span>Remember Me</span>
              </div>
              <a href="/forgot-password" className="text-blue-600">
                Forgot Password
              </a>
            </div> */}
          <Button
            variant="contained"
            onClick={handleSignIn}
            fullWidth
            className="login-btn"
          >
            Sign In
          </Button>
        </div>
      </div>
    </LogInWrapper>
  );
};

export default LoginPage;
