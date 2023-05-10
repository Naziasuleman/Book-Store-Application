import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Books from "./Books";
import { showFavorites, hideFavorites } from "./actions";
import "./Search.css";
import axios from "axios";

function Search() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [books, setBooks] = useState([]);

  const URL = "https://www.googleapis.com/books/v1/volumes?q=";

  const favorites = useSelector((state) => state.favorites.favoriteBooks);
  const showFavoritesBool = useSelector(
    (state) => state.favorites.showFavoritesBool
  );
  const dispatch = useDispatch();

  const handleShowFavorites = () => {
    dispatch(showFavorites());
  };

  const handleShowModal = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(hideFavorites());
    let query = "";
    let i = 0;
    if (title !== "") {
      query += "intitle:" + title;
      i++;
    }
    if (author !== "") {
      if (i > 0) {
        query += "&";
      }
      query += "inauthor:" + author;
      i++;
    }
    if (keywords !== "") {
      if (i > 0) {
        query += "&";
      }
      query += keywords;
    }

    try {
      const response = await axios.get(URL + query);
      setBooks(response.data.items || []);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className="search-container">
        <h2 className="search-title">
          Search Books: Find Your Next Read with Ease
        </h2>
        <div>
          <button className="search-btn" onClick={handleShowModal}>
            Search
          </button>
          <button className="fav-btn" onClick={handleShowFavorites}>
            Show Favorites
          </button>
        </div>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form className="container">
              <h3>Search Here..</h3>
              <label>Title</label>
              <input
                type="text"
                placeholder="Search by Title"
                name="search-title-text"
                id="search-title-text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <label>Author</label>
              <input
                type="text"
                placeholder="Search by Author"
                name="search-author-text"
                id="search-author-text"
                value={author}
                onChange={(e) => {
                  setAuthor(e.target.value);
                }}
              />
              <label>Keywords</label>
              <input
                type="text"
                placeholder="Search by Keywords"
                name="search-keyword-text"
                id="search-keyword-text"
                value={keywords}
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
              <button
                className="search-btn"
                onClick={(e) => {
                  e.preventDefault();
                  submitHandler(e);
                  setShowModal(false);
                }}
              >
                Find
              </button>
            </form>
          </div>
        </div>
      )}

      {showFavoritesBool ? (
        <Books books={favorites} />
      ) : (
        <Books books={books} />
      )}
    </>
  );
}

export default Search;
