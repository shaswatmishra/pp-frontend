import React, { useEffect, useState } from "react";
import {
  AddConsultantWrapper,
  TabContainer,
  Tab,
  TabData,
} from "./AddConsultant.style";
import BackIconSvg from "../../Svg/BackIcon.svg";
import AddPatientPage from "../AddPatientPage/AddPatientPage";
import { Button } from "../LoginPage/LoginPage.style";
import { useNavigate } from "react-router-dom";
import {
  Label,
  InputBox,
} from "../BasicInformationPage/BasicInformationPage.style";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { Clinics, Patients, Appointments } from "../../Api/Api";
import Loader from "../../Components/Loading/ExportLoader";
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

function AddConsultant() {
  const { idToken, DisplaySnackbar } = useAuth();
  const [addPatients, setAddPatients] = useState(true);
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [patientsData, setPatientsData] = useState({
    name: "",
    code: "+91",
    gender: "",
    clinicId: "",
    number: "",
    date: "",
    slots: "",
    age: "",
  });
  const [clinics, setClinics] = useState([]);
  const handleChange = (e) => {
    setPatientsData({ ...patientsData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const dt = await axios.get(Clinics.getdata, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setClinics(dt?.data?.data?.clinics);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);
  const handleClick = async () => {
    setLoading(true);
    if (!addPatients) {
      try {
        const dt = await axios.post(
          Appointments.sendLink,
          {
            code: "91",
            number: number,
            name: patientsData.name,
            gender: patientsData.gender,
            age: patientsData.age,
          },
          {
            headers: {
              firebasetoken: idToken,
            },
          }
        );
        setLoading(false);
        if (dt?.data?.status === "success") {
          DisplaySnackbar("Link send to the number", "success");
          setPatientsData({
            name: "",
            code: "+91",
            gender: "",
            clinicId: "",
            number: "",
            date: "",
            slots: "",
            age: "",
          });
          setNumber("");
        }
      } catch (err) {
        setLoading(false);
        DisplaySnackbar(err?.response?.data?.message, "error");
      }
      return;
    }
    try {
      const { gender, number, slots, date, age, name } = patientsData;
      const dt = await axios.post(
        Appointments.add,
        {
          number,
          code: 91,
          gender,
          age,
          name,
          clinicId: patientsData?.clinicId?._id,
          date: new Date(date).toDateString(),
          from: slots.from,
          to: slots.to,
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      setLoading(false);
      if (dt?.data?.status === "success") {
        DisplaySnackbar("Added Successfully", "success");
        setPatientsData({
          name: "",
          code: "+91",
          gender: "",
          clinicId: "",
          number: "",
          date: "",
          slots: "",
          age: "",
        });
        setNumber("");
      }
    } catch (err) {
      setLoading(false);
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
  };
  return (
    <AddConsultantWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Consultation</h2>
      </div>
      <TabContainer className="tabContainer">
        <Tab
          onClick={() => {
            setAddPatients(!addPatients);
          }}
          active={addPatients}
        >
          {" "}
          Add New Consultation
        </Tab>
        <Tab
          onClick={() => {
            setAddPatients(!addPatients);
          }}
          active={!addPatients}
        >
          Send WhatsApp Link
        </Tab>
      </TabContainer>
      <TabData>
        {addPatients ? (
          <AddPatientPage
            clinics={clinics}
            patientsData={patientsData}
            handleOnChange={handleChange}
          />
        ) : (
          <SendWhatsAppLink
            number={number}
            setNumber={setNumber}
            patientsData={patientsData}
            handleOnChange={handleChange}
          />
        )}
      </TabData>
      <div style={{ marginTop: "100px" }} className="dFlex formDiv">
        <div style={{ width: "40%", margin: "auto" }}>
          <Button onClick={() => handleClick()}>
            {addPatients ? "Add" : "Send"}
          </Button>
        </div>
      </div>
      {loading && <Loader />}
    </AddConsultantWrapper>
  );
}

export default AddConsultant;

const SendWhatsAppLink = ({
  number,
  setNumber,
  patientsData,
  handleOnChange,
}) => {
  return (
    <>
      <div className="formDiv">
        <Label>Full Name</Label>
        <InputBox
          value={patientsData?.name}
          onChange={(e) => handleOnChange(e)}
          type="text"
          name="name"
          placeholder="eg. Arun Sharma"
        />
      </div>
      <div className="dFlex ">
        <div className="formDiv1" style={{ width: "45%" }}>
          <Label>Age</Label>
          <InputBox
            value={patientsData.age}
            onChange={(e) => handleOnChange(e)}
            placeholder="Enter Age"
            type="number"
            name="age"
          />
        </div>
        <div
          className="formDiv1"
          style={{ width: "45%", display: "flex", flexDirection: "column" }}
        >
          <Label>Gender</Label>
          <Select
            // multiple
            style={{
              marginTop: "auto",
              display: "block",
              textTransform: "capitalize",
              fontFamily: "GilroyRegular",
              fontStyle: "none",
            }}
            displayEmpty
            value={patientsData.gender}
            onChange={(e) => handleOnChange(e)}
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
            {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
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
      </div>
      <div className="formDiv">
        <Label>Phone Number</Label>
        <InputBox
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          type="number"
          placeholder="Enter Phone Number"
        />
        <p style={{ color: "GrayText", marginTop: "-.03rem" }}>
          Enter patient’s WhatsApp Number to send booking link on their
          whatsapp.
        </p>
      </div>
    </>
  );
};
