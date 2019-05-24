import React from 'react'
import Container from 'react-bootstrap/Container'

import ForecastItem from '../ForecastItem.js/ForecastItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

const ForecastContainer = props => {
  let showing = 5
  return (
    <Container>
      <h3>Hourly Forecast</h3>
      <ListGroup>
        {props.forecast
          ? props.forecast.list.map((item, i) => {
              if (i < showing) {
                return (
                  <ListGroup.Item key={item.dt}>
                    <ForecastItem data={item} />
                  </ListGroup.Item>
                )
              } else {
                return null
              }
            })
          : null}
      </ListGroup>
      <div className="d-flex justify-content-center mt-3">
        <Button onClick={() => (showing += 5)} variant="success">
          Load More
        </Button>
      </div>
    </Container>
  )
}

export default ForecastContainer
