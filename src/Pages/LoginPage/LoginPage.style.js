import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;

  .loginDiv:nth-child(2) {
    margin: 0;
  }
  .loginDiv {
    width: 90%;
    text-align: center;
    margin: 20px 0px;
    .otpDiv {
      width: 100%;
      margin: 0 auto;
    }

    h2 {
      font-family: GilroySemi;
      font-size: 2.1rem;
      margin-bottom: 30px;
      color: #363c4c;
    }

    p {
      width: 60%;
      margin: 30px auto;
      font-size: 1.8rem;
      font-family: GilroyRegular;
      color: rgba(54, 60, 76, 1);
    }
    .otpBox {
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 3px 5px;
      height: 20px;
      width: 20px;
    }

    .btmDiv {
      p {
        width: 90%;
        font-size: 1.2rem;
      }
    }
  }
  .btn {
    width: 80%;
    margin: 10px auto;
    margin-top: 30px;
  }

  .root {
    display: flex !important;
    justify-content: space-between;
    width: 100%;
    max-width: 350px;
    margin: auto;
  }
  .inputStyle {
    box-sizing: border-box;
    width: 15% !important;
    max-width: 55px;
    height: 60px !important;
    border-radius: 10px;
    margin-right: 0px !important;
    border: 1px solid #eff2f6;
    font-size: 15px;
  }
`;
export const Button = styled.div`
  width: 100%;
  display: flex;
  cursor: pointer;
  background: linear-gradient(93.76deg, #996ad0 -7.73%, #5c71dd 112.14%);
  text-align: center;
  font-family: GilroyMed;
  justify-content: center;
  align-items: center;
  padding: 13px 0px;
  color: #fff;
  border-radius: 7px;
  margin-top: 30px;
  ${(props) =>
    props?.toggle &&
    `
background:#fff;
color:#7D44FE;
border:1px solid #7D44FE;

`}
`;
export const InputBox = styled.input`
  display: block;
  border: none;
  padding: 2px 5px;
`;
