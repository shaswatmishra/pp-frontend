import styled, { keyframes } from "styled-components";

export const LoadingContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
`;
export const DocumentLoader = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 200px;
  height: 100px;
`;

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

export const DocumentCircularLoader = styled.div`
  position: relative;
  display: flex;
  width: 100px;
  height: 100px;
  .circular {
    position: absolute;
    width: %;
    height: 100%;
    top: 0;
    left: 0;
    animation:${rotation} 0.7s linear infinite;
  }
  .logo {
    display: block;
    width: 60%;
    height: 60%;
    margin: auto;
    
  }
`;

export const Text = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #513d78;
  margin-top: 20px;
`;
