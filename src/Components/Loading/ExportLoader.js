import React from "react";
import { LoadingContainer, DocumentCircularLoader, Text } from "./Loader.style";
import CircularBorder from "../../Assets/Outer-Circle.svg";
import LogoCircleinner from "../../Assets/Logo circle inner.svg";

function Loader() {
  return (
    // <Wrapper>
    <LoadingContainer>
      <div style={{ margin: "auto" }}>
        <DocumentCircularLoader>
          <img className="circular" alt="Circular" src={CircularBorder} />
          <img className="logo" alt="LogoCircle" src={LogoCircleinner} />
        </DocumentCircularLoader>
      </div>
    </LoadingContainer>
  );
}

export default Loader;