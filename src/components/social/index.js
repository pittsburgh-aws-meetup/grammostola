import { FacebookIcon, TwitterIcon } from 'preact-social';
import style from './style.css';
import { Slack } from './slack_icon';

const invite = 'enQtNzIwNTI2MTU0MjI0LWI3YmMyYzRjZmUwZTFiZDAwNzNiYWQ0ZWFmNmUxNTJlY2ExMzU2Yjc1M2ZjYzhlOTdmOTdmMTgxMzQ2OTFhNTU';

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
		<li className={style.listItem}>
			<Slack
				inviteId={invite}
				size={props.size}
				fill={props.color}
				background={'#262f3eff'}
			/>
		</li>
	</ul>
);
