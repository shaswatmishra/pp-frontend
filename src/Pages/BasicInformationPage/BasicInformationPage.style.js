import styled from "styled-components";

export const InputBox = styled.input`
  border: none;
  border-bottom: 1px solid #D9D9D9;
  width: 100%;
  display: block;
  padding: 8px 0;
  font-size:1.3rem;
  ${({ background }) => background && `background:${background};`}
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-bottom: 2px solid #D9D9D9;
  }
  ::placeholder {
    font-size:1.3rem;
    color:rgba(54, 60, 76, 0.54);
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1.3rem;
  font-weight: 400;
  color: rgba(54, 60, 76, 1);
`;

export const BasicinformationWrapper = styled.div`
  width: 90%;
  padding: 20px;
  margin:auto;
  background: #f6f2ff;
  min-height: 100vh;
  box-sizing: border-box;
  h2 {
    margin-bottom: 10px;
    font-size: 16px;
  }
  .btn {
    width: 65%;
    margin: 10px auto;
    margin-top: 20px;
    margin-bottom: 0px;
  }
  .formDiv {
    margin-bottom: 24px;
    .dtls {
      background-color: #e4d8ff;
      border: 1px solid #914af9;
      border-radius: 18px;
      padding: 8px;
      color: #914af9;
      font-weight: 500;
      display: inline-block;
      margin: 7px 0px;
    }
    &:focus-within {
      label {
        color: #8841ee;
      }
      input {
        border-color: #8841ee;
      }
      .css-sje21u-MuiInputBase-root-MuiInput-root:after {
        border-color: #8841ee !important;
      }
      .css-sje21u-MuiInputBase-root-MuiInput-root:after {
        border-color: #8841ee !important;
      }
    }
  }
`;
