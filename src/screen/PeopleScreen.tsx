import { Component } from "react";
import "./PeopleScreen.css"
import { withRouter } from "react-router-dom";

interface Person {
	id: string
	name: string
	avatar: string
	position: string
	company: string
}

function PersonEntry(props: any) {
	const { person, history } = props
	const company = window.__store.CompanyStore.companies[person.company]
	return (<div className="PersonEntry card clickable" key={person.id}
				 onClick={() => history.push("/people/" + person.id)}>
		<img className="avatar" src={getUserAvatar(person)}/>
		<div>
			<div className="PersonEntry-titleAndCompany">
				<div className="primary">{person.name}</div>
				<div className="PersonEntry-companyInfo">
					<img src={company.image}/>
					<div className="text1">{person.position} at {company.name}</div>
				</div>
			</div>
			<div className="buttonRow">
				<button className="colored">Message</button>
				<button>Connect</button>
			</div>
		</div>
	</div>)
}

export function getUserAvatar(person: { avatar: string }): string {
	return person ? "/assets/avatar/" + person.avatar + ".jpg" : "";
}

class PeopleScreen extends Component<any> {
	render() {
		return (<div>
			{Object.values(window.__store.UserStore.userCache as Array<Person>).map(it => PersonEntry({
				person: it,
				history: this.props.history
			}))}
		</div>)
	}
}

export default withRouter(PeopleScreen)