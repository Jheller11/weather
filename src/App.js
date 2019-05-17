import React, { Component, Fragment } from 'react'
import axios from 'axios'
import styles from './App.module.css'
import querystring from 'querystring'

// components
import LocationList from './components/LocationList/LocationList'
import CurrentWeatherContainer from './components/CurrentWeatherContainer/CurrentWeatherContainer'
import Navbar from 'react-bootstrap/Navbar'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ForecastContainer from './components/ForecastContainer/ForecastContainer'
import ThemeToggler from './components/ThemeToggler/ThemeToggler'
import { Helmet } from 'react-helmet'
import Container from 'react-bootstrap/Container'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      data: null,
      error: false,
      errorMessage: '',
      light: true
    }
    this.getLocationFromBrowser = this.getLocationFromBrowser.bind(this)
    this.fetchWeather = this.fetchWeather.bind(this)
    this.getLocationFromZip = this.getLocationFromZip.bind(this)
    this.saveLocalStorage = this.saveLocalStorage.bind(this)
    this.loadLocalStorage = this.loadLocalStorage.bind(this)
    this.handleLocationButton = this.handleLocationButton.bind(this)
    this.deleteLocationItem = this.deleteLocationItem.bind(this)
    this.toggleTheme = this.toggleTheme.bind(this)
    this.clearLocalStorage = this.clearLocalStorage.bind(this)
  }

  componentDidMount() {
    this.loadLocalStorage()
  }

  toggleTheme(e) {
    if (e.target.id === 'dark' && this.state.light) {
      this.setState({
        light: false
      })
    } else if (e.target.id === 'light' && !this.state.light) {
      this.setState({
        light: true
      })
    }
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

  // clear all local storage
  clearLocalStorage() {
    this.setState({ locations: [], data: null })
    localStorage.locations = []
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
    // set request url based on type of location provided (zip vs browser geolocation)
    let requestURL = location.latitude
      ? 'https://api.openweathermap.org/data/2.5/weather?' +
        `lat=${location.latitude}&lon=${location.longitude}`
      : 'https://api.openweathermap.org/data/2.5/weather?' +
        `zip=${location},us`
    // determine server address based on production/dev
    let serverURL =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:4000/weather/forecast'
        : process.env.REACT_APP_NODE_SERVER_URL
    // send request for data to node server
    axios
      .post(serverURL, querystring.stringify({ url: requestURL }))
      .then(res => {
        let locations = this.state.locations
        locations.unshift({
          name: res.data.name,
          coords: res.data.coord
        })
        // function for removing duplicate items in the array
        // credit https://ilikekillnerds.com/2016/05/removing-duplicate-objects-array-property-name-javascript/
        const removeDuplicates = (arr, prop) => {
          return arr.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
          })
        }
        let newLocations = removeDuplicates(locations, 'name')
        // set state with returned data and limit location list to 10 items
        this.setState({
          data: res.data,
          locations: newLocations.slice(0, 10),
          error: false,
          errorMessage: ''
        })
        // save location data to localStorage for future sessions
        this.saveLocalStorage()
      })
      .catch(err => {
        console.log(err)
        this.setState({
          error: true,
          errorMessage:
            'Something went wrong, please try again. If searching by zip code, please ensure that you enter a valid 5-digit US zip code.'
        })
      })
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          {this.state.light ? (
            <link
              href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/flatly/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-T5jhQKMh96HMkXwqVMSjF3CmLcL1nT9//tCqu9By5XSdj7CwR0r+F3LTzUdfkkQf"
              crossorigin="anonymous"
            />
          ) : (
            <link
              href="https://stackpath.bootstrapcdn.com/bootswatch/4.3.1/darkly/bootstrap.min.css"
              rel="stylesheet"
              integrity="sha384-w+8Gqjk9Cuo6XH9HKHG5t5I1VR4YBNdPt/29vwgfZR485eoEJZ8rJRbm3TR32P6k"
              crossorigin="anonymous"
            />
          )}
          {this.state.data ? (
            <title>{this.state.data.name} Weather</title>
          ) : (
            <title>Jeff's Weather App</title>
          )}
        </Helmet>
        {/* header */}
        <Navbar expand="md" bg="light" variant="light" className="pl-5">
          <Navbar.Brand href="#">
            <img src={`favicon.ico`} alt="site icon" />
            {' Weather '}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline className="ml-auto">
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
                style={{ maxWidth: '200px' }}
              />
              <Button type="submit" variant="outline-info">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>

        {/* /header */}
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
          <hr />
          {this.state.data ? (
            <>
              <ForecastContainer coords={this.state.data.coord} />
              <hr />
            </>
          ) : null}
          <Container>
            <h6>Settings</h6>
            <span>Theme: </span>
            <ThemeToggler toggler={this.toggleTheme} />
            <div>
              <span>Clear location history: </span>
              <Button
                onClick={this.clearLocalStorage}
                variant="warning"
                size="sm"
              >
                Clear
              </Button>
            </div>
          </Container>
        </main>
        {/* /main */}

        {/* footer? */}
      </Fragment>
    )
  }
}

export default App
