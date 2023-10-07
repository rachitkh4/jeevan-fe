import React, { useEffect, useState } from "react";
import MyTable from "../../components/TableComponent";
import { Typography, styled, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchPatientList } from "./patientpage.slice";
import { convertDateFormat } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import { AppointmentPageActions } from "../AppointmentPage/AppointmentPage.slice";
import MenuIcon from "../../assets/icons/kebabIcon.svg";
const tableStyle = {
  backgroundColor: "#f1f1f1",
};

const ListWrapper = styled("div")(({ theme }) => ({
  "&": {},
  ".patientList-title-wrapper": {
    marginBottom: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".patientList-heading": {
    "&.MuiTypography-root": theme.typography.h1,
  },
  ".patientList-desc": theme.typography.h2,
  ".table-class": {
    "&.MuiPaper-root": {
      borderRadius: "0",
      boxShadow: "none",
    },
    "& .MuiTableHead-root": {
      "& > tr >th": theme.typography.body2,
    },
    "& .MuiTableBody-root": {
      "& > tr >td": theme.typography.body1,
    },
  },
  ".search-class": {
    "&.MuiFormControl-root": {
      flex: 0.3,
      padding: 0,
      margin: 0,
      "& .MuiInputBase-input": {
        padding: "12px 16px",
        backgroundColor: theme.palette.primaryWhite,
      },
      "& .MuiButtonBase-root .MuiSvgIcon-root": {
        color: theme.palette.secondaryBlue,
      },
    },
  },
  ".header-btn": {
    "&.MuiButtonBase-root": theme.typography.primaryButton,
  },
}));

const searchInputStyle = {
  width: "200px",
  height: "40px",
  backgroundColor: "#f1f1f1",
};

const PatientPage = () => {
  const hospital = localStorage?.getItem("selectedHospital");
  const [tableData, setTableData] = useState([]);
  const [hospitalDetails, setHospitalDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { key: "id", header: "Patient ID" },
    { key: "patientDetails", header: "Patient Name" },
    { key: "abha_number", header: "Abha Id" },
    { key: "mobile_number", header: "Contact Number" },
    { key: "updatedDate", header: "Last Visited" },
    { key: "createdDate", header: "Follow Up" },
    {
      key: "actions",
      header: "",
      actions: [
        {
          link: "Create Appointment",
          type: "link",
          onClick: (item) => {
            dispatch(AppointmentPageActions.setSelectedPatientData(item));
            navigate("/create-appointment");
          },
        },
      ],
    },
    {
      key: "actions",
      header: "",
      actions: [
        {
          icon: <img src={MenuIcon} alt="menu" />,
          type: "icon",
          onClick: (item) => {
            console.log(item, "item");
          },
        },
      ],
    },
  ];
  useEffect(() => {
    dispatch(AppointmentPageActions.setSelectedPatientData({}));
    let currentHospital = {};
    if (hospital) {
      currentHospital = JSON.parse(hospital);
      console.log(currentHospital);
      setHospitalDetails(currentHospital);
      const payload = {
        hip_id: currentHospital?.hip_id,
      };
      dispatch(fetchPatientList(payload)).then((res) => {
        const patientList = res.payload;
        const formattedPatientList = patientList?.map((item) => {
          const patientGender = item?.gender.toLowerCase()?.includes("m")
            ? "M"
            : "F";
          const updatedDate = convertDateFormat(item?.updated_at, "dd-MM-yyyy");
          const createdDate = convertDateFormat(item?.created_at, "dd-MM-yyyy");
          return {
            patientDetails: `${item.name || ""} | ${patientGender || ""}`,
            updatedDate: updatedDate,
            createdDate: createdDate,
            ...item,
          };
        });
        setTableData(formattedPatientList);
      });
    }
  }, []);

  // const onTableRowClick = (row) => {
  //   dispatch(AppointmentPageActions.setSelectedPatientData(row));
  //   navigate("/create-appointment");
  // };

  return (
    <ListWrapper>
      <div className="patientList-title-wrapper">
        <div>
          <Typography className="patientList-heading">Patient List</Typography>
          <Typography className="patientList-desc">
            Manage your patient information
          </Typography>
        </div>
        <Button
          variant="contained"
          className="header-btn"
          onClick={() => navigate("/patient-registration")}
        >
          Register Now
        </Button>
      </div>
      <div className="table-container">
        <MyTable
          columns={columns}
          data={tableData}
          tableStyle={tableStyle}
          searchInputStyle={searchInputStyle}
          tableClassName="table-class"
          searchClassName="search-class"
          // onRowClick={(row) => onTableRowClick(row)}
        />
      </div>
    </ListWrapper>
  );
};

export default PatientPage;
