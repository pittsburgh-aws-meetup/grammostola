import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../service/api';

import style from './style.css';

const markerStyle = {
	position: 'absolute',
	transform: 'translate(-50%, -100%)'
};

const PghMarker = ({ children, ...props }) => (
	<div style={markerStyle}>
		<img width={props.width} height={props.height} src={props.src} alt="pgh" />
	</div>
);

export const LocationMap = ({ children, ...props }) => (
	<div style={style.mapContainer}>
		<GoogleMapReact
			bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
			defaultCenter={props.center}
			defaultZoom={props.zoom}
			yesIWantToUseGoogleMapApiInternals
		/>
	</div>
);

/*	<PghMarker
				lat={props.center.lat}
				lng={props.center.lng}
				width={46}
				height={60}
				src="/assets/images/pgh-smile-marker.png"
			/>
		</GoogleMapReact> */
