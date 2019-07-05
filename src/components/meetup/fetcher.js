import { Component } from 'preact';
import jsonp from 'jsonp';
import { Meetup } from './meetup';

const meetupRefreshTime = 300000; // 5 minutes * 60 seconds * 1000 milliseconds

export class MeetupFetcher extends Component {
	buildMeetups = (meetups) => meetups.map(mtup => (
		<Meetup data={mtup} id={this.state.identity} accessToken={this.state.accessToken} />)
	);

	getMeetups = () => {
		if (Number(Date.now()) > Number(this.state.lastUpdate) + meetupRefreshTime) {
			let url = 'https://api.meetup.com/Pittsburgh-Amazon-Web-Services-AWS-Users/events';

			jsonp(url, null, (err, data) => {
				if (err) {
					console.error(err.message);
				}
				else {
					let meetups = this.buildMeetups(data.data);
					let lastUpdate = Number(Date.now());
					localStorage.setItem('meetups', JSON.stringify(data.data));
					localStorage.setItem('last_meetup_update', lastUpdate);
					this.setState({ meetups, lastUpdate });
				}
			});
		}
		else {
			// eslint-disable-next-line no-console
			console.log(`Not updating content due to ${meetupRefreshTime / 60000} minute rule`);
		}
	};

	constructor() {
		super();
		let meetups = localStorage.getItem('meetups');
		this.state.meetups = meetups ? this.buildMeetups(JSON.parse(meetups)) : [];
		this.state.lastUpdate = localStorage.getItem('last_meetup_update') || 0;
	}

	componentDidMount() {
		this.getMeetups();
	}

	render(props, state) {
		return (
			<div>
				<div>
					{state.meetups}
				</div>
			</div>
		);
	}
}