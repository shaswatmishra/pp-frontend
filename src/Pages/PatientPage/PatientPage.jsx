import { useState, useEffect } from "react";

import {
  StaffPageWrapper,
  SearchInput,
  AppointmentCardWrapper,
} from "../StaffPage/StaffPage.style";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";

import SearchIconSvg from "../../Svg/SearchIcon.svg.jsx";
import { Patients } from "../../Api/Api";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card } from "../StaffPage/StaffPage.jsx";
import Loader from "../../Components/Loading/ExportLoader";
const PatientPage = () => {
  const { idToken } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [patientData, setPatientData] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const dt = await axios.get(`${Patients.getData}`, {
          headers: {
            firebasetoken: idToken,
          },
        });
        console.log(dt);
        setPatientData(dt?.data?.data?.patients);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  }, []);
  useEffect(() => {
    if (search !== "") {
      axios
        .get(Patients.search(search), {
          headers: {
            firebasetoken: idToken,
          },
        })
        .then((res) => {
          setPatientData(res.data.data.patients);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <StaffPageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Patients</h2>
      </div>
      <div className="searchContainer">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="search Patients by name or number"
        />
        <div className="searchIcon">
          <SearchIconSvg />
        </div>
      </div>
      <p style={{ color: "GrayText", paddingLeft: "20px", marginTop: "8px" }}>
        Showing all {patientData.length} patients
      </p>
      <div>
        {patientData.reverse().map((item) => {
          return <Card to="/patientdetails" data={item} wtsp patient={true} />;
        })}
      </div>
      {loading && <Loader />}
    </StaffPageWrapper>
  );
};

export default PatientPage;
