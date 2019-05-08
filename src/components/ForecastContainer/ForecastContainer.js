// plan out 2nd api call based on App.state.data or App.fetchWeather()

// design container to request/hold forecast data returned

// design UI components to display forecast (Forecast window)

import React from 'react'
import Container from 'react-bootstrap/Container'

const ForecastContainer = props => {
  return (
    <Container>
      <h4>
        Hourly Forecast <span className="badge badge-primary">Coming Soon</span>
      </h4>
    </Container>
  )
}

export default ForecastContainer
