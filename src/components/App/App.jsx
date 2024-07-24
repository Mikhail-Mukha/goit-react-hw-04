import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import axios from "axios";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const API_KEY = "WgBZs32C0FE638ylFiqLWFLny3RBOmApS89jOLltui8";
const BASE_URL = "https://api.unsplash.com";

// const arrey = [
//   {
//     id: "boMKfQkphro",
//     urls: {
//       small:
//         "https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzUxOTl8MXwxfGFsbHwxfHx8fHx8Mnx8MTcyMTc2OTAxOXw&ixlib=rb-4.0.3&q=80&w=400",
//     },
//     alt_description: "A close up of a motherboard and a pen on a table",
//   },
//   {
//     id: "GLJeszYOSmQ",
//     urls: {
//       small:
//         "https://images.unsplash.com/photo-1721297015609-1374b1378d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzUxOTl8MHwxfGFsbHwyfHx8fHx8Mnx8MTcyMTc2OTAxOXw&ixlib=rb-4.0.3&q=80&w=400",
//     },
//     alt_description: "An aerial view of a car driving on a dirt road",
//   },
// ];

function App() {
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/search/photos?client_id=${API_KEY}`,
          {
            params: {
              query,
              page,
              per_page: 16,
            },
          }
        );
        if (response.data.results.length === 0) {
          setIsEmpty(true);
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...response.data.results]);
          setIsVisible(response.data.results.length === 16);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [query, page]);

  const onHandleSubmit = (value) => {
    if (value === query) return;
    setQuery(value);
    setPhotos([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setError(null);
  };

  const openModal = (photo) => {
    setModalImage(photo);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {photos.length > 0 && (
        <ImageGallery photos={photos} onClick={openModal} />
      )}
      {!photos.length && !isEmpty && <p> Let`s begit saerch</p>}
      {loading && <Loader />}
      {error && (
        <ErrorMessage
          name="fetchError"
          component="div"
          message="Something went wrong"
        />
      )}
      {isEmpty && <p>Sorry. There are not images ...</p>}
      {isVisible && !loading && (
        <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          photo={modalImage}
        />
      )}
    </>
  );
}

export default App;
