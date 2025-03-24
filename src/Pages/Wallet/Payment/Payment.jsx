import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import BackIconSvg from "../../../Svg/BackIcon.svg";
import HandBag from "../../../Assets/hand-bag.svg";

import Loader from "../../../Components/Loading/ExportLoader";
import { useAuth } from "../../../contexts/AuthContext";
import { WalletWrapeer } from "../Wallet.style";
import { Transactions, Filter } from "../Payment/Payment.style";
import axios from "axios";
import { WalletAPI } from "../../../Api/Api";

function History(props) {
  const status = useRef(props?.data?.status === "paid" ? "success" : "failed");
  return (
    <div className="transaction">
      <div className="bag">
        <img src={HandBag} alt="hand-bag" />
      </div>
      <div className="details">
        <span className="time">
          {new Date(props.data?.createdAt).toDateString()}
        </span>
        <p className="amount">
          <span style={{ fontFamily: "sans-serif" }}>₹</span>
          <span>{props?.data?.amount}</span>
        </p>
      </div>
      <div className={`status ${status.current}`}>
        <span className="dot"></span>
        <span>{status.current}</span>
      </div>
    </div>
  );
}

function Payments() {
  const navigate = useNavigate();

  const { idToken } = useAuth();

  const [histories, setHistory] = useState([]);
  const [filter, setFilter] = useState("today");
  const [loading, setLoading] = useState({ status: false, message: "" });

  const fetchWithdrawalHistory = async () => {
    try {
      setLoading({ status: true, message: "Fetching history..." });
      const response = await axios.get(
        `${WalletAPI.withdrawHistory}?day=${filter}`,
        {
          headers: {
            firebasetoken: idToken,
          },
          validateStatus: () => true,
        }
      );
      setHistory(response?.data?.data?.withdraws || []);
    } catch (err) {
      alert(err.message);
    }
    setLoading({ status: false, message: "" });
  };

  useEffect(() => {
    fetchWithdrawalHistory(filter);
  }, [filter]);

  return (
    <WalletWrapeer>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Payments</h2>
      </div>
      <Filter>
        <div
          onClick={() => {
            if (filter === "today") return;
            setFilter("today");
          }}
          className={`filter-option ${
            filter === "today" ? "active-filter-option" : ""
          }`}
        >
          Today
        </div>
        <div
          onClick={() => {
            if (filter === "month") return;
            setFilter("month");
          }}
          className={`filter-option ${
            filter === "month" ? "active-filter-option" : ""
          }`}
        >
          This Month
        </div>
      </Filter>
      <Transactions>
        {histories.length ? (
          histories.map((history, index) => (
            <History key={index} data={history} />
          ))
        ) : (
          <p className="no-history">No Withdrawal History</p>
        )}
      </Transactions>

      {loading.status && <Loader text={loading.message} />}
    </WalletWrapeer>
  );
}

export default Payments;
