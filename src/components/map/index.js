import { Component } from 'preact';
import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../service/api';

export class MapContainer extends Component {
	render(props, state) {
		return (
			<div style={{ height: '100vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
					defaultCenter={props.center}
					defaultZoom={props.zoom}
				>
					<span lat={props.center.lat} lng={props.center.lng}>hi</span>
				</GoogleMapReact>
			</div>
		);
	}
}
