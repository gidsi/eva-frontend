import React from 'react';
import Toolbar from '../components/Toolbar';

const Layout = children => (
  () => (
    <div>
      <Toolbar />
      {children}
    </div>
  )
);

export default Layout;
