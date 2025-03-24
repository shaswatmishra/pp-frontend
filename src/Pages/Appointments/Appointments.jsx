// import React, { useState } from "react";
import {
  AppointmentWrapper,
  AppointmentCardWrapper,
} from "./Appointments.style";
import { useState, useEffect } from "react";
import BackIconSvg from "../../Svg/BackIcon.svg";
import { Tab } from "../AddConsultant/AddConsultant.style";
import { TabContainer } from "../AddConsultant/AddConsultant.style";
import ThreedotSvg from "../../Svg/Threedot.svg";
import GreenTickSvg from "../../Svg/GreenTick.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { Appointments, Clinics } from "../../Api/Api";

import { Avatar } from "@mui/material";
import CancelledSvg from "../../Svg/Cancelled.svg";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import Loader from "../../Components/Loading/ExportLoader";

function AppointmentsPage() {
  const { idToken } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState([]);

  const tab = ["Upcoming", "Completed", "Cancelled"];
  const [active, setActive] = useState(0);
  const [time, setTime] = useState("&day=3");
  const [filterValue, setFilterValue] = useState([]);
  const [clinicVal, setClinicVal] = useState("");

  const [apidt, setApidt] = useState("?status=upcoming&sort=scheduledAt.from");

  const [clinics, setClinics] = useState([]);

  const getData = async () => {
    try {
      let api = apidt;
      if (clinicVal) {
        api = api + "&clinicId=" + clinicVal;
      }
      if (time) {
        api = api + time;
      }
      setLoading(true);
      const dt = await axios.get(Appointments.get(api), {
        headers: {
          firebasetoken: idToken,
        },
      });
      setLoading(false);

      setFilterValue(dt?.data?.data?.appointments);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const filterAppointment = (aptId) => {
    const apts = filterValue.filter((apt) => `${apt._id}` !== aptId);
    setFilterValue([...apts]);
  };

  const getClinic = async () => {
    try {
      const dt = await axios.get(Clinics.getdata, {
        headers: {
          firebasetoken: idToken,
        },
      });
      console.log(dt);
      setClinics(dt?.data?.data?.clinics);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getClinic();
  }, []);
  useEffect(() => {
    getData();
  }, [active, clinicVal, time]);

  return (
    <AppointmentWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Schedule</h2>
        <TabContainer style={{ marginTop: "27px" }}>
          {tab.map((item, id) => {
            return (
              <Tab
                onClick={() => {
                  setActive(id);
                  setApidt(`?status=${tab[id].toLowerCase()}&sort=scheduledAt.from`);
                }}
                active={id === active}
              >
                {item}
              </Tab>
            );
          })}
        </TabContainer>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ width: "45%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select Clinic</InputLabel>
            <Select
              onChange={(e) => {
                setClinicVal(e.target.value);
              }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={clinicVal}
              label="Clinic"
            >
              {clinics?.map((item) => {
                return <MenuItem value={item?._id}>{item?.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div style={{ width: "45%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Time</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              label="Age"
            >
              <MenuItem value={"&days=1"}>Daily</MenuItem>
              <MenuItem value={"&days=7"}>Weekly</MenuItem>
              <MenuItem value={"&days=30"}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ marginBottom: "100px" }}>
        {!loading &&
          (filterValue.length ? (
            filterValue?.map((item) => (
              <AppointmentCard
                data={item}
                status={tab[active].toLowerCase()}
                loading={loading}
                setLoading={setLoading}
                filterAppointment={filterAppointment}
              />
            ))
          ) : (
            <p
              style={{
                fontSize: "1.3rem",
                textAlign: "center",
                color: "grey",
                padding: "100px 30px",
                fontFamily: "GilroyRegular",
              }}
            >
              Select clinic and time to check appointments
            </p>
          ))}
      </div>
      {loading && <Loader />}
    </AppointmentWrapper>
  );
}

function convertTimeFormat(h, m) {
  let hh, mm;
  hh = parseInt(h);
  mm = parseInt(m);
  if (hh === 12) {
    return `${hh}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else if (hh > 12) {
    return `${hh % 12 < 10 ? "0" : ""}${hh % 12}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else {
    return `${hh < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} Am`;
  }
}

const AppointmentCard = ({
  status,
  data,
  setLoading,
  loading,
  filterAppointment,
}) => {
  const { idToken } = useAuth();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const getTime = (from, to) => {
    if (!from) return "";
    else {
      let dt = new Date(from).toDateString();
      let t1, t2;
      //t1 = new Date(from).toTimeString().split(" ")[0];
      //t2 = new Date(to).toTimeString().split(" ")[0];
      t1 = from.split("T")[1];
      t2 = to.split("T")[1];
      t1 = convertTimeFormat(t1.split(":")[0], t1.split(":")[1]);
      t2 = convertTimeFormat(t2.split(":")[0], t2.split(":")[1]);
      return `${dt}, ${t1}-${t2}`;
    }
  };

  const updateAppointment = async (apptStatus) => {
    try {
      if (loading) return;
      setLoading(true);
      await axios.patch(
        `${Appointments.updateDetails(data?._id)}`,
        { status: apptStatus },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      filterAppointment(data?._id);
    } catch (err) {
      throw err;
    }
  };

  return (
    <AppointmentCardWrapper>
      <div className="flx">
        <div>
          <p className="greytext">Appointment date and time</p>
          <p>{getTime(data?.scheduledAt?.from, data?.scheduledAt?.to)}</p>
        </div>
        <div onClick={() => setMenu(!menu)}>
          <ThreedotSvg />
        </div>
      </div>
      <div className="flx">
        <div
          className="flxChild"
          onClick={() => navigate(`/appointmentdetails?id=${data?._id}`)}
        >
          <div className="avatar">
            <Avatar />
          </div>
          <div>
            <h2>
              {data?.patientId?.name || data?.patientId?.contact || "no-data"}
            </h2>
            <p className="greytext">{data?.patientId?.contact || "no data"}</p>
          </div>
        </div>
        <div>
          {status === "upcoming" ? (
            ""
          ) : status === "completed" ? (
            <GreenTickSvg />
          ) : (
            <CancelledSvg />
          )}
        </div>
      </div>
      <div className="sideLine"></div>
      {menu && (
        <ul className="appointment-option">
          {["upcoming", "cancelled"].includes(status) && (
            <li
              onClick={() =>
                updateAppointment("completed").finally(() => setLoading(false))
              }
            >
              Complete
            </li>
          )}
          {["upcoming", "completed"].includes(status) && (
            <li
              onClick={() =>
                updateAppointment("cancelled").finally(() => setLoading(false))
              }
            >
              Cancel
            </li>
          )}
        </ul>
      )}
    </AppointmentCardWrapper>
  );
};

export default AppointmentsPage;
