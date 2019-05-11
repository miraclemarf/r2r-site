export default () => (
	<div className="card text-white  border-0 overlay--img__black">
		<img className="card-img rounded-0" src="https://loremflickr.com/375/260/bike?random=500" />
		<div className="card-img-overlay d-flex align-items-center">
			<div className="mx-auto">
				<h2 className="card-title title-section text-center">WANT TO JOIN OUR COMMUNITY??</h2>
				<div className="mx-auto"  style={{ maxWidth: '180px' }}>
					<a href={process.env.HOST_DOMAIN+"/community"} className="d-block btn btn-secondary btn-sm">
						LEARN MORE
					</a>
				</div>
			</div>
		</div>
	</div>
);
