import { Component } from 'preact/dist/preact';
import { Sidebar as SidebarIcon, Square } from 'preact-feather';
import { Social } from '../social';

import style from './style.css';

export default class Sidebar extends Component {
	toggleState = () => {
		let newState = !this.state.open;
		localStorage.setItem('side_bar_state', newState);
		this.setState({ open: newState });
	};

	constructor() {
		super();
		if (typeof window !== 'undefined') {
			this.state.open = (localStorage.getItem('side_bar_state') === 'true');
		}
		else {
			this.state.open = false;
		}
	}

	render(props, state) {
		let kids = state.open ? props.children : null;
		let icon = state.open ?
			<Square onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} /> :
			<SidebarIcon onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} />;
		let styleClass = state.open ? style.open : style.closed;
		let social = state.open ? <Social twitterId="pghAws" fbGrpId="114289666064561" size="32" color="#ff9900ff" /> : null;
		return (
			<div className={styleClass}>
				<div>
					{icon}
				</div>
				<div className={style.kids}>
					{kids}
					{social}
				</div>
			</div>
		);
	}
}