
import React, { useState, useEffect, useContext, useRef } from "react";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { AuthenticationService } from '../../services/AuthenticationService';


export const ProfileView = () => {
    // const { t } = useTranslation();
    // const { culture } = useContext(LocalStorageContext)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const { UpdateUserProfile, UploadImage } = AuthenticationService();
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");
    const [files, setFiles] = useState("");
    const [contact, setContact] = useState("");
    const [nic, setNic] = useState("");

    useEffect(async () => {
        var ls = JSON.parse(localStorage.getItem("LoggedInUser"));
        var ls_up = JSON.parse(localStorage.getItem("LoggedInUserProfile"));

        setUser(ls.user)
        setUserProfile(ls_up)
        setName(ls_up.firstName)
        setLastName(ls_up.lastName)
        setContact(ls_up.contact)
        setNic(ls_up.nic)
    }, []);

    function SaveProfile() {
        var filesArray = files;
        let f = new FormData();
        if (filesArray && filesArray.length > 0) {
            filesArray.forEach(e => {
                f.append("file[]", e)
            })
        }
        if(filesArray.length > 0){

            UploadImage(f).then((fname) => {
                userProfile.image = fname;

                userProfile.contact = contact;
                userProfile.firstName = name;
                userProfile.lastName = lastname;
                userProfile.nic = nic;
                localStorage.setItem("LoggedInUserProfile", JSON.stringify(userProfile))
                var obj = {
                    LoginId: user.loginId,
                    FirstName: name,
                    Image: fname,
                    Contact: contact,
                    NIC: nic,
                    LastName: lastname
                }
                UpdateUserProfile(obj)
            })
        }
        else{
            var obj = {
                LoginId: user.loginId,
                FirstName: name,
                Contact: contact,
                NIC: nic,
                Image: userProfile.image,
                LastName: lastname
            }
            userProfile.contact = contact;
            userProfile.firstName = name;
            userProfile.lastName = lastname;
            userProfile.nic = nic;

            localStorage.setItem("LoggedInUserProfile", JSON.stringify(userProfile))
            UpdateUserProfile(obj)
        }
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
        <div>
            <div className="card p-fluid">
                <h5>Change Profile Data</h5>
                <div className="p-formgrid p-grid">
                    <div className="p-field p-col-6">
                        <label htmlFor="name2">First Name</label>
                        <InputText value={name}
                            onChange={(e) => setName(e.target.value)} id="name2" type="text" />
                    </div>
                    <div className="p-field p-col-6">
                        <label htmlFor="name2">Last Name</label>
                        <InputText value={lastname}
                            onChange={(e) => setLastName(e.target.value)} id="name2" type="text" />
                    </div>
                    <div className="p-field p-col-6">
                        <label htmlFor="email2">Email</label>
                        <InputText value={userProfile ? userProfile.loginId : ""} id="email2" type="text" disabled />
                    </div>
                    <div className="p-field p-col-6">
                        <label htmlFor="contact">Contact</label>
                        <InputText value={contact} onChange={(e) => setContact(e.target.value)} id="contact" type="text" />
                    </div>
                    <div className="p-field p-col-6">
                        <label htmlFor="nic">NIC</label>
                        <InputText value={nic} onChange={(e) => setNic(e.target.value)} id="nic" type="text" />
                    </div>
                    <div className="p-field p-col-6">
                        <label htmlFor="state">Upload Profile Pic</label>
                        <InputText type="file" onChange={onFileSelected} />
                    </div>
                    <div className="p-col-12 p-grid p-justify-end p-m-0">
                        <div className="box p-col-3">
                            <Button label="Save" onClick={() => SaveProfile()} className="p-mb-2 p-mt-5"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}