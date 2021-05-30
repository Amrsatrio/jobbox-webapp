import { Component } from "react";

export default class LandingScreen extends Component<any> {
	render() {
		const s = window.__store.HomeNotLoggedInStore
		return (<div>
			<img src="/assets/illustration/clip-hardworking-man.png"/>
			<h2>{s.hero.title}</h2>
			<button className="colored">{s.hero.buttonText}</button>
			<img src="/assets/illustration/clip-web-design.png"/>
			<h3>{s.howItWorks.title}</h3>
			<div>
				{(s.howItWorks.entries as Array<any>).map(it => {
					return (<div>{it.title}</div>)
				})}
			</div>
			<img src="/assets/illustration/clip-start-up-preparation.png"/>
			<h3>{s.findJobsByCategory.title}</h3>
			<h4>{s.findJobsByCategory.subtitle}</h4>
			<div>
				{(s.findJobsByCategory.suggestedCategories as Array<any>).map(it => {
					return (<div>{it}</div>)
				})}
			</div>
		</div>)
	}
}

// export default withRouter(LandingScreen)