import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import axios from 'axios'
import ForecastItem from '../ForecastItem.js/ForecastItem'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import querystring from 'querystring'

class ForecastContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      showing: 5
    }
  }

  componentDidMount() {
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?' +
      `lat=${this.props.coords.lat}&lon=${this.props.coords.lon}`
    axios
      .post(
        'http://localhost:4000/weather/forecast',
        querystring.stringify({ url: url })
      )
      .then(res => this.setState({ data: res.data }))
      .catch(err => console.log(err))
  }

  render() {
    return (
      <Container>
        <h3>Hourly Forecast</h3>
        <ListGroup>
          {this.state.data
            ? this.state.data.list.map((item, i) => {
                if (i < this.state.showing) {
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
          <Button
            onClick={() => this.setState({ showing: this.state.showing + 5 })}
            variant="success"
          >
            Load More
          </Button>
        </div>
      </Container>
    )
  }
}

export default ForecastContainer
