import React, { PropTypes } from 'react';
import SpaceList from '../containers/SpaceList';
import SpaceApiInput from '../components/SpaceApiInput';

const SpaceListView = () => {
    return (
        <div>
            <SpaceList />
            <SpaceApiInput style={{ paddingTop: '50px' }} />
        </div>
    );
};

export default SpaceListView;