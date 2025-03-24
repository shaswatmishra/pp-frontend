import styled from "styled-components";
export const WhatsAppPageWrapper = styled.div`
  width: 90%;
  margin: 20px auto;
  .heading {
    position: relative;
    text-align: center;
    // min-height:30px;
    margin-bottom: 20px;
    h2 {
      font-size: 15px;
    }
    color: #363c4c;
  }
  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  .searchContainer {
    position: relative;
  }
  .searchIcon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .flx {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0;
  }
  .name {
    color: #8841ee;
    font-family: GilroyMed !important;
    font-size: 1.4rem;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    & > p {
      margin: 2px 0;
      font-family: GilroyRegular;
    }
    .recentText {
      color: #363c4c;
      font-weight: bold;
      margin-top:4px;
    }
    .oldText {
      color: grey;
      margin-top:4px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  margin: auto 16px auto auto;
  width: 40px !important;
  height: 40px !important;
  padding: 5px;
  border-radius: 100%;
  background: #f4f4f4;
  span {
    display: block;
    margin:auto;
    font-size: 18px;
    color: #8841ee;
  }
`;
