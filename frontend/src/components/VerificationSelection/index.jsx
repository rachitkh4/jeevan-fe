import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  styled,
} from "@mui/material";
import React from "react";

const VerificationSelectionWrapper = styled("div")(({ theme }) => ({
  ".select-mode": {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    paddingBottom: "40px",
    borderBottom: `1px solid ${theme.palette.primaryGrey}`,
  },
  ".form-radio-group": {
    width: "300px",
    padding: theme.spacing(4),
    border: `1px solid ${theme.palette.tertiaryGrey}`,
    borderRadius: theme.spacing(2),

    "& > label": theme.typography.body1,
  },
  ".radio-input": { marginRight: theme.spacing(4) },
  ".select-header-container": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  ".select-header": {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondaryOpacityBlue,
    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.palette.secondaryBlue}`,
  },
  ".form-control-checkbox": {
    "&.MuiFormControlLabel-root": {
      display: "flex",
      alignItems: "center",
      "& > .MuiButtonBase-root": {
        // width: "24px",
        // height: "24px",
      },
    },

    "& > .MuiTypography-root": theme.typography.body1,
  },
  ".form-control-subtext": {
    "&.MuiTypography-root": {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "14px",
      lineHeight: "160%",
      marginBottom: "4px",
    },
  },

  ".confirm-verification-btn": {
    "&.MuiButtonBase-root": theme.typography.primaryButton,
  },
}));

function VerificationSelection({
  modes,
  handleOptionChange,
  selectedOption,
  checkedOption,
  handleOptionCheck,
  handleConfirmSelection,
}) {
  return (
    <VerificationSelectionWrapper>
      <div className="select-mode">
        {modes?.map((item) => {
          return (
            <div className="form-radio-group">
              <label>
                <input
                  type="radio"
                  value={item?.value}
                  checked={selectedOption === item?.value}
                  onChange={handleOptionChange}
                  className="radio-input"
                />
                {item?.label}
              </label>
            </div>
          );
        })}
      </div>
      <div className="select-header-container">
        <div className="select-header">
          <FormControlLabel
            control={
              <Checkbox
                disabled={selectedOption === "aadhar"}
                checked={checkedOption}
                onChange={handleOptionCheck}
              />
            }
            label="Create ABHA for the patient"
            className="form-control-checkbox"
          />
          <Typography className="form-control-subtext">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Typography>
        </div>
      </div>
      <div style={{ float: "right" }}>
        <Button
          className="confirm-verification-btn"
          onClick={handleConfirmSelection}
          disabled={!selectedOption}
        >
          Confirm
        </Button>
      </div>
    </VerificationSelectionWrapper>
  );
}

export default VerificationSelection;
