import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorMessage from './components/ErrorMessage';

const API_KEY = '0b4709d4b8713ffd890d60f82d99cfe9';

const getBackgroundClass = (condition = '') => {
  const conditionLower = condition.toLowerCase();
  if (conditionLower.includes('clear')) return 'from-yellow-400 via-pink-500 to-red-500';
  if (conditionLower.includes('cloud')) return 'from-gray-400 via-gray-600 to-gray-800';
  if (conditionLower.includes('rain') || conditionLower.includes('storm')) return 'from-blue-700 via-gray-800 to-black';
  if (conditionLower.includes('snow')) return 'from-blue-200 via-white to-blue-300';
  if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) return 'from-gray-300 via-gray-500 to-gray-700';
  return 'from-blue-400 via-purple-500 to-pink-500';
};

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  const [recentSearches, setRecentSearches] = useState([]);
  const [bgClass, setBgClass] = useState('from-blue-400 via-purple-500 to-pink-500');

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveToRecent = (city) => {
    const updated = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const fetchWeather = async (city) => {
    try {
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeather(data);
      saveToRecent(city);
      setBgClass(getBackgroundClass(data.weather[0].description));
    } catch (err) {
      setError(err.message === 'City not found' ? 'City not found. Please check the spelling and try again.' : 'Something went wrong. Please try again.');
      setWeather(null);
      setBgClass('from-blue-400 via-purple-500 to-pink-500');
    }
  };

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  const handleUnitChange = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleSelectRecent = (city) => {
    fetchWeather(city);
  };

  const handleDismissError = () => {
    setError('');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgClass} p-4 transition-all duration-500`}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 animate-fade-in">
            Weather App
          </h1>
          <p className="text-xl text-white opacity-90 animate-fade-in">
            Get real-time weather information for any city
          </p>
        </div>

        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            recentSearches={recentSearches}
            onSelectRecent={handleSelectRecent}
          />
        </div>

        {error && (
          <div className="mb-8">
            <ErrorMessage 
              message={error}
              onDismiss={handleDismissError}
            />
          </div>
        )}

        {weather && (
          <WeatherCard 
            weather={weather}
            onUnitChange={handleUnitChange}
            unit={unit}
            backgroundClass={bgClass}
          />
        )}

        {!weather && !error && (
          <div className="text-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-3xl p-12 text-white animate-fade-in">
              <div className="text-6xl mb-6">🌤️</div>
              <h2 className="text-2xl font-bold mb-4">Welcome to Weather App</h2>
              <p className="text-lg opacity-90">
                Enter a city name to get started and see the current weather conditions
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
