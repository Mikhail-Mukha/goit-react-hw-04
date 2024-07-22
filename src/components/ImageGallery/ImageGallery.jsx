import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ photos }) => {
  return (
    <ul className={s.gallery}>
      <ImageCard photos={photos} />
    </ul>
  );
};

export default ImageGallery;
