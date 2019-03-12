export default ({ ...props }) => (
	<div className="mb-4">
		<div className="mb-2">
			<img className="img-fluid" src={props.coverLandscape} />
		</div>
		<div className="d-flex justify-content-between align-items-center text-sm">
			<div style={{ lineHeight: 'normal' }}>
				<span className="d-block font-weight-bold text-black">{props.location}</span>
				<span className="text-gray80 pr-3">{props.days} Days Trip</span>
				<span className="text-gray80">Start From {props.startPrice}</span>
			</div>
			<div>
				<span className="icon-logogram_r2r h5"></span>
			</div>
		</div>
	</div>
);
