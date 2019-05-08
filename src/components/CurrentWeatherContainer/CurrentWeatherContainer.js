import React from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Map from '../Map/Map'
import Icon from '../Icon/Icon'

const CurrentWeatherContainer = props => {
  // all temps received in kelvin from api
  const kelvinToFahrenheit = temp => {
    return parseInt(temp * (9 / 5) - 459.67)
  }
  // convert date to string
  const msToString = milliseconds => {
    let dateTime = new Date(milliseconds * 1000)
    return dateTime.toString()
  }
  if (!props.data) {
    return <Container>No location selected</Container>
  } else {
    return (
      <Container>
        <Row>
          <Col sm={6}>
            <h4>Current weather for: {props.data.name}</h4>
            <div>Weather: {props.data.weather[0].main}</div>
            <div>Description: {props.data.weather[0].description}</div>
            <div>Temperature: {kelvinToFahrenheit(props.data.main.temp)}</div>
            <div>
              High/Low: {kelvinToFahrenheit(props.data.main.temp_max)} /{' '}
              {kelvinToFahrenheit(props.data.main.temp_min)}
            </div>
            <div>Winds: {props.data.wind.speed} m/s</div>
            <div>Humidity: {props.data.main.humidity}%</div>
            <div>Cloud Cover: {props.data.clouds.all}%</div>
            <hr />
            <small className="text-info">
              Data current as of {msToString(props.data.dt)}
            </small>
          </Col>
          <Col sm={6}>
            <h4>Location</h4>
            <Icon />
            <Map
              isMarkerShown
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${
                process.env.REACT_APP_MAPS_API_KEY
              }`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              coords={props.data.coord}
            />
            <div>
              Longitude: {props.data.coord.lon} / Latitude:{' '}
              {props.data.coord.lat}
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default CurrentWeatherContainer

// // sample api data response for designing views
// const sampleData = {
//   coord: { lon: -0.13, lat: 51.51 },
//   weather: [
//     {
//       id: 300,
//       main: 'Drizzle',
//       description: 'light intensity drizzle',
//       icon: '09d'
//     }
//   ],
//   base: 'stations',
//   main: {
//     temp: 280.32,
//     pressure: 1012,
//     humidity: 81,
//     temp_min: 279.15,
//     temp_max: 281.15
//   },
//   visibility: 10000,
//   wind: { speed: 4.1, deg: 80 },
//   clouds: { all: 90 },
//   dt: 1485789600,
//   sys: {
//     type: 1,
//     id: 5091,
//     message: 0.0103,
//     country: 'GB',
//     sunrise: 1485762037,
//     sunset: 1485794875
//   },
//   id: 2643743,
//   name: 'London',
//   cod: 200
// }
