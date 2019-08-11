import { Container } from 'reactstrap'

export default ({ ...props }) => (
	<div className={props.footer == "collapse" ? "collapse" : ""}>
		<div style={{bottom: 0, left: 0}} className={"position-absolute w-100 " + (props.footer != "transparent" ? "bg-dark py-1" : "py-1")}>
			<Container className="container-sm">
				<div className="d-flex justify-content-between mt-3 mb-2">
					<div className="d-block w-50">
						<span className={props.footer != "transparent" ? "h5 icon-logo_ring2ring_full text-white" : "h5 icon-logo_ring2ring_full"}></span>
					</div>
					<div className="d-block" style={{width: '33%', maxWidth: "120px"}}>
						<div className={props.footer != "transparent" ? "d-flex justify-content-between text-white h4" : "d-flex justify-content-between h4"}>
							<span className="icon-facebook" />
							<span className="icon-instagram" />
							<span className="icon-youtube-play" />
						</div>
					</div>
				</div>
			</Container>
		</div>
	</div>
);
