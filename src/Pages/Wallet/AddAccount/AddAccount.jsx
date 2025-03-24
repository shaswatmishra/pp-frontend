import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Institution from "../../../Assets/Institution-III.svg";
import InstitutionIV from "../../../Assets/Institution-IV.svg";
import InstitutionV from "../../../Assets/Institution-V.svg";
import UPILogo from "../../../Assets/UPI-logo.svg";
import UPIWallet from "../../../Assets/UPI-Wallet.svg";
import Trash from "../../../Assets/trash.svg";
import BackIconSvg from "../../../Svg/BackIcon.svg";

import Loader from "../../../Components/Loading/ExportLoader";
import PopupModal from "../../../Components/Popup/Popup";

import { useAuth } from "../../../contexts/AuthContext";
import { Doctor } from "../../../Api/Api";

import { WalletWrapeer } from "../Wallet.style";
import {
  AccountWrapper,
  RemoveButton,
  Divider,
  AccountType,
  ImageWrapper,
  FormWrapper,
  Form,
} from "./Account.style";

const AccountDetails = (props) => {
  return (
    <AccountWrapper>
      <div className="account-card">
        <div className="head">
          <img src={props.src} alt="institution" />
          <span>{props.head}</span>
        </div>
        <div className="account-details">
          <p className="name">{props.bank.name}</p>
          {props.bankType === "UPI" ? (
            <>
              <p className="account">UPI : {props.bank.vpa}</p>
            </>
          ) : (
            <>
              <p className="account">IFSC Code : {props.bank.ifsc}</p>
              <p className="account">{props.bank.bankAccount}</p>
            </>
          )}
        </div>
      </div>
      <div className="rotate-1"></div>
      <div className="rotate-2"></div>
    </AccountWrapper>
  );
};

function AddAccount() {
  const navigate = useNavigate();
  const { idToken } = useAuth();

  const [loading, setLoading] = useState({});
  const [beneficiary, setBeneficiary] = useState(null);
  const bankdetails = useRef({
    ifsc: "",
    account: "",
    vpa: "",
  });

  const [upiPopup, setUPIPopup] = useState(100);
  const [bankPopup, setBankPopup] = useState(100);

  const fetchBeneficiary = async () => {
    try {
      setLoading({ status: true, message: "Fetching Account Details..." });
      const response = await axios.get(Doctor.getBankDetails, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setBeneficiary(response?.data.data);
    } catch (err) {
      console.log(err);
    }
    setLoading({ status: false, message: "" });
  };

  const addBeneficiary = async () => {
    try {
      if (loading.status) return;
      if (
        bankdetails.current.vpa ||
        (bankdetails.current.account && bankdetails.current.ifsc)
      ) {
        setLoading({ status: true, message: "Adding Account Details..." });
        await axios.post(Doctor.addBankDetails, bankdetails.current, {
          headers: {
            firebasetoken: idToken,
          },
        });
        bankdetails.current = { ifsc: "", account: "", vpa: "" };
        setLoading({ status: false, message: "" });

        await fetchBeneficiary();

        !upiPopup && setUPIPopup(100);
        !bankPopup && setBankPopup(100);
      } else {
        alert("Please provide bank!");
        return;
      }
    } catch (err) {
      setLoading({ status: false, message: "" });
      alert(err?.response?.data?.message);
    }
  };

  const removeBeneficiary = async () => {
    try {
      setLoading({ status: true, message: "Removing Account Details..." });
      await axios.delete(Doctor.removeBankDetails, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setBeneficiary(null);
    } catch (err) {
      console.log(err);
    }
    setLoading({ status: false, message: "" });
  };

  useEffect(() => {
    fetchBeneficiary();
  }, []);

  return (
    <WalletWrapeer>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Manage Account</h2>
      </div>
      {!loading.status && beneficiary && (
        <>
          <AccountDetails
            bankType={beneficiary.vpa ? "UPI" : "BANK"}
            bank={{
              name: beneficiary.name,
              vpa: beneficiary.vpa,
              bankAccount: beneficiary.bankAccount,
              ifsc: beneficiary.ifsc,
            }}
            head={beneficiary.vpa ? "UPI Account" : "Bank Account"}
            src={Institution}
          />

          <RemoveButton onClick={removeBeneficiary}>
            <img className="remove-icon" src={Trash} alt="remove" />
            <span className="remove">Remove</span>
          </RemoveButton>
        </>
      )}

      {!loading.status && !beneficiary && (
        <>
          <AccountType
            style={{
              color: "rgba(124, 11, 25, 1)",
              background:
                "linear-gradient(110.31deg, rgba(249, 241, 217, 0.5) 4.83%, rgba(252, 195, 237, 0.5) 49.65%, rgba(254, 162, 165, 0.5) 95.8%)",
            }}
            onClick={() => setBankPopup(0)}
          >
            <img
              className="account-icon"
              src={InstitutionIV}
              alt="bank account"
            ></img>
            <p className="account-type">ADD BANK ACCOUNT</p>
          </AccountType>
          <Divider>
            <span className="line"></span>
            <span className="divider-text">or</span>
            <span className="line"></span>
          </Divider>
          <AccountType
            style={{
              color: "rgba(101, 76, 199, 1)",
              background:
                "linear-gradient(110.31deg, #D9F7F9 4.83%, #C3D6FC 49.65%, #C5A2FE 95.8%)",
            }}
            onClick={() => setUPIPopup(0)}
          >
            <img
              className="account-icon"
              src={UPIWallet}
              alt="upi wallet"
            ></img>
            <p className="account-type">SET UP UPI</p>
          </AccountType>
        </>
      )}

      {/**UPI FORM */}
      <PopupModal
        yaxis={upiPopup}
        close={() => setUPIPopup(100)}
        heading="Bank Information"
      >
        <FormWrapper>
          <ImageWrapper style={{ background: "#363435" }}>
            <img className="account-logo" src={UPILogo} alt="account logo" />
          </ImageWrapper>
          <Form>
            <div className="account-input">
              <label>UPI ID</label>
              <input
                onChange={(e) => (bankdetails.current.vpa = e.target.value)}
                type="text"
                name="vpa"
              />
            </div>
            <button onClick={addBeneficiary} className="add-button">
              Save UPI
            </button>
          </Form>
        </FormWrapper>
      </PopupModal>

      {/*Bank FORM */}
      <PopupModal
        yaxis={bankPopup}
        close={() => setBankPopup(100)}
        heading="Bank Information"
      >
        <FormWrapper>
          <ImageWrapper style={{ background: "#FBE9C8" }}>
            <img
              className="account-logo bank-account-logo"
              src={InstitutionV}
              alt="bank account logo"
            />
          </ImageWrapper>
          <Form>
            <div className="account-input">
              <label>IFSC Code</label>
              <input
                type="text"
                name="ifsc"
                onChange={(e) => (bankdetails.current.ifsc = e.target.value)}
              />
            </div>
            <div className="account-input">
              <label>Account Number</label>
              <input
                type="text"
                name="bankAccount"
                onChange={(e) => (bankdetails.current.account = e.target.value)}
              />
            </div>
            <button onClick={addBeneficiary} className="add-button">
              Save Bank
            </button>
          </Form>
        </FormWrapper>
      </PopupModal>

      {loading.status && <Loader text={loading.message} />}
    </WalletWrapeer>
  );
}

export default AddAccount;
