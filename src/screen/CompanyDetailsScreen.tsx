import { Component } from "react"
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import Job from "../component/Job";
import Post from "../component/Post";

interface CompanyDetailsScreenProps {
	id: string
}

function CompanyDetailsHeader(props: any) {
	const { company } = props
	return (<header className="CompanyDetailsHeader">
		<img src={company.image}/>
		<div>
			<h2>{company.name}</h2>
			<div className="text1">{company.tagline}</div>
			<div className="text2">{company.type}</div>
			<div className="CompanyDetailsHeader-employees">{company.employees?.toLocaleString()} employees</div>
			<button className="colored">Follow</button>
		</div>
	</header>)
}

class CompanyDetailsScreen extends Component<RouteComponentProps<CompanyDetailsScreenProps>> {
	render() {
		const id = this.props.match.params.id;
		const company = window.__store.CompanyStore.companies[id]
		return (
			<div>
				<CompanyDetailsHeader company={company}/>
				<h2>Job Offers</h2>
				<div className="simpleHorizontalScroll">{(company.jobOffers as Array<any>)?.map(it => Job({jobId: it, history: this.props.history, showJobIllustration: true}))}</div>
				<h2>Posts</h2>
				<div>{(company.posts as Array<string>)?.map(it => Post(window.__store.PostStore.posts[it]))}</div>
			</div>
		)
	}
}

export default withRouter(CompanyDetailsScreen)