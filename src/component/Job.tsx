interface RecomProps {
	image: string,
	position: string,
	type: string,
	location: string
}

export default function Job(props: RecomProps) {
	return (<div>
		<div className="Recommendation card clickable">
			<img className="cardImg" src={props.image}/>
			<div className="cardContent">
				<div className="Recommendation-line1">{props.position}</div>
				<div className="Recommendation-line2">{props.type}</div>
				<div className="Recommendation-line3 timestamp">{props.location}</div>
			</div>
		</div>
	</div>)
}