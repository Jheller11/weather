import React from 'react'

const ForecastItem = props => {
  // all temps received in kelvin from api
  const kelvinToFahrenheit = temp => {
    return parseInt(temp * (9 / 5) - 459.67)
  }
  // convert date to string
  const msToString = milliseconds => {
    let dateTime = new Date(milliseconds * 1000)
    return dateTime.toString()
  }
  return (
    <div>
      <div>
        Weather: {props.data.weather[0].main} (
        {props.data.weather[0].description})
      </div>
      <div>Temperature: {kelvinToFahrenheit(props.data.main.temp)}</div>
      <div>Date/Time: {msToString(props.data.dt)}</div>
    </div>
  )
}

export default ForecastItem

// const data = {
//   dt: 1485799200,
//   main: {
//     temp: 283.76,
//     temp_min: 283.76,
//     temp_max: 283.761,
//     pressure: 1017.24,
//     sea_level: 1026.83,
//     grnd_level: 1017.24,
//     humidity: 100,
//     temp_kf: 0
//   },
//   weather: [
//     {
//       id: 800,
//       main: 'Clear',
//       description: 'clear sky',
//       icon: '01n'
//     }
//   ],
//   clouds: {
//     all: 0
//   },
//   wind: {
//     speed: 7.27,
//     deg: 15.0048
//   },
//   rain: {},
//   sys: {
//     pod: 'n'
//   },
//   dt_txt: '2017-01-30 18:00:00'
// }
