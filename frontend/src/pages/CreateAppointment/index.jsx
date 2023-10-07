import React, { useState } from "react";
import CustomTabs from "../../components/Tabs";
import AppointmentForm from "../../components/AppointmentForm";
import BookingSlots from "../../components/ScheduleAppointment";
import { Typography, styled } from "@mui/material";

const PageTitle = styled(Typography)(({ theme }) => ({
  "&": theme.typography.h1,
}));

const PageSubText = styled(Typography)(({ theme }) => ({
  "&": theme.typography.h2,
  marginBottom: theme.spacing(8),
}));

function CreateAppointment() {
  const [tab, setTab] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleTabChange = (newValue) => {
    console.log("Selected tab:", newValue);
    setTab(newValue);
    // Perform any additional logic based on the selected tab
  };

  const tabs = [
    {
      label: "Encounter",
      content: (
        <AppointmentForm
          handleTabChange={handleTabChange}
          setTab={setTab}
          setCompleted={setCompleted}
        />
      ),
    },
    {
      label: "Select Slot",
      content: (
        <BookingSlots handleTabChange={handleTabChange} setTab={setTab} />
      ),
      disable: !completed,
    },
  ];

  return (
    <>
      <PageTitle>New Appointment</PageTitle>
      <PageSubText>Schedule an appointment</PageSubText>
      <CustomTabs
        tabs={tabs}
        defaultTab={tab}
        onChange={handleTabChange}
        tab={tab}
        addSteps={true}
      />
    </>
  );
}

export default CreateAppointment;
