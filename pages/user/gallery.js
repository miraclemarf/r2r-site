import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import cookies from 'next-cookies'
import { Container, Row } from 'reactstrap'
import TabNavigation from '../../components/tabNavigation'
import InfiniteScroll from 'react-infinite-scroller'
import GalleryCard from '../../components/galleryCard'
import LoaderCard from '../../components/cards/LoaderCard'
import { withAuthSync, getUserGallery } from "../../utils"

class UserGallery extends React.Component {
    static async getInitialProps({ store, req }) {
        // Inherit standard props from the Page (i.e. with session data)
        let props = {
            nav: 'blue', 
			footer: 'transparent', 
			scrollHeader: false,
			fetchLimit: 5
        }
        let { token } = cookies({ req })
		let objToken = JSON.parse(token)
        let stores = await store.getState()
        try {
            if(!stores.MyGalleries) await store.dispatch(getUserGallery(objToken.access_token, 0, props.fetchLimit))
        } catch (e) {
            props.error = 'Unable to fetch AsyncData on server'
        }
        return props
    }
    constructor(props) {
        super(props)
        this.state = {
            fetchPage: 1,
            fetchLimit: props.fetchLimit,
            fetchStop: props.StopFetchMyGalleries,
            fetchHasMore: props.MyGalleries && props.MyGalleries.length >= props.fetchLimit,
            myGalleries: props.MyGalleries
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        const { MyGalleries, StopFetchMyGalleries } = nextProps
        const { fetchLimit } = this.state
		const pages = Math.ceil(MyGalleries.length / fetchLimit)
		this.setState({
			myGalleries: MyGalleries,
            fetchHasMore: MyGalleries.length / fetchLimit >= pages,
            fetchStop: StopFetchMyGalleries,
			fetchPage: pages
		})
    }

    loadMoreMyGallery = () => {
        const { fetchPage, fetchLimit, fetchStop, fetchHasMore } = this.state
		const { token } = this.props
		if(!fetchStop && fetchHasMore) {
			this.props.getUserGallery(token.access_token, fetchPage, fetchLimit, true)
		}
	}

    render() {
        let { token, user } = this.props
        const { myGalleries, fetchHasMore, fetchStop } = this.state
        const tabMenuData = {
            menu: [
                { name: 'Gallery', url: `${process.env.HOST_DOMAIN}/user/gallery`, path: '/user/gallery', active: true }, 
                { divider: true }, 
                { name: 'Next Trips', url: `${process.env.HOST_DOMAIN}/user/trips`, path: '/user/trips', active: false }
            ]
        }

        return (
            <div role="main" className="mt-4 pt-5">
                <Container className="container-sm px-0">
                    <div className="d-flex justify-content-between my-1 px-3">
                        <div className="d-flex justify-content-start">
                            <div className="mt-1">
                                <img
                                    className="rounded-circle border border-white"
                                    width="40"
                                    height="40"
                                    src={user.userPicture ? userPicture : `http://kampus-stikespanakkukang.ac.id/assets/images/photo_empty.png`}
                                />
                            </div>

                            <div className="ml-2" style={{ lineHeight: "2px" }}>
                                {/* <b className="h3 ml-4">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b> */}

                                <b className="h3 title-section">{user.fullName ? user.fullName : user.email.substring(0, user.email.indexOf("@"))}</b><br />
									<span className="text-sm">{user.email}</span>
                            </div>
                        </div>
                        <div>{/* <a href={process.env.HOST_DOMAIN + '/user/profile'} className="text-primary text-sm"><b>EDIT</b></a> */}</div>
                    </div>
                    <div 
                        className="position-sticky py-3 mb-1 px-1 bg-white"
                        style={{top: "64px", zIndex: 9}}
                    >
                        <TabNavigation {...tabMenuData} />
                    </div>
                    {
                        myGalleries ?
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.loadMoreMyGallery}
                                hasMore={!fetchStop && fetchHasMore}
                                loader={
                                    <LoaderCard 
                                        key={0}
                                        className="px-3"
                                        loaderColor="primary"
                                        loaderSize="md"
                                        loaderType="spinner"
                                    />
                                }
                            >
                                {
                                    <Row className="px-3">{
                                        myGalleries.map((data, key) => (
                                            <GalleryCard 
                                                key={key} 
                                                data={data} 
                                                pathname={"gallery"} 
                                                withDate={true}
                                            />
                                        ))
                                    }</Row>
                                } 
                            </InfiniteScroll>
                            :
                            <div className="pt-4" style={{ minHeight: "50vh" }}>
                                <div className="alert alert-danger" role="alert">
                                    <h5 className="text-center font-italic title-section m-0">Sorry, You don't Have Any Gallery!</h5>
                                </div>
                            </div>
                    }
                </Container>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
	return {
		getUserGallery: bindActionCreators(getUserGallery, dispatch)
	}
}
export default connect(state => state, mapDispatchToProps)(withAuthSync(UserGallery))