import Moment from 'react-moment'

export default ({ ...props }) => (
	<div className="mb-4">
		{props.index != 0 && props.isTransaction ? <hr className="my-4" /> : ''}
		
		<a href={!props.isTransaction ? process.env.HOST_DOMAIN + "/trip/" + props.id : process.env.HOST_DOMAIN + "/user/trip/" + props.id}>
			<div className="mb-2 d-flex align-items-center position-relative">
				<img className="img-fluid" src={process.env.HOST_URL + props.coverLandscape} />
				<div className="text-center my-2 mx-3 position-absolute" >
					<img height="50" src={process.env.HOST_URL + props.iconCover} />
					<h1 style={{ lineHeight: ".8em", fontSize: "3em" }} className="mt-2	 title-section text-white mx-auto">{props.title}</h1>
				</div>
			</div>
			{props.isTransaction ?
				<div className="mb-2">
					{props.paymentStatus == 'WAITING' ?
						<div>
							<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for payment</span>
							<div className="mt-1 text-black text-sm">
								until <b><Moment unix format="DD MMM YYYY, HH:mm">{props.expiredDate/1000}</Moment></b>
							</div>
						</div> : ''}

						{props.paymentStatus == 'BOOKED' ?
						<div>
							<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Waiting for confirmation</span>
						</div> : ''}

						{props.paymentStatus == 'PAID' ?
						<div>
							<span className="badge badge-info" style={{ fontWeight: "400", fontStyle: "italic" }}>✓  Paid</span>
						</div> : ''}

						{props.paymentStatus == 'FAILED' ?
						<div>
							<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Failed</span>
						</div> : ''}

						{props.paymentStatus == 'CANCEL' ?
						<div>
							<span className="badge badge-warning" style={{ fontWeight: "400", fontStyle: "italic" }}>Cancelled</span>
						</div> : ''}

				</div>
				: ''}
			<div className="d-flex justify-content-between align-items-center text-sm">
				<div style={{ lineHeight: 'normal' }}>
					<span className="d-block font-weight-bold text-black">{props.location}</span>
					<span className="text-gray80 pr-3">{props.duration} Days Trip</span>
					<span className="text-gray80">Start From ${props.tripPrice}</span>
				</div>
				<div>
					<span className="icon-logogram_r2r h5 text-black"></span>
				</div>
			</div>

		</a>
		{props.isTransaction && props.paymentStatus == 'WAITING'?
			<div className="mt-3">
				<a onClick={props.clickConfirm} className="btn btn-primary d-block text-white">Confirm Payment</a>
			</div>
			: ''}
			
	</div>
);
