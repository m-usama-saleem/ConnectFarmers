
import React, { useState, useEffect, useContext, useRef } from "react";
import { ImagePath } from "../../constants/Data";
import { ProductService } from "../../services/ProductService";
import { LocalStorageContext } from "../../context";
import { OverlayPanel } from 'primereact/overlaypanel';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const OrderHistory = (props) => {

    const { user, updateUser } = useContext(LocalStorageContext);
    const { ProductHistory } = ProductService();
    const [bidsHistory, setBidsHistory] = useState(null);

    useEffect(() => {
        ProductHistory(props.id).then(data => {
            data.forEach(x => {
                x.createdDate = new Date(x.createdDate).toLocaleString()
            });
            setBidsHistory(data)
        })
    }, []);

    return (
        <div>
            <DataTable value={bidsHistory}
                // selection={selectedProduct} 
                // onSelectionChange={(e) => setSelectedProduct(e.value)}
                selectionMode="single"
                paginator rows={5}
            //  onRowSelect={onProductSelect}

            >
                <Column field="userName" header="User" sortable></Column>
                <Column field="amount" header="Bid Amount" sortable></Column>
                <Column field="createdDate" header="Bid Date" sortable></Column>
            </DataTable>
        </div>
    )
}
