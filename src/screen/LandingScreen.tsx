import { Component } from "react"

function SiteNav() {
	return (<header className="SiteNav">
		<img className="brandingLogo" src="/assets/logo/jobbox-02.png"/>
		<div style={{ flex: "1" }}/>
		<a href="/login">Sign in</a>
		<a href="/register">Sign up</a>
	</header>)
}

function SiteFooter() {
	const store = window.__store.FooterStore
	return (<footer className="SiteFooter">
		<div className="companyInfo">
			<div className="companyAndAddress">
				<img className="brandingLogo" src="/assets/logo/jobbox-02.png"/>
				<p className="address">{store.address}</p>
			</div>
			<div className="emailAndPhone">
				<p>{store.email}</p>
				<p>{store.phone}</p>
			</div>
		</div>
		<div className="sections">
			{(store.links as Array<any>).map(it => (<div className="section">
				<h4 className="sectionTitle">{it.title}</h4>
				<ul className="sectionLinks">
					{(it.entries as Array<any>).map(it => (<li>
						<a href={it.link}>{it.title}</a>
					</li>))}
				</ul>
			</div>))}
		</div>
		<p className="copyright">{store.copyright}</p>
	</footer>)
}

export default class LandingScreen extends Component<any> {
	render() {
		const s = window.__store.HomeNotLoggedInStore
		return (<div className="LandingScreen">
			<SiteNav/>
			<div className="content">
				<img className="illustration" src="/assets/illustration/clip-hardworking-man.png"/>
				<h2>{s.hero.title}</h2>
				<button className="colored getStartedButton">{s.hero.buttonText}</button>
				<img className="illustration" src="/assets/illustration/clip-web-design.png"/>
				<h2>{s.howItWorks.title}</h2>
				<div className="howItWorks">
					{(s.howItWorks.entries as Array<any>).map(it => {
						return (<div>{it.title}</div>)
					})}
				</div>
				<img className="illustration" src="/assets/illustration/clip-start-up-preparation.png"/>
				<h2>{s.findJobsByCategory.title}</h2>
				<div className="suggested">
					<h3>{s.findJobsByCategory.subtitle}</h3>
					<div>
						{(s.findJobsByCategory.suggestedCategories as Array<any>).map(it => {
							return (<div className="JobCategorySuggestion">{it}</div>)
						})}
					</div>
				</div>
			</div>
			<SiteFooter/>
		</div>)
	}
}

// export default withRouter(LandingScreen)