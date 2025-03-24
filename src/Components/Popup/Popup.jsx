import { PopupWrapper, PopupContent } from "./popup.style";
import GoBack from "../../Assets/goback.svg";

function PopupModal(props) {
  console.log(`translateY(${props.yaxis}%)`);
  return (
    <PopupWrapper active={props.yaxis ? false : true}>
      <PopupContent active={props.yaxis ? false : true}>
        <div className="head">
          <img src={GoBack} alt="back" onClick={props.close} />
          <span>{props.heading}</span>
        </div>
        {props.children}
      </PopupContent>
    </PopupWrapper>
  );
}

export default PopupModal;
