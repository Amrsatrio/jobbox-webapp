import { Component } from "react"
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import { AppBar } from "../component/AppBar"
import { getUserAvatar } from "./PeopleScreen"

interface PostScreenProps {
	id: string
}

class PostScreen extends Component<RouteComponentProps<PostScreenProps>> {
	render() {
		const id = this.props.match.params.id
		const post = window.__store.PostStore.posts[id]
		const company = window.__store.CompanyStore.companies[post.author]
		const comments: Array<any> = window.__store.PostCommentsStore.commentsByPost[id] || []
		return (<div className="PostScreen">
			<AppBar title="Post"/>
			<img className="postImage" src={post.image}/>
			<div className="postContent">
				<div className="timestamp">Posted 10h ago</div>
				<p>{post.body}</p>
			</div>
			<div className="actionRow">
				<div>
					<img src="/assets/icon/like.svg"/>
					Like
				</div>
				<div>
					<img src="/assets/icon/chat-comment-oval-speech-bubble-with-text-lines.svg"/>
					2
				</div>
				<div>
					<img src="/assets/icon/share (1).svg"/>
					Share
				</div>
			</div>
			<h2>Comments</h2>
			<div>{comments.map(it => {
				const user = window.__store.UserStore.userCache[it.author]
				return (<div className="comment">
					<img className="avatar" src={getUserAvatar(user)}/>
					<div className="commentBubble">
						<div className="commentTitle">
							<div className="title">{user.name} <span className="timestamp">{it.timestamp}</span></div>
							{/*<button><img src=""/></button>*/}
						</div>
						<p>{it.body}</p>
					</div>
				</div>)
			})}</div>
		</div>)
	}
}

export default withRouter(PostScreen)