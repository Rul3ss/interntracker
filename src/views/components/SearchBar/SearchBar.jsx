import './SearchBar.css';

const SearchBar = ({ onSearchChange, onCategoryChange, categories }) => {
  return (
    <div className="search-bar-container">
      <div className="container search-bar-flex">
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="Search announcements..." 
            className="search-input"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className="category-select-wrapper">
          <select 
            className="category-select"
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
