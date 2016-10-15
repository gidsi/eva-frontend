import React from 'react';
import {
  Toolbar as MuiToolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';

const Toolbar = () => (
  <MuiToolbar>
    <ToolbarTitle
      text={'CCC Spaces'}
    />
    <ToolbarGroup>
      <IconMenu
        iconButtonElement={
          <IconButton touch>
            <NavigationExpandMoreIcon />
          </IconButton>
        }
      >
        <Link to="/">
          <MenuItem
            primaryText={'Events'}
          />
        </Link>
        <Link to="/list">
          <MenuItem
            primaryText={'Spaces'}
          />
        </Link>
      </IconMenu>
    </ToolbarGroup>
  </MuiToolbar>
);

export default Toolbar;
