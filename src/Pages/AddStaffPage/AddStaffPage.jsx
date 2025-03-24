import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.js";
import Loader from "../../Components/Loading/ExportLoader.js";
import { Staff, Clinics } from "../../Api/Api.js";
import { AddStaffPageWrapper } from "./AddStaffPage.style.js";
import { useNavigate } from "react-router-dom";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import {
  Label,
  InputBox,
} from "../BasicInformationPage/BasicInformationPage.style.js";
import CheckboxTickSvg from "../../Svg/CheckboxTickSvg.jsx";
import CheckBoxSvg from "../../Svg/CheckBox.svg.jsx";
import { Button } from "../LoginPage/LoginPage.style.js";
import { NativeSelect, Select, MenuItem } from "@mui/material";

const gend = ["male", "female", "other"];
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

const AddStaffPage = () => {
  const { idToken, DisplaySnackbar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clinics, setClinics] = useState([]);
  const navigate = useNavigate();

  const [staffData, setStaffData] = useState({
    name: "",
    number: "",
    clinics: [],
    dob: "",
    gender: "",
    code: "91",
  });
  useEffect(() => {
    const getData = async () => {
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
    getData();
  }, []);

  const handleOnClick = async () => {
    setLoading(true);
    try {
      const dt = await axios.post(
        Staff.registerStaff,
        {
          ...staffData,
          dob: new Date(staffData?.dob),
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      setLoading(false);
      console.log(dt);
      if (dt?.data?.status === "success") {
        DisplaySnackbar("Staff Added", "success");
        setStaffData({
          name: "",
          number: "",
          clinics: [],
          dob: "",
          gender: "",
          code: "91",
        });
      }
    } catch (err) {
      setLoading(false);
      DisplaySnackbar(err?.response?.data?.message);
    }
  };
  const handleOnChange = (e, id) => {
    if (e === "clinic") {
      let dt = staffData?.clinics;
      if (dt?.includes(id)) {
        setStaffData({
          ...staffData,
          clinics: staffData?.clinics.filter((item) => item !== id),
        });
      } else {
        setStaffData({ ...staffData, clinics: [...staffData?.clinics, id] });
      }
      return;
    }
    setStaffData({ ...staffData, [e.target.name]: e.target.value });
  };
  console.log(staffData);
  return (
    <AddStaffPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Add Staff</h2>
      </div>
      <div className="formContainer">
        <div className="formDiv">
          <Label>Full Name</Label>
          <InputBox
            name="name"
            type="text"
            placeholder="Enter Full Name"
            value={staffData?.name}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="formDiv">
          <Label>Phone Number</Label>
          <InputBox
            name="number"
            placeholder="Enter Phone Number"
            value={staffData?.number}
            onChange={(e) => handleOnChange(e)}
            type="number"
          />
        </div>
        <div className="flx">
          <div className="formDiv">
            <Label>Date of birth</Label>
            <InputBox
              name="dob"
              placeholder="DOB"
              value={staffData?.dob}
              onChange={(e) => handleOnChange(e)}
              type="date"
            />
          </div>
          <div className="formDiv">
            <Label>Gender {`(optional)`}</Label>
            <Select
              // multiple
              displayEmpty
              value={staffData?.gender}
              onChange={(e) => handleOnChange(e)}
              fullWidth
              input={<NativeSelect />}
              name="gender"
              renderValue={(selected) => {
                console.log(selected);
                if (!selected) {
                  return <span>Select gender</span>;
                }

                return selected;
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
              style={{ fontSize: "1.2rem",textTransform:"capitalize" }}
            >
              {gend.map((name) => (
                <MenuItem
                  style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
                  key={name}
                  value={name}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <div className="formDiv">
          <Label>Choose Clinic</Label>
          {clinics?.map((item) => {
            return (
              <div key={item?._id} className="checkBoxContainer">
                <div onClick={() => handleOnChange("clinic", item?._id)}>
                  {/* {console.log(staffData?.clinics.includes(item?.id))} */}
                  {staffData?.clinics.includes(item?._id) ? (
                    <CheckboxTickSvg />
                  ) : (
                    <CheckBoxSvg />
                  )}
                </div>
                <div style={{ fontSize: "13px" }}>{item?.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="btnContainer">
        <Button onClick={() => handleOnClick()}>Save</Button>
      </div>
      {loading && <Loader />}
    </AddStaffPageWrapper>
  );
};

export default AddStaffPage;
