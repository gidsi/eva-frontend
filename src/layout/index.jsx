import React from 'react';
import Toolbar from '../components/Toolbar';

const Layout = (children) => (
	 class LayoutComponent extends  React.Component {
		render () {
			return (
				<div>
					<Toolbar />
					{children}
				</div>
			);
		}
	}
);

export default Layout;
