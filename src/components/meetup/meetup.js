import { Link } from 'preact-router';
import style from './style.css';
import { Location } from '../map';

export const Meetup = (props) => (
	<div className={style.meetup}>
		<div className={style.meetupDateTime}>
			<TimeDisplay
				date={props.data.local_date}
				time={props.data.local_time}
				offset={props.data.utc_offset}
				title={props.data.name}
				link={props.data.link}
				venue={props.data.venue}
				isOnline={props.data.is_online_event}
				onlineLink={props.data.how_to_find_us}
			/>
		</div>
		<Location mapHeight={'20em'} mapWidth={'50%'} zoom={14} {...props.data.venue} />
		<div className={style.meetupDescription}>
			{/* eslint-disable-next-line react/no-danger */}
			<span dangerouslySetInnerHTML={{ __html: props.data.description }} />
		</div>
	</div>
);

const Title = ({ children, ...props }) => {
	const subTitle = props.isOnline ? <OnlineLink name={props.venue.name} link={props.onlineLink} /> : <Address {...props.venue} />;

	return (
		<span className={style.innerTitle}>
			<Link activeClassName="active" href={props.link}>
				{props.text}
			</Link>
			{subTitle}
		</span>
	);
};

const Address = ({ name, address1, city, state, zip }) => {
	let address2 = '';
	if (city && state && zip) {
		address2 = city + ', ' + state + ' ' + zip;
	}

	if (!name) {
		name = '';
	}

	if (!address1) {
		address1 = '';
	}

	return (
		<ul className={style.addressul}>
			<li className={style.addressli}>{name}</li>
			<li className={style.addressli}>{address1}</li>
			<li className={style.addressli}>{address2}</li>
		</ul>
	);
};

const OnlineLink = ({ link, name }) => (
	<ul className={style.addressul}>
		<li className={style.addressli}>{name}</li>
		<li className={style.addressli}>
			<Link activeClassName="active" href={link}>
				<img className={style.video_call_img} src="/assets/images/video_call.png" alt="video_link" />
			</Link>
		</li>
	</ul>
);

const TimeDisplay = ({ children, ...props }) => {
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
					<Title
						link={props.link}
						class={style.title}
						text={props.title}
						venue={props.venue}
						isOnline={props.isOnline}
						onlineLink={props.onlineLink}
					/>
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
