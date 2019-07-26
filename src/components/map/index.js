import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../service/api';
import { Component } from 'preact';

import style from './style.css';

const markerStyle = {
	position: 'absolute',
	transform: 'translate(-50%, -100%)'
};

const infoStyle = {
	position: 'absolute',
	transform: 'translate(-50%, 0%)',
	width: 'max-content'
}

const PghMarker = (props) => (
	<div style={markerStyle}>
		<img width={props.width} height={props.height} src={props.src} alt="pgh" />
	</div>
);

const PghInfoWindow = ({ name, address_1, city, state, zip }) => (
	<div>
		<svg viewBox="-5 -5 155 155" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" fill="#ff9900">
			<rect width="150" height="100" rx="15"
				  style="fill:#262f3eff;stroke-width:10;stroke:#ffffff;stroke-linejoin:round"/>
			<text x="10" y="20">{name}</text>
			<text x="10" y="40">{address_1}</text>
			<text x="10" y="60">{city + ', ' + state + ' ' + zip}</text>
		</svg>
		<div>
			<div>{name}</div>
			<div>{address_1}</div>
			<div>{city + ', ' + state + ' ' + zip}</div>
		</div>
	</div>
);

class PghMarker2 extends Component {
	onclick = () => {
		console.log('clicked pghmarker2');
		this.setState({ open: !this.state.open });
	};

	constructor() {
		super();
		this.state.open = false;
	}

	render({width, height, src, ...other}, { open, ...state }) {
		const infoWindow = open ? <PghInfoWindow className={style.infoWindow} width={200} {...other} /> : null;
		return (
			<div className={style.markerDiv}>
				<div onClick={this.onclick} style={infoStyle}>
					{infoWindow}
				</div>
				<div onClick={this.onclick} style={markerStyle}>
					<img width={width} height={height} src={src} alt="pgh"/>
				</div>
			</div>
		);
	}
}

export class Location extends Component {
	static defaultProps = {
		lat: 40.441794,
		lon: -80.012337,
		zoom: 4
	};

	constructor() {
		super();
	}

	render (props, state) {
		return (
			<div style={{ width: 'auto', height: props.mapHeight, margin: '40px', display: 'flex' }}>
				<LocationMap center={{ lng: props.lon, lat: props.lat }} zoom={props.zoom} {...props} />
				<LocationText {...props} />
			</div>
		);
	}
}

// eslint-disable-next-line camelcase
const LocationText = (props) => {
	let { name, city, state, zip } = props;
	let address = props.address_1;
	let coarseAddressLine = city + ', ' + state + ' ' + zip;

	return (
		<div className={style.locationText}>
			<div>
				{name}
			</div>
			<div>
				{address}
			</div>
			<div>
				{coarseAddressLine}
			</div>
		</div>
	);
};

export const LocationMap = ({ center, zoom, ...other }) => (
	<div className={style.mapContainer}>
		<GoogleMapReact
			bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
			defaultCenter={center}
			defaultZoom={zoom}
			yesIWantToUseGoogleMapApiInternals
		>
			<PghMarker2
				lat={center.lat}
				lng={center.lng}
				width={46}
				height={60}
				src="/assets/images/pgh-smile-marker.png"
				{...other}
			/>
		</GoogleMapReact>
	</div>
);
