import React from 'react'

const Instructions = () => {
  return (
    <div>
      <p className="text-danger">No location currently selected.</p>
      <p className="text-info">
        To view weather information use any of the following options:
      </p>
      <ol>
        <li>
          Click the 'Locate Me' button in the navigation bar (you must allow
          location services in your browser).
        </li>
        <li>
          Enter your zip code in the navigation bar and click Search (US only).
        </li>
        <li>
          If you've used the application before, select any of the 'Recently
          viewed locations' to pull up current weather information.
        </li>
      </ol>
    </div>
  )
}

export default Instructions
