import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import TextImgCard from '../../components/textImgCard'
import Pagination from '../../components/pagination'
import { getLatestGallery, getLatestTrips } from '../../utils'

class Gallery extends React.Component {
	static async getInitialProps({ store }) {
		// Inherit standard props from the Page (i.e. with session data)
		let props = { nav: 'blue', footer: 'transparent' }
		let stores = await store.getState()
		try {
			// Gallery Scope
			if (!stores.GalleryData) await store.dispatch(getLatestGallery(0, 6))
			// Trip Scope
			if (!stores.TripData) await store.dispatch(getLatestTrips(0, 10))
		} catch (e) {
			props.error = 'Unable to fetch AsyncData on server'
		}
		return props
	}
	constructor(props) {
		super(props)
		this.state = {
			trips: props.TripData,
			gallery: props.GalleryData
		};
	}
	
	componentWillReceiveProps(nextProps) {
		this.setState({
			trips: nextProps.TripData,
			gallery: nextProps.GalleryData
		})
	}

	render() {        
		return (
			<div role="main">
				<div className="py-2" />
				<h1 className="h2 title-section mx-3 mb-3">TRIPS GALLERY</h1>
				{
					this.state.gallery ?
					<div>
						{this.state.gallery.map((item, key) => (
							<div key={key} className="mb-1">
								<TextImgCard {...item} isLandscape={true} iconTextPostion="align-items-center" section="gallery" />
							</div>
                        ))}
                        <div className="mt-4 mb-4">
							<Pagination />
                        </div>
					</div> : ""
				}
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getLatestGallery: bindActionCreators(getLatestGallery, dispatch),
		getLatestTrips: bindActionCreators(getLatestTrips, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(Gallery)