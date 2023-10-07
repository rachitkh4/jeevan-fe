import React, { useEffect, useState } from "react";
import MyTable from "../../components/TableComponent";
import MenuIcon from "@mui/icons-material/Menu";
import { Typography, styled } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchAppointmentList } from "./AppointmentPage.slice";
import { convertDateFormat } from "../../utils/utils";
import { useNavigate } from "react-router";

const tableStyle = {
  backgroundColor: "#f1f1f1",
};

const ListWrapper = styled("div")(({ theme }) => ({
  "&": {},
  ".patientList-title-wrapper": {
    marginBottom: "40px",
  },
  ".patientList-heading": {
    "&.MuiTypography-root": {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "28px",
      lineHeight: "160%",
    },
  },
  ".patientList-desc": {
    "&.MuiTypography-root": {
      fontFamily: "Inter",
      fontWeight: "500",
      fontSize: "16px",
      lineHeight: "160%",
    },
  },
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
      },
    },
  },
}));

const searchInputStyle = {
  width: "200px",
  height: "40px",
  backgroundColor: "#f1f1f1",
};

const AppointmentPage = () => {
  const hospital = localStorage?.getItem("selectedHospital");
  const [tableData, setTableData] = useState([]);
  const [hospitalDetails, setHospitalDetails] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    { key: "patientId", header: "Patient ID" },
    { key: "patientDetails", header: "Patient Name" },
    { key: "mobileNumber", header: "Contact Number" },
    { key: "encounterType", header: "Encounter Type" },
    { key: "docName", header: "Doctor" },
    { key: "slotTime", header: "Slot" },
    { key: "status", header: "Status" },
    {
      key: "actions",
      header: "",
      actions: [
        {
          link: "Start Visit",
          type: "link",
          onClick: (item) => {
            navigate("/patient-emr");
            sessionStorage.setItem("selectedPatient", JSON.stringify(item));
            console.log(item);
          },
        },
      ],
    },
    {
      key: "actions",
      header: "",
      actions: [
        {
          icon: <MenuIcon />,
          type: "icon",
          onClick: (item) => {
            // Handle edit action for the specific item
          },
        },
      ],
    },
  ];

  useEffect(() => {
    let currentHospital = {};
    if (hospital) {
      currentHospital = JSON.parse(hospital);
      console.log(currentHospital);
      setHospitalDetails(currentHospital);
      const payload = {
        hip_id: currentHospital?.hip_id,
      };
      dispatch(fetchAppointmentList(payload)).then((res) => {
        const mainList = res.payload;
        console.log(mainList);
        // let patientList = [];
        // mainList?.map((item) => {
        //   patientList?.push(item[1]);
        // });
        const formattedAppointmentList = mainList?.map((item) => {
          const patientId = item?.patient_id;
          const patientGender = item?.patient_details?.gender
            .toLowerCase()
            ?.includes("m")
            ? "M"
            : "F";
          console.log(patientGender);
          const mobileNumber = item?.patient_details?.mobile_number;
          const encounterType = item?.appointment_type;
          const docName = item?.doc_details?.doc_name;
          const slotTime = item?.slot_time;
          const status = item?.slot_details?.status;

          // const updatedDate = convertDateFormat(item?.updated_at);
          // const createdDate = convertDateFormat(item?.created_at);
          return {
            patientDetails: `${item?.patient_details?.name} | ${patientGender}`,
            patientId: patientId,
            mobileNumber: mobileNumber,
            encounterType: encounterType,
            docName: docName,
            slotTime: slotTime,
            status: status,
            // updatedDate: updatedDate,
            // createdDate: createdDate,
            ...item,
          };
        });
        console.log(formattedAppointmentList, "appointment");
        setTableData(formattedAppointmentList);
      });
    }
  }, []);
  return (
    <ListWrapper>
      <div className="patientList-title-wrapper">
        <Typography className="patientList-heading">
          Appointment List
        </Typography>
        <Typography className="patientList-desc">Description</Typography>
      </div>
      <div className="table-container">
        <MyTable
          columns={columns}
          data={tableData}
          tableStyle={tableStyle}
          searchInputStyle={searchInputStyle}
          tableClassName="table-class"
          searchClassName="search-class"
        />
      </div>
    </ListWrapper>
  );
};

export default AppointmentPage;
