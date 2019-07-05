import { MeetupFetcher } from '../meetup/fetcher';
import { Stretch } from 'styled-loaders';

const Home = () => (
	<MeetupFetcher
		client_id="hb115nhk0sa7qfkae5ab3en20v"
		callback_url="http://localhost:8080"
		spinner={<Stretch duration="2s" size="75px" color="#ff9900" />}
	/>
);

export default Home;