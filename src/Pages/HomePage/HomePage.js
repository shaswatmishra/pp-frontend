import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./HomePage.css";

import SideBarIcon from "../../Assets/SideBar.svg";
import NotificationsIcon from "../../Assets/Notifications.svg";
import StaffIcon from "../../Assets/Staff.svg";
import WhatsappIcon from "../../Assets/WhatsApp.svg";
import StethoscopeIcon from "../../Assets/Patients.svg";
import AppointmentsIcon from "../../Assets/Appointments.svg";
import TimingsIcon from "../../Assets/Timings.svg";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Loader from "../../Components/Loading/ExportLoader";
import { Doctor } from "../../Api/Api";
import WalletIcon from "../../Assets/home-wallet.svg";
import Slider from "react-touch-drag-slider";

import SliderImage1 from "../../Assets/SlideItem1.svg";
import SliderImage2 from "../../Assets/SlideItem2.svg";
import SliderImage3 from "../../Assets/SlideItem3.svg";
import SliderImage4 from "../../Assets/SlideItem4.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const { idToken } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("staff");
  const [approved, setApproval] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dt = await axios.get(Doctor.getInfo, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setName(dt?.data.data?.profile?.name);
        setRole(dt?.data.data.profile?.role);
        setApproval(dt.data.data.profile.approved);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  }, []);
  return (
    <div className="homepage">
      {/*Top*/}
      <div className="top">
        <img src={SideBarIcon} onClick={() => navigate("/settings")} />
        <img src={NotificationsIcon} />
      </div>
      {/*Name*/}
      <div className="name">
        <text className="hi_name">Hi, {name}</text>
        <text className="date">{new Date().toDateString()} </text>
      </div>

      <div className="carousel">
        <Slider
          onSlideComplete={(i) => {
            console.log("finished dragging, current slide is", i);
            setActiveIndex(0);
          }}
          activeIndex={0}
          threshHold={100}
          transition={0.5}
          scaleOnDrag={true}
        >
          <img
            style={{ borderRadius: "20px" }}
            src={SliderImage4}
            key={1}
            alt="2"
          />
          <img
            style={{ borderRadius: "20px" }}
            src={SliderImage1}
            key={2}
            alt="2"
          />
          <img
            style={{ borderRadius: "20px" }}
            src={SliderImage2}
            key={3}
            alt="3"
          />
          <img
            style={{ borderRadius: "20px" }}
            src={SliderImage3}
            key={4}
            alt="4"
          />
        </Slider>
      </div>
      {/*carousel*/}
      {/*<div className="carousel">
        <Carousel
      slides={slides}
          goToSlide={slidesData.goToSlide}
          offsetRadius={slidesData.offsetRadius}
          showNavigation={slidesData.showNavigation}
          animationConfig={slidesData.config}
          /> 
      </div>*/}
      {/*button group*/}

      {!loading && !approved ? (
        <p className="unverified-msg">
          Your profile is being verified! You will be notified soon.
        </p>
      ) : (
        ""
      )}

      <div className="button_group">
        <div className="buttons_row">
          {role === "doctor" ? (
            <div className="button">
              <img src={StaffIcon} onClick={() => navigate("/staff")} />
              <span>Staff</span>{" "}
            </div>
          ) : (
            <></>
          )}

          <div className="button">
            <img src={WhatsappIcon} onClick={() => navigate("/whatsApp")} />
            <span>WhatsApp</span>
          </div>
          <div className="button">
            <img src={StethoscopeIcon} onClick={() => navigate("/patients")} />
            <span>Your Patients</span>
          </div>
        </div>
        <div className="buttons_row">
          <div className="button">
            <img
              src={AppointmentsIcon}
              onClick={() => navigate("/appointments")}
            />
            <span>Appointments</span>
          </div>
          <div className="button">
            <img src={TimingsIcon} onClick={() => navigate("/clinics")} />
            <span>Clinics</span>
          </div>
          {role === "doctor" ? (
            <div className="button">
              {/* <img src={ComingSoon} onClick={() => navigate('/payment')}/> */}
              <img src={WalletIcon} onClick={() => navigate("/wallet")} />
              <span>Wallet</span>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/*Build Your Own WebSite*/}
      {/* <div className="build_Website">
        <div className="text">
          <span className="header">Build your website for free!</span>
          <span className="about">Improve your clinic with a website which help you gain more patients for your clinic.</span>
        </div>
        <div className="button">
          <span>BUILD</span>
        </div>
      </div>
      {/*Demo Videos*/}
      {/* <div className="demo_videos">
        <span className="header">Demo Videos</span>
        <TextAndImageCard
          header={"Take A Tour"}
          about={"New Here? Lets take you on a easy to explain you about practice plus."}
          image={NoImage}
        />
        <TextAndImageCard
          header={"Build Your Website"}
          about={"Improve your clinic with a website which help you gain more patients for your clinic."}
          image={NoImage}
        />
        <TextAndImageCard
          header={"Setting Up WhatsApp"}
          about={"Link your whatsapp with you patients"}
          image={NoImage}
        />
        <div className="see_more">
          <div>See More Videos</div>
        </div>
      </div>  */}
      {/*  */}
      {loading && <Loader />}
    </div>
  );
};

export default HomePage;
