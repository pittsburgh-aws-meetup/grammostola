import { Component } from 'preact';
import { Link, Router } from 'preact-router';

import { Header } from './header';
import { Footer } from './footer';
import Sidebar from './sidebar';
import Home from './routes/home';
import Slack from './routes/slack';
import style from './app.css';


require('preact/debug');

export default class App extends Component {
	render() {
		return (
			<div id="app">
				<Header />
				<div class="center">
					<Sidebar color={'#ff9900ff'} size={32}>
						<ul>
							<li><Link activeClassName="active" href="/">Home</Link></li>
							<li><Link activeClassName="active" href="/slack">Slack code of conduct</Link></li>
						</ul>
					</Sidebar>
					<div class={style.content}>
						<Router onChange={this.handleRoute}>
							<Home default />
							<Slack path="/slack" />
						</Router>
					</div>
				</div>
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
