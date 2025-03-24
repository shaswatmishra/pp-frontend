import { useState, useEffect } from "react";
import { PatientDetailsPageWrapper } from "./PatientDetailsPage.style.js";
import {
  Label,
  InputBox,
} from "../BasicInformationPage/BasicInformationPage.style";
import Records from "../../Components/Records/Records.jsx";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import DeleteIconSvg from "../../Svg/DeleteIconSvg.jsx";
import { Avatar } from "@mui/material";
import WhatsAppIconSvg from "../../Svg/WhatsAppIcon.svg.jsx";
import PencilIcon from "../../Assets/PencilIcon.svg";
import { useAuth } from "../../contexts/AuthContext.js";
import { Link, useNavigate } from "react-router-dom";
import { Patients } from "../../Api/Api.js";
import { Form } from "../../Components/Popup/popup.style";
import Modal from "../../Components/Popup/Modal";
import Loader from "../../Components/Loading/ExportLoader";
import axios from "axios";
import { MenuItem, Select, NativeSelect } from "@mui/material";
const gend = ["male", "female", "Other"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const PatientDetailsPage = () => {
  const { idToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateP, setUpdate] = useState(false);
  const [deleteP, setDelete] = useState(false);
  const [data, setData] = useState();
  const [records, setRecords] = useState([]);
  const [patientFormData, setFormData] = useState({
    name: "",
    contact: "",
    gender: "",
    age: "",
  });

  const search = window.location.search;
  const params = new URLSearchParams(search);
  const navigate = useNavigate();
  const id = params.get("id");

  const handleFormData = (e) => {
    patientFormData[e.target.name] = e.target.value;
    setFormData({ ...patientFormData });
  };

  const deletePatient = () => {
    if (loading.status) return;
    setLoading({ status: true, message: "Deleting patient.." });
    axios
      .delete(Patients.deleteP(data?._id), {
        headers: {
          firebasetoken: idToken,
        },
      })
      .then((res) => {
        setData({});
        setDelete(false);
        navigate("/patients");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading({ status: false }));
  };

  const updatePatient = () => {
    if (loading.status) return;
    setLoading({ status: true, message: "Updating patient details" });
    axios
      .patch(Patients.updatePatient(data?._id), patientFormData, {
        headers: {
          firebasetoken: idToken,
        },
      })
      .then(() => {
        setData({ ...data, ...patientFormData });
        setUpdate(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({ status: false });
      });
  };

  useEffect(() => {
    if (id) {
      if (loading.status) return;
      setLoading({ status: true, message: "Fetching patient details!" });
      axios
        .get(Patients.details(id), {
          headers: {
            firebasetoken: idToken,
          },
        })
        .then((res) => {
          setData(res?.data?.data?.patient);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading({ status: false }));
    }
  }, [id]);

  useEffect(() => {
    if (!data) return;
    setFormData({
      name: data.name,
      contact: data.contact,
      gender: data.gender,
      age: data.age,
    });
    const getRecords = async () => {
      setLoading({ status: true, message: "Fetching Records..." });
      try {
        const dt = await axios.get(Patients.fetchRecords(data?._id), {
          headers: {
            firebasetoken: idToken,
          },
        });
        setRecords(dt.data.data.records);
      } catch (err) {
        console.log(err.message);
        //DisplaySnackbar(err.message);
      }
      setLoading({ status: false, message: "" });
    };

    getRecords();
  }, [data]);

  return (
    <PatientDetailsPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <div
          style={{
            left: "100%",
            transform: "translateX(-100%) translateY(-50%)",
          }}
          className="icon"
          onClick={() => setDelete(true)}
        >
          <DeleteIconSvg />
        </div>
        <h2>Patients Details</h2>
      </div>

      <div className="flx">
        <Avatar style={{ width: "60px", height: "60px" }} />
        <h2>{data?.name || data?.contact}</h2>
        <div className="btn" onClick={() => setUpdate(true)}>
          <img src={PencilIcon} alt="edit icon" />
          <button>Edit Profile</button>
        </div>
        <Link
          to={`/whatsapp/${data?._id}/${data?.contact}`}
          style={{
            width: "50px",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        >
          <WhatsAppIconSvg style={{ margin: "auto" }} />
        </Link>
      </div>

      <div className="patientDetails">
        <p>
          Age:{" "}
          <span className={data?.age || "no-value"}>
            {data?.age ? `${data?.age} years` : "please update"}
          </span>
        </p>
        {/* <p>DOB: <span>03/12/22</span>  </p>*/}
        <p>
          Gender:{" "}
          <span className={data?.gender || "no-value"}>
            {data?.gender || "please update"}
          </span>
        </p>
        <p>
          Phone:{" "}
          <span className={data?.contact || "no-value"}>
            {data?.contact || "please update"}
          </span>{" "}
        </p>
      </div>
      {/*<div className="btnContainer">
        <Button toggle>View Screening Question</Button>
        </div>
      <div className="btnContainer">
        <Button toggle>View Medical Records</Button>
      </div>*
      <div className="btnContainer">
        <Button toggle>View Medical Records</Button>
      </div>
        */}
      {/**
      <div className="timeLine">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Patient Timeline
        </h2>
        <div style={{ textAlign: "center" }}>
          <PatientTimeLineSvg />
        </div>
      </div>
       */}
      <div className="records">
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          Medical Records
        </h2>
        <Records records={records} />
      </div>

      {updateP && (
        <Modal heading="Update Patient" onclose={() => setUpdate(false)}>
          <Form>
            <div className="form-input">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={patientFormData.name}
                onChange={handleFormData}
              />
            </div>
            <div className="form-input">
              <label>Contact</label>
              <input
                type="text"
                name="contact"
                value={patientFormData.contact}
                onChange={handleFormData}
              />
            </div>
            <div className="small-input">
              <div className="form-input">
                <Label>Gender</Label>
                <Select
                  // multiple
                  style={{
                    marginTop: "auto",
                    display: "block",
                    textTransform: "capitalize",
                    fontFamily: "GilroyRegular",
                    fontStyle: "none",
                    borderBottom:"border-bottom:1px solid  #D9D9D9; !important"
                  }}
                  displayEmpty
                  value={patientFormData.gender}
                  onChange={handleFormData}
                  fullWidth
                  input={<NativeSelect />}
                  name="gender"
                  renderValue={(selected) => {
                    if (!selected) {
                      return <span>Select gender</span>;
                    }

                    return selected;
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  {gend.map((name) => (
                    <MenuItem
                      key={name}
                      style={{ textTransform: "capitalize" }}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="form-input">
                <label>Age</label>
                <input
                  type="text"
                  name="age"
                  value={patientFormData.age}
                  onChange={handleFormData}
                />
              </div>
            </div>
            <button className="form-button" onClick={updatePatient}>
              Update
            </button>
          </Form>
        </Modal>
      )}

      {deleteP && (
        <Modal heading={"Delete Patient"} onclose={() => setDelete(false)}>
          <p className="msg-content">
            Are You Sure you want to delete {data?.name || data?.contact} ?
          </p>
          <div className="res-btn">
            <button className="btn" onClick={() => setDelete(false)}>
              No
            </button>
            <button className="btn" onClick={() => deletePatient()}>
              Yes
            </button>
          </div>
        </Modal>
      )}

      {loading.status && <Loader text={loading.message} />}
    </PatientDetailsPageWrapper>
  );
};

export default PatientDetailsPage;
