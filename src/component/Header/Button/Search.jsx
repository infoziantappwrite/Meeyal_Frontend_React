import { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef();

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={ref}>
      {/* Search Icon */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="p-2 rounded-full hover:bg-gray-100 transition duration-200"
      >
        <FaSearch className="text-gray-700 text-lg" />
      </button>

      {/* Search Input */}
      {isVisible && (
        <div
          className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-64 transition-all duration-300 ease-in-out animate-fade-in"
        >
          <input
            autoFocus
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 text-sm border-none focus:outline-none rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default Search;
