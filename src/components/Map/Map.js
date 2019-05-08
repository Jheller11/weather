import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import React from 'react'

const Map = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        key={props.coords.lat}
        defaultZoom={12}
        defaultCenter={{ lat: props.coords.lat, lng: props.coords.lon }}
      >
        {props.isMarkerShown && (
          <Marker position={{ lat: props.coords.lat, lng: props.coords.lon }} />
        )}
      </GoogleMap>
    )
  })
)

export default Map
