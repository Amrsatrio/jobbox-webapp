import { Component } from "react"

export default class LoginScreen extends Component<any> {
	render() {
		return (
			<div>
				<div>
					<form>
						<input name="email"/>
						<input name="password" type="password"/>
						<input type="submit" value="Log in"/>
					</form>
				</div>
			</div>
		)
	}
}