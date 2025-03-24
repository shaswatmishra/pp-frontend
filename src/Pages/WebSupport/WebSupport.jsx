import { WebSupportWrapper } from "./web.style";
import PracticePlusLogo from "../../Assets/PracticePlusLogo.svg";
function WebSupport() {
  return (
    <WebSupportWrapper>
        <img className="logo" src={PracticePlusLogo} alt="practice-plus"/>
        <p>Please open website in mobile</p>
    </WebSupportWrapper>
  );
}

export default WebSupport;
