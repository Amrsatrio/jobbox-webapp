import { Component } from "react"
import { Route, Switch, withRouter } from "react-router-dom"
import { getUserAvatar } from "./PeopleScreen"
import { AppBar } from "../component/AppBar"

function MessageThread(props: any) {
	const { person, lastMessage, history, url } = props
	return (<div className="MessageThread clickable" key={person.id}
				 onClick={() => history.push(url + '/' + person.id)}>
		<img className="avatar" src={getUserAvatar(person)}/>
		<div>
			<div className="MessageThread-upper">
				<div className="primary">{person.name}</div>
				<div>{lastMessage.timestamp}</div>
			</div>
			<div className="MessageThread-lower">
				<div className="MessageThread-preview">{lastMessage.content}</div>
				<div className="MessageThread-unread">5</div>
			</div>
		</div>
	</div>)
}

class MessagesScreen extends Component<any> {
	render() {
		let { path, url } = this.props.match
		return (<div className="MessagesScreen">
			<AppBar title="Messages" showUp={false}/>
			<div className="MessagesScreen-threadsList">
				{Object.entries(window.__store.MessagesStore.messages).map(it => {
					const [key, messages] = it
					const person = window.__store.UserStore.userCache[key]
					const lastMessage = (messages as Array<any>)[0]
					return MessageThread({
						person, lastMessage,
						history: this.props.history,
						url
					})
				})}
			</div>
			<div className="MessagesScreen-messagesSwitch">
				<Switch>
					<Route exact path={path}>
						<h3>Please select a message</h3>
					</Route>
					<Route path={path + "/:threadId"} component={MessagesListFragment}/>
				</Switch>
			</div>
		</div>)
	}
}

function MessageEntry(message: any) {
	const user = window.__store.UserStore.userCache[message.author]
	const isSelf = !message.author
	return (
		<div className={"MessageEntry" + (isSelf ? " self" : "")} id={message.id}>
			<div className="MessageEntry-container">
				{!isSelf ? <img className="avatar" src={getUserAvatar(user)}/> : null}
				<div className="MessageEntry-content">{message.content}</div>
				{/*<div className="MessageEntry-timestamp"></div>*/}
			</div>
		</div>
	)
}

export class MessagesListFragment extends Component<any> {
	render() {
		const id = this.props.match.params.threadId
		const messages = window.__store.MessagesStore.messages[id]
		const user = window.__store.UserStore.userCache[id]
		return (<div className="MessagesListFragment">
			<AppBar title={user.name}/>
			<div>
				{(messages as Array<any>).map(MessageEntry)}
			</div>
		</div>)
	}
}

export default withRouter(MessagesScreen)