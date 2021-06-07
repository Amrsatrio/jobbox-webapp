import { Component, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import HomeScreen from './screen/HomeScreen'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, NavLink, Route, Switch, withRouter } from "react-router-dom"
import './InitStore.js'
import PeopleScreen from "./screen/PeopleScreen"
import { ReactSVG } from "react-svg"
import CompanyDetailsScreen from "./screen/CompanyDetailsScreen"
import CompanyScreen from "./screen/CompaniesScreen"
import ProfileScreen from "./screen/ProfileScreen"
import MessagesScreen, { MessagesListFragment } from "./screen/MessagesScreen"
import LandingScreen from "./screen/LandingScreen"
import NearMeScreen from "./screen/NearMeScreen"
import { AppBar } from "./component/AppBar"
import PostScreen from "./screen/PostScreen"

declare global {
	interface Window {
		__store: any
	}
}

const navData = {
	"home": {
		name: "Home",
		icon: "/assets/icon/home.svg"
	},
	"people": {
		name: "People",
		icon: "/assets/icon/group.svg"
	},
	"nearMe": {
		name: "Near Me",
		icon: "/assets/icon/find_job-01-01.svg"
	},
	"companies": {
		name: "Companies",
		icon: "/assets/icon/business-and-trade.svg"
	},
	"messages": {
		name: "Messages",
		icon: "/assets/icon/chat-2.svg"
	}
}

function NavItem(it: [string, any]) {
	const [key, value] = it
	return (
		<NavLink to={"/" + key} key={key} activeClassName="NavItem-active">
			<div className="NavItem-container">
				<ReactSVG src={value.icon}/>
				<div className="title">{value.name}</div>
			</div>
		</NavLink>
	)
}

class JobDetailsScreen extends Component<any> {
	render() {
		const id = this.props.match.params.id
		const job = window.__store.JobStore.jobs[id]
		const company = window.__store.CompanyStore.companies[job.company]
		return (<div className="JobDetailsScreen">
			<AppBar title="Job"/>
			<div className="JobDetailsHeader">
				<img className="jobCompanyLogo" src={company.image}/>
				<div>
					<h2 className="title">{job.position}</h2>
					<div className="JobDetailsHeader-companyName">{company.name}</div>
					<div className="JobDetailsHeader-type">{job.type}</div>
					<div className="JobDetailsHeader-location">{job.location}</div>
					<button className="JobDetailsHeader-applyJob colored">Apply</button>
				</div>
			</div>
			<h2>About</h2>
			<p>{job.about}</p>
			<h2>Key Requirements</h2>
			<ul>
				{(job.keyRequirements as Array<string>)?.map(it => <li>{it}</li>)}
			</ul>
		</div>)
	}
}

class BottomNavigationBar extends Component<any, any> {
	private unlisten: any

	constructor(props: any) {
		super(props)
		this.state = {
			location: props.location.pathname
		}
		this.onHistoryUpdated = this.onHistoryUpdated.bind(this)
	}

	componentDidMount() {
		this.unlisten = this.props.history.listen(this.onHistoryUpdated)
	}

	componentWillUnmount() {
		this.unlisten()
	}

	render() {
		const s = this.state.location
		if (![
			"/home",
			"/people",
			"/nearMe",
			"/companies",
			"/messages"
		].includes(s)) return null
		return <nav className="mobileNav">{Object.entries(navData).map(NavItem)}</nav>
	}

	onHistoryUpdated(location: any, action: any) {
		this.setState({ location: location.pathname })
	}
}

const BottomNavigationBar_ = withRouter(BottomNavigationBar)

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<div className="contentRoot mobile">
				<header className="desktopHeader">
					<div className="headerContainer">
						<div>
							<img className="brandingLogo" src="/assets/logo/jobbox-02.png"/>
						</div>
						<div>
							<nav>{Object.entries(navData).map(NavItem)}</nav>
						</div>
					</div>
				</header>
				<div className="switch">
					<Switch>
						{/*<Route exact path="/"><Redirect to="/home"/></Route>*/}
						<Route exact path="/home" component={HomeScreen}/>
						<Route exact path="/people" component={PeopleScreen}/>
						<Route exact path="/nearMe" component={NearMeScreen}/>
						<Route exact path="/companies" component={CompanyScreen}/>
						<Route exact path="/messages" component={MessagesScreen}/>
						<Route path="/messages/:threadId" component={MessagesListFragment}/>
						<Route path="/companies/:id" component={CompanyDetailsScreen}/>
						<Route path="/people/:id" component={ProfileScreen}/>
						<Route path="/jobs/:id" component={JobDetailsScreen}/>
						<Route path="/posts/:id" component={PostScreen}/>

						<Route exact path="/" component={LandingScreen}/>
					</Switch>
				</div>
				<BottomNavigationBar_/>
			</div>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()