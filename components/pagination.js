export default (props) => {
	const { total, current, onClick } = props
    const createPagination = () => {
        var lists = [],
            currentPage = current + 1,
            delta = 2,
            left = currentPage - delta,
            right = currentPage + delta + 1,
            range = [], rangeWithDots = [], l

        for (let i = 1; i <= total; i++) {
            if (i == 1 || i == total || i >= left && i < right) {
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
			const btn = i === '...' ? 
				<li key={i} className="page-item mx-1">
					<button className="page-link px-2 rounded-0" aria-label="Previous">{i}</button>
				</li>
				:
				<li key={i} className="page-item mx-1">
					<button 
						className="page-link px-2 rounded-0" 
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
                    current > 0 ?
						<li className="page-item mx-1">
							<button 
								className="page-link px-2 rounded-0" 
								aria-label="Previous" 
								onClick={() => onClick(0)}
							>
								<span aria-hidden="true" className="icon-left-arrow" style={{fontSize: "12px"}} />
								<span className="sr-only">Previous</span>
							</button>
						</li> : ""
                }
				{current > total ? createPagination() : ""}
				{
                    current+1 < total ?
						<li className="page-item mx-1">
							<button 
								className="page-link px-2 rounded-0" 
								aria-label="Next" 
								onClick={() => onClick(total-1)}
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