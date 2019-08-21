import Link from 'next/link'

export default () => (
	<div className="card teaserCard text-white border-0 overlay--img__black">
		<img className="card-img rounded-0" src={`${process.env.HOST_URL}/img/assets/15615436185264qcatc0c.jpeg`} />
		<div className="card-img-overlay d-flex align-items-center">
			<div className="mx-auto">
				<h2 className="card-title title-section text-center mb-3">WANT TO JOIN OUR COMMUNITY??</h2>
				<div className="mx-auto"  style={{maxWidth: '180px'}}>
					<Link href="/community" as={`${process.env.HOST_DOMAIN}/community`}>
						<a className="d-block btn btn-secondary btn-sm rounded-lg" title="">LEARN MORE</a>
					</Link>
				</div>
			</div>
		</div>
	</div>
);
