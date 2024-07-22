import s from "./SearchBar.module.css";
import { useState } from "react";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      return alert("Can not be empty");
    }
    onSubmit(query);
    setQuery("");
  };
  return (
    <div className={s.div}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          className={s.input}
          placeholder="Search..."
          type="text"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={s.btn}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
