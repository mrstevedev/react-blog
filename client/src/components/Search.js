import React, { Fragment, useState, useCallback, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import skyline from "../../public/skyline.jpg";
import { debounce } from "lodash";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  searchInput: {
    background: "#ececec",
    border: "none",
    boxShadow: "0 1px 0 #ccc",
    width: "470px",
    height: "41px",
    outline: "none",
    textIndent: "2.2rem",
    color: "#000",
    fontSize: "1rem",
    transition: ".04s ease-in-out",
    "&:focus": {
      borderBottom: "solid 2px #000",
      boxShadow: "none",
    },
  },
  searchDropdown: {
    background: "#fff",
    display: 'none',
    width: "100%",
    height: "60px",
    position: "absolute",
    margin: "2px 0",
    alignItems: "center",
    boxShadow: '0 2px 3px 0px #ccc'
  },
  searchResults: {
    '&:hover': {
        background: '#eaeaea'
    }
  }
}));

function Search(props) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [searchPosts, setSearchPosts] = useState([]);

  const { REACT_APP_API_URL } = process.env;

  const handleToggleSearch = () => {

    console.log('toggle search');
    
  }

  const handleSearchPosts = (e) => {
    const searchTxt = document.querySelector('.searchTxt');

    setSearch(e.target.value)

    axios.get(`${ REACT_APP_API_URL }/posts`)
        .then(res => res.data.filter((post) => setSearchPosts(post.title)))

  }

  const handleShowDropdown = () => {
      const searchDropdown = document.querySelector('.makeStyles-searchDropdown-10');
      searchDropdown.classList.add('show');
      axios.get(`${ REACT_APP_API_URL }/posts`).then(res => res.data)
  }

  const handleCloseSearch = () => {

  }

  const handleHideDropdown = () => {
    const searchDropdown = document.querySelector('.makeStyles-searchDropdown-10');

  }


  return (
    <Fragment>
    <div style={{ position: 'relative', margin: '0 2rem' }}>
      <a
        onClick={handleToggleSearch}
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          color: "#333",
          fontWeight: "bold",
          fontSize: "1rem",
          // position: 'absolute',
          // zIndex: '1',
          // top: '8px',
          // left: '8px'
        }}
      >
        <svg width="24px" height="24px" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z" fill="#000000"></path></svg>
        <span className="searchTxt">Search</span>
      </a>
      {/* <div style={{ position: "relative" }}>
        <svg
          style={{ position: "absolute", left: "0.5rem", top: "0.5rem" }}
          width="24px"
          height="24px"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m20.8333 19-3.6666-3.6667c.9167-1.3333 1.4999-2.9166 1.4999-4.6666 0-4.33334-3.5833-7.9167-7.9167-7.9167-4.33331 0-7.91665 3.58336-7.91665 7.9167 0 4.3333 3.58334 7.9167 7.91665 7.9167 1.75 0 3.3334-.5834 4.6668-1.5001l3.6666 3.6667zm-15.50005-8.25c0-2.99999 2.41667-5.41666 5.41665-5.41666 3 0 5.4167 2.41667 5.4167 5.41666 0 3-2.4167 5.4167-5.4167 5.4167-2.99998 0-5.41665-2.4167-5.41665-5.4167z"
            fill="#000000"
          ></path>
        </svg>
        <input
          type="text"
          value={search}
          className={classes.searchInput}
          onFocus={handleShowDropdown}
          onChange={handleSearchPosts}
          onBlur={handleHideDropdown}
          placeholder="Search posts.."
          />
        <a href="#" onClick={handleCloseSearch}>
        <svg
          style={{ position: "absolute", right: "0.5rem", top: "0.6rem" }}
          width="24px"
          height="24px"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="m19.5831 6.24931-1.8333-1.83329-5.75 5.83328-5.75-5.83328-1.8333 1.83329 5.8333 5.74999-5.8333 5.75 1.8333 1.8333 5.75-5.8333 5.75 5.8333 1.8333-1.8333-5.8333-5.75z"
            fill="#000000"
          ></path>
        </svg>
        </a>
        <div className="search-dropdown" className={classes.searchDropdown}>
          <ul style={{ width: "100%", display: 'flex', alignItems: 'center', height: '100%' }}>
            <a
              href="#"
              style={{
                color: "#333",
                textTransform: "uppercase",
                fontWeight: "500",
                width: "100%",
              }}
            >
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.4rem 1rem",
                }}
                className={ classes.searchResults }
              >
               { searchPosts.length > 0 ? (
                   <Fragment>
                    <img
                    src={skyline}
                    style={{
                      width: "32px",
                      borderRadius: "100%",
                      margin: "0 0.5rem 0 0",
                    }}
                  />
                  { searchPosts }
                  </Fragment>
               ) : '' }
              </li>
            </a>
          </ul>
        </div>
      </div> */}
      </div>
    </Fragment>
  );
}

export default Search;
