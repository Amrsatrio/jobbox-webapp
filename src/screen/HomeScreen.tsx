import './HomeScreen.css'
import { Component } from "react";
import Post from "../component/Post";
import Job from "../component/Job";

export default class HomeScreen extends Component {
	render() {
		let homeStore = window.__store.HomeStore;
		return (
			<div className="Home">
				<h2>Recommended</h2>
				<div className="Home-recommended simpleHorizontalScroll">{homeStore.recommended.map(Job)}</div>
				<h2>Recently Posted</h2>
				<div className="App-recentlyPosted">{(homeStore.recentlyPosted as Array<string>).map(it => Post(window.__store.PostStore.posts[it]))}</div>
			</div>
		)
	}
}