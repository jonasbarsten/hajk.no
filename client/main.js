import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { composeWithTracker } from 'react-komposer';

import FrontLayout from './front/components/FrontLayout.js';

// FRONT
import Home from './front/components/pages/Home.js';
import AllArtists from './front/components/artists/AllArtists.js';
import ArtistSingle from './front/components/artists/ArtistSingle.js';
import AllReleases from './front/components/releases/AllReleases.js';
import UpcomingReleases from './front/components/releases/UpcomingReleases.js';
import ReleaseSingle from './front/components/releases/ReleaseSingle.js';
import PageSingle from './front/components/pages/PageSingle.js';

const routes = (
	<Router history={browserHistory}>

		<Route path="/" component={ArtistSingle}></Route>

		<Route path="/pages" component={FrontLayout}>
			<Route path=":urlFriendlyName" component={PageSingle} />
		</Route>

		<Route path="/artists" component={FrontLayout}>
			<IndexRoute component={AllArtists} />
			<Route path=":artistId" component={ArtistSingle} />
		</Route>

		<Route path="/upcoming" component={FrontLayout}>
			<IndexRoute component={UpcomingReleases} />
		</Route>

		<Route path="/releases" component={FrontLayout}>
			<IndexRoute component={AllReleases} />
			<Route path=":releaseId" component={ReleaseSingle} />
		</Route>

	</Router>
);


Meteor.startup( () => {
	ReactDOM.render(routes, document.querySelector('.render-target'));
});