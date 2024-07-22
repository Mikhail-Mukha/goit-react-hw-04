import axios from "axios";

const API_KEY = "WgBZs32C0FE638ylFiqLWFLny3RBOmApS89jOLltui8";
const API_ID = "635199";
axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `${API_ID} ${API_KEY}`;
axios.defaults.params = {
  X_Per_Page: 15,
};

export const getPhotos = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);

  return data;
};
