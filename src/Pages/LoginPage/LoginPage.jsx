import { useState, useEffect } from "react";
import { LoginWrapper, Button } from "./LoginPage.style";
import TextField from "@mui/material/TextField";
import LoginSvg from "../../Svg/Login.svg";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from "firebase/auth";
import Loader from "../../Components/Loading/ExportLoader";
import app from "../../firebase";
import { useAuth } from "../../contexts/AuthContext";
import OtpPage from "./Otp";
import { getErrorMessage } from "./firebaseMsg";

const auth = getAuth(app);
const LoginPage = () => {
  const navigate = useNavigate();
  const { setNumber, DisplaySnackbar, setIdToken } = useAuth();
  const [crntTime, setCrntTime] = useState();
  const [number, setNumbers] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          if (!number) return;
          handleLogin();
        },
        defaultCountry: "IN",
      },
      auth
    );
  }, []);

  const handleLogin = async () => {
    if (!number) {
      DisplaySnackbar("Please Enter Your Mobile Number", "error");
      return;
    }
    if (loading) return;
    setLoading(!loading);
    const phoneNumber = "+91" + number;
    const appVerifier = window.recaptchaVerifier;

    await signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // setOtpForm(true);
        setNumber(phoneNumber);
        setLoading(false);

        DisplaySnackbar("Otp send", "success");
        // navigate('/login/otp')
        setOtpPage(true);
        localStorage.setItem("time", 60);
        const interval = setInterval(() => {
          if (localStorage.getItem("time") > 0) {
            let tm = localStorage.getItem("time");
            localStorage.setItem("time", tm - 1);

            let secon = tm - 1;
            //  let mn=Math.floor(tm/60);

            setCrntTime(
              <p>
                Code will expire in :<span>{secon}</span> sec{" "}
              </p>
            );
          } else {
            clearInterval(interval);
            setCrntTime(
              <p style={{ color: "GrayText" }}>
                Code has expired. Click on resend button.
              </p>
            );
          }
        }, 1000);
        return () => clearInterval(interval);
      })
      .catch((error) => {
        setLoading(false);
        DisplaySnackbar(getErrorMessage(error), "error");
      });
  };

  return (
    <>
      <div id="sign-in-button"></div>
      {!otpPage ? (
        <LoginWrapper>
          <div className="loginDiv">
            <h2>Verification</h2>
          </div>
          <div className="loginDiv">
            <div>
              <LoginSvg />
            </div>
            <p>You'll receive a 6 digit code for verification</p>
          </div>
          <div className="loginDiv">
            <div
              style={{
                bottomBottom: "none",
                borderRadius: "20px",
              }}
            >
              <TextField
                id="standard-search"
                label="Enter Your Phone Number"
                type="number"
                variant="filled"
                fullWidth
                value={number}
                onChange={(e) => setNumbers(e.target.value)}
              />
            </div>
            <div className="btn">
              <Button onClick={() => handleLogin()}>Send OTP</Button>
            </div>
          </div>
        </LoginWrapper>
      ) : (
        <OtpPage
          setIdToken={setIdToken}
          crntTime={crntTime}
          handleLogin={handleLogin}
          number={number}
        />
      )}
      {loading && <Loader />}
    </>
  );
};

export default LoginPage;
