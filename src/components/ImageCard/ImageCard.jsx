import s from "./ImageCard.module.css";

const ImageCard = ({ photos }) => {
  return (
    <>
      {photos.map((photo) => (
        <li key={photo.id} className={s.item}>
          <img src={photo.urls.small} alt={photo.alt_description} />
        </li>
      ))}
    </>
  );
};

export default ImageCard;
