import { Stretch } from 'styled-loaders';

import { Fetcher } from '../markdown/markdown-fetcher';

const Slack = () => (
	<Fetcher
		spinner={<Stretch duration="2s" size="75px" color="#ff9900" />}
		url={'https://raw.githubusercontent.com/pittsburgh-aws-meetup/code_of_conduct/simple_slack_updates/slack.md'}
	/>
);

export default Slack;