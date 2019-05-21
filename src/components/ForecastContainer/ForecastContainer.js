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
    // reqeust URL provided to server to request external resource
    let requestURL =
      'https://api.openweathermap.org/data/2.5/forecast?' +
      `lat=${this.props.coords.lat}&lon=${this.props.coords.lon}`
    // determine server address based on production/dev
    let serverURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/weather/forecast'
        : process.env.REACT_APP_NODE_SERVER_URL + '/weather/forecast'
    // send request for data to node server
    axios
      .post(serverURL, querystring.stringify({ url: requestURL }))
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
