import React, { useState } from 'react'
import { priceAbbr } from '../functions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
export default (props) => {
    //console.log(props.data);
    const cartData = "accessories" in props.data ? props.data.accessories : []
    return (
        <div>
            <div className="d-flex justify-content-between">
                <div className="align-self-center d-flex align-items-center">
                    <FontAwesomeIcon className="text-primary h5 mb-0 mr-2" icon={faShoppingCart} />
                    <h2 className="title-section m-0">Shopping Cart</h2>
                </div>
                <div className="align-self-center">
                    <span style={cartData.length > 0 ? { backgroundColor: "#CCDBFF", color: "#1C3D8D" } : {}} className={(cartData.length == 0 ? "bg-softgray " : "") + "text-sm px-3 py-1 rounded-pill"}>{cartData.length} Item</span>
                </div>
            </div>
            <div className="pt-4">
                {
                    cartData.length > 0 ?
                        cartData.map((item, index) => (
                            <div className="border-bottom pb-4 mb-4 border-softgray" key={index}>
                                <div className="d-flex">
                                    <div className="mr-auto">
                                        <div>
                                            <span className="text-sm text-gray80">Merchant Name</span>
                                            <h3 style={{ lineHeight: "normal" }} className="title-section">{item.title}</h3>
                                        </div>
                                    </div>
                                    <div className="position-relative" style={{ width: "25%" }}>
                                        <img src={item.picture} className="img-fluid my-1" />
                                        <div onClick={() => { props.deleteAccessoriesCart(item.id) }} className="border bg-white d-flex align-items-center rounded-circle position-absolute" style={{boxShadow:"0px 3px 6px #00000029", width:"35px", height:"35px", top:"0", right:"0"}}>
                                            <FontAwesomeIcon className="text-primary m-auto" icon={faTrashAlt} />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="d-flex mr-2"><span className="text-xs text-gray80 align-self-center">qty</span></div>
                                    <div style={{ width: "35px", height: "35px" }} className={"rounded bg-softgray border-softgray border d-flex"} onClick={()=>{item.quantity > 1 ? props.updateAccessoriesCart(item.id, "minus") : props.deleteAccessoriesCart(item.id)}}>
                                        <h5 className="title-section align-self-center m-auto text-white">-</h5>
                                    </div>
                                    <div style={{ width: "50px", height: "35px" }} className={" rounded d-flex"}>
                                        <h5 className="title-section align-self-center m-auto">{item.quantity}</h5>
                                    </div>
                                    <div style={{ width: "35px", height: "35px" }} className={"rounded bg-softgray border-softgray border d-flex"} onClick={()=>{props.updateAccessoriesCart(item.id, "plus")}}>
                                        <h5 className="title-section align-self-center m-auto text-white">+</h5>
                                    </div>
                                    <div className="mx-4" style={{ lineHeight: "16px" }}>
                                        <span className="text-xs text-gray80">Size</span><br />
                                        <span className="font-weight-bold align-self-center m-auto text-sm">{item.size}</span>
                                    </div>
                                    <div className="flex-grow-1" style={{ lineHeight: "16px" }}>
                                        <span className="text-xs text-gray80">Price</span><br />
                                        <span className="align-self-center m-auto text-sm text-primary">
                                            <strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, item.price) }}></strong>
                                        </span>
                                    </div>
                                </div>
                            </div>

                        ))

                        :
                        <div className="py-2 mt-3 text-center">
                            <i className="text-sm">Your shopping cart still empty</i>
                            <div className="py-3" />
                        </div>
                }
            </div>
        </div>
    )
}