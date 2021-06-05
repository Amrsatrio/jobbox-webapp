interface JobProps {
	id: string,
	image: string,
	position: string,
	type: string,
	location: string
}

export default function Job(props: any) {
	const { jobId, history, showJobIllustration } = props
	const job = window.__store.JobStore.jobs[jobId]
	const company = window.__store.CompanyStore.companies[job.company]
	return (<div>
		<div className="Recommendation card clickable"
			 onClick={() => history.push("/jobs/" + job.id)}>
			<img className={"cardImg" + (showJobIllustration ? " cover" : "")} src={showJobIllustration ? job.image : company.image}/>
			<div className="cardContent">
				<div className="Recommendation-line1">{job.position}</div>
				<div className="Recommendation-line2">{job.type}</div>
				<div className="Recommendation-line3 timestamp">{job.location}</div>
			</div>
		</div>
	</div>)
}