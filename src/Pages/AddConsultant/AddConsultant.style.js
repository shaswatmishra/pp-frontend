import styled from "styled-components";
export const AddConsultantWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  overflow-x: hidden;
  .heading {
    position: relative;
    text-align: center;
  }

  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  h2 {
    font-size: 14px;
    font-weight: bold;
  }
  .dFlex {
    display: flex;
    justify-content: space-between;
  }
  .formDiv {
    margin: 28px 0px;
    &:focus-within {
      label {
        color: #8841ee;
      }
      input {
        border-color: #8841ee;
      }
    }
  }
`;
export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const Tab = styled.div`
  width: 45%;

  box-sizing: border-box;
  padding-bottom: 6px;
  font-size: 1.1rem;
  text-align: center;
  ${(props) =>
    props?.active &&
    `

border-bottom:3px solid #914AF9;
color:#914AF9;
font-weight:bolder;


`}
`;

export const TabData = styled.div``;
