const pagination = (props) => {
	const { total, display, page } = props
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination d-flex justify-content-center mx-3">
				<li className="page-item invisible mr-4">
					<a className="page-link" href="#" aria-label="Previous">
						<span aria-hidden="true">&laquo;</span>
						<span className="sr-only">Previous</span>
					</a>
				</li>
				<li className="page-item active">
					<a className="page-link" href="#">
						1
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						2
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						3
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						...
					</a>
				</li>				
				<li className="page-item">
					<a className="page-link" href="#">
						7
					</a>
				</li>
				<li className="page-item  ml-4">
					<a className="page-link" href="#" aria-label="Next">
						<span aria-hidden="true">&raquo;</span>
						<span className="sr-only">Next</span>
					</a>
				</li>
			</ul>
		</nav>
	);
};
export default pagination;