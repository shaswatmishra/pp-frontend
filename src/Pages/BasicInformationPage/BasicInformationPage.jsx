import { useState, useEffect, useRef } from "react";
import {
  BasicinformationWrapper,
  InputBox,
  Label,
} from "./BasicInformationPage.style.js";
import { Button } from "../LoginPage/LoginPage.style.js";
import { MenuItem, Select, NativeSelect } from "@mui/material";
import axios from "axios";
import { Helper, Doctor } from "../../Api/Api.js";
import { useAuth } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loading/ExportLoader.js";
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
const BasicInformationPage = () => {
  const [basicInfo, setBasicInfo] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [specialization, setSpecialization] = useState([]);
  const { idToken, number, DisplaySnackbar } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    code: "+91",
    qualification: "",
    experience: "",
    staffs: "",
    instagramLink: "",
  });
  const certificate = useRef(null);

  useEffect(() => {
    async function getData() {
      try {
        const dt = await axios.get(Helper.specialization, {
          headers: {
            firebasetoken: idToken,
          },
        });

        setSpecialization([...dt?.data?.data?.specializations]);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    certificate.current = e.target.files[0];
  };
  const handleSubmit = async () => {
    if (!basicInfo) {
      try {
        if (!certificate.current) {
          throw { message: "Please upload certificate!" };
        }
        setLoading(true);
        //create basic details
        const dt = await axios.post(
          Doctor.registerDoctor,
          {
            ...formData,
            specialization: formData.specialization?._id,
            number: number,
            filename: certificate.current.name,
            filetype: certificate.current.type,
          },
          {
            headers: {
              firebasetoken: idToken,
            },
            validateStatus: () => true,
          }
        );

        if (dt?.data?.status !== "success") {
          throw { message: dt.data.message };
        }

        //UPLOAD CERTIFICATE
        await axios.put(dt.data.data.signedURL, certificate.current);

        //ACTIVATE CERTIFICATE
        const actRes = await axios.get(
          Doctor.activateCertificate(dt.data.data.certificateId),
          {
            headers: {
              firebasetoken: idToken,
            },
            validateStatus: () => true,
          }
        );

        if (actRes.data.status !== "success")
          throw { message: actRes.data.message };

        setLoading(false);
        DisplaySnackbar(
          "Your profile is being verified! You will be notified soon.",
          "info"
        );
        navigate("/");
      } catch (err) {
        setLoading(false);
        DisplaySnackbar(err.message, "error");
      }
    } else {
    }
  };
  return (
    <div style={{ background: "#F6F2FF" }}>
      <BasicinformationWrapper>
        <h2>Basic Information</h2>
        <p style={{ color: "GrayText", marginBottom: "13px" }}>
          Takes less than 10 minutes to fill out all the information needed to
          register.
        </p>
        {!basicInfo ? (
          <BasicInfo
            background={"#F6F2FF"}
            specialization={specialization}
            formData={formData}
            setFormData={setFormData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        ) : (
          <DomainInfo background={"#F6F2FF"} />
        )}
        <div className="btn">
          <Button
            onClick={() => {
              handleSubmit(); /*setBasicInfo(!basicInfo)*/
            }}
          >
            Next
          </Button>
        </div>
      </BasicinformationWrapper>
      {loading && <Loader />}
    </div>
  );
};

const names = ["Mental Health", "Dentist", "Orthopedics", "Other"];
export default BasicInformationPage;

export const BasicInfo = ({
  formData,
  handleChange,
  handleFileChange,
  specialization,
  background,
}) => {
  console.log(specialization);
  return (
    <>
      <div className="formDiv">
        <Label className="label">Name</Label>
        <InputBox
          background={background}
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e)}
          type="text"
        />
        <p style={{ color: "GrayText", marginTop: "-.03rem" }}>
          Enter your name without Dr
        </p>
      </div>
      <div className="formDiv">
        <Label>Specialization</Label>
        <Select
          // multiple
          displayEmpty
          value={formData.specialization}
          onChange={(e) => handleChange(e)}
          fullWidth
          input={<NativeSelect />}
          name="specialization"
          renderValue={(selected) => {
            console.log(selected);
            if (!selected) {
              return <em>eg Mental Health</em>;
            }

            return selected.title;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
          {specialization.map((name) => (
            <MenuItem key={name?._id} value={name}>
              {name?.title}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="formDiv">
        <Label>Medical Qualification</Label>
        <InputBox
          background={background}
          name="qualification"
          value={formData.qualification}
          onChange={(e) => {
            handleChange(e);
          }}
          type="text"
        />
        <p style={{ color: "GrayText", marginTop: "-.09rem" }}>
          Please enter your medical qualification(s)
        </p>
      </div>
      <div className="formDiv">
        <Label>
          No. of staffs you have to manage your clinic(s){" "}
          <span style={{ color: "red" }}>**</span>
        </Label>
        <InputBox
          background={background}
          type="number"
          onChange={(e) => handleChange(e)}
          name="staffs"
          value={formData.staffs}
        />
      </div>
      <div className="formDiv">
        <Label>Year(s) of experience</Label>
        <InputBox
          background={background}
          name="experience"
          value={formData.experience}
          onChange={(e) => handleChange(e)}
          type="number"
        />
      </div>
      <div className="formDiv">
        <Label>Upload your Registration Certificate</Label>
        <InputBox
          onChange={handleFileChange}
          background={background}
          type="file"
        />
        <p>By uploading, you agree to our terms and conditions</p>
      </div>
    </>
  );
};
export const DomainInfo = () => {
  return (
    <>
      <div className="formDiv">
        <Label>Tell us About yourself</Label>
        <InputBox type="text" />
        <p style={{ color: "GrayText", marginTop: "-.09rem" }}>
          This helps patients learn more about you(max 120 words) Choose from
          our existing templates
        </p>
        <div className="dtls">I, Dr (Yash Moses) have been...</div>
        <div className="dtls">I, Dr (Yash Moses) have been...</div>
      </div>
      <div className="formDiv">
        <Label>Location Link {`(Optional)`}</Label>
        <InputBox placeholder="https://" type="text" />
        <p style={{ color: "GrayText", marginTop: "-.03rem" }}>
          This helps you to reach out more people to you immediatly!
        </p>
      </div>
      <div className="formDiv">
        <Label>Choose Your Domain</Label>
        <InputBox placeholder="eg. arunCarc.practiceplus.health" type="text" />
        <p style={{ color: "GrayText", marginTop: "-.03rem" }}>
          This should be connected to your clinic name. Don’t worry you can
          always chaange it
        </p>
      </div>
    </>
  );
};
