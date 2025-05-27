import React, { useState, useEffect ,useRef} from "react";
import { useCurrency } from "../../../CurrencyContext"; // Import currency context

const FilterComponent = ({ onApplyFilters }) => {
  const { currency } = useCurrency(); // Get currency and conversion function
 const isFirstRender = useRef(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("default");
  const [limit, setLimit] = useState(12);
  const [selectedPrice, setSelectedPrice] = useState({ label: "All Prices", min: 0, max: Infinity });

  const convertPrice = (amount) => (amount / currency.rate).toFixed(2);

  const priceOptions = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: `Below ${currency.symbol} ${convertPrice(500)}`, min: 0, max: convertPrice(500) },
    { label: `${currency.symbol} ${convertPrice(500)} - ${currency.symbol} ${convertPrice(1000)}`, min: convertPrice(500), max: convertPrice(1000) },
    { label: `${currency.symbol} ${convertPrice(1000)} - ${currency.symbol} ${convertPrice(5000)}`, min: convertPrice(1000), max: convertPrice(5000) },
    { label: `${currency.symbol} ${convertPrice(5000)} - ${currency.symbol} ${convertPrice(10000)}`, min: convertPrice(5000), max: convertPrice(10000) },
    { label: `${currency.symbol} ${convertPrice(10000)} - ${currency.symbol} ${convertPrice(15000)}`, min: convertPrice(10000), max: convertPrice(15000) },
    { label: `Above ${currency.symbol} ${convertPrice(15000)}`, min: convertPrice(15000), max: Infinity },
  ];
  // Automatically send updated filters to parent component
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Skip the first render
    } else {
      onApplyFilters({ price: selectedPrice, sort: sortOption, limit, viewMode });
    }
  }, [selectedPrice, sortOption, limit, viewMode, onApplyFilters]);

  return (
    <div className="category-info p-2">
     <div className="row align-items-center justify-content-between flex-nowrap">
  {/* Left Side - View Mode and Show Limit */}
  <div className="col-auto d-flex align-items-center">
    {/* View Mode Selection */}
    <div className="btn-group btn-group-sm px-3">
      <button 
        type="button" 
        id="grid-view" 
        className={`btn btn-default ${viewMode === "grid" ? "active" : ""}`} 
        title="Grid" 
        onClick={() => setViewMode("grid")}
      >
        <i className="icon-grid"></i>
      </button>
      <button 
        type="button" 
        id="list-view" 
        className={`btn btn-default ${viewMode === "list" ? "active" : ""}`} 
        title="List" 
        onClick={() => setViewMode("list")}
      >
        <i className="icon-list"></i>
      </button>
    </div>

    {/* Show Limit Dropdown */}
    <div className="col-auto d-none d-md-flex align-items-center">
      <span className="me-2 text-white">Show:</span>
      <select 
        className="form-select form-select-sm rounded-pill w-auto" 
        value={limit} 
        onChange={(e) => setLimit(Number(e.target.value))}
      >
        <option value={12}>12</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={75}>75</option>
        <option value={100}>100</option>
      </select>
    </div>
  </div>

  {/* Right Side - Sorting and Filtering */}
  <div className="col-auto d-none d-md-flex align-items-center">
    {/* Sorting */}
    <span className="me-2 text-white">Sort:</span>
    <select 
      className="form-select form-select-sm me-3 rounded-pill" 
      value={sortOption} 
      onChange={(e) => setSortOption(e.target.value)}
    >
      <option value="default">Default</option>
      <option value="name-asc">Name (A - Z)</option>
      <option value="name-desc">Name (Z - A)</option>
      <option value="price-low-high">Price (Low → High)</option>
      <option value="price-high-low">Price (High → Low)</option>
      
    </select>

    {/* Price Filter */}
    <span className="me-2 text-white">Price:</span>
    <select 
      className="form-select form-select-sm rounded-pill" 
      value={selectedPrice.label} 
      onChange={(e) => {
        const selected = priceOptions.find(option => option.label === e.target.value);
        setSelectedPrice(selected);
      }}
    > 
      {priceOptions.map((option, index) => (
        <option key={index} value={option.label}>{option.label}</option>
      ))}
    </select>
  </div>

  {/* Mobile View - Filters Move Below */}
  <div className="col-12 d-md-none mt-3">
    <div className="row g-2">
      {/* Sorting Dropdown */}
      <div className="col-12">
        <span className="me-2 text-white">Sort:</span>
        <select 
          className="form-select form-select-sm rounded-pill" 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="name-asc">Name (A - Z)</option>
          <option value="name-desc">Name (Z - A)</option>
          <option value="price-low-high">Price (Low → High)</option>
          <option value="price-high-low">Price (High → Low)</option>
          <option value="rating-highest">Rating (Highest)</option>
          <option value="rating-lowest">Rating (Lowest)</option>
        </select>
      </div>

      {/* Show Limit and Price Filter Side by Side */}
      <div className="col-6">
        <span className="me-2 text-white">Show:</span>
        <select 
          className="form-select form-select-sm rounded-pill" 
          value={limit} 
          onChange={(e) => setLimit(Number(e.target.value))}
        >
          <option value={12}>12</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={75}>75</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="col-6">
        <span className="me-2 text-white">Price:</span>
        <select 
          className="form-select form-select-sm rounded-pill" 
          value={selectedPrice.label} 
          onChange={(e) => {
            const selected = priceOptions.find(option => option.label === e.target.value);
            setSelectedPrice(selected);
          }}
        >
          {priceOptions.map((option, index) => (
            <option key={index} value={option.label}>{option.label}</option>
          ))}
        </select>
      </div>
    </div>
  </div>
</div>

    </div>
  );
  
  
};

export default FilterComponent;
