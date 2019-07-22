import { Component } from 'preact/dist/preact';
import { Sidebar as SidebarIcon, Square } from 'preact-feather';

import style from './style.css';

export default class Sidebar extends Component {
	toggleState = () => {
		let newState = !this.state.open;
		localStorage.setItem('side_bar_state', newState);
		this.setState({ open: newState });
	};

	constructor() {
		super();
		this.state.open = (localStorage.getItem('side_bar_state') === 'true');
	}

	render(props, state) {
		let kids = state.open ? props.children : null;
		let icon = state.open ?
			<Square onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} /> :
			<SidebarIcon onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} />;
		let styleClass = state.open ? style.open : style.closed;
		return (
			<div className={styleClass}>
				<div>
					{icon}
				</div>
				<div className={style.kids}>
					{kids}
				</div>
			</div>
		);
	}
}