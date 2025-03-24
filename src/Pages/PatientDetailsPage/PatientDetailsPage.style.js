import styled from "styled-components";
export const PatientDetailsPageWrapper = styled.div`
  margin: 20px auto;
  width: 90%;
  .heading {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 1.7rem;
      color: #363c4c;
    }
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .flx {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;

    h2 {
      font-family: GilroySemi;
      font-size: 2rem;
      margin: 15px 0;
      color: #363c4c;
    }
    span {
      margin: 0px 6px;
    }
  }
  .flx > div {
    margin: 5px 0;
  }
  .btn {
    display: flex;
    justify-content: space-between;
    width: fit-content;
    padding: 10px 20px;
    border-radius: 12px;
    background: rgba(110, 111, 218, 0.22);
  }
  .btn button {
    border: transparent;
    background: transparent;
    color: rgba(145, 74, 249, 1);
    font-size: 1.1rem;
  }
  .patientDetails {
    width: 80%;
    margin: auto auto 30px auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    text-align: center;
    p {
      width: 50%;
      color: #8c8c8c;
      margin: 15px auto;
      font-size: 1.4rem;
      font-family: GilroyMed;
      text-transform: capitalize;
    }
    span {
      font-size: 1.4rem;
      color: #8841ee;
      font-family: GilroyMed;
    }
    p .no-value {
      color: #d4d4d4;
      font-size:1rem;
    }
  }

  .records h2 {
    color: #363c4c;
  }

  .btnContainer {
    width: 200px;
    margin: 10px auto;
  }
  .timeLine {
    margin: 50px 0px;
  }
`;
