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
