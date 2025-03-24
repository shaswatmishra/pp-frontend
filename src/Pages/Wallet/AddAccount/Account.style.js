import styled from "styled-components";

export const AccountWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 24px 0;

  .rotate-1 {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 37px;
    background: linear-gradient(
      180deg,
      rgba(255, 250, 234, 0.61) 0%,
      #fea5ab 100%
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
      rgba(249, 241, 218, 0.245) 4.83%,
      rgba(242, 203, 234, 0.5) 26.44%,
      rgba(204, 191, 245, 0.5) 49.65%,
      rgba(200, 218, 252, 0.5) 73.34%,
      rgba(254, 165, 171, 0.5) 95.8%
    );
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: rotate(7.91deg);
  }

  .account-card .head {
    display: flex;
    color: #513d78;
  }

  .account-card .head span:nth-child(2) {
    display: block;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 600;
    margin: auto 0 auto 10px;
  }

  .account-card {
    position: relative;
    z-index: 3;
    width: 80%;
    padding: 10%;
    background: linear-gradient(
      110.31deg,
      #f9f1d9 4.83%,
      #fcc3ed 49.65%,
      #fea2a5 95.8%
    );
    border-radius: 37px;
    .account-details {
      color: #513d78;
      margin: 14px 0 0 0;
    }
    .account-details .name {
      font-size: 2.2rem;
    }
    .account-details .account {
      font-size: 1.1rem;
      font-weight: 500;
    }
  }
`;

export const RemoveButton = styled.button`
  background: #ffe0e0;
  box-shadow: 0px 4px 17px 0px rgba(0, 0, 0, 0.1);
  border-radius: 52px;
  padding: 10px 20px;
  border: transparent;
  display: flex;
  margin: 60px auto;
  .remove-icon {
    display: block;
    margin: auto 0;
  }
  .remove {
    color: rgba(228, 120, 120, 1);
    font-size: 1.3rem;
    margin-left: 10px;
  }
`;

export const AccountType = styled.div`
  width: 90%;
  padding: 5%;
  margin: 25px 0;
  border-radius: 37px;
  display: flex;
  justify-content: center;
  .account-type {
    font-size: 1.6rem;
    margin-left: 10px;
  }
`;

export const Divider = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  span {
    display: block;
    margin: auto 0;
  }

  .divider-text {
    color: rgba(141, 141, 141, 0.43);
    font-size: 1.5rem;
  }

  .line {
    width: 43%;
    height: 1px;
    background: #8d8d8d;
  }
`;

export const FormWrapper = styled.div`
  margin: 20px 0;
`;

export const Form = styled.div`
  width:90%;
  margin:0 auto;
  padding:0;
  .account-input {
    display:flex;
    flex-direction:column;
    width:100%;
    margin:30px 0;
  }
  .account-input label {
    display:block;
    width:100%;
    font-size:1.4rem;
    color: #363C4C;
    font-weight:400;
  }
  .account-input input {
    display:block
    width:95%;
    padding:2% 0;
    margin-top:5px;
    border:transparent;
    border-bottom:1px solid  #D9D9D9;
    color:rgba(54, 60, 76, 0.54);
    font-size:1.3rem;
    outline-style:none;
  }


  .small-input {
    display:flex;
    justify-content:space-between;
  }

  .small-input .account-input {
    width:47.5%;
  }

  .add-button {
    display:block;
    padding: 15px 50px;
    width: fit-content;
    margin: 50px auto 0 auto;
    background: #fbe9c8;
    border-radius: 46px;
    border: transparent;
    font-size: 1.5rem;
    color: #e2a93c;
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  width: 150px;
  height: 150px;
  margin: auto;
  border-radius: 100%;
  .account-logo {
    display: block;
    width: 80%;
    margin: auto;
  }
  .bank-account-logo {
    width: 60%;
  }
`;
