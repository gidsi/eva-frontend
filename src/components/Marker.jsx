import React from 'react';
import { CircleMarker } from 'react-leaflet';
import theme from '../style/theme';
import { spacedataElementStruct } from '../redux/modules/spacedata';

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
      radius={2}
      center={[props.spacedata.location.lat, props.spacedata.location.lon]}
    />
  );
};

Marker.propTypes = {
  spacedata: spacedataElementStruct.isRequired,
  highlight: React.PropTypes.bool.isRequired,
  toggleFilterSpacedata: React.PropTypes.func.isRequired,
};

export default Marker;
