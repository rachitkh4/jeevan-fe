import { Tab, Tabs, Typography, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

const TabsWrapper = styled("div")(({ theme }) => ({
  ".tabs-root": {
    flexGrow: 1,
  },
  ".tabs-style": {
    "&.MuiTabs-root": {
      borderRadius: "6px",
    },
    "& .MuiTabs-indicator": {
      backgroundColor: "#0561a0",
    },
  },
  ".tab-style": {
    "&.MuiButtonBase-root": {
      backgroundColor: "#ffffff",
      borderRight: "1px solid #9e9e9e",

      "&:last-child": {
        borderRight: "none",
      },
    },
  },
  ".tab-container": {
    display: "flex",
    gap: "8px",
  },
}));

const CustomTabs = ({ tabs, defaultTab, onChange, tab, addSteps = false }) => {
  const [value, setValue] = useState(defaultTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setValue(defaultTab);
  }, [defaultTab]);

  return (
    <TabsWrapper className="tabs-root">
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        className="tabs-style"
      >
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            disabled={tab?.disable ? tab?.disable : false}
            label={
              <div className="tab-container">
                <div>{tab?.icon}</div>
                <div>
                  {addSteps && <Typography>Step {index + 1}</Typography>}
                  <Typography>{tab.label}</Typography>
                </div>
              </div>
            }
            className="tab-style"
          />
        ))}
      </Tabs>
      {/* Render the content of the selected tab */}
      {tabs[value]?.content}
    </TabsWrapper>
  );
};

export default CustomTabs;
