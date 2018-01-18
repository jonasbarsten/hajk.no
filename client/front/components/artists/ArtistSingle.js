import React, {Component} from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import {browserHistory, Link} from 'react-router';
import Masonry from 'react-masonry-component';
import _ from 'lodash';

import ReleaseCard from '../../../shared/components/releases/ReleaseCard.js';
import BarstenViewer from '../../../shared/components/utilities/BarstenViewer.js';
import ArtistEvents from './ArtistEvents.js';

export default class ArtistSingle extends TrackerReact(React.Component) {

	constructor() {
		super();
		this.state = {
			subscription: {
				artists: Meteor.subscribe('artists'),
				releases: Meteor.subscribe('releases')
			}
		}
	}

	componentWillUnmount() {
		this.state.subscription.artists.stop();
		this.state.subscription.releases.stop();
	}

	getArtist() {
		return Artists.find({_id: 'cLX86mWTnTkaDCN3o'}).fetch();
	}

	getReleases() {
		return Releases.find({artists: 'cLX86mWTnTkaDCN3o'}, {sort: {albumType: 1, releaseDate: -1}}).fetch();
	}

	goToRelease(release) {
		browserHistory.push('/releases/' + release._id);
	}

	goToLink(link) {
		console.log(link);
		browserHistory.push(link.url);
	}

	getLinks() {
		const artist = this.getArtist();

		if (artist[0] == undefined) {
			return [];
		}

		if (artist[0].links) {
			
			var links = artist[0].links;
			var sortedLinks = _.sortBy(links, 'sortIndex');

			return sortedLinks;

		} else {
			return [];
		}
	}

	render () {

		const masonryOptions = {
    		transitionDuration: 0
		};

		return (
			<div id="artistEdit">
				{this.getArtist().map((artist) => {

					const songkick = artist.songkickId ? <ArtistEvents songkickId={artist.songkickId} /> : '';
					const links = this.getLinks();

					return (
						<div key={artist._id}>

							<div className="artist-banner">
								<img src={artist.imageUrl} className="img-responsive" />
							</div>


								
								<div className="container no-side-padding">

									<div className="artist-single-content">

										<div className="text-center text-uppercase">
											<h2>{artist.name}</h2>
										</div>

										<hr />

										<div className="row link-list">
											{links.map((link) => {

												var target = "_blank";

												// Behavior if link is on same host
												if (link.isLocal) {
													target = '';
												}

												return (
													<div key={link.id} className="col-sm-4 col-xs-6">
														<Link target={target} to={link.url}>{link.name}</Link>
													</div>
												);
											})}
										</div>

										<hr />

										<BarstenViewer content={artist.bio} placeholder='No bio yet ...'/>

										{songkick}

										<hr />

							            <Masonry
							            	className={''} // default '' 
							            	elementType={'div'} // default 'div'
							            	options={masonryOptions}
							            	disableImagesLoaded={false} // default false 
							            	updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
							            >
											{this.getReleases().map((release) => {
												return <ReleaseCard key={release._id} release={release} onClick={() => {this.goToRelease(release)}}/>
											})}
										</Masonry>

										<hr />

									</div>
									
								</div>

						</div>
					);
				})}
			</div>
		);
	}
}