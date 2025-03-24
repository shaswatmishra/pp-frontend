import styled from "styled-components";

export const AppointmentWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  .heading {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 18px;
    }
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
export const AppointmentCardWrapper = styled.div`
  position: relative;
  margin: 20px 0;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
  border-radius: 11px;
  min-height: 130px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  padding: 20px;
  .flx {
    display: flex;
    justify-content: space-between;
  }
  .flxChild {
    display: flex;
    align-items: center;
    .avatar {
      margin-right: 10px;
    }
  }

  .appointment-option {
    list-style:none;
    position: absolute;
    top: 50px;
    right: 10px;
    width:fit-content;
    margin: 0;
    padding:0;
    box-shadow: 0px 1px 6px rgb(0 0 0 / 20%);
    background: #ffffff;
  }

  .appointment-option > li {
    display:block;
    width:100%;
    padding:5px 10px;
    border-bottom:1px solid #eeeeee;
    font-size:1.3rem;
    color:#1b1b1b;
  }

  .sideLine {
    background: #8949f1;
    border-radius: 0px 2px 2px 0px;
    position: absolute;
    width: 4px;
    left: 0%;
    height: 99px;
    top: 50%;
    transform: translateY(-50%);
  }
`;
