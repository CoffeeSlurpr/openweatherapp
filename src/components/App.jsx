import React, { useState, useEffect } from 'react';
import { Button, Form, Container } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import weather from '../api/open-weather-map';
import unsplash from '../api/unsplash';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(false);
  const [backgroundImg, setBackgroundImg] = useState('');

  const handleSearch = () => {
    weather
      .get('', {
        params: {
          q: `${city}`,
        },
      })
      .then((result) => {
        if (result.data.sys.country !== 'HU') {
          return toast.error('This city is not located in Hungary');
        }
        setWeatherData(result.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error('City not found', {
          toastId: 'error',
        });
      });
  };

  useEffect(() => {
    if (weatherData) {
      unsplash
        .get('', { params: { query: weatherData.weather[0].description, orientation: 'landscape' } })
        .then((result) => {
          console.log(result.data);
          setBackgroundImg(result.data.urls.full);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [weatherData]);

  const renderData = () => {
    return (
      <Container>
        <div className="mt-2 mb-5 row">
          {/* main */}
          <div className="d-flex justify-content-center">
            <div className="fs-1">{weatherData.name}</div>
            <div className="fs-3 ms-2">{weatherData.sys.country}</div>
          </div>
          {/* sub-main */}
          <div className="mt-4 d-flex align-items-center justify-content-between">
            <div className="row">
              <div className="fs-1 fw-bold">{weatherData.main.temp.toFixed(1)}°C</div>
            </div>
            <div className="column text-end">
              <div className="fs-3">{weatherData.weather[0].main}</div>
              <div>{weatherData.weather[0].description}</div>
            </div>
          </div>
        </div>
        {/* other */}
        <div className="info d-flex justify-content-evenly text-center py-2">
          <div className="column">
            <div className="fw-bold fs-4">{weatherData.main.feels_like.toFixed(0)}°C</div>
            <div>Feels like</div>
          </div>
          <div className="column">
            <div className="fw-bold fs-4">{weatherData.main.humidity}%</div>
            <div>Humidity</div>
          </div>
          <div className="column">
            <div className="fw-bold fs-4">{weatherData.main.pressure} hPa</div>
            <div>Pressure</div>
          </div>
        </div>
        {/* wind */}
        <div className="mt-5 info d-flex justify-content-evenly text-center py-2">
          <div className="column">
            <div className="fw-bold fs-4">{weatherData.wind.speed} meter/sec</div>
            <div>Speed</div>
          </div>
          <div className="column">
            <div className="fw-bold fs-4">{weatherData.wind.deg}°</div>
            <div>Direction</div>
          </div>
        </div>
      </Container>
    );
  };

  return (
    <div
      className="custom-bg"
      style={backgroundImg ? { background: `url(${backgroundImg}) no-repeat center center fixed` } : {}}
    >
      <div className="blur w-50 m-auto pb-3">
        <Container fluid className="m-auto row justify-content-center">
          <Form className="w-50 row">
            <div className="d-flex">
              <h2>Weather App</h2>
              <div className="d-flex ms-1 align-items-end">Search only applies to the cities and towns of Hungary</div>
            </div>
            <Form.Control
              onChange={(e) => {
                setCity(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              value={city}
              type="text"
              placeholder="Enter a Location"
            ></Form.Control>
            <Button onClick={handleSearch} className="mt-2" variant="primary">
              Search
            </Button>
          </Form>
        </Container>
        {weatherData && renderData()}
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
