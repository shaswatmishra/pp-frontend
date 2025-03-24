import styled from "styled-components";

export const Add = styled.button`
  background: cornflowerblue;
  color: #fff;
  // padding:10px;
  font-size: 13px;
  border-radius: 5px;
  padding: 4px 10px;
  margin-top: 4px;
  border: none;
  box-sizing: border-box;
`;
export const ClinincsWrapper = styled.div`
  * {
    font-family: poppins;
  }

  width: 90%;
  padding: 5%;
  margin: auto;

  .heading {
    position: relative;
    text-align: center;
    // min-height:30px;
    margin-bottom: 20px;
    h2 {
      font-size: 1.7rem;
      color: rgba(54, 60, 76, 1);
    }
  }
  .icon {
    display: flex;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .formContainer {
    padding-bottom:100px;
  }

  .formContainer > div {
    margin: 35px 0px;
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

export const TimeRangeInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: auto;
  label {
    display: block;
    color: grey;
  }
  .time-input {
    width: 47.5%;
  }
  .time-input input {
    display: block;
    width: 100%;
    padding: 7px;
    border-radius: 10px;
    font-size: 1.3rem;
    border: none;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    &:focus {
      outline: none;
      border-bottom: 2px solid #d9d9d9;
    }
    ::placeholder {
      font-size: 1.3rem;
      color: rgba(54, 60, 76, 0.54);
    }
  }
`;

export const TimeSlot = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  margin-bottom: 100px;
  .time {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .time .day {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .time .day span:nth-child(1) {
    font-size: 1.2rem;
    color: rgba(54, 60, 76, 1);
    margin: auto 0;
  }

  .time .slot-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .time .slot-form button {
    margin: auto 0 auto 5%;
    height: 100%;
    cursor: pointer;
  }

  .slots {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .slots .flxd p {
    width: fit-content;
    white-space: nowrap;
    padding: 7px 20px;
    background-color: #4690ff;
    border-radius: 8px;
    text-align: center;
    color: #fff;
  }

  .flxd {
    margin: 5% 5% 0 0;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;

    & > div {
      width: 45%;
      display: flex;
    }
    div {
      display: flex;
      height: fit-content;
      margin: auto;
    }
  }
`;

export const TableHeaderContainer = styled.div`
  display: flex;
  margin: 10px 0px;
`;

export const TableHeader = styled.div`
  ${(props) => (props.lg ? `width:30%` : props.sm ? `width:10%` : "width:20%")};
  font-size: 1.1rem;
  font-weight: 500;
  // text-align:center;
  word-break: break-all;
  color: grey;
`;

export const TableContent = styled.div`
  display: flex;
  ${(HOVER) =>
    HOVER &&
    `
&:hover{
    background-color:#ddd;
}
`}
  padding:14px 0px;
`;
export const TableData = styled.div`
  ${(props) => (props.lg ? `width:30%` : props.sm ? `width:10%` : "width:20%")};
  // text-align:center;
  word-break: break;
  word-break: break-all;
`;
export const ClinicData = styled.div`
  width: 100%;
  margin-bottom: 70px;
  margin-left: auto;
  margin-right: auto;
`;
export const Line = styled.div`
  height: 2px;
  border-top: 1px solid #ccc;
`;
