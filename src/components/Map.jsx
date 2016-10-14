import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import Marker from './Marker';
import { actions as spaceDataActions } from '../redux/modules/spacedata';

const mapStateToProps = (state) => {
  return {
    spacedata: state.spacedata,
  }
};

const mapDispatchToProps = {
  ...spaceDataActions
};

export class Map extends React.Component {
  static props = {
    spacedata: React.PropTypes.array.isRequired,
    fetchSpacedata: React.PropTypes.func.isRequired,
    toggleFilterSpacedata: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchSpacedata();
  }

  render() {
    const centerGermany = [51.163375, 10.447683];
    return(
      <LeafletMap
          center={centerGermany}
          zoom={5}
          style={{ width: '100vw', height: '50vh', margin: 0, padding: 0, maxWidth: '100%', }}
      >
        <TileLayer
            // url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            // url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            url='http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
        />
        {this.props.spacedata.items.map((spacedata) => {
          return (
              <Marker
                  spacedata={spacedata}
                  key={spacedata.space}
                  highlight={this.props.spacedata.filter.length === 0 || this.props.spacedata.filter.indexOf(spacedata.space) !== -1}
                  toggleFilterSpacedata={this.props.toggleFilterSpacedata}
              />
          );
        })}
      </LeafletMap>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);