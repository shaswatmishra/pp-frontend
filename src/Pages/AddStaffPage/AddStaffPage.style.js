import styled from "styled-components";
export const AddStaffPageWrapper = styled.div`
  * {
    font-family:GilroySemi;
  }
  margin: 20px auto;
  box-sizing: border-box;
  width: 90%;
  .heading {
    position: relative;
    text-align: center;
    // min-height:30px;
    margin-bottom: 20px;
    h2 {
      font-size: 15px;
    }
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .formContainer > div {
    margin: 25px 0px;
  }
  .formDiv {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &:focus-within {
      label {
        color: #8841ee;
      }
      input {
        border-color: #8841ee;
      }
    }
  }
  .flx {
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;

    & > div {
      width: 45%;
    }
  }
  .checkBoxContainer {
    display: flex;
    align-items: center;
    margin: 5px 0px;
    & > div {
      margin: 0px 4px;
    }
  }
  .btnContainer {
    width: 40%;
    margin: 100px auto;
  }
`;
export const CheckBox = styled.div`
  box-sizing: border-box;
`;
