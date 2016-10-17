import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { syncHistoryWithStore } from 'react-router-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './style/theme';
import store from './redux/store';
import IndexContainer from './views/Index';
import SpaceList from './views/SpaceList';
import UrlListView from './views/UrlListView';
import layout from './layout';

import './core.scss';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/list" component={layout(<SpaceList />)} />
        <Route path="/urls" component={layout(<UrlListView />)} />
        <Route path="*" component={layout(<IndexContainer />)} />
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
