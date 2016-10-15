import React from 'react';
import { CircleMarker } from 'react-leaflet';
import theme from '../style/theme';

const Marker = (props) => {
  const handleClick = () => {
    props.toggleFilterSpacedata(props.spacedata.space);
  };

  const color = props.highlight ? theme.palette.accent2Color : theme.palette.primary1Color;

  return (
    <CircleMarker
      onClick={handleClick}
      fillColor={color}
      color={color}
      center={[props.spacedata.location.lat, props.spacedata.location.lon]}
    />
  );
};

Marker.propTypes = {
  spacedata: React.PropTypes.objectOf({
    space: React.PropTypes.string.isRequired,
    location: React.PropTypes.objectOf({
      lat: React.PropTypes.number.isRequired,
      lon: React.PropTypes.number.isRequired,
    }),
  }).isRequired,
  highlight: React.PropTypes.bool.isRequired,
  toggleFilterSpacedata: React.PropTypes.func.isRequired,
};

export default Marker;
