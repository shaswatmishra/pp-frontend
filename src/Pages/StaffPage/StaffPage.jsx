import "./StaffPage.style.js";
import { useState, useEffect } from "react";
import {
  StaffPageWrapper,
  SearchInput,
  AppointmentCardWrapper,
} from "./StaffPage.style.js";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import AddStaffSvg from "../../Svg/AddStaff.svg.jsx";
import SearchIconSvg from "../../Svg/SearchIcon.svg.jsx";
import DeleteSvg from "../../Svg/Delete.svg.jsx";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Staff } from "../../Api/Api.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext.js";
import Loader from "../../Components/Loading/ExportLoader.js";
import Modal from "../../Components/Popup/Modal";

const StaffPage = () => {
  const { idToken, DisplaySnackbar } = useAuth();
  const [loading, setLoading] = useState(false);
  const [staffData, setStaffData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedStaff, selectStaff] = useState(undefined);

  const deleteStaff = async (id) => {
    setLoading(true);
    try {
      const res = await axios.delete(Staff.removeStaff(id), {
        headers: {
          firebasetoken: idToken,
        },
        validateStatus: () => true,
      });

      if (res.data.status !== "success") {
        throw { message: res.data.message };
      }

      setStaffData(staffData.filter((staff) => `${staff._id}` !== id));
      selectStaff(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      DisplaySnackbar(err.message, "error");
    }
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dt = await axios.get(Staff.getStaff, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setLoading(false);
        setStaffData(dt?.data?.data?.staffs);
      } catch (err) {
        setLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const query = search ? `?name[regex]=${search}&name[options]=i` : "";
        const dt = await axios.get(`${Staff.getStaff}${query}`, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setStaffData(dt?.data?.data?.staffs);
      } catch (err) {
        console.log(err.message);
        setLoading(false);
      }
    };
    getData();
  }, [search]);

  const navigate = useNavigate();
  return (
    <StaffPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Staff</h2>
        <div
          onClick={() => {
            navigate("/addstaff");
          }}
          style={{
            left: "100%",
            transform: "translateX(-100%) translateY(-50%)",
          }}
          className="icon"
        >
          <AddStaffSvg />
        </div>
      </div>
      <div className="searchContainer">
        <SearchInput
          placeholder="Search staff by name"
          onInput={(e) => setSearch(e.target.value)}
        />
        <div className="searchIcon">
          <SearchIconSvg />
        </div>
      </div>
      <p style={{ color: "GrayText", paddingLeft: "20px", marginTop: "8px" }}>
        Showing all {staffData.length} staff
      </p>
      {staffData.map((item) => {
        return <Card data={item} handleClick={() => selectStaff(item)} />;
      })}

      {selectedStaff && (
        <Modal heading={"Delete Staff"} onclose={() => selectStaff(null)}>
          <p className="msg-content">
            Are You Sure you want to delete{" "}
            {selectedStaff?.name || selectedStaff?.contact} ?
          </p>
          <div className="res-btn">
            <button className="btn" onClick={() => selectStaff(null)}>
              No
            </button>
            <button
              className="btn"
              onClick={() => deleteStaff(selectedStaff?._id)}
            >
              Yes
            </button>
          </div>
        </Modal>
      )}

      {loading && <Loader />}
    </StaffPageWrapper>
  );
};

export const Card = ({
  wtsp = false,
  to = "",
  data,
  patient = false,
  handleClick,
}) => {
  const navigate = useNavigate();
  return (
    <AppointmentCardWrapper
      onClick={() => {
        to !== "" && navigate(`${to}?id=${data._id}`);
      }}
    >
      <div className="flx">
        <div className="flxChild">
          <div className="avatar">
            <Avatar />
          </div>
          <div>
            <h2 style={{ fontSize: "1.2rem" }}>{data?.name}</h2>
            <p className="greytext">
              {wtsp ? data?.contact : data?.contact.number}
            </p>
          </div>
        </div>

        {!patient ? (
          <div className="iconContainer" onClick={() => handleClick(data._id)}>
            <span>
              <DeleteSvg />
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div style={{ fontSize: "1rem", fontWeight: "400" }} className="flx">
        {wtsp
          ? `lastVisit: ${data?.lastVisit || "No visit"}`
          : `Clinic Assigned: ${data?.clinics?.map((item) => item?.name)}`}
      </div>
      <div className="sideLine"></div>
    </AppointmentCardWrapper>
  );
};

export default StaffPage;
