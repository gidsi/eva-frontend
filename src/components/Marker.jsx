import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import theme from '../style/theme';
import { spacedataElementStruct } from '../redux/modules/spacedata';

const Marker = (props) => {
  const handleClick = () => {
    // props.toggleFilterSpacedata(props.spacedata.space);
  };

  const color = props.highlight ? theme.palette.accent2Color : theme.palette.primary1Color;

  return (
    <CircleMarker
      onClick={handleClick}
      fillColor={color}
      color={color}
      radius={3}
      center={[props.spacedata.location.lat, props.spacedata.location.lon]}
    >
      <Popup>
        <span>
          {props.spacedata.space}
          <br />
        <a href={props.spacedata.url}>
          {props.spacedata.url}
        </a>
        </span>
      </Popup>
    </CircleMarker>
  );
};

Marker.propTypes = {
  spacedata: spacedataElementStruct.isRequired,
  highlight: React.PropTypes.bool.isRequired,
  toggleFilterSpacedata: React.PropTypes.func.isRequired,
};

export default Marker;
