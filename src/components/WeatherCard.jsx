import { useState } from 'react';

const WeatherCard = ({ weather, onUnitChange, unit, backgroundClass }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getWeatherIcon = (condition) => {
    const iconMap = {
      'clear sky': '☀️',
      'few clouds': '⛅',
      'scattered clouds': '☁️',
      'broken clouds': '☁️',
      'shower rain': '🌦️',
      'rain': '🌧️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'mist': '🌫️',
      'fog': '🌫️',
      'haze': '🌫️',
      'smoke': '🌫️',
      'dust': '🌫️',
      'sand': '🌫️',
      'ash': '🌫️',
      'squall': '💨',
      'tornado': '🌪️',
    };
    return iconMap[condition.toLowerCase()] || '🌤️';
  };

  const temperature = unit === 'metric' ? weather.main.temp : (weather.main.temp * 9/5) + 32;
  const feelsLike = unit === 'metric' ? weather.main.feels_like : (weather.main.feels_like * 9/5) + 32;
  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeed = unit === 'metric' ? weather.wind.speed : weather.wind.speed * 2.237;
  const windUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div 
      className={`bg-gradient-to-br ${backgroundClass} rounded-3xl p-8 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 animate-fade-in`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">{weather.name}</h2>
          <p className="text-lg opacity-90">{weather.sys.country}</p>
        </div>
        <div className="text-6xl animate-pulse-slow">
          {getWeatherIcon(weather.weather[0].description)}
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-6xl font-bold mb-2">
            {Math.round(temperature)}{tempUnit}
          </div>
          <p className="text-xl opacity-90">
            Feels like {Math.round(feelsLike)}{tempUnit}
          </p>
        </div>
        <button
          onClick={onUnitChange}
          className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-all duration-200 backdrop-blur-sm"
        >
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      <div className="capitalize text-2xl font-medium mb-6">
        {weather.weather[0].description}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}>
          <div className="text-sm opacity-80">Humidity</div>
          <div className="text-2xl font-bold">{weather.main.humidity}%</div>
        </div>
        <div className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}>
          <div className="text-sm opacity-80">Wind Speed</div>
          <div className="text-2xl font-bold">{Math.round(windSpeed)} {windUnit}</div>
        </div>
        <div className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}>
          <div className="text-sm opacity-80">Pressure</div>
          <div className="text-2xl font-bold">{weather.main.pressure} hPa</div>
        </div>
        <div className={`bg-white bg-opacity-20 rounded-xl p-4 backdrop-blur-sm transition-all duration-300 ${isHovered ? 'bg-opacity-30' : ''}`}>
          <div className="text-sm opacity-80">Visibility</div>
          <div className="text-2xl font-bold">{Math.round(weather.visibility / 1000)} km</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
