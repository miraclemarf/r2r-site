export default (props) => {
	const { totalPage, currentPage, onClick } = props
    const createPagination = () => {
		var lists = [],
			current = currentPage + 1,
            delta = 2,
            left = current - delta,
            right = current + delta + 1,
            range = [], rangeWithDots = [], l

        for (let i = 1; i <= totalPage; i++) {
            if (i == 1 || i == totalPage || i >= left && i < right) {
                range.push(i)
            }
        }
        for (let i of range) {
            if (l) {
                if (i - l === 2) {
                    rangeWithDots.push(l + 1)
                } else if (i - l !== 1) {
                    rangeWithDots.push('...')
                }
            }
            rangeWithDots.push(i)
            l = i
        }

        for (let i of rangeWithDots) {
			const btn = i == '...' ? 
				<li key={i} className="page-item mx-1">
					<button className="page-link px-2 rounded-lg" aria-label="Previous">{i}</button>
				</li>
				:
				<li key={i} className={`page-item mx-1 ${i === current ? 'active': ''}`}>
					<button 
						className="page-link px-2 rounded-lg" 
						aria-label="Previous" 
						onClick={() => onClick(i-1)}
					>{i}</button>
				</li>

			lists.push(btn)
        }
        return lists
	}
	
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination d-flex justify-content-center mx-3">
				{
                    currentPage > 0 ?
						<li className="page-item mx-1">
							<button 
								className="page-link px-2 rounded-lg" 
								aria-label="Previous" 
								onClick={() => onClick(0)}
							>
								<span aria-hidden="true" className="icon-left-arrow" style={{fontSize: "12px"}} />
								<span className="sr-only">Previous</span>
							</button>
						</li> : ""
                }
				{createPagination()}
				{
                    currentPage+1 < totalPage ?
						<li className="page-item mx-1">
							<button 
								className="page-link px-2 rounded-lg" 
								aria-label="Next" 
								onClick={() => onClick(totalPage-1)}
							>
								<span aria-hidden="true" className="icon-right-arrow" />
								<span className="sr-only">Next</span>
							</button>
						</li> : ""
                }
			</ul>
		</nav>
	)
}