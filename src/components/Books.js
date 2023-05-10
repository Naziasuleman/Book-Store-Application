import React from "react";
import { connect } from "react-redux";
import { addToFavorites, removeFromFavorites, showFavorites } from "./actions";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import "./Books.css";

function Books({
  books,
  favorites,
  addToFavorites,
  removeFromFavorites,
  showFavorites,
  showFavoritesBool,
}) {
  const handleFavoriteClick = (book) => {
    if (favorites.some((favorite) => favorite.id === book.id)) {
      removeFromFavorites(book.id);
    } else {
      addToFavorites(book);
    }
  };

  return (
    <table className="book-table">
      <thead>
        <tr key="book-table-head">
          <th>Cover Wrap</th>
          <th>Title</th>
          <th>Author</th>
          <th>Description</th>
          <th>Add to Favorites</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.volumeInfo.id}>
            <td>
              {book.volumeInfo.imageLinks ? (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt="Book cover board"
                />
              ) : (
                "-"
              )}
            </td>
            <td>{book.volumeInfo.title ? book.volumeInfo.title : "-"}</td>
            <td>
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "-"}
            </td>
            <td>
              {book.volumeInfo.description ? book.volumeInfo.description : "-"}
            </td>
            <td>
              <div className="icon" onClick={() => handleFavoriteClick(book)}>
                {favorites.some((favorite) => favorite.id === book.id) ? (
                  <>
                    <FaStar size={24} color="red" />
                  </>
                ) : (
                  <>
                    <FaRegStar size={24} color="red" />
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const mapStateToProps = (state) => {
  return {
    favorites: state.favorites.favoriteBooks,
    showFavoritesBool: state.favorites.showFavoritesBool,
  };
};

export default connect(mapStateToProps, {
  addToFavorites,
  removeFromFavorites,
  showFavorites,
})(Books);
