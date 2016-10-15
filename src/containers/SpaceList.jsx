import { connect } from 'react-redux';
import { actions as spaceActions } from '../redux/modules/spacedata';
import Component from '../components/SpaceList';

const mapStateToProps = state => ({
  spacedata: state.spacedata,
});

const mapDispatchToProps = {
  ...spaceActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
