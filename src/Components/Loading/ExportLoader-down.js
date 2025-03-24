import React from "react";
import { LoadingContainer, DocumentLoader, Text } from "./Loader.style";
import ReactLoading from "react-loading";

function Loader({ type, color, text }) {
  return (
    // <Wrapper>
    <LoadingContainer>
      <div style={{margin:"auto"}}>
        <DocumentLoader>
          <ReactLoading
            type="spinningBubbles"
            color="#513D78"
            height={100}
            width={100}
          />
        </DocumentLoader>
        <Text>{text}</Text>
      </div>
    </LoadingContainer>
  );
}

Loader.defaultProps = {
  text: "Please wait...",
};
export default Loader;
