import React, { useState } from "react";

const FilterComponent = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    color: [],
    price: [],
    size: [],
  });

  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [category]: prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value],
    }));
  };

  return (
    <div className="panel panel-default filter">
      <div className="box-content">
        <div id="filter">
          <h3 className="toggled relative">Refine Search</h3>
          <div className="filter_box">
            <div className="list-group">
              {/* Color Filter */}
              <div className="list-group-items">
                <a className="list-group-item">Color</a>
                <div className="list-group-item">
                  <div id="filter-group1">
                    {["Black", "White"].map((color, index) => (
                      <div className="checkbox" key={index}>
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={color}
                            checked={filters.color.includes(color)}
                            onChange={() => handleCheckboxChange("color", color)}
                          />
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Filter */}
              <div className="list-group-items">
                <a className="list-group-item">Price</a>
                <div className="list-group-item">
                  <div id="filter-group2">
                    {["$150-$250", "$49-$149"].map((price, index) => (
                      <div className="checkbox" key={index}>
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={price}
                            checked={filters.price.includes(price)}
                            onChange={() => handleCheckboxChange("price", price)}
                          />
                          {price}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Size Filter */}
              <div className="list-group-items">
                <a className="list-group-item">Size</a>
                <div className="list-group-item">
                  <div id="filter-group3">
                    {["Large", "Medium", "Small"].map((size, index) => (
                      <div className="checkbox" key={index}>
                        <label>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={size}
                            checked={filters.size.includes(size)}
                            onChange={() => handleCheckboxChange("size", size)}
                          />
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Refine Button */}
            <div className="panel-footer text-right">
              <button
                type="button"
                id="button-filter"
                className="btn btn-primary"
                onClick={() => onApplyFilters(filters)}
              >
                Refine
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
