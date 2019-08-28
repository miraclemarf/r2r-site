import Link from 'next/link'

const createPaging = (total, current) => {
	let list = [], 
		limit = total, 
		upper, lower, 
		currentPage = lower = upper = Math.min(current+1, total)

	for (let x = 0; x < limit; x++) {
		if(lower > 1 ) {
	        lower--; x++; 
	    }
	    if(x < limit && upper < total) {
	        upper++; x++; 
	    }
	}
	console.log(list)

	for (let i = lower; i <= upper; i++) {
		if(i == currentPage) {
	    	list.push(
				<li key={i} className="page-item mx-1 active">
					<Link href="#">
						<a className="page-link" aria-label={i}>{i}</a>
					</Link>
				</li>
			)
	    } else {
	    	list.push(
				<li key={i} className="page-item mx-1">
					<Link href="#">
						<a className="page-link" aria-label={i}>{i}</a>
					</Link>
				</li>
			)
	    }
	}
	return list
}

const pagination = (props) => {
	const { total, display, current } = props
	const totalPage = Math.ceil(total/display)
	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination d-flex justify-content-center mx-3">
				<li className={`page-item mx-1 ${current >= 1 ? '' : 'd-none'}`}>
					<Link href="#">
						<a className="page-link px-2" aria-label="Previous">
							<span aria-hidden="true" className="icon-left-arrow" />
							<span className="sr-only">Previous</span>
						</a>
					</Link>
				</li>
				{current > totalPage ? createPaging(totalPage, current) : ""}
				<li className={`page-item mx-1 ${current+1 >= totalPage ? 'd-none' : ''}`}>
					<Link href="#">
						<a className="page-link px-2" aria-label="Next">
							<span aria-hidden="true" className="icon-right-arrow" />
							<span className="sr-only">Next</span>
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	)
}

export default pagination;