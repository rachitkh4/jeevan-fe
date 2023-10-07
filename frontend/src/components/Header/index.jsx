import React, { useState } from "react";
import { Button, styled, Avatar, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";

const HeaderWrapper = styled("div")(({ theme }) => ({
  "&": {
    // maxWidth: "1440px",
    // margin: "0 auto",
    backgroundColor: theme.palette.primaryWhite,
    zIndex: "9999",
    height: "80px",
    borderBottom: `1px solid ${theme.palette.tertiaryGrey}`,
    pposition: "-webkit-sticky",
    position: "sticky",
    top: 0,
  },
  ".header-container": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 32px",
    zIndex: "9999",
  },
  ".header-logo-container": {
    display: "flex",
    alignItems: "center",
  },
  ".logo": {
    fontFamily: "Red Hat Display",
    fontSize: "24px",
  },
  ".header-question-text": {
    color: theme.palette.secondaryGrey,
    fontFamily: "Inter",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "16px",
  },
}));

const ProfileIconWrapper = styled("div")({
  position: "relative",
  cursor: "pointer",
  display: "inline-block",
});

const ProfileIcon = styled(Avatar)({
  backgroundColor: "#000",
});

const ProfileMenu = styled(Menu)({
  position: "absolute",
  top: 20,
});

const Header = () => {
  const accessToken = localStorage.getItem("accesstoken");
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <HeaderWrapper>
      <div className="header-container">
        <div className="header-logo-container">
          <span className="logo">Cliniq360</span>
        </div>
        {accessToken ? (
          <div className="header-content">
            <ProfileIconWrapper>
              <ProfileIcon onClick={handleClick}>
                <Person />
              </ProfileIcon>
              <ProfileMenu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>View Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </ProfileMenu>
            </ProfileIconWrapper>
          </div>
        ) : (
          <div className="header-content">
            <span className="header-question-text">Have A Question?</span>
            <Button variant="contained" className="header-btn">
              Contact Us
            </Button>
          </div>
        )}
      </div>
    </HeaderWrapper>
  );
};

export default Header;
