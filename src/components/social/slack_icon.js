export const Slack = ({ inviteId, size = '37', fill = '#fff', background = '#1DA1F2', circle }) => {
	let url = 'https://join.slack.com/t/pgh-aws-users/shared_invite/' + encodeURI(inviteId);

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			style={iconStyle(size, background, circle)}
			aria-label="Join our slack team"
			title="Slack"
		>
			<svg
				fill={fill}
				width={`${size}px`}
				height={`${size}px`}
				aria-labelledby="pittsburgh-aws-user-group"
				role="img"
				viewBox="0 0 128 128"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g transform="translate(-70,-70)">
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 99.4,151.2 c 0,7.1 -5.8,12.9 -12.9,12.9 -7.1,0 -12.9,-5.8 -12.9,-12.9 0,-7.1 5.8,-12.9 12.9,-12.9 h 12.9 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 105.9,151.2 c 0,-7.1 5.8,-12.9 12.9,-12.9 7.1,0 12.9,5.8 12.9,12.9 v 32.3 c 0,7.1 -5.8,12.9 -12.9,12.9 -7.1,0 -12.9,-5.8 -12.9,-12.9 0,0 0,-32.3 0,-32.3 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 118.8,99.4 c -7.1,0 -12.9,-5.8 -12.9,-12.9 0,-7.1 5.8,-12.9 12.9,-12.9 7.1,0 12.9,5.8 12.9,12.9 v 12.9 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 118.8,105.9 c 7.1,0 12.9,5.8 12.9,12.9 0,7.1 -5.8,12.9 -12.9,12.9 H 86.5 c -7.1,0 -12.9,-5.8 -12.9,-12.9 0,-7.1 5.8,-12.9 12.9,-12.9 0,0 32.3,0 32.3,0 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 170.6,118.8 c 0,-7.1 5.8,-12.9 12.9,-12.9 7.1,0 12.9,5.8 12.9,12.9 0,7.1 -5.8,12.9 -12.9,12.9 h -12.9 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 164.1,118.8 c 0,7.1 -5.8,12.9 -12.9,12.9 -7.1,0 -12.9,-5.8 -12.9,-12.9 V 86.5 c 0,-7.1 5.8,-12.9 12.9,-12.9 7.1,0 12.9,5.8 12.9,12.9 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 151.2,170.6 c 7.1,0 12.9,5.8 12.9,12.9 0,7.1 -5.8,12.9 -12.9,12.9 -7.1,0 -12.9,-5.8 -12.9,-12.9 v -12.9 z"
					/>
					<path style="fill:#ff9900;fill-opacity:1"
						  d="m 151.2,164.1 c -7.1,0 -12.9,-5.8 -12.9,-12.9 0,-7.1 5.8,-12.9 12.9,-12.9 h 32.3 c 7.1,0 12.9,5.8 12.9,12.9 0,7.1 -5.8,12.9 -12.9,12.9 z"
					/>
				</g>
			</svg>
		</a>
	);
};

const iconStyle = (size, background, circle) => (
	{
		padding: '0px',
		backgroundColor: background,
		width: size + 'px' || '37px',
		height: size + 'px' || '37px',
		borderRadius: circle ? '50%' : '0',
		marginRight: '0px',
		display: 'inline-block'
	}
);