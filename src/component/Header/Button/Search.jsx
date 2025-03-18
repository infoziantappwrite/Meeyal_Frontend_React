import { useState } from 'react';
import "../Header.css"; // Import the CSS file properly

const Search = () => {
  const [value, setValue] = useState('');

  return (
  <div className='search-section'>
      <div className="search-container"> {/* Corrected class name */}
      <input
        type="text"
        className="textbox"  // Use className instead of styles
        placeholder="Search data..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  </div>
  );
};

export default Search;
