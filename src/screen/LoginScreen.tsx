import { Component } from "react"
import { Link, withRouter } from "react-router-dom"

class LoginScreen extends Component<any> {
	render() {
		const history = this.props.history
		return (<div className="LoginScreen">
			<div className="loginForm">
				<form>
					<p className="hint">Email</p>
					<input name="email"/>
					<p className="hint">Password</p>
					<input name="password" type="password"/>
					{/*<input type="submit" value="Sign in"/>*/}
					<button className="colored" onClick={() => history.push("/home")}>Sign in</button>
					{/*<p className="or">or sign in with</p>*/}
					<p className="registerHint">Already have an account? <Link to="/signup">Sign up</Link></p>
				</form>
			</div>
		</div>)
	}
}

export default withRouter(LoginScreen)