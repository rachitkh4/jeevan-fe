import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  Document,
  StyleSheet,
  View,
  Font,
} from "@react-pdf/renderer";
import RedHatFont from "../../assets/fonts/Red_Hat_Display/static/RedHatDisplay-Regular.ttf";
import SourceSansFont from "../../assets/fonts/source-sans-pro/SourceSansPro-Regular.otf";
import SourceSansFontBold from "../../assets/fonts/source-sans-pro/SourceSansPro-Bold.otf";

Font.register({ family: "Red Hat Display", src: RedHatFont });
Font.register({ family: "Source Sans Pro", src: SourceSansFont });
Font.register({ family: "Source Sans Pro Bold", src: SourceSansFontBold });

const pmrPdfStyles = StyleSheet.create({
  document: {
    height: "100%",
    width: "100%",
  },
  page: {
    backgroundColor: "#FFFFFF",
  },
  section: {
    marginTop: "24px",
    padding: "12px 24px",
  },
  pdfHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0089E9",
    borderBottom: "1px solid #ffffff",
    padding: "12px 24px",
  },
  pdfHeaderLogo: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
  },
  pdflogoText: {
    color: "#ffffff",
    fontFamily: "Red Hat Display",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfhospitalNameText: {
    fontFamily: "Source Sans Pro",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfDrNameText: {
    fontFamily: "Source Sans Pro",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfPatientDetails: {
    backgroundColor: "#0089E9",
    borderBottom: "1px solid #ffffff",
    padding: "12px 24px",
  },
  pdfPatientNameText: {
    fontFamily: "Source Sans Pro Bold",
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfPatientName: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pdfPatientOtherDetailsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "12px 0px",
    backgroundColor: "#0089E9",
    gap: "8px",
  },
  pdfVitalsWrapper: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    padding: "12px 0px",
    gap: "8px",
  },
  pdfVital: {
    backgroundColor: "rgba(5, 97, 160, 0.08)",
    padding: "8px",
    minWidth: "150px",
    flex: 1,
  },
  pdfPatientOtherDetails: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "8px",
    minWidth: "70px",
  },
  pdfPatientidText: {
    fontFamily: "Source Sans Pro Bold",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfPatientDetailsLabel: {
    fontFamily: "Source Sans Pro",
    color: "#171717",
    fontSize: "10px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfPatientDetailsValue: {
    fontFamily: "Source Sans Pro Bold",
    color: "#171717",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  pdfSectionHeading: {
    fontFamily: "Source Sans Pro",
    color: "#5A5A5A",
    fontSize: "14px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  table: {
    width: "100%", // Take up full width
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#000",
    paddingBottom: 5,
  },
  tableHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 137, 233, 0.2)",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  tableCell: {
    width: "33%", // Distribute columns evenly
    padding: 5,
    textAlign: "center",
  },
  rowText: {
    fontFamily: "Source Sans Pro",
    color: "#171717",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "160%",
  },
  columnText: {
    fontFamily: "Source Sans Pro Bold",
    color: "#171717",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "160%",
  },
});

const PMRPdf = ({ pdfData, patientData }) => {
  const [currentPatientData, setCurrentPatientData] = useState([]);
  const [prescriptionData, setPrescriptionData] = useState([]);

  console.log(pdfData, "pdfData");

  const columns = [
    { key: "medicine_name", label: "Medications" },
    { key: "status", label: "Frequency" },
    { key: "duration", label: "Duration" },
    { key: "notes", label: "Remarks" },
  ];

  const transformPdfData = (inputObject) => {
    const resultArray = [];

    const sections = {
      vital: "Vitals",
      condition: "Conditions",
      examinationFindings: "Examination Findings",
      diagnosis: "Diagnosis",
      symptom: "Symptoms",
      medication: "Medications",
      currentMedication: "Current Medications",
      lab_investigation: "Lab Investigations",
      medical_history: "Medical History",
    };

    for (const section in sections) {
      if (
        inputObject[section] &&
        inputObject[section].data &&
        inputObject[section].data.length > 0
      ) {
        const heading = sections[section];
        let data = [];
        if (section === "vital") {
          inputObject[section]?.data?.map((item) => {
            data = Object.entries(item).map(([label, value]) => ({
              label,
              value,
            }));
          });
        } else {
          data = inputObject[section]?.data?.map((item) => {
            if (section === "vital" || section === "medication") {
              const labelData = Object.entries(item).map(([label, value]) => ({
                label,
                value,
              }));
              return labelData;
            } else {
              const label = Object.keys(item)[0];
              const value = item[label] || "";

              return { label, value };
            }
          });
        }

        resultArray.push({ heading, data });
      }
    }

    return resultArray;
  };

  const [pmrPdfData, setPmrPdfData] = useState([]);

  useEffect(() => {
    const transformedArr = transformPdfData(pdfData);
    const filteredArr = transformedArr?.filter(
      (item) =>
        item?.heading !== "Medications" || item?.heading === "Medical History"
    );
    console.log(filteredArr, "filter");
    setPmrPdfData(filteredArr);
    const medications = transformedArr?.filter(
      (item) => item?.heading === "Medications"
    );
    let outputArray = [];
    medications[0]?.data?.map((item) => {
      const outputObject = {};
      item?.map((medicine) => {
        outputObject[medicine.label] = medicine.value;
      });
      outputArray?.push(outputObject);
    });

    setPrescriptionData(outputArray);

    if (Object.keys(patientData)?.length) {
      const patientDetails = [
        {
          label: "Gender",
          value: patientData?.patientGender,
        },
        {
          label: "Age",
          value: patientData?.patientAge,
        },
        {
          label: "Contact Number",
          value: patientData?.patientNumber,
        },
        {
          label: "Email",
          value: patientData?.patientEmail,
        },
      ];
      setCurrentPatientData(patientDetails);
    }
  }, []);

  return (
    <Document style={pmrPdfStyles.document}>
      <Page size="A4" style={pmrPdfStyles.page}>
        <View style={pmrPdfStyles.pdfHeader}>
          <View style={pmrPdfStyles.pdfHeaderLogo}>
            <Text style={pmrPdfStyles.pdflogoText}>Cliniq360</Text>
            <Text style={pmrPdfStyles.pdfhospitalNameText}>
              {patientData?.hospitalName}
            </Text>
          </View>
          <View style={pmrPdfStyles.drName}>
            <Text style={pmrPdfStyles.pdfDrNameText}>
              {patientData?.doctorName}
            </Text>
          </View>
        </View>
        <View style={pmrPdfStyles.pdfPatientDetails}>
          <View style={pmrPdfStyles.pdfPatientName}>
            <Text style={pmrPdfStyles.pdfPatientNameText}>
              {patientData?.patientName}
            </Text>
            <Text style={pmrPdfStyles.pdfPatientidText}>
              {patientData?.patientId}
            </Text>
          </View>
          <View style={pmrPdfStyles.pdfPatientOtherDetailsWrapper}>
            {currentPatientData?.map((item) => (
              <View style={pmrPdfStyles.pdfPatientOtherDetails}>
                <Text style={pmrPdfStyles.pdfPatientDetailsLabel}>
                  {item.label}
                </Text>
                <Text style={pmrPdfStyles.pdfPatientDetailsValue}>
                  {item?.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {pmrPdfData?.map((emr) => (
          <View style={pmrPdfStyles.section}>
            <Text style={pmrPdfStyles.pdfSectionHeading}>{emr?.heading}</Text>
            <View style={pmrPdfStyles.pdfVitalsWrapper}>
              {emr?.data?.map((item) => (
                <View style={pmrPdfStyles.pdfVital}>
                  <>
                    <Text style={pmrPdfStyles.pdfPatientDetailsLabel}>
                      {item.label}
                    </Text>
                    <Text style={pmrPdfStyles.pdfPatientDetailsValue}>
                      {item?.value}
                    </Text>
                  </>
                </View>
              ))}
            </View>
          </View>
        ))}
        <View style={pmrPdfStyles.section}>
          <Text style={pmrPdfStyles.pdfSectionHeading}>Prescription</Text>
          <View style={pmrPdfStyles.table}>
            <View style={[pmrPdfStyles.tableRow, pmrPdfStyles.tableHeader]}>
              {columns.map((column) => (
                <Text
                  style={[pmrPdfStyles.tableCell, pmrPdfStyles.columnText]}
                  key={column.key}
                >
                  {column.label}
                </Text>
              ))}
            </View>
            {prescriptionData?.map((item) => (
              <View style={pmrPdfStyles.tableRow} key={item.id}>
                {columns.map((column) => (
                  <Text
                    style={[pmrPdfStyles.tableCell, pmrPdfStyles.rowText]}
                    key={column.key}
                  >
                    {item[column.key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PMRPdf;
