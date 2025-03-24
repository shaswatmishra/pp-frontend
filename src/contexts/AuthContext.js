import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../firebase";
// import { RecaptchaVerifier } from 'firebase/auth';
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
import CancelledSvg from "../Svg/Cancelled.svg";

const auth = getAuth(app);
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState("");
  const [snackBar, setSnackBar] = useState(false);
  const [severity, setSeverity] = useState("info");
  const [message, setMessage] = useState("");
  const [time, setTIme] = useState(3000);
  const [name, setName] = useState("");
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user === null) {
        navigate("/login");
      }
      setIdToken(user?.accessToken);
      setNumber(user?.phoneNumber);
      setLoading(!loading);
    });
    // console.log(auth.urrentUser)

    return unsubscribe;
  }, []);
  const action = (
    <React.Fragment>
      <div>
        <div
          style={{
            cursor: "pointer",
            color: "black",
            fontWeight: "500",
            transform: "translateY(-50%)",
            marginTop: "50%",
          }}
          onClick={() => setSnackBar(false)}
        >
          <CancelledSvg />
        </div>
      </div>
    </React.Fragment>
  );
  const DisplaySnackbar = (mssg, type, tim) => {
    setMessage(mssg);
    setSeverity(type);
    setSnackBar(true);
    //console.log("snackbar");
    if (tim) {
      setTIme(tim);
    } else {
      setTIme(3000);
    }
  };
  function signOutUser() {
    return signOut(auth)
      .then(() => {
        setIdToken("");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        DisplaySnackbar(err?.response?.data?.message);
      });
  }
  const value = {
    idToken,
    number,
    setNumber,
    DisplaySnackbar,
    setIdToken,
    signOutUser,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackBar}
        autoHideDuration={time}
        severity={severity}
        onClose={() => setSnackBar(false)}
      >
        <Alert
          action={action}
          severity={severity}
          sx={{ width: "100%" }}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
};
