import { FacebookIcon, TwitterIcon } from 'preact-social';
import style from './style.css';

export const Social = (props) => (
	<ul className={style.horizontalList}>
		<li className={style.listItem}>
			<a href={`https://www.facebook.com/groups/${props.fbGrpId}/`}>
				<FacebookIcon
					size={props.size}
					fill={props.color}
				/>
			</a>
		</li>
		<li className={style.listItem}>
			<a href={`https://twitter.com/${props.twitterId}`}>
				<TwitterIcon
					size={props.size}
					fill={props.color}
				/>
			</a>
		</li>
	</ul>
);
