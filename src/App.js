import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './style/theme';
import store from './redux/store';
import IndexContainer from './views/Index';
import SpaceList from './views/SpaceList';
import UrlListView from './views/UrlListView';
import layout from './layout';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
    <Provider store={store}>
      <Router>
        <div>
          <Route path="/list" component={layout(<SpaceList />)} />
          <Route path="/urls" component={layout(<UrlListView />)} />
          <Route exact path="/" component={layout(<IndexContainer />)} />
        </div>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;