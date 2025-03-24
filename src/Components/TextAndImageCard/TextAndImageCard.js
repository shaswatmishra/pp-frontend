import './TextAndImageCard.css';

const TextAndImageCard = ({header, about, image}) => {
  return(
    <div className="textandimagecard">
      <div className="text">
        <span className="header">{header}</span>
        <span className="about">{about}</span>
      </div>
      <div className="image">
        <img src={image}/>
      </div>
    </div>
  )
}

export default TextAndImageCard;
