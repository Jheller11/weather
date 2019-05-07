import React, { Component, Fragment } from 'react'
import axios from 'axios'
import styles from './App.module.css'

// components
import LocationList from './components/LocationList/LocationList'
import CurrentWeatherContainer from './components/CurrentWeatherContainer/CurrentWeatherContainer'
import Navbar from 'react-bootstrap/Navbar'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      data: null,
      error: false,
      errorMessage: ''
    }
    this.getLocationFromBrowser = this.getLocationFromBrowser.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.getLocationFromZip = this.getLocationFromZip.bind(this)
    this.saveLocalStorage = this.saveLocalStorage.bind(this)
    this.loadLocalStorage = this.loadLocalStorage.bind(this)
    this.handleLocationButton = this.handleLocationButton.bind(this)
    this.deleteLocationItem = this.deleteLocationItem.bind(this)
  }

  componentDidMount() {
    this.loadLocalStorage()
  }

  // location list item buttons click event, set new data
  handleLocationButton(e) {
    let data = this.state.locations.filter(location => {
      return location.name === e.target.id
    })
    this.fetchWeather({
      latitude: data[0].coords.lat,
      longitude: data[0].coords.lon
    })
  }

  // delete button on location list, removes item from list
  deleteLocationItem(e) {
    let locations = this.state.locations
    let newLocations = locations.filter(location => {
      return location.name !== e.target.id
    })
    this.setState({ locations: newLocations })
    this.saveLocalStorage(newLocations)
  }

  // load location list from local storage if available
  loadLocalStorage() {
    // if localStorage has locations
    if (localStorage.locations) {
      // fetch array from local storage for locations
      let array = JSON.parse(localStorage.locations)
      // set state.locations based on pulled values if any
      if (array && array.length > 0) {
        this.setState({ locations: array })
      }
    }
  }

  // place state.locations into local storage
  saveLocalStorage(array) {
    if (array) localStorage.locations = JSON.stringify(array)
    else localStorage.locations = JSON.stringify(this.state.locations)
  }

  // handle click of 'Find me' button (user must allow)
  getLocationFromBrowser() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>
        this.fetchWeather(position.coords)
      )
    }
  }

  // handle zip form submission
  getLocationFromZip(e) {
    e.preventDefault()
    let form = e.target
    let zip = e.target.children[0].value
    form.reset()
    this.fetchWeather(zip)
  }

  // fetch weather based on zip or coordinates
  fetchWeather(location) {
    let key = process.env.REACT_APP_WEATHER_API_KEY
    // set request url based on type of location provided (zip vs browser geolocation)
    let url = location.latitude
      ? 'https://api.openweathermap.org/data/2.5/weather?' +
        `lat=${location.latitude}&lon=${location.longitude}` +
        `&APPID=${key}`
      : 'https://api.openweathermap.org/data/2.5/weather?' +
        `zip=${location},us` +
        `&APPID=${key}`
    // make request to openweather api
    axios
      .get(url)
      .then(res => {
        let locations = this.state.locations
        locations.unshift({
          name: res.data.name,
          coords: res.data.coord
        })
        // set state with returned data and limit location list to 10 items
        this.setState({ data: res.data, locations: locations.slice(0, 10) })
        // save location data to localStorage for future sessions
        this.saveLocalStorage()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          errorMessage: 'Something went wrong, please try again.'
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Navbar expand="md" bg="dark" variant="dark">
          <Navbar.Brand href="#">
            <img src={`favicon.ico`} alt="site icon" />
            {' Weather '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <Button
                variant="outline-info"
                onClick={this.getLocationFromBrowser}
                className="mx-5"
              >
                Locate Me
              </Button>
            </Form>
            <Form inline onSubmit={this.getLocationFromZip}>
              <FormControl
                type="text"
                placeholder="Zip Code"
                className="mr-sm-2"
              />
              <Button type="submit" variant="outline-info">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        {/* Main */}
        <main className={styles.App}>
          {!this.state.error ? null : (
            <Alert
              dismissible
              onClose={() => this.setState({ error: false, errorMessage: '' })}
              className="my-2"
              variant="warning"
            >
              Error: {this.state.errorMessage}
            </Alert>
          )}
          <LocationList
            locations={this.state.locations}
            handleClick={this.handleLocationButton}
            handleDelete={this.deleteLocationItem}
          />
          <hr />
          <CurrentWeatherContainer data={this.state.data} />
          {/* <ForecastContainer /> */}
        </main>
        {/* footer? */}
      </Fragment>
    )
  }
}

export default App
