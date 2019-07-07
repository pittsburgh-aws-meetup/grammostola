import { Component } from 'preact/dist/preact';
import { FacebookIcon, TwitterIcon } from 'preact-social';
import style from './style';

export default class Footer extends Component {
	render() {
		return (
			<footer class={style.footer}>
				<div class={style.table}>
					<ul class={style.unstyledList}>
						<li>
							<div className={style.text}>Be social with us:</div>
						</li>
						<li>
							<ul class={style.horizontalList}>
								<li class={style.listItem}>
									<a href={this.props.fbUrl}>
										<FacebookIcon
											size={this.props.size}
											fill={this.props.color}
										/>
									</a>
								</li>
								<li class={style.listItem}>
									<a href={this.props.twitterUrl}>
										<TwitterIcon
											size={this.props.size}
											fill={this.props.color}
										/>
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</footer>
		);
	}
}

const PreactLogo = ({ ...props }) => (
	<svg
		{...props}
		viewBox="-256 -286 1900 572"
		version="1.1"
	>
		<path
			d="M0,-256 221.7025033688164,-128 221.7025033688164,128 0,256 -221.7025033688164,128 -221.7025033688164,-128z"
			fill="#673ab8"
		/>
		<ellipse
			cx="0"
			cy="0"
			stroke-width="16px"
			rx="75px"
			ry="196px" fill="none" stroke="white"
			transform="rotate(52.5)"
		/>
		<ellipse
			cx="0"
			cy="0"
			stroke-width="16px"
			rx="75px"
			ry="196px"
			fill="none"
			stroke="white"
			transform="rotate(-52.5)"
		/>
		<circle cx="0" cy="0" r="34" fill="white" />
		<text
			x="250"
			y="128"
			font-size="350"
			font-family="Helvetica Neue,helvetica,arial"
			font-weight="300"
			fill="#673ab8"
		>
			PREACT
		</text>
	</svg>
);