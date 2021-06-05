import { Component, StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import HomeScreen from './screen/HomeScreen'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, NavLink, Redirect, Route, Switch } from "react-router-dom"
import './InitStore.js'
import PeopleScreen from "./screen/PeopleScreen";
import { ReactSVG } from "react-svg";
import CompanyDetailsScreen from "./screen/CompanyDetailsScreen";
import CompanyScreen from "./screen/CompaniesScreen";
import ProfileScreen from "./screen/ProfileScreen";
import MessagesScreen from "./screen/MessagesScreen";
import LandingScreen from "./screen/LandingScreen";

declare global {
	interface Window {
		__store: any
	}
}

class NearMe extends Component {
	render() {
		return (<div></div>);
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
		const id = this.props.match.params.id;
		const job = window.__store.JobStore.jobs[id]
		const company = window.__store.CompanyStore.companies[job.company]
		return (<div>
			<div className="JobDetailsHeader">
				<img className="jobCompanyLogo" src={company.image}/>
				<div>
					<div className="title">{job.position}</div>
					<div className="JobDetailsHeader-companyName">{company.name}</div>
					<div className="JobDetailsHeader-location">{job.location}</div>
					<button className="JobDetailsHeader-applyJob">Apply</button>
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

class Bottom extends Component<any, any> {
	render() {
		return (
			<div>

			</div>
		)
	}
}

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
						<Route exact path="/"><Redirect to="/home"/></Route>
						<Route exact path="/home" component={HomeScreen}/>
						<Route exact path="/people" component={PeopleScreen}/>
						<Route exact path="/nearMe" component={NearMe}/>
						<Route exact path="/companies" component={CompanyScreen}/>
						<Route path="/messages" component={MessagesScreen}/>
						<Route path="/companies/:id" component={CompanyDetailsScreen}/>
						<Route path="/people/:id" component={ProfileScreen}/>
						<Route path="/jobs/:id" component={JobDetailsScreen}/>
					</Switch>
				</div>
				<nav className="mobileNav">{Object.entries(navData).map(NavItem)}</nav>
			</div>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
)

let landingContainer = document.getElementById('landing');
if (landingContainer) {
	ReactDOM.render(
		<LandingScreen/>,
		landingContainer
	)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()