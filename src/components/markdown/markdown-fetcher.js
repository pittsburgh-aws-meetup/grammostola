import { Component } from 'preact/dist/preact';
import axios from 'axios/index';
import Markdown from 'preact-markdown';

import style from './style.css';

export class Fetcher extends Component {
	constructor() {
		super();
		this.state.content = null;
	}

	componentDidMount() {
		axios.get(this.props.url)
			.then(res => {
				const content = res.data;
				this.setState({ content });
			})
			.catch(err => {
				const content = '## Error loading data from source: ' + this.props.url;
				this.setState({ content });
			});
	}

	render() {
		const content = this.state.content;
		let renderContent;

		if (content === null) {
			renderContent = this.props.spinner;
		}

		else {
			renderContent = <Markdown markdown={content} />;
		}

		return (
			<div class={style.markdown}>
				{renderContent}
			</div>
		);
	}
}
