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

ReactDOM.render(
	<StrictMode>
		<BrowserRouter>
			<div className="contentRoot">
				<header>
					<div className="headerContainer">
						<nav>{Object.entries(navData).map(NavItem)}</nav>
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
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	</StrictMode>,
	document.getElementById('root')
)

ReactDOM.render(
	<LandingScreen/>,
	document.getElementById('landing')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
