import Link from 'next/link'

export default (props) => {
	return (
		<div 
			className="position-relative d-block w-100 mb-3 rounded-lg overflow-hidden" 
			style={{paddingBottom: "64.84%"}}
		>
			<Link href={`/${props.pathname}?id=${props.data.id}`} as={`${process.env.HOST_DOMAIN}/${props.pathname}/${props.data.id}`}>
				<a 
					title={props.data.title} 
					style={{zIndex: 4}}
					className="position-absolute w-100 h-100" 
				/>
			</Link>
			<div style={{zIndex: 3, width: "100%"}} className="trip-info-center text-center d-inline-block position-absolute">
				<img src={process.env.HOST_URL + props.data.iconCover} alt={props.data.title} />
				<h1 className="mt-2	title-section text-white mx-auto">{props.data.title}</h1>
			</div>
			<div className="position-absolute w-100 h-100 overflow-hidden">
				<div style={{zIndex: 1}} className="position-absolute overlay--img__black w-100 h-100" />
				<img 
					style={{
						width: "100%",
						height: "auto",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						WebkitTransform: "translate(-50%, -50%)"
					}} 
					className="position-absolute" 
					src={process.env.HOST_URL + props.data.coverLandscape}
				/>
			</div>
		</div>
	)
}
