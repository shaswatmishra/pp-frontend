import { LoadingContainer } from "../Loading/Loader.style";
import { ModalWrapper } from "../Popup/popup.style";
import Cross from "../../Assets/cross.svg";

function Modal(props) {
  return (
    <LoadingContainer>
      <ModalWrapper style={{ textAlign: "left" }}>
        <div className="modal-head">
          <h1>{props.heading}</h1>
          <img onClick={props.onclose} alt="close" src={Cross} />
        </div>
        <div className="content">{props.children}</div>
      </ModalWrapper>
    </LoadingContainer>
  );
}

export default Modal;
