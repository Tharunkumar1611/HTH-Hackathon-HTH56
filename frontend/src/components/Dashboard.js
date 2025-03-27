import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { 
  WiDaySunny, WiRain, WiCloudy, WiDayCloudyHigh,
  WiHumidity, WiStrongWind 
} from 'weather-icons-react';
import { FaLeaf, FaBug, FaMoneyBillWave, FaUpload, FaRupeeSign, FaInfoCircle } from 'react-icons/fa';

function Dashboard() {
  // Weather state
  const [weather, setWeather] = useState({
    temp: '--',
    condition: 'Sunny',
    humidity: '--',
    wind: '--'
  });
  const [loading, setLoading] = useState(true);

  // Form states
  const [cropForm, setCropForm] = useState({
    district: '',
    month: '',
    soilType: ''
  });
  const [pesticideForm, setPesticideForm] = useState({
    image: null,
    description: ''
  });
  const [priceForm, setPriceForm] = useState({
    crop: '',
    district: ''
  });

  // Schemes modal state
  const [showSchemes, setShowSchemes] = useState(false);

  // Tamil Nadu districts
  const tamilNaduDistricts = [
    'Ariyalur', 'Chengalpattu', 'Chennai', 'Coimbatore', 'Cuddalore',
    'Dharmapuri', 'Dindigul', 'Erode', 'Kallakurichi', 'Kancheepuram',
    'Karur', 'Krishnagiri', 'Madurai', 'Mayiladuthurai', 'Nagapattinam',
    'Namakkal', 'Nilgiris', 'Perambalur', 'Pudukkottai', 'Ramanathapuram',
    'Ranipet', 'Salem', 'Sivaganga', 'Tenkasi', 'Thanjavur',
    'Theni', 'Thoothukudi', 'Tiruchirappalli', 'Tirunelveli', 'Tirupathur',
    'Tiruppur', 'Tiruvallur', 'Tiruvannamalai', 'Tiruvarur', 'Vellore',
    'Viluppuram', 'Virudhunagar'
  ];

  const soilTypes = [
    'Alluvial', 'Black', 'Red', 'Laterite', 'Mountain',
    'Desert', 'Saline', 'Peaty', 'Clay', 'Sandy',
    'Loamy', 'Silt'
  ];

  const crops = [
    'Rice', 'Wheat', 'Maize', 'Cotton', 'Sugarcane',
    'Groundnut', 'Pulses', 'Millets', 'Oilseeds', 'Vegetables',
    'Fruits', 'Spices', 'Flowers', 'Tea', 'Coffee'
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const tamilNaduSchemes = [
    {
      name: "Chief Minister's Dryland Farming Scheme",
      description: "Provides assistance for dryland farmers with 50% subsidy for inputs",
      link: "https://www.tn.gov.in/scheme/data_view/336"
    },
    {
      name: "National Mission on Sustainable Agriculture",
      description: "Promotes sustainable agriculture practices with financial assistance",
      link: "https://nmsa.dac.gov.in/"
    },
    {
      name: "Tamil Nadu Organic Farming Policy",
      description: "Encourages organic farming with training and certification support",
      link: "https://www.tn.gov.in/scheme/data_view/342"
    },
    {
      name: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme to protect against natural calamities",
      link: "https://pmfby.gov.in/"
    },
    {
      name: "Kisan Credit Card Scheme",
      description: "Provides affordable credit to farmers for agricultural needs",
      link: "https://www.rbi.org.in/Scripts/FAQView.aspx?Id=80"
    }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWeather({
          temp: '28°C',
          condition: 'Partly Cloudy',
          humidity: '65%',
          wind: '12 km/h'
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather:', error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const getWeatherIcon = () => {
    switch(weather.condition) {
      case 'Sunny': return <WiDaySunny size={60} color="#FFA000" />;
      case 'Rainy': return <WiRain size={60} color="#2196F3" />;
      case 'Cloudy': return <WiCloudy size={60} color="#757575" />;
      default: return <WiDayCloudyHigh size={60} color="#FFA000" />;
    }
  };

  const handleCropFormChange = (e) => {
    const { name, value } = e.target;
    setCropForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePesticideFormChange = (e) => {
    const { name, value } = e.target;
    setPesticideForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    setPesticideForm(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handlePriceFormChange = (e) => {
    const { name, value } = e.target;
    setPriceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCropSubmit = (e) => {
    e.preventDefault();
    console.log('Crop Prediction Form:', cropForm);
    // API call would go here
  };

  const handlePesticideSubmit = (e) => {
    e.preventDefault();
    console.log('Pesticide Prediction Form:', pesticideForm);
    // API call would go here
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    console.log('Price Prediction Form:', priceForm);
    // API call would go here
  };

  const toggleSchemes = () => {
    setShowSchemes(!showSchemes);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Agriculture Intelligence Dashboard</h1>
        <button onClick={toggleSchemes} className="schemes-btn">
          <FaRupeeSign /> Tamil Nadu Schemes
        </button>
      </div>
      
      {showSchemes && (
        <div className="schemes-modal">
          <div className="schemes-content">
            <h2><FaInfoCircle color="#689f38" /> Tamil Nadu Agricultural Schemes</h2>
            <button className="close-btn" onClick={toggleSchemes}>×</button>
            <div className="schemes-list">
              {tamilNaduSchemes.map((scheme, index) => (
                <div key={index} className="scheme-card">
                  <h3>{scheme.name}</h3>
                  <p>{scheme.description}</p>
                  <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        {/* Weather Widget */}
        <div className="dashboard-card weather-widget">
          <h2><WiDaySunny size={24} color="#FFA000" /> Coimbatore Weather</h2>
          {loading ? (
            <p>Loading weather...</p>
          ) : (
            <>
              <div className="weather-icon">
                {getWeatherIcon()}
                <span className="temperature">{weather.temp}</span>
              </div>
              <div className="weather-details">
                <p><WiDayCloudyHigh size={20} color="#689f38" /> <strong>Condition:</strong> {weather.condition}</p>
                <p><WiHumidity size={20} color="#689f38" /> <strong>Humidity:</strong> {weather.humidity}</p>
                <p><WiStrongWind size={20} color="#689f38" /> <strong>Wind:</strong> {weather.wind}</p>
              </div>
            </>
          )}
        </div>

        {/* Crop Prediction */}
        <div className="dashboard-card crop-prediction">
          <h2><FaLeaf color="#689f38" /> Crop Prediction</h2>
          <form onSubmit={handleCropSubmit}>
            <div className="form-group">
              <label>District</label>
              <select 
                name="district" 
                value={cropForm.district}
                onChange={handleCropFormChange}
                required
              >
                <option value="">Select District</option>
                {tamilNaduDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Month</label>
              <select 
                name="month" 
                value={cropForm.month}
                onChange={handleCropFormChange}
                required
              >
                <option value="">Select Month</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Soil Type</label>
              <select 
                name="soilType" 
                value={cropForm.soilType}
                onChange={handleCropFormChange}
                required
              >
                <option value="">Select Soil Type</option>
                {soilTypes.map(soil => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="submit-btn">
              Predict Suitable Crops
            </button>
          </form>
        </div>

        {/* Pesticide Prediction */}
        <div className="dashboard-card pesticide-prediction">
          <h2><FaBug color="#689f38" /> Pesticide Prediction</h2>
          <form onSubmit={handlePesticideSubmit}>
            <div className="form-group">
              <label>Upload Image of Affected Crop</label>
              <div className="file-upload">
                <label>
                  <FaUpload /> Choose File
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {pesticideForm.image && (
                  <span className="file-name">{pesticideForm.image.name}</span>
                )}
              </div>
            </div>
            
            <div className="form-group">
              <label>Or Describe Symptoms</label>
              <textarea 
                name="description"
                value={pesticideForm.description}
                onChange={handlePesticideFormChange}
                placeholder="E.g., Yellow spots on leaves, wilting, etc."
                rows="3"
              ></textarea>
            </div>
            
            <button type="submit" className="submit-btn">
              Recommend Pesticide
            </button>
          </form>
        </div>

        {/* Price Prediction */}
        <div className="dashboard-card price-prediction">
          <h2><FaMoneyBillWave color="#689f38" /> Price Prediction</h2>
          <form onSubmit={handlePriceSubmit}>
            <div className="form-group">
              <label>Crop Name</label>
              <select 
                name="crop" 
                value={priceForm.crop}
                onChange={handlePriceFormChange}
                required
              >
                <option value="">Select Crop</option>
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>District</label>
              <select 
                name="district" 
                value={priceForm.district}
                onChange={handlePriceFormChange}
                required
              >
                <option value="">Select District</option>
                {tamilNaduDistricts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            
            <button type="submit" className="submit-btn">
              Predict Market Price
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;