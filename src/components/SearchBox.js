import mainLogo from "../assets/img/logo-gamepad.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import searchIcon from "../assets/img/icon-search.svg";

const SearchBox = ({ setSearch }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=2e0bd93ebba74c1bbd373d8ac15ca768`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fechData();
  }, []);
  return (
    <div className="searchBlock">
      <div>
        <Link to="/">
          <img src={mainLogo} className="mainLogo" alt="logo" />
        </Link>
      </div>
      <div className="search-icon">
        <img src={searchIcon} alt="search-icon" />
      </div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="Search for a game..."
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div>
        <p className="game-number">Search {data.count} games</p>
      </div>
    </div>
  );
};

export default SearchBox;
