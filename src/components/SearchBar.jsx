import { useState, useEffect, useRef } from 'react';

const SearchBar = ({ onSearch, recentSearches, onSelectRecent }) => {
  const [city, setCity] = useState('');
  const [showRecent, setShowRecent] = useState(false);
  const wrapperRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
      setShowRecent(false);
    }
  };

  const handleSelectRecent = (recentCity) => {
    onSelectRecent(recentCity);
    setShowRecent(false);
  };
//what this?

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowRecent(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full max-w-md mx-auto z-50">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setShowRecent(true)}
            placeholder="Enter city name..."
            className="w-full px-6 py-4 pr-14 text-lg bg-white bg-opacity-20 backdrop-blur-md rounded-2xl border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:border-opacity-50 transition-all duration-300"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-xl p-2 transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      {showRecent && city.trim() === '' && recentSearches.length > 0 && (
        <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white bg-opacity-20 backdrop-blur-md rounded-2xl border border-white border-opacity-30 overflow-hidden transition-all duration-300 transform translate-y-2">
          <div className="p-3">
            <h3 className="text-white text-sm font-medium mb-2 opacity-80">Recent Searches</h3>
            {recentSearches.map((recentCity, index) => (
              <button
                key={index}
                onClick={() => handleSelectRecent(recentCity)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSelectRecent(recentCity);
                }}
                tabIndex="0"
                className="w-full text-left px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-200 block"
              >
                {recentCity}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
