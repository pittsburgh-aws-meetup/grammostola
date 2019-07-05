import { Social } from '../social';
import style from './style.css';

export const Footer = () => (
	<footer className={style.footer}>
		<div className={style.table}>
			<ul className={style.unstyledList}>
				<li>
					<div className={style.text}>Be social with us:</div>
				</li>
				<li>
					<Social twitterId="pghAws" fbGrpId="114289666064561" size="32" color="#ff9900ff" />
				</li>
			</ul>
		</div>
	</footer>
);
