import styled from "styled-components";

export const AddPatientPageWrapper = styled.div`
  // margin-top:28px;
  .dFlex {
    display: flex;
    justify-content: space-between;
  }
  .formDiv {
    box-sizing: border-box;
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
  .formDiv1 {
    // box-sizing:border-box;
    &:focus-within {
      label {
        color: #8841ee;
      }
      input {
        border-color: #8841ee;
      }
      select {
        text-transform: capitalize;
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
