import { SettingWrapper } from "./SettingsPage.style.js";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import { useState, useEffect } from "react";
import { Avatar } from "@mui/material";
import PreviousAppointmentSvg from "../../Svg/PreviousAppointment.svg.jsx";
import WalletSvg from "../../Svg/Wallet.svg.jsx";
import DownloadSvg from "../../Svg/Download.svg.jsx";
import TutorialSvg from "../../Svg/Tutorials.svg.jsx";
import FaqSvg from "../../Svg/Faq.svg.jsx";
import MyClinincSvg from "../../Svg/MyClininc.svg.jsx";
import ContactSvg from "../../Svg/Contact.svg.jsx";
import LogoutSvg from "../../Svg/Logout.svg.jsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";
import { Doctor } from "../../Api/Api.js";
import Loader from "../../Components/Loading/ExportLoader.js";
import axios from "axios";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { idToken, signOutUser } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dt = await axios.get(Doctor.getInfo, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setName(dt?.data.data?.profile);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <SettingWrapper>
      <div className="heading">
        <h2>Settings</h2>
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
      </div>
      <div className="info" onClick={() => navigate("/profile")}>
        <div className="avatar">
          <Avatar src={name?.picture} variant="square" />
        </div>
        <div>
          <h1>Hi, {name?.name}</h1>
          <p style={{ color: "GrayText" }}>{name?.specialization?.title}</p>
        </div>
      </div>
      <div className="menu">
        <div
          onClick={() => {
            navigate("/previousappointment");
          }}
          className="menu-item"
        >
          <div className="icons">
            <PreviousAppointmentSvg />
          </div>
          <p>Previous Appointment</p>
        </div>
        <div
          onClick={() => {
            navigate("/wallet");
          }}
          className="menu-item"
        >
          <div className="icons">
            <WalletSvg />
          </div>
          <p>Wallet</p>
        </div>
        <div onClick={() => navigate("/clinics")} className="menu-item">
          <div className="icons">
            <MyClinincSvg />
          </div>
          <p>My Clinic</p>
        </div>
        {/* <div className='menu-item'>
            <div className='icons'>
             <DownloadSvg/>
            </div>
            <p>Get Your Own App</p>
          </div>
          <div className='menu-item'>
            <div className='icons'>
              <TutorialSvg/>
            </div>
            <p>Tutorials</p>
          </div>
          <div className='menu-item'>
            <div className='icons'>
              <FaqSvg/>
            </div>
            <p>FAQs</p>
          </div>
          <div className='menu-item'>
            <div className='icons'>
              <ContactSvg/>
            </div>
            <p>Contact Us</p>
          </div> */}
        <div className="menu-item">
          <div className="icons">
            <LogoutSvg />
          </div>
          <p
            onClick={() => {
              signOutUser();
            }}
          >
            LOGOUT
          </p>
        </div>
      </div>
      {loading && <Loader />}
    </SettingWrapper>
  );
};

export default SettingsPage;
