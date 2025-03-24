import styled, { keyframes } from "styled-components";

export const WalletWrapeer = styled.div`
  width: 90%;
  margin: 20px auto;

  * {
    font-family: poppins;
    user-select: none;
  }

  .heading {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    font-family: Gilroy;
    h2 {
      font-size: 18px;
      color: #363c4c;
    }
  }

  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .btmDiv {
    margin-top: 80px;
    display: flex;
    justify-content: space-between;
  }
  .btmDiv div:nth-child(2) p:nth-child(1) {
    font-size: 24px;
    color: #8841ee;
  }
  .btmDiv div p:nth-child(2) {
    margin-top: 10px;
  }
`;

const gradient = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export const VirtualWalletWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px 0;

  .rotate-1 {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 37px;
    background: linear-gradient(
      110.31deg,
      rgba(219, 228, 247, 0.5) 4.83%,
      rgba(242, 203, 234, 0.5) 26.44%,
      rgba(204, 191, 245, 0.5) 49.65%,
      rgba(200, 218, 252, 0.5) 73.34%,
      rgba(170, 216, 250, 0.07) 95.8%
    );
    width: 100%;
    height: 100%;
    z-index: 2;
    transform: rotate(4.57deg);
  }

  .rotate-2 {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 37px;
    background: linear-gradient(
      110.31deg,
      rgba(219, 228, 247, 0.28) 4.83%,
      rgba(242, 203, 234, 0.5) 26.44%,
      rgba(204, 191, 245, 0.5) 49.65%,
      rgba(200, 218, 252, 0.5) 73.34%,
      rgba(170, 216, 250, 0.015) 95.8%
    );
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: rotate(7.91deg);
  }

  .main-card .head {
    display: flex;
    color: #513d78;
  }

  .main-card .head span:nth-child(2) {
    display: block;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    margin: auto 0 auto 10px;
  }

  .main-card {
    position: relative;
    z-index: 3;
    width: 80%;
    padding: 10%;
    background: linear-gradient(
      110.31deg,
      #dbe4f7 4.83%,
      #f2cbea 26.44%,
      #ccbff5 49.65%,
      #c8dafc 73.34%,
      #aad8fa 95.8%
    );
    background-size:400% 400%;
    animation:${gradient} 15s ease infinite;
    border-radius: 37px;
    .details {
      margin: 30px 0 20px 0;
    }
    .details .name {
      color: #513d78;
      font-size: 1.2rem;
      margin: 2px 0 0 0;
    }
    .details .balance {
      font-size: 3.3rem;
      color: #513d78;
      margin: 0;
    }
  }
`;

export const WalletOptions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 5% 0;

  .option {
    position: relative;
    z-index: 2;
    text-align: center;
    height: 100%;
  }

  .option img {
    position: static;
    z-index: 1;
    width: fit-content;
    padding: 24px;
    background: #513d78;
    border-radius: 24px;
  }

  .option span {
    display: block;
    position: static;
    z-index: 1;
    color: #000000;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 300 !important;
    margin: 7px 0 0 0;
  }
`;

export const Insight = styled.div`
  width: 100%;
  padding: 2.5% 0;

  p {
    color: #513d78;
    font-size: 1.8rem;
    font-weight: 500;
    margin: 0;
  }
`;

export const InsightBoxWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 20px 0 0 0;
  display: flex;
  justify-content: space-between;

  .box {
    position: relative;
    width: 47.5%;
    border-radius: 42px;
    z-index: -2;
    background: #faf8f2;
  }

  .box .details {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 80%;
    height: 130px;
    padding: 10%;
  }

  .box .details .head {
    display: flex;
  }

  .box .details .head img {
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 13px;
    background: #cdcbf6;
  }

  .box .details .head span {
    display: block;
    margin: auto 0 auto 7px;
    font-size: 1rem;
    color: #513d78;
    whitespace: wrap;
    font-family: poppins;
    line-height: 12px;
  }

  .box .details .amount {
    margin: auto;
    color: #513d78;
    font-size: 2rem;
  }

  .box .wave {
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
  }

  .box:nth-child(2) > .details > .head > img {
    background: #ebcc9a;
  }
`;

export const LearnWrapper = styled.div`
  width: 90%;
  padding: 5%;
  margin-top: 20px;
  background: #b7e2ff;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  .content {
    color: #513d78;
    margin: auto 0;
  }
  img {
    width: 35%;
  }
`;

export const SettleAmountWrapper = styled.div`
  width: 100%;
  text-align: center;
  margin: 40px 0;
  .settle-head {
    font-size: 1.3rem;
    color: #393e52;
  }
  .balance {
    font-size: 4.1rem;
    color: #513d78;
    margin: 0;
  }
  .settle-btn {
    padding: 15px 50px;
    width: fit-content;
    margin-top: 20px;
    background: #fbe9c8;
    border-radius: 46px;
    border: transparent;
    font-size: 1.5rem;
    color: #e2a93c;
  }
  .note {
    color: #858585;
    font-weight: 400;
    font-size: 1.1rem;
    margin-top: 5px;
  }
`;

export const Beneficiary = styled.div`
  text-align: left;
  width: 85%;
  padding: 5% 7.5%;
  margin-top: 20px;
  background: #fff5e2;
  border-radius: 26px;
  display: flex;

  .bank-details {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    color: #404040;
  }

  .bank-details > span {
    display: block;
    font-size: 1.6rem;
  }

  .bank-details > p {
    font-size: 1.1rem;
  }
`;

export const AddBeneficiary = styled.div`
  text-align: left;
  width: 85%;
  padding: 5% 7.5%;
  margin-top: 20px;
  background: #858585;
  color: #ffffff;
  border-radius: 26px;
  display: flex;

  :hover {
    background: #fff5e2;
    color: #e2a93c;
  }
`;
