import s from "./ImageCard.module.css";

const ImageCard = ({ photo, onClick }) => {
  const { urls, alt_description } = photo;
  return (
    <div className={s.wrap} onClick={() => onClick(photo)}>
      <img className={s.img} src={urls.small} alt={alt_description} />
    </div>
  );
};

export default ImageCard;
