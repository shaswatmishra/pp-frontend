import styled from "styled-components";

export const RecordsWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  .record {
    width: 90%;
    padding: 5%;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.08);
    background: #f1f1f1;
    b {
      font-family: GilroySemi;
      text-transform:uppercase;
    }
    p {
      font-family: GilroyMed;
      font-size: 1.2rem;
      color: #8949f1;
      margin-top:5px;
      word-break:break-word;
    }
    span {
      font-family: GilroyRegular;
      color: grey;
      margin-top:5px;
    }
  }
  .no-records {
    text-align: center;
    font-size: 2.1rem;
    font-family: GilroyRegular;
    margin: 50px;
    color: #d9d9d9;
  }
`;
