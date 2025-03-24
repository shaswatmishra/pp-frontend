import styled from "styled-components";

export const AppointmentDetailsPageWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  font-family:GilroyRegular;

  .heading {
    position: relative;
    text-align: center;
    h1 {
      font-size: 15px;
    }
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .profile {
    display: flex;
    margin: 17px 0 0 0px;

    flex-direction: column;

    align-items: center;
    h2 {
      margin-top: 8px;
    }
  }
  .flx {
    display: flex;
    color: #ccc;
    flex-direction: column;
    p {
      margin-top:5px;
      font-size:1.2rem;
    }
    p span {
      color: #8949f1;
      font-size:1.2rem;
    }
  }
  .btnsGroup {
    .fDiv {
      width: 30%;
      margin: 8px auto;
    }
    .sDiv {
      display: flex;
      justify-content: space-between;
    }
    .sDiv > div {
      width: 45%;
    }
  }
  .picture {
    position: relative;
    margin-top: 15px;
    background: rgba(104, 112, 219, 0.1);
    border: 1px dashed #6670db;
    border-radius: 11px;
    height: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
  }

  .picture input {
    position: absolute;
    opacity:0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;
