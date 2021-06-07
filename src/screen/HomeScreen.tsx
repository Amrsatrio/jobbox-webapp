import './HomeScreen.css'
import { Component } from "react"
import Post from "../component/Post"
import Job from "../component/Job"
import { withRouter } from "react-router-dom"
import { SearchAppBar } from "../component/SearchAppBar"

class HomeScreen extends Component<any> {
	render() {
		let homeStore = window.__store.HomeStore
		return (<div className="HomeScreen">
			<SearchAppBar/>
			<h2>Recommended</h2>
			<div className="Home-recommended simpleHorizontalScroll">
				{(homeStore.recommended as Array<any>).map(it => <Job jobId={it} history={this.props.history}/>)}
			</div>
			<h2>Recently Posted</h2>
			<div className="App-recentlyPosted">
				{(homeStore.recentlyPosted as Array<string>).map(it => <Post postId={it} history={this.props.history}/>)}
			</div>
		</div>)
	}
}

export default withRouter(HomeScreen)