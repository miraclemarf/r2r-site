import { Container } from 'reactstrap';
export default () => (
	<div className="bg-dark py-1">
		<Container>
			<div className="d-flex justify-content-between mt-3 mb-2">
				<div className="d-block w-50">
					<span className="h5 icon-logo_ring2ring_full text-white"></span>
				</div>
				<div className="d-block" style={{ width: '33%' }}>
					<div className="d-flex justify-content-between text-white h4">
						<span className="icon-facebook" />
						<span className="icon-instagram" />
						<span className="icon-youtube-play" />
					</div>
				</div>
			</div>
		</Container>
	</div>
);
