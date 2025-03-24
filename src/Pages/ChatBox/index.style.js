import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  margin: 20px auto;
  width: 90%;

  .heading {
    position: relative;
    text-align: center;
    margin-bottom: 20px;
    h2 {
      font-size: 15px;
    }
    margin-bottom: 20px;
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .messageInput {
    display: flex;
    position: fixed;
    bottom: 3px;
    z-index: 1000;
    // z-index:50;
    background-color: #fff;
    left: 3px;
    right: 3px;

    span {
      margin-right: 7px;
    }
  }

  .searchContainer {
    position: relative;
    flex: 1;
  }
  .sendIcon {
    position: absolute;
    // left:10px;
    top: 50%;
    right: 0%;
    transform: translateY(-37%) translateX(20%);
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0px;
  align-items: center;

  .media {
    max-width:250px;
    max-height:380px;
  }
  
  ${({ type }) =>
    type === "left"
      ? `
  .text{
    background: #F2F2F2;
    max-width:200px;
    border-radius: 24px 24px 24px 0px;
    padding:9px 10px;
    font-weight:500;
  }
  flex-direction:row-reverse;
`
      : `
   .text{
     background: #EBDDFF;
     border-radius: 24px 24px 0px 24px;
     max-width:200px;
     padding:9px 10px;
     letter-spacing:0.05rem;
     font-weight:500;
   }
`}
  .error {
    border: 1px solid orangered;
  }
  .time {
    color: GrayText;
  }
`;
