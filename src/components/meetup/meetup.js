import { Component } from 'preact';
import { Link } from 'preact-router';
import axios from 'axios';
import { CheckCircle, XCircle } from 'preact-feather';

import style from './style.css';
import * as rsvpResp from '../../../data/meetup_rsvp_response';
import { Location } from '../map';

export class Meetup extends Component {
	getRsvp = () => {
		let headers = { Authorization: 'Bearer ' + this.props.accessToken };
		let uri = 'https://api.meetup.com/Pittsburgh-Amazon-Web-Services-AWS-Users/events/'
			+ this.props.data.id + '/rsvps';
		axios.get(uri, { headers })
			.then( res => {
				let data = res;
				// eslint-disable-next-line eqeqeq
				let record = data.filter(rsvp => rsvp.member.id == this.props.id);
				let rsvp = record.length > 1 ? record.pop().response : null;
				this.setState({ rsvp });
			})
			.catch(() => {
				let data = rsvpResp.data;
				// eslint-disable-next-line eqeqeq
				let record = data.filter(rsvp => rsvp.member.id == this.props.id);
				let rsvp = record.pop().response;
				this.setState({ rsvp });
			});
	};

	postRsvp = (rsvp) => {
		let headers = {
			Authorization: 'Bearer ' + this.props.accessToken,
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		let uri = 'https://api.meetup.com/Pittsburgh-Amazon-Web-Services-AWS-Users/events/'
			+ this.props.data.id + '/rsvps';
		let body = { response: rsvp };
		axios.post(uri, body, { headers })
			.then( res => {
				let rsvp = res.response;
				this.setState({ rsvp });
			})
			.catch( err => {
				console.log(err);
				this.setState({ rsvp: null });
			});
	};

	rsvpNo = () => this.postRsvp('no');
	rsvpYes = () => this.postRsvp('yes');

	constructor() {
		super();
		this.state.rsvp = null;
	}

	componentDidMount() {
		this.getRsvp();
	}

	render(props, state) {
		return (
			<div className={style.meetup}>
				<div className={style.meetupDateTime}>
					<TimeDisplay
						date={props.data.local_date}
						time={props.data.local_time}
						offset={props.data.utc_offset}
						title={props.data.name}
						link={props.data.link}
					/>
				</div>
				<Location mapHeight={'20em'} mapWidth={'50%'} zoom={14} {...props.data.venue} />
				<div className={style.meetupDescription}>
					{/* eslint-disable-next-line react/no-danger */}
					<span dangerouslySetInnerHTML={{ __html: props.data.description }} />
				</div>
				<div>
					<YesButton rsvp={state.rsvp} onClick={this.rsvpYes}>
						<CheckCircle /> <span className={style.buttonText}>Yes, I will attend.</span>
					</YesButton>
					<NoButton rsvp={state.rsvp} onClick={this.rsvpNo}>
						<XCircle /> <span className={style.buttonText}>No, I will not attend.</span>
					</NoButton>
				</div>
			</div>
		);
	}
}

const Title = ({ children, ...props }) => (
	<span className={style.innerTitle}>
		<Link activeClassName="active" href={props.link}>
			{props.text}
		</Link>
	</span>);

const TimeDisplay = ({ children, ...props }) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
	let dateTimeString = props.date + 'T' + props.time;
	let dateObj = new Date(dateTimeString);
	let hour = dateObj.getHours() % 12;
	let meridiem = (dateObj.getHours() / 12) > 0;

	return (
		<div>
			<div className={style.titleWrapper}>
				<DateComponent
					month={months[dateObj.getMonth()]}
					day={dateObj.getDate()}
					dayOfWeek={days[dateObj.getDay()]}
				/>
				<span className={style.title}>
					<Title link={props.link} class={style.title} text={props.title} />
				</span>
				<TimeComponent hour={hour} meridiem={meridiem} />
			</div>
		</div>
	);
};

const DateComponent = ({ children, ...props }) => (
	<div className={style.dateComponent}>
		<span className={style.dayOfWeek}>{props.dayOfWeek}</span>
		<span className={style.day}>{props.day}</span>
		<span className={style.month}>{props.month}</span>
	</div>
);

const TimeComponent = ({ children, ...props }) => {
	const meridiem = props.meridiem ? 'PM' : 'AM';

	return (
		<div className={style.timeComponent}>
			<span className={style.hour}>{props.hour}</span>
			<span className={style.meri}>{meridiem}</span>
		</div>
	);
};

const YesButton = ({ children, ...props }) => {
	let buttonClass = props.rsvp === 'yes' ? style.yesButtonSelected : style.yesButton;
	return (
		<button className={buttonClass} onClick={props.onClick}>{children}</button>
	);
};

const NoButton = ({ children, ...props }) => {
	let buttonClass = props.rsvp === 'no' ? style.noButtonSelected : style.noButton;
	return (
		<button className={buttonClass} onClick={props.onClick}>{children}</button>
	);
};
