import React from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import theme from '../style/theme';
import { spacedataElementStruct } from '../redux/modules/spacedata';

const Marker = (props) => {
  const color = props.highlight ? theme.palette.accent2Color : theme.palette.primary1Color;

  const style = {
    container: {
      display: 'flex',
    },
    logo: {
      width: '50px',
      marginRight: '5px',
    },
  };

  return (
    <CircleMarker
      fillColor={color}
      color={color}
      radius={5}
      center={[props.spacedata.location.lat, props.spacedata.location.lon]}
    >
      <Popup>
        <div style={style.container}>
          <div>
            {props.spacedata.space}
            <br />
            <a href={props.spacedata.url}>
              {props.spacedata.url}
            </a>
          </div>
        </div>
      </Popup>
    </CircleMarker>
  );
};

Marker.propTypes = {
  spacedata: spacedataElementStruct.isRequired,
  highlight: React.PropTypes.bool.isRequired,
};

export default Marker;
