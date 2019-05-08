import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

const ThemeToggler = props => {
  return (
    <ButtonGroup>
      <Button onClick={props.toggler} size="sm" variant="light">
        Light
      </Button>
      <Button onClick={props.toggler} size="sm" variant="dark">
        Dark
      </Button>
    </ButtonGroup>
  )
}

export default ThemeToggler
