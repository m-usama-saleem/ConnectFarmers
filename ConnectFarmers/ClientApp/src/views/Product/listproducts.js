
import React, { useState, useEffect, useContext, useRef } from "react";
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ImagePath, ProductsData } from "../../constants/Data";
import { Dialog } from 'primereact/dialog';
import { ProductService } from "../../services/ProductService";
import { LocalStorageContext } from "../../context";
import Countdown from 'react-countdown';
import { InputText } from "primereact/inputtext";
import { Carousel } from 'react-responsive-carousel';
import { OverlayPanel } from 'primereact/overlaypanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { OrderHistory } from "./orderHistory";
import { DataViewGridItem } from "./ProductItem";


export const ListProductsView = () => {

    const [user, setUser] = useState(null);
    const { GetProductList, PlaceBid, ProductHistory } = ProductService();
    const [dataviewValue, setDataviewValue] = useState(null);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const [bidAmount, setBidAmount] = useState("");
    const [bidDisplayDiv, setBidDisplayDiv] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        // setDataviewValue(ProductsData);
        GetProductList().then(data => {
            setDataviewValue(data)
        })
        var ls = JSON.parse(localStorage.getItem("LoggedInUser"));
        setUser(ls.user)
    }, []);

    const OpenDialog = () => {
        const data = selectedProduct
        if (data) {

            var images = data.images.split(",");
            var allImages = images.map(e => <div><img width='80%' height='400px' src={`${ImagePath}${e}`} /></div>)
            return (
                <div>
                    <h3>{data.name}</h3>
                    <p>{data.remarks}</p>
                    <div className="p-col-12">
                        <Carousel showThumbs={false} axis="horizontal" showArrows={true}>
                            {allImages}
                        </Carousel>
                    </div>
                    <p>{data.description}</p>
                    <h3>Place Your Bid</h3>
                    <hr />
                    <div className="p-formgroup-inline" style={{ float: 'right' }}>
                        <div className="p-field">
                            <label htmlFor="Amount">Amount</label>
                            <InputText id="Amount" onChange={(e) => setBidAmount(e.target.value)}
                                type="number" placeholder={`> ${data.currentBid == 0 ? data.minBidAmount : data.currentBid}`} min={data.currentBid == 0 ? data.minBidAmount : data.currentBid} />
                        </div>
                        <Button label="Submit" onClick={() => { SubmitBid(data.sysSerial) }}></Button>
                    </div>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    const itemTemplate = (data, layout) => {
        if (!data) {
            return;
        }
        else if (layout === 'grid') {
            return <DataViewGridItem data={data} />
        }
    };

    function SubmitBid(productId) {
        var model = {
            UserId: user.sysSerial,
            ProductId: productId,
            Amount: bidAmount,
            BidDate: Date.now
        }
        PlaceBid(model).then(() => {
            setBidDisplayDiv(!bidDisplayDiv)
        })
    }

    return (
        <div className="p-grid list-demo">
            <div className="p-col-12">
                <div className="card">
                    <DataView value={dataviewValue} layout={layout} paginator rows={9}
                        sortOrder={sortOrder} sortField={sortField}
                        itemTemplate={itemTemplate}>
                    </DataView>
                    <Dialog header="Product Details" visible={bidDisplayDiv} style={{ width: '60%', height: 600 }} modal onHide={() => setBidDisplayDiv(false)}>
                        {
                            OpenDialog()
                        }
                    </Dialog>
                </div>
            </div>
        </div>
    )
}
