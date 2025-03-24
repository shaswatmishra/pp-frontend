import styled from "styled-components";

export const ExtraDetailsWrapper = styled.div`
  width: 100%;
  padding: 0;
  margin: 0;
  max-width:600px;

  .ellipse {
    width: 100%;
  }

  .logo {
    display: block;
    margin: 20px auto;
  }

  .file-head {
    width: 90%;
    padding:5%;
  }

  .file-head h1 {
    font-family:GilroyBold;
    font-size:2rem;
  }
  .file-head p {
    font-family:GilroyRegular;
    font-size:1.3rem;
    line-height:17px;
  }

  .upload-options {
    width:92%;
    padding:4%;
    display:flex;
    justify-content:space-between;
    margin:auto;
  }

  .upload-options .file-input {
    position:relative;
  }
  .upload-options .file-input  input {
    position:absolute;
    display:block;
    top:0;
    left:0;
    width:100%;
    height:100%;
    opacity:0;
  }
`;

