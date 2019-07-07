import { Component } from 'preact/dist/preact';
import { Sidebar as SidebarIcon, Square } from 'preact-feather';

import style from './style.css';

export default class Sidebar extends Component {
	toggleState = () => { this.setState({ open: !this.state.open }); };

	constructor() {
		super();
		this.state.open = false;
	}

	render(props, state) {
		let kids = state.open ? props.children : null;
		let icon = state.open ?
			<Square onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} /> :
			<SidebarIcon onClick={this.toggleState} color={props.color} size={props.size} class={style.svg} />;
		let styleClass = state.open ? style.open : style.closed;
		return (
			<div class={styleClass}>
				<div>
					{icon}
				</div>
				<div class={style.kids}>
					{kids}
				</div>
			</div>
		);
	}
}