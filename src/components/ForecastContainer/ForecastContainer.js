// plan out 2nd api call based on App.state.data or App.fetchWeather()

// design container to request/hold forecast data returned

// design UI components to display forecast (Forecast window)

import React from 'react'
import Container from 'react-bootstrap/Container'
import Badge from 'react-bootstrap/Badge'

const ForecastContainer = props => {
  return (
    <Container>
      <h3>
        Hourly Forecast <Badge variant="primary">Coming Soon</Badge>
      </h3>
    </Container>
  )
}

export default ForecastContainer
