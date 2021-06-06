import { Component } from "react"
import { RouteComponentProps } from "react-router"
import { getUserAvatar } from "./PeopleScreen"
import { withRouter } from "react-router-dom"
import { AppBar } from "../component/AppBar"

interface ProfileScreenProps {
	id: string
}

function ProfileHeader(props: any) {
	const { user, history } = props
	const company = window.__store.CompanyStore.companies[user.company]
	return (<header className="ProfileHeader card">
		<div className="ProfileHeader-leftSide">
			<img className="ProfileHeader-avatar" src={getUserAvatar(user)}/>
			<div className="ProfileHeader-buttons">
				<button className="colored">Message</button>
				<button>Connect</button>
			</div>
		</div>
		<div className="ProfileHeader-rightSide">
			<h2>{user.name}</h2>
			<div className="text1">{user.position}</div>
			<div className="ProfileHeader-detail clickable"
				 onClick={() => history.push("/companies/" + company.id)}>
				<img src={company.image}/>
				<div>{company.name}</div>
			</div>
			<div className="ProfileHeader-detail">
				<img src="/assets/icon/placeholder.svg"/>
				<div>{user.country}</div>
			</div>
			<div className="ProfileHeader-mutualCount">{user.mutual?.toLocaleString()} connections</div>
		</div>
	</header>)
}

function Achievement(achievement: any) {
	return (<div className="Achievement">{achievement}</div>)
}

function Experience(experience: any) {
	//const company = window.__store.CompanyStore.companies[experience.company]
	return (<div className="TimelineEntry">
		<img className="TimelineEntry-logo" src={experience.logo}/>
		<div>
			<div className="primary">{experience.company}</div>
			<div className="Experience-positions">
				{(experience.positions as Array<any>)?.map(position =>
					(<div>
						<div className="text1">{position.occupation}</div>
						<div className="text2">{position.timeRange}</div>
					</div>)
				)}
			</div>
		</div>
	</div>)
}

function Skill(props: any) {
	const rateStars = []
	const numStars = Math.floor(props.proficiency * 5)
	for (let i = 1; i <= 5; ++i) {
		const active = i <= numStars
		rateStars.push(<div className={active ? "active" : ""}/>)
	}
	return (<div className="Skill">
		<img src={props.icon}/>
		<div>
			<div className="primary">{props.title}</div>
			<div className="Skill-rating">{rateStars}</div>
		</div>
	</div>)
}

function Education(props: any) {
	return (<div className="TimelineEntry">
		<img className="TimelineEntry-logo" src={props.logo}/>
		<div>
			<div className="primary">{props.institution}</div>
			<div className="Education-major">{props.major}</div>
			<div className="Education-timeRange">{props.timeRange}</div>
		</div>
	</div>)
}

function Certification(props: any) {
	return (<div className="TimelineEntry">
		<img className="TimelineEntry-logo" src={props.logo}/>
		<div>
			<div className="primary">{props.name}</div>
			<div className="Education-major">{props.issuer}</div>
			<div className="Education-timeRange">{props.issued}</div>
		</div>
	</div>)
}

class ProfileScreen extends Component<RouteComponentProps<ProfileScreenProps>> {
	render() {
		const id = this.props.match.params.id
		const user = window.__store.UserStore.userCache[id]
		return (<div>
			<AppBar title="Profile"/>
			<ProfileHeader user={user} history={this.props.history}/>
			<div className="card cardContent">
				<h3>Recent Achievements</h3>
				<div className="ProfileScreen-achievements">{(user.achievements as Array<any>)?.map(Achievement)}</div>
			</div>
			<div className="card cardContent">
				<h3>About</h3>
				<div>{user.about}</div>
			</div>
			<div className="card cardContent">
				<h3>Experiences</h3>
				<div>{(user.experiences as Array<any>)?.map(Experience)}</div>
			</div>
			<div className="card cardContent">
				<h3>Skills</h3>
				<div>{(user.skills as Array<any>)?.map(Skill)}</div>
			</div>
			<div className="card cardContent">
				<h3>Education</h3>
				<div>{(user.education as Array<any>)?.map(Education)}</div>
			</div>
			<div className="card cardContent">
				<h3>License & Certification</h3>
				<div>{(user.certifications as Array<any>)?.map(Certification)}</div>
			</div>
			<div className="card cardContent">
				<h3>Interests</h3>
				<div className="ProfileScreen-interests">{(user.interests as Array<any>)?.map(entry => <img
					src={entry}/>)}</div>
			</div>
		</div>)
	}
}

export default withRouter(ProfileScreen)