import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <div className="input-group input-group-lg">
        <span className="input-group-text bg-white">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search opportunities by title, organization, skills, or location..."
          value={query}
          onChange={handleChange}
          aria-label="Search opportunities"
        />
      </div>
    </div>
  );
};

export default SearchBar;