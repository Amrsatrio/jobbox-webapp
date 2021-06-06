import { Component } from "react"
import "./CompaniesScreen.css"
import { withRouter } from "react-router-dom"
import { RouteComponentProps } from "react-router"
import { AppBar } from "../component/AppBar"

function CompanyEntry(props: any) {
	const { company, history } = props
	return (
		<div className="CompanyEntry card voucherCard clickable"
			 onClick={() => history.push("/companies/" + company.id)}>
			<img className="cardImg" src={company.background || company.image}/>
			<div className="cardContent">
				<div className="primary">{company.name}</div>
				<div className="text1">{company.tagline}</div>
				<div className="text2">{company.type}</div>
				<div className="CompanyEntry-bottomBar">
					<div>{company.employees?.toLocaleString()} employees</div>
					<button className="colored">Follow</button>
				</div>
				<img className="CompanyEntry-companyLogo" src={company.image}/>
			</div>
		</div>
	)
}

class CompaniesScreen extends Component<RouteComponentProps> {
	render() {
		return (<div>
			<AppBar title="Companies" showUp={false}/>
			<div>
				{Object.values(window.__store.CompanyStore.companies as Array<any>)
					.map(it => (<CompanyEntry company={it} history={this.props.history} key={it.id}/>))}
			</div>
		</div>)
	}
}

export default withRouter(CompaniesScreen)