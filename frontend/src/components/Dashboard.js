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

  // Results states
  const [cropResult, setCropResult] = useState(null);
  const [priceResult, setPriceResult] = useState(null);
  const [pesticideResult, setPesticideResult] = useState(null);

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

  const commonPests = [
    'Aphids', 'Whiteflies', 'Bollworms', 'Stem Borers', 'Leaf Miners',
    'Thrips', 'Mealybugs', 'Mites', 'Cutworms', 'Armyworms'
  ];

  const pesticides = [
    { name: 'Neem Oil', type: 'Organic', effectiveness: 'High' },
    { name: 'Chlorpyrifos', type: 'Chemical', effectiveness: 'Very High' },
    { name: 'Imidacloprid', type: 'Chemical', effectiveness: 'High' },
    { name: 'Spinosad', type: 'Biological', effectiveness: 'Medium' },
    { name: 'Pyrethrin', type: 'Organic', effectiveness: 'Medium' },
    { name: 'Deltamethrin', type: 'Chemical', effectiveness: 'Very High' },
    { name: 'Azadirachtin', type: 'Organic', effectiveness: 'Medium' },
    { name: 'Bacillus Thuringiensis', type: 'Biological', effectiveness: 'High' }
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
    
    // Generate single random crop suggestion
    const randomCrop = crops[Math.floor(Math.random() * crops.length)];
    const suitability = Math.floor(Math.random() * 80) + 20; // Random suitability percentage (20-100)
    
    setCropResult({
      district: cropForm.district,
      month: cropForm.month,
      soilType: cropForm.soilType,
      recommendedCrop: {
        name: randomCrop,
        suitability: suitability
      }
    });
  };

  const handlePesticideSubmit = (e) => {
    e.preventDefault();
    console.log('Pesticide Prediction Form:', pesticideForm);
    
    // Generate random pest and pesticide recommendation
    const randomPest = commonPests[Math.floor(Math.random() * commonPests.length)];
    const randomPesticide = pesticides[Math.floor(Math.random() * pesticides.length)];
    const severity = ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)];
    
    setPesticideResult({
      pest: randomPest,
      severity: severity,
      recommendedPesticide: randomPesticide,
      application: `Apply ${randomPesticide.name} every ${[3,5,7,10][Math.floor(Math.random() * 4)]} days for ${[1,2,3][Math.floor(Math.random() * 3)]} weeks`
    });
  };

  const handlePriceSubmit = (e) => {
    e.preventDefault();
    console.log('Price Prediction Form:', priceForm);
    
    // Generate random price prediction
    const basePrice = {
      'Rice': 1800, 'Wheat': 1600, 'Maize': 1500, 'Cotton': 5500, 'Sugarcane': 2800,
      'Groundnut': 4500, 'Pulses': 6000, 'Millets': 3500, 'Oilseeds': 5000, 'Vegetables': 2500,
      'Fruits': 4000, 'Spices': 8000, 'Flowers': 10000, 'Tea': 200, 'Coffee': 350
    };
    
    const base = basePrice[priceForm.crop] || 3000;
    const min = Math.floor(base * 0.8);
    const max = Math.floor(base * 1.2);
    const current = Math.floor(Math.random() * (max - min + 1)) + min;
    const trend = ['up', 'down', 'stable'][Math.floor(Math.random() * 3)];
    const percentage = Math.floor(Math.random() * 15) + 5;
    
    setPriceResult({
      crop: priceForm.crop,
      district: priceForm.district,
      currentPrice: current,
      priceRange: `${min} - ${max}`,
      trend: trend,
      percentageChange: percentage,
      suggestion: trend === 'up' ? 'Good time to sell' : trend === 'down' ? 'Consider waiting' : 'Prices stable'
    });
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
              Predict Suitable Crop
            </button>
          </form>

          {cropResult && (
            <div className="result-container">
              <h3>Recommended Crop for {cropResult.district} in {cropResult.month}</h3>
              <p>Soil Type: {cropResult.soilType}</p>
              <div className="crop-result">
                <div className="crop-name">{cropResult.recommendedCrop.name}</div>
                <div className="suitability-bar">
                  <div 
                    className="suitability-fill" 
                    style={{ width: `${cropResult.recommendedCrop.suitability}%` }}
                  ></div>
                  <span className="suitability-percent">{cropResult.recommendedCrop.suitability}% suitability</span>
                </div>
              </div>
            </div>
          )}
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

          {pesticideResult && (
            <div className="result-container">
              <h3>Pest Analysis</h3>
              <div className="pest-info">
                <p><strong>Identified Pest:</strong> {pesticideResult.pest}</p>
                <p><strong>Severity:</strong> <span className={`severity-${pesticideResult.severity.toLowerCase()}`}>
                  {pesticideResult.severity}
                </span></p>
              </div>
              
              <h4>Recommended Treatment</h4>
              <div className="pesticide-info">
                <p><strong>Pesticide:</strong> {pesticideResult.recommendedPesticide.name}</p>
                <p><strong>Type:</strong> {pesticideResult.recommendedPesticide.type}</p>
                <p><strong>Effectiveness:</strong> {pesticideResult.recommendedPesticide.effectiveness}</p>
                <p><strong>Application:</strong> {pesticideResult.application}</p>
              </div>
            </div>
          )}
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

          {priceResult && (
            <div className="result-container">
              <h3>Price Analysis for {priceResult.crop} in {priceResult.district}</h3>
              <div className="price-info">
                <p><strong>Current Price:</strong> ₹{priceResult.currentPrice}/quintal</p>
                <p><strong>Expected Range:</strong> ₹{priceResult.priceRange}/quintal</p>
                <p>
                  <strong>Trend:</strong> 
                  <span className={`trend-${priceResult.trend}`}>
                    {priceResult.trend} ({priceResult.percentageChange}%)
                  </span>
                </p>
                <p className="suggestion"><strong>Suggestion:</strong> {priceResult.suggestion}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;