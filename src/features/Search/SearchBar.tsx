import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; 
import searchIcon from "../../assets/icons/icon-search.svg"; 
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const urlSearchTerm = searchParams.get("search") || "";

  useEffect(() => {
    setQuery(urlSearchTerm);
  }, [urlSearchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/collections?search=${encodeURIComponent(query.trim())}`);
    } else {
      navigate("/collections");
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-bar__wrapper">
        <img src={searchIcon} alt="" className="search-bar__icon" aria-hidden="true" />
        <input
          type="text"
          className="search-bar__input"
          placeholder="Search sneakers..."
          value={query} 
          onChange={handleChange}
          aria-label="Search products"
        />
      </div>
    </form>
  );
};

export default SearchBar;