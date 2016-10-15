import React from 'react';
import SpaceList from '../containers/SpaceList';
import SpaceApiInput from '../components/SpaceApiInput';

const SpaceListView = () => (
  <div>
    <SpaceList />
    <SpaceApiInput style={{ paddingTop: '50px' }} />
  </div>
);

export default SpaceListView;
