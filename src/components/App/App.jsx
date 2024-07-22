import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useEffect, useState } from "react";
import { ErrorMessage } from "formik";
import axios from "axios";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const API_KEY = "QxwtyiynyLrOT1cpYeYexFds8RMCeu7pxWoIvifoCIY";
const BASE_URL = "https://api.unsplash.com";

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
        const response = await axios.get(`${BASE_URL}/search/photos`, {
          params: {
            query,
            page,
            per_page: 16,
            client_id: API_KEY,
          },
        });
        setPhotos((prevImage) => [...prevImage, ...response.data.results]);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [page, query]);

  const onHandleSubmit = (value) => {
    if (value === query) return;
    setQuery(value);
    setPhotos([]);
    setPage(1);
    setIsEmpty(false);
    setIsVisible(false);
    setError(null);
  };

  const openModal = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={onHandleSubmit} />
      {photos.langth > 0 && (
        <ImageGallery photos={photos} onImageClick={openModal} />
      )}
      {!photos.langth && !isEmpty && <p> Let`s begit saerch</p>}
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {isEmpty && <p>Sorry. There are not images ...</p>}
      {isVisible && !loading && (
        <button onClick={() => setPage((prevPage) => prevPage + 1)}>
          Завантажити більше
        </button>
      )}
      {photos.length > 0 && !loading && (
        <LoadMoreBtn onClick={() => setPage((prevPage) => prevPage + 1)} />
      )}
      {showModal && (
        <ImageModal
          isOpen={showModal}
          onRequestClose={closeModal}
          image={modalImage}
        />
      )}
    </>
  );
}

export default App;
