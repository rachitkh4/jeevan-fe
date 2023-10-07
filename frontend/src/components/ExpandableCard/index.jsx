import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";

const CardWrapper = styled("div")(({ theme }) => ({
  ".card-container": {
    "&.MuiPaper-root": {
      padding: "24px",
    },
    "& > .MuiCardHeader-root": {
      padding: "24px",
    },
    "& > .MuiCardHeader-content": {
      padding: "24px",
    },
  },
  ".card-header": {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },

  ".card-title-text": {
    "&.MuiTypography-root": theme.typography.body2,
  },
}));

const ExpandableCard = ({
  title,
  children,
  expanded,
  setExpanded,
  completed,
}) => {
  const [formCompleted, setFormCompleted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <CardWrapper>
      <Card className="card-container">
        <CardHeader
          title={
            <div className="card-header">
              <CheckCircleIcon
                color={completed ? "success" : "disabled"}
                sx={{ fontSize: 24 }}
              />
              <Typography className="card-title-text">{title}</Typography>
            </div>
          }
          action={
            <IconButton onClick={handleExpandClick}>
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          }
        />
        {expanded && <CardContent>{children}</CardContent>}
      </Card>
    </CardWrapper>
  );
};

export default ExpandableCard;
