import Link from 'next/link'

export default (props) => {
	return (
		<div className="d-flex justify-content-center">
			{props.menu.map((item, key) => (
				<div key={key}>
					{item.divider ? (
						<div className="v-divider position-relative mx-4"></div>
					) : (
						item.active ?
							<span className="h4 mx-auto title-section text-primary" title={item.name}>
								{item.name}
							</span>
							:
							<Link href={item.path} as={item.url}>
								<a 
									className="h4 mx-auto title-section text-softgray" 
									title={item.name}
								>
									{item.name}
								</a>
							</Link>
					)}
				</div>
			))}
		</div>
	);
};
