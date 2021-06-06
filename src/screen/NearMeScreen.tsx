import { Component } from "react"
import GoogleMapReact from "google-map-react"
import { AppBar } from "../component/AppBar"

export default class NearMeScreen extends Component {
	render() {
		return (<div className="NearMeScreen">
			<AppBar title="Near Me" showUp={false} />
			<GoogleMapReact
				bootstrapURLKeys={{ key: "AIzaSyDpfUyXuE1AJSwg_vZBWrh7wIX9dvSzC7Y" }}
				defaultCenter={{ lat: -6.6057000, lng: 106.8082000 }}
				defaultZoom={18}
				yesIWantToUseGoogleMapApiInternals
				onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}/>
		</div>)
	}

	handleApiLoaded(map: any, maps: any) {
	}
}