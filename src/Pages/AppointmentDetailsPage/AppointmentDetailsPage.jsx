import "./AppointmentDetailsPage.style.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import Records from "../../Components/Records/Records.jsx";
import { AppointmentDetailsPageWrapper } from "./AppointmentDetailsPage.style.js";
import { Avatar } from "@mui/material";
import { Button } from "../LoginPage/LoginPage.style.js";
import UploadPicSvg from "../../Svg/UploadPic.svg.jsx";
import axios from "axios";
import { Appointments, Patients } from "../../Api/Api.js";
import { useAuth } from "../../contexts/AuthContext.js";
import Loader from "../../Components/Loading/ExportLoader.js";

function convertTimeFormat(h, m) {
  let hh, mm;
  hh = parseInt(h);
  mm = parseInt(m);
  if (hh === 12) {
    return `${hh < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else if (hh > 12) {
    return `${hh < 10 ? "0" : ""}${hh % 12}:${mm < 10 ? "0" : ""}${mm} Pm`;
  } else {
    return `${mm < 10 ? "0" : ""}${hh}:${mm < 10 ? "0" : ""}${mm} Am`;
  }
}

const getTime = (from) => {
  if (from === "" || !from) return;

  let dt = new Date(from).toDateString();

  let t1 = from.split("T")[1];

  t1 = convertTimeFormat(t1.split(":")[0], t1.split(":")[1]);

  return `${t1}`;
};

const AppointmentDetailsPage = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);

  const id = params.get("id");
  const { idToken, DisplaySnackbar } = useAuth();
  const [loading, setLoading] = useState({ status: false, message: "" });
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [records, setRecords] = useState([]);

  const remainingTime = (date) => {
    const currentDate = Date.now();
    const receivedDate =
      new Date(date).getTime() - 5 * 60 * 60 * 1000 - 30 * 60 * 1000;
    //get interval in seconds
    var interval = (receivedDate - currentDate) / 1000;

    if (interval < 60)
      return { left: interval, comment: `${Math.round(interval)} Sec` };
    //get interval in min
    interval = interval / 60;
    if (interval < 60)
      return { left: interval, comment: `${Math.round(interval)} Min` };
    //get interval in hours
    interval = interval / 60;
    if (interval < 24)
      return { left: interval, comment: `${Math.round(interval)} Hours` };
    //get interval in days
    interval = interval / 24;
    return { left: interval, comment: `${Math.round(interval)} Days` };
  };

  useEffect(() => {
    const getData = async () => {
      setLoading({ status: true, message: "Fetching Details..." });
      try {
        const dt = await axios.get(Appointments.getDetails(id), {
          headers: {
            firebasetoken: idToken,
          },
        });
        setData(dt?.data?.data?.appointment);
      } catch (err) {
        DisplaySnackbar(err.message);
      }
      setLoading({ status: false, message: "" });
    };
    getData();
  }, []);

  useEffect(() => {
    if (!data._id) return;
    const getRecords = async () => {
      setLoading({ status: true, message: "Fetching Records..." });
      try {
        const dt = await axios.get(
          `${Patients.fetchRecords(data?.patientId?._id)}?appointmentId=${
            data?._id
          }`,
          {
            headers: {
              firebasetoken: idToken,
            },
          }
        );
        setRecords(dt.data.data.records);
      } catch (err) {
        DisplaySnackbar(err.message);
      }
      setLoading({ status: false, message: "" });
    };

    getRecords();
  }, [data]);

  const startConsultation = async () => {
    if (loading.status) return;
    setLoading({ status: true, message: "Starting consultation..." });
    try {
      await axios.get(Appointments.start(id), {
        headers: {
          firebasetoken: idToken,
        },
      });

      navigate(`/whatsapp/${data?.patientId?._id}/${data?.patientId?.contact}`);
    } catch (err) {
      DisplaySnackbar(err.message);
    }
    setLoading({ status: false, message: "" });
  };

  const uploadPrescription = async (e) => {
    if (loading.status) return;
    setLoading({ status: true, message: "Uploading prescription..." });

    try {
      //get sign url
      const signURLRes = await axios.post(
        Patients.createRecord(data?.patientId?._id),
        {
          appointmentId: data?._id,
          documentType: "prescription",
          filename: e.target.files[0].name,
          filetype: e.target.files[0].type,
        },
        {
          headers: {
            firebasetoken: idToken,
          },
          validateStatus: () => true,
        }
      );

      if (signURLRes.data.status !== "success")
        throw { message: signURLRes.data.message };
      //upload file to aws
      const { signedURL, record } = signURLRes.data?.data;

      await axios.put(signedURL, e.target.files[0], {
        headers: {
          "Content-Type": e.target.files[0].type,
        },
      });

      //update file in db
      const activateRes = await axios.get(
        Patients.activateRecord(record?.patientId, record._id),
        {
          headers: {
            firebasetoken: idToken,
          },
          validateStatus: () => true,
        }
      );

      if (activateRes.data.status !== "success")
        throw { message: activateRes.data.message };

      setRecords([...records, record]);
    } catch (err) {
      DisplaySnackbar(err.message);
    }
    setLoading({ status: false, message: "" });
  };

  return (
    <AppointmentDetailsPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h1>Appointment Details</h1>
      </div>
      <div className="profile">
        <Avatar />
        <h2>{data?.patientId?.name || data?.patientId?.contact}</h2>
      </div>
      <div
        style={{
          display: "flex",
          color: "#ccc",
          marginBottom: "10px",
          justifyContent: "space-around",
        }}
      >
        <p style={{ margin: "7px 0" }}>
          <span style={{ fontSize: "1.4rem" }}>{data?.patientId?.contact}</span>
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ justifyContent: "space-evenly" }} className="flx">
          <p>
            {" "}
            Age: <span>{data?.patientId?.age}</span>
          </p>
          <p>
            Date:{" "}
            <span>{new Date(data?.scheduledAt?.from).toDateString()}</span>
          </p>
          <p>
            Clinic: <span>{data?.clinicId?.name}</span>
          </p>
        </div>
        <div style={{ justifyContent: "space-around" }} className="flx">
          <p>
            Gender: <span>{data?.patientId?.gender}</span>
          </p>
          <p>
            Time: <span>{getTime(data?.scheduledAt?.from)}</span>
          </p>
          <p>
            Payment Mode: <span>{data.paymentMode || "offline"}</span>{" "}
          </p>
        </div>
      </div>
      <div className="btnsGroup" style={{ marginTop: "10px" }}>
        <div className="sDiv">
          {data.status === "upcoming" &&
            (remainingTime(data.scheduledAt.from).left <= 0 ? (
              <div style={{ margin: "30px auto" }} onClick={startConsultation}>
                <Button>Start Consultation</Button>
              </div>
            ) : (
              <div style={{ margin: "30px auto" }}>
                <Button>{`${
                  remainingTime(data.scheduledAt.from).comment
                } Left`}</Button>
              </div>
            ))}
        </div>
      </div>
      {["upcoming", "completed"].includes(data.status) && (
        <div className="picture">
          <p>
            <span>
              <UploadPicSvg />
            </span>{" "}
            Upload Prescription
          </p>
          <input type="file" onInput={uploadPrescription} />
        </div>
      )}

      <Records records={records} />

      {loading.status && <Loader text={loading.message} />}
    </AppointmentDetailsPageWrapper>
  );
};

export default AppointmentDetailsPage;
