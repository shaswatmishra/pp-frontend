import { useState, useEffect } from "react";
import { WhatsAppPageWrapper, Profile } from "./index.style";
import BackIconSvg from "../../Svg/BackIcon.svg";
import { SearchInput } from "../StaffPage/StaffPage.style";
import SearchIconSvg from "../../Svg/SearchIcon.svg";
import { useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { Line } from "../PreviousAppointment/PreviousAppointment.style";
import { WhatsApp } from "../../Api/Api";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../Components/Loading/ExportLoader";
import axios from "axios";

function Index() {
  const msgStatus = JSON.parse(
    window.localStorage.getItem("msgstatus") || "{}"
  );
  const { idToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [inboxData, setInboxData] = useState([]);
  const [filterInbox, setfilterInbox] = useState([]);

  const filter = (inbox) => {
    const regex = new RegExp(`${search}`);
    if (!search) return true;
    if (
      regex.test(inbox?.patientId?.contact) ||
      regex.test(inbox?.patientId?.name)
    )
      return true;
    return false;
  };

  const sort = (a, b) => {
    return (
      new Date(b.lastMessage?.createdAt || 0).getTime() -
      new Date(a.lastMessage?.createdAt || 0).getTime()
    );
  };

  const countInterval = (date) => {
    const currentDate = Date.now();
    const receivedDate = new Date(date).getTime();
    //get interval in seconds
    var interval = (currentDate - receivedDate) / 1000;

    if (interval < 60) return `${Math.round(interval)} sec ago`;
    //get interval in min
    interval = interval / 60;
    if (interval < 60) return `${Math.round(interval)} min ago`;
    //get interval in hours
    interval = interval / 60;
    if (interval < 24) return `${Math.round(interval)} hours ago`;
    //get interval in days
    interval = interval / 24;
    return `${Math.round(interval)} days ago`;
  };

  const showLastChat = (message) => {
    if (message.length > 20) {
      return message.slice(0, 20) + "...";
    }
    return message;
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dt = await axios.get(WhatsApp.getUsers, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setInboxData(dt?.data?.data?.inbox);
        setfilterInbox(dt?.data?.data?.inbox);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  }, []);

  useEffect(() => {
    setfilterInbox(inboxData.filter(filter));
  }, [search]);

  const navigate = useNavigate();
  return (
    <WhatsAppPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>WhatsApp</h2>
      </div>
      <div style={{ marginBottom: "30px" }} className="searchContainer">
        <SearchInput
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="searchIcon">
          <SearchIconSvg />
        </div>
      </div>
      {filterInbox.sort(sort).map((item, index) => {
        if(!item.patientId) return "";
        return (
          <>
            <Container
              key={index}
              id={item.patientId?._id}
              contact={item.patientId?.contact ? `${item.patientId?.contact}`.replace("91",""):undefined}
              message={showLastChat(item?.lastMessage?.message)}
              name={item?.patientId?.name}
              date={countInterval(item?.lastMessage?.createdAt)}
              isSeen={
                msgStatus[item.patientId?._id] !== `${item.lastMessage._id}`
              }
            />
            <Line style={{ borderColor: "#ccc" }} />
          </>
        );
      })}

      {loading && <Loader />}
    </WhatsAppPageWrapper>
  );
}

const Container = ({ id, message, name, contact, date, isSeen }) => {
  const navigate = useNavigate();
  return (
    <div
      key={id}
      onClick={() => navigate(`/whatsapp/${id}/${contact}`)}
      className="flx"
    >
      <div style={{ display: "flex" }}>
        <Profile>
          {/*<Avatar />*/}
          <span>{(name || contact) ? `${name || contact}`[0] : "?"}</span>
        </Profile>
        <div className="infoContainer">
          <p className="name">{name || contact || ""}</p>
          <p
            className={isSeen ? "oldText" : "recentText"}
          >
            {message}
          </p>
        </div>
      </div>
      <div
        style={{
          color: "#BDBDBD",
          fontSize: "11px",
          fontFamily: "GilroyRegular",
        }}
      >
        {date}
      </div>
    </div>
  );
};

export default Index;
