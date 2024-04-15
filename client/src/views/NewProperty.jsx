import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const NewProperty = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const {currentUserId} = useParams()
    const [currentUser, setCurrentUser] = useState({})
    // load the potential property
    const [potentialProperty, setPotentialProperty] = useState({
        lister_user_id: '',
        lister_username: '',
        lister_user_image: '',
        property_name: '',
        property_photo_url: '',
        property_photos: [],
        asking_price: 0,
        sell_or_rent: true,
        property_type: '',
        square_footage: 0,
        number_of_beds: 0,
        number_of_baths: 0,
        number_of_ghosts: 0,
        address: '',
        isSold: false,
        property_description: '',
        offer_ids: [],
        winning_bid_amount: 0,
        winning_bidder_user_id: '',
        winning_bidder_username: ''
    })

    // set the errors
    const [potentialPropertyErrors, setPotentialPropertyErrors] = useState({})
    // const [askingPriceError, setAskingPriceError] = useState("")

    // useEffect(() => {
    //     if(potentialProperty.asking_price <= 0 && potentialProperty.asking_price) {
    //         setAskingPriceError("Asking price must be greater than 0")
    //     }
    //     else{
    //         setAskingPriceError("")
    //     }
    // },[potentialProperty.asking_price])
    
    // get the current user and set the user's values into the property
        // when that is done, set loading to false
        useEffect(() => {
            console.log("NewProperty.jsx useEffect currentUserId", currentUserId)
            axios.get(`http://localhost:8000/api/users/${currentUserId}`)
            .then((res) => {
                console.log("NewProperty.jsx getOneUser res.data: ", res.data)
                setCurrentUser(res.data)
                setPotentialProperty(prevProperty => ({
                    ...prevProperty,
                    lister_user_id: res.data._id,
                    lister_username: res.data.username,
                    lister_user_image: res.data.user_image_url
                }))
                setLoading(false)
            })
            .catch((err) => {
                console.log("NewProperty.jsx getOneuser catch err: ", err)
                setLoading(false)
            })
        },[])

    // property form change handler
    const propertyFormChangeHandler = (e) => {
        const { name, value, type } = e.target;
        console.log("e", e)
        if(type === "radio"){
            setPotentialProperty(prevProperty => ({
                ...prevProperty,
                [name]: !potentialProperty.sell_or_rent // the value in the radio is true or false, change truthy/falsy
            }))
        } else {
            setPotentialProperty(prevProperty => ({
                ...prevProperty,
                [name]: value
            }))
        }
    }

    // property form submission
    const newPropertyFormSubmission = (e) => {
        e.preventDefault()
        let temp = {...potentialProperty, // this automatically assigns the key value pairs to the ones with the same name in the object
            lister_user_id: currentUser._id,
            lister_username: currentUser.username,
            lister_user_image: currentUser.user_image_url,
            asking_price: parseInt(potentialProperty.asking_price)
        }
        console.log("temp", temp)
        axios.post('http://localhost:8000/api/properties', temp, {withCredentials:true})
            .then((res) => {
                console.log("NewProperty.jsx newPropertyFormSubmission then res.data: ", res.data)
                navigate(`/all_properties/${currentUserId}`)
            })
            .catch((err) => {
                console.log("NewProperty.jsx newPropertyFormSubmission catch err.response.data.errors: ", err.response.data.errors)
                setPotentialPropertyErrors(err.response.data.errors)
            })
    }

    if(loading) {
        return <div>Loading...</div>
    }

    const toHome = () => navigate(`/all_properties/${currentUserId}`)

    return (
        <div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
            <div>
            <form onSubmit={newPropertyFormSubmission}>
                <div className="row">
                    <button className='col-md btn btn-secondary'onClick={() => toHome()}>Home</button>
                    <div className="col-md-3">
                        <label htmlFor="property_name">Property Name:</label>
                        <input id="property_name" type="text" className="form-control" placeholder="Name" name="property_name" value={potentialProperty.property_name} onChange={propertyFormChangeHandler}/>
                        {potentialPropertyErrors.property_name && <p>{potentialPropertyErrors.property_name.message}</p>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="property_photo_url">Property Photo URL:</label>
                        <input id="property_photo_url" type="text" className="form-control" placeholder="Place URL here" name="property_photo_url" value={potentialProperty.property_photo_url}  onChange={propertyFormChangeHandler}/>
                        {potentialPropertyErrors.property_photo_url && <p>{potentialPropertyErrors.property_photo_url.message}</p>}
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="property_photos">Property Photos</label>
                        <input id="property_photos" type="text" className="form-control"name="property_photos" value={potentialProperty.property_photos} onChange={propertyFormChangeHandler}/>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="asking_price">Asking Price. If rental, How much per month?</label>
                        <input id="asking_price" type="number" className="form-control"name="asking_price" value={potentialProperty.asking_price}  onChange={propertyFormChangeHandler}/>
                        {potentialPropertyErrors.asking_price && <p>Asking Price must be greater than 0</p>}
                    </div>
                    <div className="col-md-2">
                        <label>Sell or Rent?</label>
                        <div className="row">
                            <label htmlFor="sell" >Sell: </label>
                            <input id="sell" type="radio" name="sell_or_rent" value="true" checked={potentialProperty.sell_or_rent == true} onChange={propertyFormChangeHandler}/>
                            <label htmlFor="rent">Rent: </label>
                            <input id="rent" type="radio" name="sell_or_rent" value="false" checked={potentialProperty.sell_or_rent == false} onChange={propertyFormChangeHandler} />
                        </div>
                    </div>
                    <p></p>
                    <div className="col-md-3">
                        <label htmlFor="property_type">Property Type:</label>
                        <select id="property_type" className="form-select"name="property_type" value={potentialProperty.property_type} onChange={propertyFormChangeHandler}>
                            <option>Select a Property Type</option>
                            <option value="House">House</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Condo">Condo</option>
                            <option value="Townhouse">Townhouse</option>
                        </select>
                        {potentialPropertyErrors.property_type && <p>Must select a property type</p>}
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="square_footage">Square Footage</label>
                        <input id="square_footage" type="number" className="form-control"name="square_footage" value={potentialProperty.square_footage} onChange={propertyFormChangeHandler}/>
                        {potentialPropertyErrors.square_footage && <p>Square Footage must be greater than 0</p>}
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="number_of_beds">Number of Bedrooms</label>
                        <input id="number_of_beds" type="number" className="form-control"name="number_of_beds" value={potentialProperty.number_of_beds} onChange={propertyFormChangeHandler} />
                        {potentialPropertyErrors.number_of_beds && <p>{potentialPropertyErrors.number_of_beds.message}</p>}
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="number_of_baths">Number of Bathrooms</label>
                        <input id="number_of_beds" type="number" className="form-control"name="number_of_baths" value={potentialProperty.number_of_baths} onChange={propertyFormChangeHandler} />
                        {potentialPropertyErrors.number_of_baths &&<p>{potentialPropertyErrors.number_of_baths.message}</p>}
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="number_of_ghosts">Number of Ghosts</label>
                        <input id="number_of_ghosts" type="number" className="form-control"name="number_of_ghosts" value={potentialProperty.number_of_ghosts} onChange={propertyFormChangeHandler} />
                        {potentialPropertyErrors.number_of_ghosts && <p>{potentialPropertyErrors.number_of_ghosts.message}</p>}
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="address">Address</label>
                        <input id="address" type="text" className="form-control"name="address" value={potentialProperty.address} onChange={propertyFormChangeHandler} />
                        {potentialPropertyErrors.address &&<p>{potentialPropertyErrors.address.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="description">Property Description</label>
                        <input id="desccription" type="text" name="property_description" value={potentialProperty.property_description} onChange={propertyFormChangeHandler} />
                        {potentialPropertyErrors.property_description && <p>{potentialPropertyErrors.property_description.message}</p>}
                    </div>
                </div>
                <button className="col-md-1 btn btn-primary offset-sm-8">Post Listing!</button>
            </form>
            
            </div>

        </div>
    )
}

export default NewProperty