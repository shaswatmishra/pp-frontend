import { useEffect, useState, useRef } from "react";

import OtpSvg from "../../Svg/Otp.svg";
import VerifiedSvg from "../../Svg/Verified.svg";
import { Button, LoginWrapper } from "./LoginPage.style";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Doctor } from "../../Api/Api";
import { useAuth } from "../../contexts/AuthContext";

import OTPInput from "otp-input-react";
import { getErrorMessage } from "./firebaseMsg";
import Loader from "../../Components/Loading/ExportLoader";

const OtpPage = ({ crntTime, number, handleLogin, setIdToken }) => {
  const { idToken, DisplaySnackbar } = useAuth();

  const navigate = useNavigate();
  const [Otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const checkOtp = async () => {
    setLoading(!loading);
    window.confirmationResult
      .confirm(Otp)
      .then((result) => {
        setIdToken(result?.user?.accessToken);

        if (result.user) {
          axios
            .get(Doctor.getInfo, {
              headers: {
                firebasetoken: result?.user?.accessToken,
              },
            })
            .then((res) => {
              setLoading(false);
              DisplaySnackbar("Otp Confirmed", "success");
              if (res?.data.data?.profile) {
                navigate("/");
              } else {
                navigate("/basicinformation");
              }
            })
            .catch((err) => {
              setLoading(false);
              navigate("/basicinformation");
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        DisplaySnackbar(getErrorMessage(error), "error");
      });
  };

  return (
    <LoginWrapper>
      <div className="loginDiv">
        <h2>Verification</h2>
      </div>
      <div className="loginDiv">
        <div>
          <OtpSvg />
        </div>
        <p>Enter 6 digit otp sent to your mobile phone!</p>
      </div>
      <div className="loginDiv">
        <div className="otpDiv">
          <OTPInput
            value={Otp}
            onChange={setOtp}
            autoFocus
            OTPLength={6}
            otpType="number"
            disabled={false}
            className="root"
            inputClassName="inputStyle"
          />
        </div>
        <div className="btn">
          <Button onClick={() => checkOtp()}>Verify</Button>
        </div>
        <div className="btmDiv">
          <p style={{ color: "GrayText" }}>{crntTime}</p>
          <p style={{ color: "GrayText" }}>
            Didn't recieve code?
            <span
              onClick={() => {
                setOtp("");
                handleLogin();
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              {" "}
              Resend Code
            </span>
          </p>
        </div>
      </div>
      {loading && <Loader />}
    </LoginWrapper>
  );
};
export default OtpPage;
export const Verified = () => {
  return (
    <LoginWrapper>
      <div className="loginDiv">
        <h2>Verification</h2>
      </div>
      <div className="loginDiv">
        <div>
          <VerifiedSvg />
        </div>
        <p style={{ color: "GrayText" }}>Your account has been verified</p>
      </div>
      <div className="loginDiv">
        <div className="btn">
          <Button>Okay</Button>
        </div>
      </div>
    </LoginWrapper>
  );
};
