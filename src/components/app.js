import { Component } from 'preact';
import { Stretch } from 'styled-loaders';

import Header from './header';
import Footer from './footer';
import { Fetcher } from './markdown/markdown-fetcher';

require('preact/debug');

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Header />
				<Fetcher
					spinner={<Stretch duration="2s" size="75px" color="#ff9900" />}
					url={'https://raw.githubusercontent.com/pittsburgh-aws-meetup/code_of_conduct/simple_slack_updates/slack.md'}
				/>
				<Footer
					size={'32'}
					color={'#ff9900ff'}
					fbUrl={'https://www.facebook.com/groups/114289666064561/'}
					twitterUrl={'https://twitter.com/PghAws'}
				/>
			</div>
		);
	}
}
