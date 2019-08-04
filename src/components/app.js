import { Component } from 'preact';
import { Link, Router } from 'preact-router';

import { Header } from './header';
import { Footer } from './footer';
import Sidebar from './sidebar';
import Home from './routes/home';
import Slack from './routes/slack';
import SimpleMapRoute from './routes/simple_map';
import style from './app.css';


require('preact/debug');

export default class App extends Component {
	render() {
		document.title = "Pittsburgh AWS Users' Group";
		return (
			<div id="app">
				<Header />
				<div className={style.center}>
					<Sidebar color={'#ff9900ff'} size={32}>
						<ul>
							<li><Link activeClassName="active" href="/">Home</Link></li>
							<li><Link activeClassName="active" href="/slack">Slack code of conduct</Link></li>
							<li><Link activeClassName="active" href="/map">Map</Link></li>
						</ul>
					</Sidebar>
					<div className={style.content}>
						<Router onChange={this.handleRoute}>
							<Home default />
							<Slack path="/slack" />
							<SimpleMapRoute path="/map" />
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
