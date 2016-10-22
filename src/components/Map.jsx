import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import { connect } from 'react-redux';
import Marker from './Marker';
import { actions as spaceDataActions, spacedataStruct } from '../redux/modules/spacedata';

const mapStateToProps = state => ({
  spacedata: state.spacedata,
});

const mapDispatchToProps = {
  ...spaceDataActions,
};

class Map extends React.Component {
  static propTypes = {
    spacedata: spacedataStruct.isRequired,
    fetchSpacedata: React.PropTypes.func.isRequired,
    toggleFilterSpacedata: React.PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.fetchSpacedata();
  }

  render() {
    const centerGermany = [51.163375, 10.447683];
    return (
      <LeafletMap
        center={centerGermany}
        zoom={5}
        style={{ width: '100vw', height: '50vh', margin: 0, padding: 0, maxWidth: '100%' }}
      >
        <TileLayer
          url="https://spaceapi.ccc.de/map/tiles/{z}/{x}/{y}.png"
        />
        {this.props.spacedata.items.map(
          spacedata => (
            <Marker
              spacedata={spacedata}
              key={spacedata.space}
              highlight={
                this.props.spacedata.filter.length === 0
                || this.props.spacedata.filter.indexOf(spacedata.space) !== -1}
              toggleFilterSpacedata={this.props.toggleFilterSpacedata}
            />
          )
        )}
      </LeafletMap>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
