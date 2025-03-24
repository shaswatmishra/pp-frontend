import styled from "styled-components";

export const PopupWrapper = styled.div`
  visibility: ${(props) => (props.active ? "visible" : "hidden")};
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.45);
  width: 100%;
  height: 100%;
  z-index: 4;
  transition: visibility 0.4s ease;
`;

export const PopupContent = styled.div`
  width: 80%;
  height: fit-content;
  padding: 10%;
  margin: auto 0 0 0;
  background: #ffffff;
  border-radius: 35px 35px 0 0;
  transform: translateY(${(props) => (props.active ? "0%" : "100%")});
  transition: transform 0.5s ease;
  .head {
    display: flex;
  }
  .head span {
    margin: auto;
    font-size: 1.3rem;
    color: #363c4c;
  }
`;

export const ModalWrapper = styled.div`
  width: 70%;
  padding: 10%;
  background: #ffffff;
  border-radius: 15px;
  margin: auto;

  .modal-head {
    display:flex;
    justify-content:space-between;
    margin:0 0 20px 0;
    h1 {
      font-size:1.5rem !important;
      margin:auto 0px;
    }
  }

  .content .msg-content{
      font-size:1.5rem;
      font-family:Poppins;
      font-weight:400;
    }
  }

  .content .res-btn {
     display:flex;
     justify-content:flex-end;
  }

  .content .res-btn button {
    display:block;
    width: fit-content;
    margin:30px 0 0 10px;
    padding: 10px 25px;
    border-radius: 12px;
    border: transparent;
    font-size: 1.2rem;
  }

  .content .res-btn button:nth-child(1){
    background: rgba(110, 111, 218, 0.22);
    color:orangered;
  }

  .content .res-btn button:nth-child(2){
    background: rgba(110, 111, 218, 0.22);
    color: rgba(145, 74, 249, 1);
  }
`;

export const Form = styled.div`
  width:100%;
  margin:0 auto;
  padding:0;
  .form-input {
    display:flex;
    flex-direction:column;
    width:100%;
    margin:15px 0;
  }
  .form-input label {
    display:block;
    width:100%;
    font-size:1.4rem;
    color: #363C4C;
    font-weight:400;
  }
  .form-input input {
    display:block
    width:95%;
    padding:2% 0;
    margin-top:5px;
    border:transparent;
    border-bottom:1px solid rgba(0, 0, 0, 0.42);
    color:rgba(54, 60, 76, 0.54);
    font-size:1.3rem;
    outline-style:none;
  }


  .small-input {
    display:flex;
    justify-content:space-between;
  }

  .small-input .form-input {
    width:47.5%;
  }

  .form-button {
    display:block;
    width: fit-content;
    margin:30px auto auto auto;
    padding: 15px 25px;
    border-radius: 12px;
    background: rgba(110, 111, 218, 0.22);
    border: transparent;
    color: rgba(145, 74, 249, 1);
    font-size: 1.2rem;
  }
`;
