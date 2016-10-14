import React, { PropTypes } from 'react';
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

const IndexContainer = (props) => (
	<div style={style.container}>
		<Map />
		<EventList />
	</div>
);

export default IndexContainer;