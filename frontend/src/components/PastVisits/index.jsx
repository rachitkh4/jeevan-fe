import { List, styled } from "@mui/material";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import React from "react";
import PMRPdf from "../PMRPdf";

const VisitsWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primaryWhite,
  padding: theme.spacing(0, 6),
}));
const Visits = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(4),
  padding: theme.spacing(8,0)
}));
const SideList= styled("List")(({ theme }) => ({
    display:"flex",
    flexDirection:"column",
    gap: theme.spacing(8)

}));

const DiagnosisDetails = styled("ListItem")(({ theme }) => ({
    padding:theme.spacing(2, 4),
    borderRadius: theme.spacing(1),
    border :`1px solid ${theme.palette.primaryGrey}`
}));

const PrescriptionDeatils = styled("div")(({ theme }) => ({
  flex: "1",
  backgroundColor: theme.palette.primaryGrey,
  height:"800px"
}));

const PastVisits = () => {
  const list = [
    {
      type: "Diagnosis",
      date: "26 June",
      time: "9:30AM",
    },
    {
      type: "Diagnosis",
      date: "26 June",
      time: "9:30AM",
    },
    {
      type: "Diagnosis",
      date: "26 June",
      time: "9:30AM",
    },
  ];
  const pdfFileName = 'custom_filename.pdf';
  return (
    <VisitsWrapper>
      <Visits>
        <SideList>
          {list.map((item) => (
            <DiagnosisDetails>{item?.type}</DiagnosisDetails>
          ))}
        </SideList>
       <PrescriptionDeatils>
          <PDFViewer style={{ width: '100%', height: '100%' }} zoom={1}> 
            <PMRPdf />
          </PDFViewer>
          <PDFDownloadLink
        document={<PMRPdf data={['Item 1', 'Item 2', 'Item 3']} />}
        fileName={pdfFileName}
      >
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download PDF'
        }
      </PDFDownloadLink>
        </PrescriptionDeatils>
      </Visits>
    </VisitsWrapper>
  );
};

export default PastVisits;
