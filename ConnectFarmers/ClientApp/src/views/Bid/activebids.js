
import React, { useState, useEffect, useContext, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { ProductService } from "../../services/ProductService";
import { LocalStorageContext } from "../../context";
import Countdown from 'react-countdown';

const Completionist = () => <span>Bid Expired!</span>;

export const ActiveBidsView = () => {
        
    const [ user, setUser ] = useState(null);
    const { GetActiveBids } = ProductService();
    const [customer1, setCustomer1] = useState(null);
    const [globalFilter1, setGlobalFilter1] = useState('');
    const [loading1, setLoading1] = useState(true);

    useEffect(() => {
        var ls =JSON.parse(localStorage.getItem("LoggedInUser"));
        setUser(ls.user)
        GetActiveBids(ls.user.sysSerial).then(data => {
            setCustomer1(data);
            setLoading1(false);
        })
    }, []);

    const customer1TableHeader = (
        <div className="table-header">
            List of Customers
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText value={globalFilter1} onChange={(e) => setGlobalFilter1(e.target.value)} placeholder="Global Search" />
            </span>
        </div>
    );

    const bodyTemplate = (data, props) => {
        return (
            <Countdown onComplete={{}} date={new Date(data[props.field])}>
                <Completionist />
            </Countdown>
        );
    };

    return (
        <div className="p-grid table-demo">
            <div className="p-col-12">
                <div className="card">
                    <h5>Default</h5>
                    <DataTable value={customer1} paginator className="p-datatable-customers" rows={10} dataKey="id" rowHover 
                    // selection={selectedCustomers} onSelectionChange={(e) => setSelectedCustomers(e.value)}
                        globalFilter={globalFilter1} emptyMessage="No Bids found." loading={loading1} 
                        header={customer1TableHeader}>
                        <Column field="name" header="Name" sortable ></Column>
                        <Column field="weight" header="Weight" sortable ></Column>
                        <Column field="category" header="Category" sortable ></Column>
                        <Column field="remarks" header="Remarks" sortable ></Column>
                        <Column field="expired" header="Expiry" body={bodyTemplate} sortable ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    )
}