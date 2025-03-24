import styled from "styled-components";

export const ProfilePageWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  margin-bottom: 100px;
  .heading {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 15px;
    }
  }
  .editIcon {
    position: relative;
    .icon {
      position: absolute;
      left: 100%;
      transform: translateX(-100%);
    }
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .detailsWrapper > div {
    margin: 30px 0px;
  }
  .upload {
    position: relative;

    .icon {
      background: linear-gradient(93.76deg, #996ad0 -7.73%, #5c71dd 112.14%);
      border-radius: 46px;
      padding: 6px 10px;
      color: #fff;
      display: flex;
      align-items: center;
      position: absolute;
      left: 100%;
      transform: translateX(-100%) translateY(-30%);
    }
    .icon span {
      margin-left: 8px;
    }
  }
  .formDiv {
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
export const ProfilePicInfoWrapper = styled.div`
  min-height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  background-color: #f5edff;
  border-radius: 7px;
  .avatar {
    height: 70px;
    width: 70px;
    position: relative;
    label {
      position: absolute;
      top: 100%;
      left: 100%;
      transform: translateX(-50%) translateY(-50%);
      color: #1f63d4;
      svg {
        font-size: 2.5rem !important;
      }
    }
  }
  div {
    margin: 6px;
  }
`;
