import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackIconSvg from "../../Svg/BackIcon.svg";

import WalletSvg from "../../Assets/Wallet.svg";
import Arrow from "../../Assets/Arrow.png";
import Sort from "../../Assets/Sort.png";
import Institution from "../../Assets/Institution.png";
import Institution2 from "../../Assets/Institution-II.svg";
import LeftArrow from "../../Assets/leftarrow.png";
import Wave from "../../Assets/wave1.svg";
import Wave2 from "../../Assets/wave2.svg";
import Payment from "../../Assets/Payment.svg";
import HandWallet from "../../Assets/hand-wallet.svg";

import Loader from "../../Components/Loading/ExportLoader";
import { useAuth } from "../../contexts/AuthContext";
import {
  VirtualWalletWrapper,
  WalletWrapeer,
  WalletOptions,
  Insight,
  InsightBoxWrapper,
  LearnWrapper,
  SettleAmountWrapper,
  Beneficiary,
  AddBeneficiary,
} from "./Wallet.style";

import axios from "axios";
import { Doctor, WalletAPI } from "../../Api/Api";
import PopupModal from "../../Components/Popup/Popup";

const VirtualWallet = (props) => {
  return (
    <VirtualWalletWrapper>
      <div className="main-card">
        <div className="head">
          <img src={WalletSvg} alt="wallet" />
          <span>Virtual Wallet</span>
        </div>
        <div className="details">
          <p className="balance">
            <span style={{ fontSize: "3.3rem", fontFamily: "sans-serif" }}>
              ₹
            </span>
            {props.balance}
          </p>
          <p className="name">{props.name}</p>
        </div>
      </div>
      <div className="rotate-1"></div>
      <div className="rotate-2"></div>
    </VirtualWalletWrapper>
  );
};

function Wallet() {
  const navigate = useNavigate();

  const { idToken } = useAuth();

  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState("");
  const [latestWithdraw, setLatestWithdraw] = useState("");
  const [totalWithdraw, setTotalWithdraw] = useState("");
  const [beneficiary, setBeneficiary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupModal, setPopupModal] = useState(100);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(Doctor.getInfo, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setProfile(response?.data.data?.profile);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBeneficiary = async () => {
    try {
      const response = await axios.get(Doctor.getBankDetails, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setBeneficiary(response?.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await axios.get(WalletAPI.fetchBalance, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setBalance(response?.data.data?.availableBalance);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLatestWithdrawal = async () => {
    try {
      const response = await axios.get(WalletAPI.latestWithdrawal, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setLatestWithdraw(response?.data.data?.withdraw?.amount || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTotalWithdrawal = async () => {
    try {
      const response = await axios.get(WalletAPI.totalWithdrawal, {
        headers: {
          firebasetoken: idToken,
        },
      });
      setTotalWithdraw(response?.data.data?.withdrawAmounts || 0);
    } catch (err) {
      console.log(err);
    }
  };

  const settlePayment = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await axios.get(WalletAPI.settlePayment, {
        headers: {
          firebasetoken: idToken,
        },
        validateStatus: () => true,
      });

      if (response.data.status !== "success") {
        throw { message: response.data.message };
      }

      setLatestWithdraw(balance);
      setTotalWithdraw(totalWithdraw + balance);
      setBalance(balance - balance);
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchProfile();
    fetchBalance();
    fetchTotalWithdrawal();
    fetchLatestWithdrawal();
    fetchBeneficiary();
  }, []);

  useEffect(() => {
    if (profile?.name && balance !== "") {
      setLoading(false);
    }
  }, [profile, balance]);

  return (
    <WalletWrapeer>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Wallet</h2>
      </div>
      <VirtualWallet name={profile?.name} balance={balance} />
      <WalletOptions>
        <div className="option" onClick={() => setPopupModal(0)}>
          <img src={Arrow} alt="transfers" />
          <span>Transfer</span>
        </div>
        <div className="option" onClick={() => navigate(`/wallet/payments`)}>
          <img src={Sort} alt="payments" />
          <span>Payments</span>
        </div>
        <div className="option" onClick={() => navigate(`/wallet/beneficiary`)}>
          <img src={Institution} alt="institution" />
          <span>Bank</span>
        </div>
      </WalletOptions>

      <Insight>
        <p>Insights</p>
        <InsightBoxWrapper>
          <div className="box">
            <div className="details">
              <div className="head">
                <img src={LeftArrow} alt="Latest Withdrawal" />
                <span>Latest Withdrawal</span>
              </div>
              <div className="amount">
                <span style={{ fontSize: "2rem", fontFamily: "sans-serif" }}>
                  ₹
                </span>
                {latestWithdraw}
              </div>
            </div>
            <img className="wave" src={Wave} alt="wave" />
          </div>

          <div className="box">
            <div className="details">
              <div className="head">
                <img src={Payment} alt="Latest Withdrawal" />
                <span>Total Amount Withdrawal</span>
              </div>
              <div className="amount">
                <span style={{ fontSize: "2rem", fontFamily: "sans-serif" }}>
                  ₹
                </span>
                {totalWithdraw}
              </div>
            </div>
            <img className="wave" src={Wave2} alt="wave" />
          </div>
        </InsightBoxWrapper>
      </Insight>

      <LearnWrapper>
        <div className="content">
          <h2>Learn How Wallet Works</h2>
          <span>More Info here</span>
        </div>
        <img src={HandWallet} alt="hand-wallet" />
      </LearnWrapper>

      {/*Handle Payment Transfer*/}
      <PopupModal
        yaxis={popupModal}
        close={() => setPopupModal(100)}
        heading="Transfer"
      >
        <SettleAmountWrapper>
          <p className="settle-head">Settlement Amount</p>
          <p className="balance">
            <span style={{ fontSize: "4.1rem", fontFamily: "sans-serif" }}>
              ₹
            </span>
            {balance}
          </p>
          <button onClick={settlePayment} className="settle-btn">
            Settle Amount
          </button>
          <p className="note">*Minimum Settle Amount is 1000</p>

          {beneficiary ? (
            <Beneficiary>
              <img src={Institution2} alt="bank" />
              {!beneficiary.vpa ? (
                <div className="bank-details">
                  <span>Bank Account</span>
                  <p>{beneficiary.bankAccount}</p>
                </div>
              ) : (
                <div className="bank-details">
                  <span>UPI Account</span>
                  <p>{beneficiary.vpa}</p>
                </div>
              )}
            </Beneficiary>
          ) : (
            <AddBeneficiary onClick={() => navigate("/wallet/beneficiary")}>
              <span style={{ margin: "auto", fontSize: "1.6rem" }}>
                + Add Account
              </span>
            </AddBeneficiary>
          )}
        </SettleAmountWrapper>
      </PopupModal>
      {loading && <Loader />}
    </WalletWrapeer>
  );
}

export default Wallet;
