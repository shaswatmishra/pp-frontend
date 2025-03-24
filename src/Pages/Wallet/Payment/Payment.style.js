import styled from "styled-components";

export const Transactions = styled.div`
  width: 95%;
  padding: 2.5%;

  * {
    font-family: poppins;
  }

  .no-history {
    display: block;
    width: fit-content;
    margin: 70px auto;
    color: grey;
  }

  .transaction {
    display: flex;
    width: 100%;
    padding: 2.5% 0;
    border-bottom: 1px solid #ececec;
  }

  .transaction .bag {
    display: flex;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    background: #dddaff;
  }

  .transaction .bag img {
    display: block;
    margin: auto;
  }

  .transaction .details {
    margin: auto 0 auto 15px;
  }
  .transaction .details .time {
    font-size: 1.1rem;
    color: rgba(141, 141, 141, 1);
  }

  .transaction .details .amount > span {
    font-size: 1.7rem;
    color: rgba(0, 0, 0, 1);
  }

  .transaction .status {
    display: flex;
    margin: auto 0 auto auto;
  }

  .transaction .status .dot {
    display: block;
    width: 7px;
    height: 7px;
    margin: auto 7px auto 0;
    border-radius: 100%;
    background: grey;
  }

  .transaction .status span {
    font-size: 1.3rem;
    text-transform: capitalize;
  }

  .transaction .success .dot {
    background: rgba(32, 160, 99, 1);
  }

  .transaction .success span {
    color: rgba(32, 160, 99, 1);
  }

  .transaction .failed .dot {
    background: rgba(241, 60, 60, 1);
  }

  .transaction .failed span {
    color: rgba(241, 60, 60, 1);
  }
`;

export const Filter = styled.div`
  width:100%;
  margin:40px 0 20px 0;
  display:flex;
  justify-content:space-between;

  .filter-option {
    width:47.5%;
    text-align:center;
    color:rgba(255, 255, 255, 1);
    background: rgba(217, 217, 217, 1);
    border-radius:16px;
    padding:8px 0;
    font-size:1.4rem;
  }

  .active-filter-option {
    background:#513D78;
  }
`