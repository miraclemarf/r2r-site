export default (props) => {
	return (
		<div className="d-flex justify-content-center">
			{props.menu.map((item, key) => (
				<div key={key}>
					{item.divider ? (
						<div className="v-divider position-relative mx-4"></div>
					) : (
						<a
							href={item.url}
							className={'h4 mx-3 title-section ' + (item.active ? 'text-primary' : 'text-softgray')}
						>
							{item.name}
						</a>
					)}
				</div>
			))}
		</div>
	);
};
