import Link from 'next/link'
import { Container } from 'reactstrap'

export default ({ ...props }) => (
	<div className={props.footer == "collapse" ? "collapse" : ""}>
		<div style={{ bottom: 0, left: 0 }} className={"position-absolute w-100 " + (props.footer != "transparent" ? "bg-dark py-1" : "py-1")}>
			<Container className="container-sm">
				<div className="d-flex justify-content-between mt-3 mb-2">
					<div className="d-block w-50">
						<div className="d-flex align-items-center">
							<div className="mr-3">
								<span className={props.footer != "transparent" ? "h5 icon-logogram_r2r text-white" : "h5 icon-logogram_r2r"}></span>
							</div>
							<ul style={{ 'fontSize': '9pt' }} className="list-inline text-sm text-white font-weight-bold m-0">
								<li className="list-inline-item">
									<Link href="/how-it-works" as={process.env.HOST_DOMAIN + '/how-it-works'}>
										<a className="text-white" href="/how-it-works">About</a>
									</Link>
								</li>
								<li className="list-inline-item"><span className="text-gray80">&#8226;</span></li>
								<li className="list-inline-item">
									<Link href="/faq" as={process.env.HOST_DOMAIN + '/faq'}>
										<a className="text-white" href="/faq">FAQ</a>
									</Link>
								</li>
								<li className="list-inline-item"><span className="text-gray80">&#8226;</span></li>
								<li className="list-inline-item">
									<Link href="/term-condition" as={process.HOST_DOMAIN + '/term-condition'}>
										<a className="text-white" href="/term-condition">T&C</a>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="d-block" style={{ width: '33%', maxWidth: "120px" }}>
						<div className={props.footer != "transparent" ? "d-flex justify-content-between text-white h4" : "d-flex justify-content-between h4"}>
							<span className="icon-facebook" />
							<span className="icon-instagram" />
							<span className="icon-youtube-play" />
						</div>
					</div>
				</div>
			</Container>
		</div>
		<style jsx>{`

				}
		`}</style>
	</div>
);
