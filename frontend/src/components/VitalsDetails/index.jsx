import { styled } from "@mui/material";
import React, { useState } from "react";

const VitalsDetailsWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primaryWhite,
  padding: theme.spacing(0, 6),
}));
const VitalsDetailsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  padding: theme.spacing(8, 0),
}));
const SideList = styled("List")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(8),
}));

const VitalsList = styled("ListItem")(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.primaryGrey}`,
  cursor: "pointer",

  "&.selected-vital": {
    border: `1px solid ${theme.palette.primaryBlue}`,
  },
}));

const Vitals = styled("div")(({ theme }) => ({
  flex: "1",
  backgroundColor: theme.palette.primaryWhite,
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.primaryGrey}`,
}));
const VitalDetailsTable = styled("div")(({ theme }) => ({}));

const VitalsDetails = () => {
  const [selectedVital, setSelectedVital] = useState("");
  const list = [
    {
      type: "Body Height",
    },
    {
      type: "Body Weight",
    },
    {
      type: "Pulse Rate",
    },
    {
      type: "Peripheral Oxy",
    },
    {
      type: "Body Temperature",
    },
    {
      type: "BMI",
    },
    {
      type: "Respiration Rate",
    },
  ];

  const setVitalsData = (vital) => {
    setSelectedVital(vital);
  };
  return (
    <VitalsDetailsWrapper>
      <VitalsDetailsContainer>
        <SideList>
          {list.map((item) => (
            <VitalsList
              className={selectedVital === item.type ?"selected-vital": ""}
              onClick={() => setVitalsData(item.type)}
            >
              {item?.type}
            </VitalsList>
          ))}
        </SideList>
        <Vitals>
          <VitalDetailsTable></VitalDetailsTable>
        </Vitals>
      </VitalsDetailsContainer>
    </VitalsDetailsWrapper>
  );
};

export default VitalsDetails;
