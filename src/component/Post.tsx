interface PostProps {
	image: string,
	body: string
}

export default function Post(props: PostProps) {
	return (<div className="Post card voucherCard clickable">
		<img className="cardImg" src={props.image}/>
		<div className="cardContent">
			<div className="timestamp">Posted 10h ago</div>
			<div className="Post-title">{props.body}</div>
		</div>
	</div>)
}