import React, { useState } from 'react'
import { priceAbbr } from '../functions';
export default (props) => {
    const initialCounterValue = 1
    const [counter, setCount] = useState(initialCounterValue)
    let [size, selectedSize] = useState()
    return (
        <div>
            <div className="p-3 bg-grayF2 position-relative text-center" style={{ borderRadius: "8px" }}>
                <img style={{ width: "80%" }} src={props.picture} className="img-fluid my-3" />
                <div className="position-absolute p-1 text-sm bg-gray text-white" style={{ fontSize: "75%", right: "20px", top: "20px", borderRadius: "4px", zIndex: "2" }}>
                    <span className="text-info">+ </span><strong dangerouslySetInnerHTML={{ __html: priceAbbr(false, props.price) }}></strong>
                </div>
            </div>
            <div className="mt-3">
                <span className="text-sm text-gray80">Merchant Name</span>
                <h3 style={{ lineHeight: "normal" }} className="title-section">{props.title}</h3>
            </div>
            <div className="mt-3">
                <span className="text-sm text-gray80">Choose your size</span>
                <div className="d-flex justify-content-start mt-2">
                    <div onClick={() => selectedSize(size = "M")} data-size="M" style={{ width: "50px", height: "50px" }} className={(size == "M" ? "bg-primary border-primary" : "bg-grayF2 border-grayF2") + " border d-flex"}>
                        <h3 className={(size == "M" ? "text-white " : "") + "title-section align-self-center m-auto"}>M</h3>
                    </div>
                    <div onClick={() => selectedSize(size = "L")} data-size="L" style={{ width: "50px", height: "50px" }} className={(size == "L" ? "bg-primary border-primary" : "bg-grayF2 border-grayF2") + "  border d-flex mx-2"}>
                        <h3 className={(size == "L" ? "text-white " : "") + "title-section align-self-center m-auto"}>L</h3>
                    </div>
                    <div onClick={() => selectedSize(size = "XL")} data-size="XL" style={{ width: "50px", height: "50px" }} className={(size == "XL" ? "bg-primary border-primary" : "bg-grayF2 border-grayF2") + "  border d-flex"}>
                        <h3 className={(size == "XL" ? "text-white " : "") + "title-section align-self-center m-auto"}>XL</h3>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <span className="text-sm text-gray80">Quantity</span>
                <div className="d-flex justify-content-start mt-2">
                    <div onClick={() => counter > 1 ? setCount(counter - 1) : ''} style={{ width: "50px", height: "50px" }} className={"rounded bg-grayF2 border-grayF2 border d-flex"}>
                        <h3 className="title-section align-self-center m-auto text-gray">-</h3>
                    </div>
                    <div data-size="L" style={{ width: "90px", height: "50px" }} className={" rounded border border-dark d-flex mx-2"}>
                        <h3 className="title-section align-self-center m-auto">{counter}</h3>
                    </div>
                    <div onClick={() => setCount(counter + 1)} style={{ width: "50px", height: "50px" }} className={"rounded bg-grayF2 border-grayF2 border d-flex"}>
                        <h3 className="title-section align-self-center m-auto text-gray">+</h3>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <p>{props.description}</p>
            </div>
            <div className="fixed-bottom">
                <button onClick={(e) => {
                    if (size) {
                        props.addAccessoriesCart({ ...props, "size": size, "quantity": counter })
                    }
                    else {
                        alert('Please Choose an Option');
                        e.preventDefault();
                    }

                }} className="btn btn-primary w-100">
                    ADD TO CART
                        </button>
            </div>
        </div>
    )
}