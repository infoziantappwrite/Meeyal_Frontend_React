import { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Import search icon
import "../Header.css"; // Ensure correct path

const Search = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div
      className="search-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className="search-icon" onClick={() => setIsVisible(!isVisible)}>
        <FaSearch />
      </div>
      <div className={`search-container ${isVisible ? "visible" : ""}`}>
        <input
          type="text"
          className="textbox"
          placeholder="Search data..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
