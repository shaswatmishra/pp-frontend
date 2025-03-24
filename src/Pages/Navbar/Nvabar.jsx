import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import HomeSvg from "../../Svg/Home.svg";
import CalendarSvg from "../../Svg/Calender.svg";
import WhatsAppSvg from "../../Svg/WhatsApp.svg";
import UserSvg from "../../Svg/User.svg";
// import { useNavigate } from 'react-router-dom';
import AddSvg from "../../Svg/Add.svg";
import { useLocation } from "react-router-dom";
function Nvabar() {
  const location = useLocation();

  return (
    <div className="navBar">
      <Link
        className={location.pathname === "/" ? "" : "home"}
        to="/"
      >
        <HomeSvg />
      </Link>
      <Link
        className={
          location.pathname === "/appointments" ? "active" : "inactive"
        }
        to="/appointments"
      >
        <CalendarSvg />
      </Link>
      <Link to="/addconsultant" className="addBtn">
        <AddSvg />
      </Link>
      <Link
        className={location.pathname === "/whatsApp" ? "active" : "inactive"}
        to="/whatsApp"
      >
        <WhatsAppSvg />
      </Link>
      <Link
        className={location.pathname === "/profile" ? "active" : "inactive"}
        to="/profile"
      >
        <UserSvg />
      </Link>
    </div>
  );
}

export default Nvabar;
