import GoogleMapReact from 'google-map-react';
import { GOOGLE_API_KEY } from '../../service/api';
import { Component, createRef } from 'preact';

import style from './style.css';

const markerStyle = {
	position: 'absolute',
	transform: 'translate(-50%, -100%)',
	'z-index': '-1'
};

const infoStyle = {
	position: 'absolute',
	transform: 'translate(-50%, -151%)',
	width: 'max-content'
};

class PghInfoWindow extends Component {
	static defaultProps = {
		strokeWidthOffset: 1,
		minX: 0,
		minY: 0,
	};

	constructor() {
		super();
		this.state.height = 1000;
		this.state.width = 1000;
		this.sizingRef = createRef();
	}

	componentDidMount() {
		const { width, height } = this.sizingRef.current.getBoundingClientRect();
		// eslint-disable-next-line react/no-did-mount-set-state
		this.setState({ width, height });
	}

	render(props, state) {
		const calcMinX = props.minX - props.strokeWidthOffset;
		const calcMinY = props.minY - props.strokeWidthOffset;
		const viewBoxWidth = state.width + (2 * props.strokeWidthOffset);
		const viewBoxHeight = state.height + (2 * props.strokeWidthOffset);

		return (
			<div style={{ width: state.width, height: state.height }}>
				<svg viewBox={`${calcMinX} ${calcMinY} ${viewBoxWidth} ${viewBoxHeight}`}
					 xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" fill="#ff9900"
					 className={style.infoWindowBubble}
				>
					<rect width={state.width/2} height={state.height/2} rx="2"
						  style="fill:#262f3eff;stroke-width:2;stroke:#ffffff;stroke-linejoin:round"
					/>
				</svg>
				<ul ref={this.sizingRef} className={style.infoWindowText}>
					<a href={`https://www.google.com/maps/search/?api=1&query=${props.lat},${props.lng}`}>
						<li>{props.name}</li>
						<li>{props.address_1}</li>
						<li>{props.city + ', ' + props.state + ' ' + props.zip}</li>
					</a>
				</ul>
			</div>
		);
	}
}

class PghMarker extends Component {
	onclick = () => {
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

export const Location = (props) => {
	let map;
	let height;
	let margin;
	if (props.lat && props.lon) {
		map = <LocationMap center={{ lng: props.lon, lat: props.lat }} zoom={props.zoom} {...props} />;
		height = props.mapHeight;
		margin = '40px';
	}
	else {
		map = null;
		height = 0;
		margin ='0';
	}

	return (
		<div style={{ width: 'auto', height, margin, display: 'flex', 'justify-content': 'center' }}>
			{map}
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
			<PghMarker
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
