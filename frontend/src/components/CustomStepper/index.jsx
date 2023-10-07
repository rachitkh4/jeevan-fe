import React from "react";
import { Stepper, Step, StepLabel, styled } from "@mui/material";

const StepperWrapper = styled("div")(({ theme }) => ({
  ".stepper": {
    backgroundColor: theme.palette.palette.background.default,
    padding: theme.palette.spacing(2),
    borderRadius: theme.palette.shape.borderRadius,
  },
  ".activeStep": {
    backgroundColor: theme.palette.palette.primary.main,
    color: theme.palette.palette.primary.contrastText,
    borderRadius: "50%",
    width: theme.palette.spacing(4),
    height: theme.palette.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".completedStep": {
    backgroundColor: theme.palette.palette.secondary.main,
    color: theme.palette.palette.secondary.contrastText,
    borderRadius: "50%",
    width: theme.palette.spacing(4),
    height: theme.palette.spacing(4),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const StepperComponent = ({ activeStep }) => {
  return (
    <StepperWrapper>
      <Stepper className="stepper" activeStep={activeStep}>
        <Step>
          <StepLabel
            StepIconProps={{
              classes: {
                active: "activeStep",
                completed: "completedStep",
              },
            }}
          />
        </Step>
        <Step>
          <StepLabel
            StepIconProps={{
              classes: {
                active: "activeStep",
                completed: "completedStep",
              },
            }}
          />
        </Step>
      </Stepper>
    </StepperWrapper>
  );
};

export default StepperComponent;
