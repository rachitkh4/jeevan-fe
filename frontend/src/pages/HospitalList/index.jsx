import React, { useEffect, useState } from "react";
import { Typography, styled } from "@mui/material";
import ArrowNext from "../../assets/arrows/arrow-right.svg";
import { useDispatch, useSelector } from "react-redux";
import { fetchHospital } from "./hospitalList.slice";
import { useNavigate } from "react-router-dom";

const HospitalListWrapper = styled("div")(({ theme }) => ({
  "&": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".hospitalList-title": {
    "&.MuiTypography-root": theme.typography.h1,
  },
  ".hospitalList-content": {
    textAlign: "center",
    marginBottom: theme.spacing(12)

  },
  ".hospitalList-subTitle": { "&.MuiTypography-root": theme.typography.h2 },
  ".hospitalList-container": {
    alignItems: "center",
    justifyContent: "center",
    width: "500px",
    margin: "0 auto",
    marginTop: "10%",
  },
  ".hospitalList-name-wrapper": {
    border: `1px solid ${theme.palette.tertiaryGrey}`,
    borderRadius: "3px",
    backgroundColor: theme.palette.primaryWhite,
    padding: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer",

  },

  ".hospitalList-name": {
    "&.MuiTypography-root": theme.typography.body1,
  },
}));

const temp = [{ hospitalName: "AIMS Bengaluru" }];

const HospitalList = () => {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.list);
  const navigate = useNavigate();
  const [hospitalList, setHospitalList] = useState([]);
  // const hospitalList = dataState.

  useEffect(() => {
    dispatch(fetchHospital()).then((response) => {
      const resData = response.payload;
      if (resData?.length) {
        setHospitalList(resData);
        console.log(response.payload);
      }
    });
  }, []);

  const redirectToDashboard = (hospitalData) => {
    localStorage.setItem("selectedHospital", JSON.stringify(hospitalData));
    navigate("/dashboard");
  };

  return (
    <HospitalListWrapper>
      <div className="hospitalList-container">
        <div className="hospitalList-content">
          <Typography className="hospitalList-title">
            Choose your hospital
          </Typography>
          <Typography className="hospitalList-subTitle">
            Select your hospital from the below list
          </Typography>
        </div>

        {hospitalList?.map((item) => (
          <div
            className="hospitalList-name-wrapper"
            onClick={() => redirectToDashboard(item)}
          >
            <Typography className="hospitalList-name">{item?.name}</Typography>
            <img src={ArrowNext} alt="Select hospital" />
          </div>
        ))}
      </div>
    </HospitalListWrapper>
  );
};

export default HospitalList;
