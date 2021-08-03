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
		if (typeof window !== 'undefined') {
			document.title = "Pittsburgh AWS Users' Group";
		}
		return (
			<div id="app">
				<Header />
				<div className={style.center}>
					<Sidebar color={'#ff9900ff'} size={32}>
						<ul>
							<li><Link activeClassName="active" href="/">Home</Link></li>
							{/* Following line causes a warning, this is known, but its weird. */}
							<li><Link activeClassName="active" href="/slack">Slack code of conduct</Link></li>
						</ul>
					</Sidebar>
					<div className={style.content}>
						<Router onChange={this.handleRoute}>
							<Home default />
							<Slack path="/slack" />
						</Router>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
