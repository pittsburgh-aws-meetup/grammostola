import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import { GOOGLE_API_KEY } from '../../service/api';

const markerStyle = {
	position: 'absolute',
	transform: 'translate(-50%, -100%)'
};

const AnyReactComponent = ({ src }) => <div style={markerStyle}><img width="46" height="60" src={src} /></div>;

require('preact/debug');

class SimpleMap extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 11
	};

	render() {
		return (
			// Important! Always set the container height explicitly
			<div style={{ height: '100vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}
					yesIWantToUseGoogleMapApiInternals
				>
					<AnyReactComponent
						lat={59.955413}
						lng={30.337844}
						src="/assets/images/pgh-smile-marker.png"
					/>
				</GoogleMapReact>
			</div>
		);
	}
}

export default SimpleMap;