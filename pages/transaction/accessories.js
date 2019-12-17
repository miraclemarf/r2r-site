import React from 'react'
import Link from 'next/link'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAccessories, getSubAccessories, getAccessoriesItem, getAccessoriesDetail } from '../../utils/accessories'
import { selectedAccessories } from '../../utils/userTransaction'
import StepTransaction from '../../components/stepTransaction'
import AccSliderSubCategory from '../../components/accessories/sliderText'
import AccCardList from '../../components/accessories/card'
import AccDetail from '../../components/accessories/detail'
import Cart from '../../components/accessories/cart'
import { accTotalPrice } from '../../components/functions';

class Accessories extends React.Component {
    static async getInitialProps({ store, req, query: { id }, res }) {
        if (res) {
            res.writeHead(302, {
                Location: process.env.HOST_DOMAIN + '/trip/' + id
            })
            res.end()
        }
        let props = {};
        props.nav = 'blue';
        props.navTrans = { step: 2 }
        props.footer = 'transparent';
        props.idTrip = id;
        props.categoryData = null;
        props.selectedSubCategoryId = 0;
        props.isSubAcc = false;
        props.isViewHelm = false;
        props.accessoriesCart = [];
        await store.dispatch(getAccessories());
        return props;
    }
    constructor(props) {
        super(props);
        this.state = { ...props };
        this.selectedCategory = this.selectedCategory.bind(this);
        this.selectedSubCategory = this.selectedSubCategory.bind(this);
        this.selectedAccessories = this.selectedAccessories.bind(this);
        this.addAccessoriesCart = this.addAccessoriesCart.bind(this);
        this.deleteAccessoriesCart = this.deleteAccessoriesCart.bind(this);
        this.updateAccessoriesCart = this.updateAccessoriesCart.bind(this);
    }
    async selectedAccessories(item) {
        //console.log(item);

        await this.props.getAccessoriesDetail(item.id)
        this.setState({ ...this.props, isSubAcc: true, isViewHelm: true })
    }

    async selectedCategory(item) {
        await this.props.getSubAccessories(item.id)
        await this.props.getAccessoriesItem(0, item.id)
        this.setState({ ...this.props, isSubAcc: true })
    }

    async selectedSubCategory(id) {
        await this.props.getAccessoriesItem(id, 0)
        this.setState({ ...this.props, isSubAcc: true, selectedSubCategoryId: id })
    }

    async addAccessoriesCart(obj) {
        const { TripData, TransactionData } = this.state;
        let arrItem = TransactionData.accessories ? TransactionData.accessories : []
        arrItem.push(obj)

        await this.props.selectedAccessories({ ...TransactionData, accessories: arrItem });
        this.setState({ ...this.props });

    }
    async deleteAccessoriesCart(idRemove) {

        const { TripData, TransactionData } = this.state;
        let arrItem = TransactionData.accessories ? TransactionData.accessories : []
        arrItem = arrItem.filter(({ id }) => id !== idRemove);

        await this.props.selectedAccessories({ ...TransactionData, accessories: arrItem });
        this.setState({ ...this.props });

    }

    async updateAccessoriesCart(id, counter) {
        const { TripData, TransactionData } = this.state;
        let arrItem = TransactionData.accessories ? TransactionData.accessories : []
        if (counter == "minus") {
            arrItem.find(obj => obj.id == id).quantity--;
        }
        else {
            arrItem.find(obj => obj.id == id).quantity++;
        }

        await this.props.selectedAccessories({ ...TransactionData, accessories: arrItem });
        this.setState({ ...this.props });
    }

    renderDetailAccessories() {
        const { AccessoriesData } = this.state
        const accItem = "detail" in AccessoriesData ? AccessoriesData.detail : null;
        console.log(AccessoriesData);

        return (
            <div>
                <div className="container">
                    <div className="mb-4 position-relative">
                        <span style={{ zIndex: "10" }} className="pt-2 d-block text-dark h4 title-section position-relative" onClick={() => this.setState({ isViewHelm: false })} ><span style={{ top: "-1px", zIndex: "10" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</span>
                    </div>
                    <AccDetail {...accItem} addAccessoriesCart={this.addAccessoriesCart} />
                </div>
                <div className="py-2"></div>
            </div>
        )
    }

    renderSubAccessories() {
        const { AccessoriesData, isSubAcc, selectedSubCategoryId } = this.state;
        //const arrItem = ['Simpson M93 8all', 'Arai JL99 Shark', 'AGV The Doctor 46']
        //"subcategory" in AccessoriesData ? this.renderSubAccessories() : ''
        const arrItem = "data" in AccessoriesData ? AccessoriesData.data.accessories : [];
        return (
            <div className={!isSubAcc ? 'collapse' : 'mb-4'}>
                <h2 className="title-section text-center mb-4">{AccessoriesData.subcategory.categoryName}</h2>
                <AccSliderSubCategory handleClick={this.selectedSubCategory} {...this.state} />
                <div className="container">
                    {
                        arrItem.map((item, index) => (
                            <div key={index}>
                                <AccCardList selectedAccessories={this.selectedAccessories} item={item} index={index} />
                            </div>
                        ))
                    }
                </div>
                <style jsx>{`
                     .overlay-black::before {
                        content:'';
                        position:absolute;
                        top:0;right:0;
                        bottom:0;left:0;
                        background-color:rgba(0,0,0,.4);
                    }
                `}
                </style>
            </div>
        )
    }

    render() {
        const { idTrip, isSubAcc, AccessoriesData, isViewHelm, TransactionData } = this.state
        //accTotalPrice(TransactionData.accessories)
        console.log(TransactionData)

        return (
            <div>
                <div className="py-2"></div>
                {isViewHelm ? this.renderDetailAccessories() : ''}
                <div className={isViewHelm ? 'collapse' : ''}>
                    <div className="container">
                        <div className="mb-4 position-relative">
                            {
                                isSubAcc ?
                                    <span style={{ zIndex: "10" }} className="pt-2 d-block text-dark h4 title-section position-relative" onClick={() => this.setState({ isSubAcc: false })} ><span style={{ top: "-1px", zIndex: "10" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</span> :
                                    <a className="d-block pt-2 text-dark h4 title-section position-relative" href={process.env.HOST_DOMAIN + "/trip/" + idTrip} style={{ "zIndex": "10" }} ><span style={{ top: "-1px" }} className="icon-left-arrow text-sm text-primary position-relative"></span> Back</a>
                            }

                            <StepTransaction step="3" />
                        </div>
                    </div>
                    <div className={isSubAcc ? 'collapse' : ''}>
                        <h2 className="title-section text-center mb-4">ACCESSORIES</h2>
                        <div className="container">
                            <div className="mb-4">
                                <span className="text-sm">Buy your accessories or you can just skip to <b>check out</b></span>
                            </div>
                            <div>
                                <div className="row no-gutters">
                                    {
                                        AccessoriesData.category.map((item, index) => (
                                            <div key={index} className="col-6">
                                                <div onClick={(e) => this.selectedCategory(item)} style={{ "backgroundImage": 'url(' + process.env.DUMMY + '/acc-' + index + '.jpg)' }} className="bg-radius position-relative inner-border d-flex m-1">
                                                    <h3 style={{ 'left': '0', 'right': '0' }} className="position-absolute text-white text-center align-self-center title-section">{item.title}</h3>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="container bg-grayF2 py-3 position-relative" style={{ "top": "8px" }}>
                            <Cart data={TransactionData} updateAccessoriesCart={this.updateAccessoriesCart} deleteAccessoriesCart={this.deleteAccessoriesCart} />
                        </div>
                    </div>
                    {
                        "subcategory" in AccessoriesData ? this.renderSubAccessories() : ''
                    }
                    <div className="fixed-bottom">
                        <Link
                            href={'/transaction/checkout?page=checkout&id=' + idTrip}
                            as={process.env.HOST_DOMAIN + '/trip/' + idTrip + '/checkout'}
                        >
                            <button className="btn btn-primary w-100">
                                NEXT : CHECK OUT
                        </button>
                        </Link>
                    </div>
                </div>
                <style jsx>{`
                    .bg-radius{
                        border-radius:10px;
                        background-size:cover;
                        background-position:center;
                    }
                    .inner-border::before {
                        content:'';
                        position:absolute;
                        top:0;right:0;
                        bottom:0;left:0;
                        background-color:rgba(0,0,0,.4);
                        border-radius:10px;
                    }
                    .inner-border::after {
                        display:block;
                        padding-bottom:100%;
                        content:'';
                    }
                `}</style>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAccessories: bindActionCreators(getAccessories, dispatch),
        getSubAccessories: bindActionCreators(getSubAccessories, dispatch),
        getAccessoriesItem: bindActionCreators(getAccessoriesItem, dispatch),
        getAccessoriesDetail: bindActionCreators(getAccessoriesDetail, dispatch),
        selectedAccessories: bindActionCreators(selectedAccessories, dispatch)

    };
};
export default connect((state) => state, mapDispatchToProps)(Accessories);