import { useHistory } from "react-router-dom"

export function AppBar(props: any) {
	//const url = useRouteMatch().url
	const history = useHistory()
	return (<header className="AppBar">
		{(props.showUp == null || props.showUp) ? <div>
			{/*<NavLink to={url.substring(0, url.lastIndexOf('/'))} className="backButton iconCont">
				<img src="/assets/icon/back.svg"/>
			</NavLink>*/}
			<button onClick={history.goBack} className="backButton iconCont">
				<img src="/assets/icon/back.svg"/>
			</button>
		</div> : null}
		<div className="title">
			{props.title}
		</div>
	</header>)
}