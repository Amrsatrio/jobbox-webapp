import { History } from "history"

interface PostProps {
	postId: string
	history: History
}

export default function Post(props: PostProps) {
	const { postId, history } = props
	const post = window.__store.PostStore.posts[postId]
	return (<div className="Post card voucherCard clickable"
				 onClick={() => history.push("/posts/" + postId)}>
		<img className="cardImg" src={post.image}/>
		<div className="cardContent">
			<div className="timestamp">Posted 10h ago</div>
			<div className="Post-title">{post.body}</div>
		</div>
	</div>)
}