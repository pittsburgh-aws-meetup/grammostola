import { Component } from 'preact';
import { authorize, parseHash } from 'petite-auth';
import axios from 'axios';
import * as eventsResp from '../../../data/meetup_events_response.json';
import * as idResp from '../../../data/meetup_identity_response.json';
import { Meetup } from './meetup';

import style from './style.css';

export class MeetupFetcher extends Component {
	buildMeetups = (meetups) => meetups.map(mtup => (
		<Meetup data={mtup} id={this.state.identity} accessToken={this.state.accessToken} />)
	);

	getIdentity = () => {
		let headers = {
			Authorization: 'Bearer 0de1f0904a3d504932619d36fd2b44d9',
			'Cache-Control': 'no-cache'
		};

		let url = 'https://cors-anywhere.herokuapp.com/https://api.meetup.com/members/self';

		axios.get(url, { headers })
			.then( res => {
				let identity = res.data.id;
				localStorage.setItem('meetup_id', identity);
				this.setState({ identity });
			})
			.catch( () => {
				let identity = idResp.id;
				localStorage.setItem('meetup_id', identity);
				this.setState({ identity });
			});
	};

	getMeetups = () => {
		if (Date.now() > this.state.lastUpdate + 300000) {
			let headers = {
				Authorization: 'Bearer ' + this.state.accessToken,
				'Content-Type': 'application/json'
			};

			axios.get('https://cors-anywhere.herokuapp.com/https://api.meetup.com/Pittsburgh-Amazon-Web-Services-AWS-Users/events',
				{ headers })
				.then(res => {
					const meetups = this.buildMeetups(res);
					this.setState({ meetups, lastUpdate: Date.now() });
				})
				.catch(() => {
					const meetups = this.buildMeetups(eventsResp.data);
					this.setState({ meetups, lastUpdate: Date.now() });
				});
		}
		else {
			// eslint-disable-next-line no-console
			console.log('Not updating content due to 5 minute rule');
		}
	};

	handleAuthentication = () => {
		const authResult = parseHash();
		const expiresAt = (authResult.expires_in * 1000) + Date.now();
		let accessToken = authResult.access_token;
		localStorage.setItem('access_token', accessToken);
		localStorage.setItem('expires_at', expiresAt);
		this.setState({ expiresAt, accessToken, authenticated: true });
	};

	login = () => {
		let { callback_url, client_id } = this.props;
		console.log(`Callback URL: ${callback_url}`);
		authorize('https://secure.meetup.com/oauth2/authorize', {
			client_id,
			redirect_uri: callback_url,
			response_type: 'token',
			scope: 'ageless basic'
		});
	};

	logout = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('expires_at');
		this.setState({ accessToken: null, expiresAt: 0, authenticated: false });
	};

	constructor() {
		super();
		this.state.accessToken = localStorage.getItem('access_token');
		this.state.expiresAt = localStorage.getItem('expires_at') || 0;
		this.state.authenticated = Date.now() < this.state.expiresAt;
		this.state.meetups = [];
		this.state.lastUpdate = 0;
		this.state.identity = localStorage.getItem('meetup_id');
	}

	componentDidMount() {
		if (this.state.authenticated) {
			this.getMeetups();
			this.getIdentity();
		}
		else if (location.hash !== '') {
			this.handleAuthentication();
		}
	}

	componentDidUpdate(previousProps, previousState, previousContext) {
		if (this.state.authenticated && !previousState.authenticated) {
			this.getMeetups();
			this.getIdentity();
		}
	}

	render () {
		let buttonText = this.state.authenticated ? 'Logout' : 'Login';
		let buttonFn = this.state.authenticated ? this.logout : this.login;
		const content = this.state.meetups;
		let renderContent;

		if (!this.state.authenticated) {
			renderContent = ['Login to load MeetupFetcher content'];
		}
		else if (content.length < 1) {
			renderContent = this.props.spinner;
		}
		else {
			renderContent = content;
		}

		return (
			<div>
				<div>
					{renderContent}
				</div>
				<div className={style.buttonDiv}>
					<button className={style.meetupAuth} onClick={buttonFn}>{buttonText}</button>
				</div>
			</div>
		);
	}
}