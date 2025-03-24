import { useEffect, useState } from "react";
import {
  ProfilePageWrapper,
  ProfilePicInfoWrapper,
} from "./ProfilePagestyle.js";
import BackIconSvg from "../../Svg/BackIcon.svg.jsx";
import { Avatar } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  InputBox,
  Label,
} from "../BasicInformationPage/BasicInformationPage.style.js";
import UploadIconSvg from "../../Svg/UploadIcon.svg.jsx";
import { Button } from "../LoginPage/LoginPage.style.js";
import { useAuth } from "../../contexts/AuthContext.js";
import axios from "axios";
import { Doctor } from "../../Api/Api.js";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/Loading/ExportLoader.js";
import EditIcon from "../../Svg/EditIcon.jsx";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);
  const { idToken, DisplaySnackbar } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [isEdit, setEdit] = useState(false);
  const handleUpload = async (e) => {
    console.log(e);
    let nam, typ;
    nam = e.target.files[0].name;
    typ = e.target.files[0].type.split("/")[1];
    setLoading(true);
    try {
      console.log(e);
      const res = await axios.get(Doctor.getUrl(nam, typ), {
        headers: {
          firebasetoken: idToken,
        },
      });
      // console.log(dr);
      let url = res?.data?.data?.signedURL?.signedURL;
      // const data=new FormData();
      let file = e.target.files[0];

      await axios.put(url, file);
      const dt = await axios.patch(
        Doctor.updateProfilePic,
        {
          picture: url.split("?")[0],
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      if (dt?.data?.status === "success") {
        DisplaySnackbar("Uploaded", "success");
        userData.picture = url.split("?")[0];
        setUserData(...userData);
      }
      console.log(dt);
    } catch (err) {
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
    setLoading(false);
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const dt = await axios.get(Doctor.getInfo, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setUserData(dt?.data.data?.profile);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getData();
  }, []);
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const user = {
        name: name || userData.name,
        email: email || userData.email,
        address: address || userData.address,
      };
      await axios.patch(Doctor?.updateInfo, user, {
        headers: {
          firebasetoken: idToken,
        },
      });

      DisplaySnackbar("Edited", "success");
      setEdit(false);
      setUserData({ ...userData, ...user });
      setName("");
      setEmail("");
      setAddress("");
    } catch (err) {
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
    setLoading(false);
  };
  return (
    <ProfilePageWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Profile</h2>
      </div>
      <ProfilePicInfo
        pic={userData?.picture}
        handleUpload={handleUpload}
        name={userData?.name}
        specialization={userData?.specialization?.title}
      />
      <div className="detailsWrapper">
        <div className="formDiv editIcon">
          <Label>Full Name</Label>
          <InputBox
            onChange={(e) => setName(e.target.value)}
            value={isEdit ? name : userData?.name}
            disabled={!isEdit}
            background="#ffffff"
          />
          <span
            onClick={() => {
              setEdit(true);
            }}
            className="icon"
          >
            {!isEdit ? (
              <EditIcon />
            ) : (
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                style={{ minWidth: "50px", padding: "4px 5px" }}
              >
                Update
              </Button>
            )}
          </span>
        </div>
        <div className="formDiv editIcon">
          <Label>Email</Label>
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            value={isEdit ? email : userData?.email}
            disabled={!isEdit}
            background="#ffffff"
          />
          <span
            onClick={() => {
              setEdit(true);
            }}
            className="icon"
          >
            {!isEdit ? (
              <EditIcon />
            ) : (
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                style={{ minWidth: "50px", padding: "4px 5px" }}
              >
                Update
              </Button>
            )}
          </span>
        </div>
        <div className="formDiv">
          <Label>Phone Number</Label>
          <InputBox
            type="number"
            value={userData?.contact?.number}
            background="#ffffff"
            disabled
          />
        </div>
        <div className="formDiv editIcon">
          <Label>Address</Label>
          <InputBox
            onChange={(e) => setAddress(e.target.value)}
            value={isEdit ? address : userData?.address}
            disabled={!isEdit}
            background="#ffffff"
          />
          <span
            onClick={() => {
              setEdit(true);
            }}
            className="icon"
          >
            {!isEdit ? (
              <EditIcon />
            ) : (
              <Button
                onClick={() => {
                  handleUpdate();
                }}
                style={{ minWidth: "50px", padding: "4px 5px" }}
              >
                Update
              </Button>
            )}
          </span>
        </div>
        <div className="formDiv">
          <Label>Specialization</Label>
          <InputBox
            type="text"
            value={userData?.specialization?.title}
            background="#ffffff"
            disabled
          />
        </div>

        {/** 
        <div className="formDiv">
          <Label>Registered with</Label>
          <InputBox value="" background="#ffffff" />
        </div>
        <div className="formDiv">
          <Label>Register Number</Label>
          <InputBox value="" background="#ffffff" />
        </div>
        */}
        {/** 
        <div className="upload formDiv">
          <Label>Signtature</Label>
          <InputBox placeholder="File name here" />
          <div className="icon">
            <UploadIconSvg /> <span>Upload</span>
          </div>
        </div>
        */}
      </div>
      {loading && <Loader />}
    </ProfilePageWrapper>
  );
};

export default ProfilePage;

const ProfilePicInfo = ({ name, specialization, handleUpload, pic }) => {
  return (
    <ProfilePicInfoWrapper>
      <div className="avatar">
        <Avatar
          src={pic}
          style={{ width: "100%", height: "100%", margin: "0px" }}
          variant="square"
        />
        <label htmlFor="profilePic">
          <AddCircleIcon />
        </label>
        <input
          accept="image/png, image/jpeg image/jpg"
          onChange={(e) => handleUpload(e)}
          style={{ opacity: "0" }}
          type="file"
          id="profilePic"
        />
      </div>
      <h2 style={{ fontSize: "20px" }}>Hii, {name}</h2>
      <div>{specialization}</div>
    </ProfilePicInfoWrapper>
  );
};
