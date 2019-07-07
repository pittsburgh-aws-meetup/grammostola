import { Component } from 'preact';
import { Stretch } from 'styled-loaders';
import axios from 'axios';

import style from './style';

export default class Meetup extends Component {
	constructor() {
		super();
		this.state.meetups = [];
	}

	componentDidMount() {
		axios.get('https://api.meetup.com/Pittsburgh-Amazon-Web-Services-AWS-Users/events')
			.then(res => {
				const meetups = res.data;
				this.setState({meetups})
			})
	}


	render () {
		const meetupCount = this.state.meetups;
		let meetups;

		if (meetupCount.length <= 0) {
			meetups = <Stretch duration="2s" size="75px" color="#ff9900" />;
		}

		else {
			meetups = <MeetupWrapper meetups={this.state.meetups} />;
		}

		return (
			<div class={style.meetup}>
				<h1>Upcoming Meetups</h1>
				{meetups}
			</div>
		);
	}
}