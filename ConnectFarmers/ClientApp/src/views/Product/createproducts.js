
import React, { useState, useEffect, useContext, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { ProductService } from '../../services/ProductService';
import Datetime from 'react-datetime';

import { CategoriesData } from "../../constants/Data";
import { LocalStorageContext } from "../../context";

import "react-datetime/css/react-datetime.css";

export const CreateProductsView = () => {
    const [ user, setUser ] = useState(null);
    const { CreateProduct,UploadImages } = ProductService();

    const [dropdownItem, setDropdownItem] = useState(null);
    const [name, setName] = useState("");
    const [area, setArea] = useState("");
    const [weight, setWeight] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [category, setCategory] = useState("");
    const [bidDate, setBidDate] = useState("");
    // const [type, setType] = useState("");
    const [remarks, setRemarks] = useState("");
    const [minBidAmount, setMinBidAmount] = useState("");
    const [files, setFiles] = useState([]);
    const [description, setDescription] = useState([]);

    const categoryDropdownItems = CategoriesData

    useEffect(() => {
        var ls =JSON.parse(localStorage.getItem("LoggedInUser"));
        setUser(ls.user)
    }, []);

    function CreateNewProduct() {
        var filesArray = files;
        let f = new FormData();
        if (filesArray && filesArray.length > 0) {
            filesArray.forEach(e => {
                f.append("file[]", e)
            })
        }

        UploadImages(f).then((fileNames) => {

            var model = {
                Name: name,
                Area: area,
                Weight: weight,
                City: city,
                District: district,
                Zipcode: zipcode,
                Images: "",
                IsExpired: false,
                CreatedBy: user.sysSerial,
                IsDeleted: false,
                Category: category,
                Remarks: remarks,
                Latitude: latitude,
                Longitude: longitude,
                Expired: bidDate,
                IsSold: false,
                MinBidAmount: minBidAmount,
                Images: fileNames,
                Description: description
            }
            CreateProduct(model)
        })

    }

    const onFileSelected = (e) => {
        const { target: { files } } = e;
        const filesToStore = [];

        [...files].map(file => {
            filesToStore.push(file)
        })
        setFiles(filesToStore)
    }
    return (
        <div className="p-grid">
            <div className="p-col-12">
                <div className="card">
                    <h5>Create New Product</h5>
                    <div className="p-fluid p-formgrid p-grid">
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="name">Name</label>
                            <InputText id="name" onChange={(e) => setName(e.target.value)} type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="category">Category</label>
                            <Dropdown id="category" value={dropdownItem}
                                onChange={(e) => { setDropdownItem(e.value); setCategory(e.value.code) }}
                                options={categoryDropdownItems} optionLabel="name" placeholder="Select One"></Dropdown>
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="area">Area</label>
                            <InputText id="area" onChange={(e) => setArea(e.target.value)} type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="weight">Weight</label>
                            <InputText id="weight" onChange={(e) => setWeight(e.target.value)} type="text" />
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lat">Latitude</label>
                            <InputText id="lat" onChange={(e) => setLatitude(e.target.value)} type="number" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="lng">Longitude</label>
                            <InputText id="lng" onChange={(e) => setLongitude(e.target.value)} type="number" />
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="city">City</label>
                            <InputText id="city" onChange={(e) => setCity(e.target.value)} type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="district">District</label>
                            <InputText id="district" onChange={(e) => setDistrict(e.target.value)} type="text" />
                        </div>

                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="zipcode">ZipCode</label>
                            <InputText id="zipcode" onChange={(e) => setZipcode(e.target.value)} type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="remarks">Short Description</label>
                            <InputText id="remarks" onChange={(e) => setRemarks(e.target.value)} type="text" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="remarks">Description</label>
                            <textarea className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} ></textarea>
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="biddate">Bid Date</label>
                            <Datetime onChange={(date) => { setBidDate(date.format()) }} />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="minBidAmount">Min Bid Amount</label>
                            <InputText className="form-control" id="remarks" onChange={(e) => setMinBidAmount(e.target.value)} type="number" />
                        </div>
                        <div className="p-field p-col-12 p-md-6">
                            <label htmlFor="state">Upload Pictures</label>
                            <InputText type="file" onChange={onFileSelected} multiple />
                        </div>
                        <div className="p-col-12 p-grid p-justify-end p-m-0">
                            <div className="box p-col-3 p-m-0">
                                <Button label="Submit" className="p-mb-2 p-mt-2 p-mr-0"
                                    onClick={() => CreateNewProduct()}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
