import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import HomePage from "./Pages/HomePage/HomePage";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import BasicInformationPage from "./Pages/BasicInformationPage/BasicInformationPage";
import StaffPage from "./Pages/StaffPage/StaffPage";
import AddStaffPage from "./Pages/AddStaffPage/AddStaffPage";
import AddConsultant from "./Pages/AddConsultant/AddConsultant";
import AddPatientPage from "./Pages/AddPatientPage/AddPatientPage";
import PatientPage from "./Pages/PatientPage/PatientPage";
import PatientDetailsPage from "./Pages/PatientDetailsPage/PatientDetailsPage";
import SchedulePage from "./Pages/SchedulePage/SchedulePage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import AppointmentDetailsPage from "./Pages/AppointmentDetailsPage/AppointmentDetailsPage";
import PreviousAppointment from "./Pages/PreviousAppointment/PreviousAppointment";
import Wallet from "./Pages/Wallet/Wallet";
import AddAccount from "./Pages/Wallet/AddAccount/AddAccount";
import Payment from "./Pages/Wallet/Payment/Payment";
import WhatsAppPage from "./Pages/WhatsAppPage";
import ChatBox from "./Pages/ChatBox";
import Appointments from "./Pages/Appointments/Appointments";
import Clinics from "./Pages/Clinincs/Clinics";
import { Verified } from "./Pages/LoginPage/Otp.jsx";
import "./App.css";
import Nvabar from "./Pages/Navbar/Nvabar";
import { AuthProvider } from "./contexts/AuthContext";
import ExportDetails from "./Pages/ExtraDetails/ExtraDetails";
import { useEffect, useState } from "react";
import WebSupport from "./Pages/WebSupport/WebSupport";

const NavbarWrapper = () => {
  return (
    <div>
      <Nvabar />
      <Outlet />
    </div>
  );
};
const AuthOutlet = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AuthOutlet />,
    children: [
      {
        path: "/",
        element: <NavbarWrapper />,
        children: [
          {
            path: "/",
            element: <HomePage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/staff",
            element: <StaffPage />,
          },
          {
            path: "/addstaff",
            element: <AddStaffPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/appointmentdetails",
            element: <AppointmentDetailsPage />,
          },
          {
            path: "/previousappointment",
            element: <PreviousAppointment />,
          },
          {
            path: "/appointments",
            element: <Appointments />,
          },
          {
            path: "/patients",
            element: <PatientPage />,
          },
          {
            path: "/whatsapp",
            element: <WhatsAppPage />,
          },
          {
            path: "/clinics",
            element: <Clinics />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "verified",
        element: <Verified />,
      },
      {
        path: "/basicinformation",
        element: <BasicInformationPage />,
      },
      {
        path: "/addconsultant",
        element: <AddConsultant />,
      },
      {
        path: "/addpatient",
        element: <AddPatientPage />,
      },

      {
        path: "/patientdetails",
        element: <PatientDetailsPage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/wallet",
        element: <Wallet />,
      },
      {
        path: "/wallet/payments",
        element: <Payment />,
      },
      {
        path: "/wallet/beneficiary",
        element: <AddAccount />,
      },
      {
        path: "/whatsapp/:id/:number",
        element: <ChatBox />,
      },
    ],
  },
  {
    path: "/details/:consultantId",
    element: <ExportDetails />,
  },
]);

const desktopRouter = createBrowserRouter([
  {
    path: "*",
    element: <WebSupport />,
  },
]);

function App() {
  const [device, setDevice] = useState("mobile");
  useEffect(() => {
    setDevice(document.body.clientWidth > 600 ? "desktop" : "mobile");
    console.log(device);
  }, []);

  return (
    <>
      {/* <AuthProvider> */}
      <RouterProvider router={device === "mobile" ? router : desktopRouter} />
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
