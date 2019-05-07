import React from 'react'

// components
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

const LocationList = props => {
  return (
    <Container>
      <p className="mt-3">Recently viewed locations:</p>
      {props.locations.map((location, i) => {
        return (
          <ButtonGroup className="mr-2 my-2" key={i}>
            <Button
              onClick={props.handleClick}
              id={location.name}
              variant="secondary"
            >
              {location.name}
            </Button>
            <Button
              onClick={props.handleDelete}
              id={location.name}
              variant="outline-danger"
            >
              X
            </Button>
          </ButtonGroup>
        )
      })}
    </Container>
  )
}

export default LocationList

// Receives list of locations as props.  Renders one LocationItem per location
