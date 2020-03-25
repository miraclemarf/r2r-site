import Link from 'next/link'
import Moment from 'react-moment'
import { Col } from 'reactstrap'
import { priceAbbr } from './functions';

export default ({ ...props }) => (
	<Col xs="12" sm="4" className="tripCard mb-4">
		 <Link
			href={!props.isTransaction ? `/trip/detail?page=detail&id=${props.id}` : `/trip/detailTrip?page=detailTrip&id=${props.id}`}
			as={!props.isTransaction ? `${process.env.HOST_DOMAIN}/trip/${props.id}` : `${process.env.HOST_DOMAIN}/user/trip/${props.id}`}
		> 
			<a>
				<div className="overlay--img__black mb-2 d-flex align-items-center position-relative rounded-lg overflow-hidden">
					<img className="img-fluid" src={props.coverLandscape} />
					<div className="trip-info-center text-center d-inline-block position-absolute">
						{/* <img className="invisible" src={props.iconCover} /> */}
						{/* <img src={props.iconPublisher} /> */}
						<h4 className="mt-2 mb-0 title-section substr text-white">{props.title}</h4>
						<h1 className="m-0 title-section substr text-white">{props.location}</h1>
					</div>
				</div>
				{props.isTransaction ?
					<div className="mb-2">
						{
							props.paymentStatus == 'WAITING' ?
								<div>
									<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for payment</span>
									<div className="mt-1 text-black text-sm">
										until <b><Moment unix format="DD MMM YYYY, HH:mm">{props.expiredDate / 1000}</Moment></b>
									</div>
								</div> : ''
						}
						{
							props.paymentStatus == 'BOOKED' ?
								<div>
									<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for confirmation</span>
								</div> : ''}

						{
							props.paymentStatus == 'PAID' ?
								<div>
									<span className="badge badge-info" style={{ fontWeight: "400", fontStyle: "italic" }}>Paid</span>
								</div> : ''
						}
						{
							props.paymentStatus == 'FAILED' ?
								<div>
									<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Failed</span>
								</div> : ''
						}
						{
							props.paymentStatus == 'CANCEL' ?
								<div>
									<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Cancelled</span>
								</div> : ''
						}
					</div> : ''
				}
				<div className="d-flex justify-content-between align-items-center text-sm">
					<div style={{ lineHeight: 'normal' }}>
						<span className="d-block font-weight-bold text-black">{props.location}</span>
						<span className="text-gray80 pr-3">{props.duration} Days Trip</span>
						<span className="text-gray80">
							Start From <span dangerouslySetInnerHTML={{ __html: priceAbbr(true, props.tripPrice) }}></span>
						</span>
					</div>
					<div>
						<span className="icon-logogram_r2r h5 text-black"></span>
					</div>
				</div>
			</a>
		</Link>
	</Col>
);
