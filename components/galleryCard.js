import Link from 'next/link'
import { Row, Col } from 'reactstrap'
import { timestampToDate } from './functions'

export default (props) => {
	return (
		<Row>
			{
				props.datas.map((data) => (
					<Col key={data.id} id={`gallery${data.id}`} sm="12" md="6" lg="4">
						<div 
							className="position-relative d-block w-100 mb-4 rounded-lg overflow-hidden" 
							style={{paddingBottom: "64.84%"}}
						>
							<Link href={`/${props.pathname}?id=${data.id}`} as={`${process.env.HOST_DOMAIN}/${props.pathname}/${data.id}`}>
								<a 
									title={data.title} 
									style={{zIndex: 4}}
									className="position-absolute w-100 h-100" 
								/>
							</Link>
							<div style={{zIndex: 3, width: "100%"}} className="trip-info-center text-center d-inline-block position-absolute">
								<img src={process.env.HOST_URL + data.iconCover} alt={data.title} />
								<h1 className="mt-2	title-section text-white mx-auto">{data.title}</h1>
								{
									props.withDate ? 
										<span 
											className="d-flex justify-content-center text-white pt-1"
											style={{fontSize: "10pt"}}
										>
											<p className="m-0">{timestampToDate(data.startTripDate).slice(0, 6)}</p>
											&nbsp;&ndash;&nbsp;
											<p className="m-0">{timestampToDate(data.endTripDate)}</p>
										</span> : ""
								}
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
									src={process.env.HOST_URL + data.coverLandscape}
								/>
							</div>
						</div>
					</Col>
				))
			}
		</Row>
	)
}
