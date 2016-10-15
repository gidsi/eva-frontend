import React from 'react';
import Map from '../components/Map';
import EventList from '../components/EventList';

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

const IndexContainer = () => (
  <div style={style.container}>
    <Map />
    <EventList />
  </div>
);

export default IndexContainer;
