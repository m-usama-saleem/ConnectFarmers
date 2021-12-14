
import React, { useState, useEffect, useContext, useRef } from "react";
import { Button } from 'primereact/button';
import { ImagePath, ProductsData } from "../../constants/Data";
import { OverlayPanel } from 'primereact/overlaypanel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { OrderHistory } from "./orderHistory";
import Countdown from 'react-countdown';

const Completionist = () => <span>Bid Expired!</span>;

const BidTimer = (props) => {
    const [timerClass, setTimerClass] = useState("status-instock");
    const expiredTime = !props.data.expired ? new Date(props.data.expired) : null;
    if ((expiredTime == null || expiredTime < Date.now) && timerClass != "status-outofstock") {
        setTimerClass("status-outofstock")
    }
    return (
        <div className={`product-badge ${timerClass}`}>
            <span>Time Remaining: </span>
            <Countdown onComplete={() => setTimerClass("status-outofstock")} date={expiredTime}>
                <Completionist />
            </Countdown>
        </div>
    )
}

export const DataViewGridItem = (props) => {

    const op2 = useRef(8);
    const [data, setDate] = useState(props.data)
    const toggleDataTable = (event) => {
        op2.current.toggle(event);
    };

console.log("props")
console.log(props)
    return (
        data != null ?
            <div className="p-col-12 p-md-4" style={{ minHeight: 520 }}>
                <div className="product-grid-item card" style={{ height: '95%' }}>
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{data.category}</span>
                        </div>
                        <BidTimer data={data} />
                    </div>
                    <div className="product-grid-item-content">
                        <img src={`${ImagePath}${data.images.split(',')[0]}`} height='250px' alt={data.name} />
                        <div className="product-name">{data.name}</div>
                        <div className="product-description">{data.area} | {data.district} | {data.city} </div>
                        <div className="product-description">Weight: {data.weight} KG</div>
                        {/* <Rating value={data.rating} readonly cancel={false}></Rating> */}
                    </div>
                    <div className="product-grid-item-bottom" style={{ bottom: 0 }}>
                        <span className="product-price">Rs {data.currentBid == 0 ? data.minBidAmount : data.currentBid}</span>
                        {/*  */}
                        <Button type="button" label="Bid History" onClick={toggleDataTable} className="p-button-success" />
                        <Button className="btn" label="Bid" disabled={data.inventoryStatus === 'OUTOFSTOCK'}
                            onClick={() => { props.ShowbidDisplayDiv(data); }}></Button>

                        <OverlayPanel ref={op2} appendTo={document.body} showCloseIcon id="overlay_panel" style={{ width: '450px' }}>
                            <div className="p-grid p-formgrid">
                                <div className="p-col-12">
                                    <OrderHistory ref={op2} key={data.sysSerial} id={data.sysSerial} />
                                </div>
                            </div>
                        </OverlayPanel>
                    </div>
                </div>
            </div>
            : <div></div>
    );
}