import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewAllProperties = () => {

    const navigate = useNavigate();

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then((res) => {
                localStorage.removeItem("currentUser");
                navigate('/')
            })
            .catch((err) => {
                console.log("ViewAllProperties logout catch err: ", err)
            })
    }
    return (
<div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
    <div className="row " style={{borderBottom: '2px solid black'}}>
        <h1></h1>
        <button onClick={() => logout()} className='col-md btn btn-primary'>Log out</button>
        <button onClick={() => toNewProperty()} className='col-md btn offset-sm-1 btn-secondary'>Add a new Property</button>
        <button onClick={() => logout()} className='col-md offset-md-2 btn btn-primary'>My Account</button>
        <h1></h1>
    </div>
    <div className="row">
        <div className="col-md">
            <div className="subcontainer">
                <h1>Here are the current spooky listings!</h1>
                <table className="column" style={{ border: '2px solid black' }}>
                    <thead>
                        <tr>
                            <th>Asking Price</th>
                            <th># of Bathrooms</th>
                            <th># of Bedrooms</th>
                            <th># of Ghosts</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <p>
                
                </p>
            </div>
        </div>
        <div className="col-md">
            <div className="subcontainer position-fixed" style={{backgroundColor: '#f0f0f0', border: '2px solid black', left: '58%', transform: 'translateX(50%)'}}>
                <div className='row justify-content-center'>
                    <p className="fs-3">Filters:</p>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Asking Price</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of bathrooms</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of Bedrooms</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of ghosts</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum SquareFeet</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Rent or Own</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Property Type</label>
                            <input className="form-control"></input>
                        </div>
                        <p></p>
                        <button className="btn btn-primary">Filter</button>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}

export default ViewAllProperties;