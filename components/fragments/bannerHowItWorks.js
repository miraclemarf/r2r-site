export default () => (
	<div className="card text-white  border-0 overlay--img__blue">
		<img className="card-img rounded-0" src={process.env.HOST_URL+"/img/assets/1561543693901iw4tqw74.jpeg"} />
		<div className="card-img-overlay d-flex align-items-center">
			<div>
				<h2 className="card-title title-section text-center">How It Works?</h2>
				<div className="d-flex justify-content-around pb-3">
					<div className="text-center">
						<span className="h3 icon-icon_destination d-block py-2" />
						<h5 className="title-section line-normal">CHOOSE DESTINATION</h5>
					</div>
					<div className="text-center">
						<span className="h3 icon-icon_bike d-block py-2" />
						<h5 className="title-section line-normal">CHOOSE UR GEAR</h5>
					</div>
					<div className="text-center">
						<span className="h3 icon-icon_helmet d-block py-2" />
						<h5 className="title-section line-normal">ENJOY UR RIDE!</h5>
					</div>
				</div>
				<div className="d-flex justify-content-between">
					<div>
						<p className="line-normal">We will take care everything for your trip!</p>
					</div>
					<div style={{ minWidth: '130px' }}>
						<a href={process.env.HOST_DOMAIN+"/how-it-works"} className="d-block btn btn-secondary btn-sm">
							LEARN MORE
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
);
