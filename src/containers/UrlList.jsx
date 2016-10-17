import { connect } from 'react-redux';
import { actions as spaceUrlActions } from '../redux/modules/spaceurl';
import Component from '../components/UrlList';

const mapStateToProps = state => ({
  spaceurls: state.spaceurls,
});

const mapDispatchToProps = {
  ...spaceUrlActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
