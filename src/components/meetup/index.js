import { Component } from 'preact';
import { Stretch } from 'styled-loaders';

import style from './style';

export default class Meetup extends Component {
	constructor() {
		super();
		this.state.meetups = [];
	}


	render () {
		const meetupCount = this.state.meetups;
		let meetups;

		if (meetupCount.length <= 0) {
			meetups = <Stretch duration="4s" size="150px" color="#ff9900" rectWidth="1px" />;
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