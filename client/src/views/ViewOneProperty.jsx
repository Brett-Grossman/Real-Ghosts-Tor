import {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

// ViewOneProperty Page
const ViewOneProperty = () => {
    const navigate = useNavigate()
    const {currentUserId, propertyId} = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const [property, setProperty] = useState({})
    const [editedProperty, setEditedProperty] = useState({})
    const [editedPropertyErrors, setEditedPropertyErrors] = useState({})
    const [isEditPropertyPopupOpen, setIsEditPropertyOpen] = useState(false)
    const [allOffersForThisProperty, setAllOffersForThisProperty] = useState([])
    const [pendingDelete, setPendingDelete] = useState(false)
    const [pendingOffer, setPendingOffer] = useState({})
    const [pendingOfferErrors, setPendingOfferErrors] = useState({})
    const [myOffer, setMyOffer] = useState({})
    const [pendingWinningOffer, setPendingWinningOffer] = useState({})
    const [winningOffer, setWinningOffer] = useState({})
    const [pendingBookmark, setPendingBookmark] = useState({})
    const [bookmark, setBookmark] = useState({})
    const [isPageBookmarked, setIsPageBookmarked] = useState(false)
    let [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    // useEffect get current user from axios
    useEffect(() => {
        console.log("ViewOneProperty.jsx useEffect currentUserId: ", currentUserId)
        axios.get(`http://localhost:8000/api/users/${currentUserId}`)
        .then((res) => {
            console.log("ViewOneProperty.jsx getOneUser currentUserId res.data: ", res.data)
            setCurrentUser(res.data)
        })
    },[])

    // useEffect pull property from axios, set property and editProperty,
        // with a dependency of property
    
    const fetchProperty = async () => {
        console.log("ViewOneProperty.jsx getOneProperty useEffect")
        try {
            const response = await axios.get(`http://localhost:8000/api/properties/${propertyId}`)
            console.log("ViewOneProperty.jsx getOneProperty axios then res.data: ", response.data)
            setProperty(response.data)
            setEditedProperty(response.data)
            setLoading(false)
        } catch (err) {
            console.log("ViewOneProperty.jsx getOneProperty axios catch err: ", err)
        }
    }

    useEffect(() => {
        fetchProperty()
    },[])

    // edited property change handler
    const editPropertyChangeHandler = (e) => {
        const { name, value, type } = e.target;

        if(type === 'radio') {
            setEditedProperty(prevProperty => ({
                ...prevProperty,
                [name]: value === "true"
            }));
        }
        else {
            setEditedProperty(prevProperty => ({
                ...prevProperty,
                [name]: value
            }));
        }
    }

    // pass editedProperty into a patch for property
    // if successful, fetchProperty res.data and set editedProperty as res.data
    // if false, set editedPropertyErrors

    // edited property submit:
    const editedPropertyFormSubmission = (e) => {
        e.preventDefault()
        console.log('ViewOneProperty.jsx editedPropertyFormSubmission editedProperty', editedProperty)
        axios.patch(`http://localhost:8000/api/properties/${propertyId}`, editedProperty)
        .then((res) => {
            console.log("ViewOneProperty.jsx editedPropertyFormSubmission res.data: ", res.data)
            fetchProperty()
            setIsEditPropertyOpen(false)
        })
        .catch((err) => {
            console.log("ViewOneProperty.jsx editedPropertyFormSubmission catch err.response.data.errors", err.response.data.errors)
            setEditedPropertyErrors(err.response.data.errors)
        })
    }

    const openPropertyEditPopup = () => setIsEditPropertyOpen(true)

    const closePropertyEditPopup = () => {
        setEditedProperty(property)
        setEditedPropertyErrors({})
        setIsEditPropertyOpen(false)
    }

    // delete property function
    const openDeletePropertyPopup = () => setPendingDelete(true)

    const closeDeletePropertyPopup = () => setPendingDelete(false)

    const deletePropertyForReal = () => {
        console.log("ViewOneProperty.jsx deletePropertyForReal clicked")
        axios.delete(`http://localhost:8000/api/properties/${propertyId}`)
            .then((res) => {
                console.log("ViewOneProperty deletePropertyForReal then res.data: ", res.data)
                navigate(`/all_properties/${currentUserId}`)
            })
            .catch((err) => {
                console.log("ViewOneProperty.jsx deletePropertyForReal catch err: ", err)
            })
    }

    // useEffect containing a fetchOffers,

    // fetchOffers not in a useEffect
    // gets all the offers
    // filter allOffersForThisProperty by propertyId
    // subsequent filters myOffersForThisProperty by currentUserId
    // sets myOffer as myOffersForThisProperty[0]

    // BONUS: pending offer change handler

    // BONUS: pending offer submission function
        // pass in the property and user states
        // post axios the offer
        // if submission passes
        // patch editedProperty's offer_ids with the id of the res.data
        // check chat window 6
        // fetchProperty
        // fetchOffers
        // catch display pendingOfferErrors

    // const setOfferToChange(myOffer)

    // BONUS: edit offer change handler

    // BONUS: editOffer submit handler:
        // pass in the editedOffer
        // patch
        // if submission passes,
        // fetchOffers

    // Bonus deleteOffer
        // remove myOffer._id from property.offer_ids

    // BONUS: lister's side accept offer onclick set pending offer to winning offer,
        // axios patch the property with the winning offer info,
        // set in state the property

    // BONUS: bookmark button:
        // filter bookmark by user_id, filter by get bookmarks matching this property
            // if length is 1, get the id and delete by id
            // setIsPageBookmarked to false
            // if the length is 0:
                // sets the user and property in the bookmark state,
                // passes the bookmark state into an axios post to create a bookmark,
                // set the bookmark in state
                // setIsPageBookmarked  to true

    // logout function
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
            .then(() => {
                localStorage.removeItem("currentUser");
                navigate('/')
            })
            .catch((err) => {
                console.log("ViewAllProperties logout catch err: ", err)
            })
    }
    
    // home function
    const toHome = () => navigate(`/all_properties/${currentUserId}`)

    // my profile function
    const toMyAccount = () => navigate(`/profiles/${currentUserId}/${currentUserId}`)

    // to lister
    const toLister = (lister_user_id) => navigate(`/profiles/${currentUserId}/${lister_user_id}`)

    const pictureRight = () => {
        if(currentImageIndex < property.property_photos.length - 1){
            setCurrentImageIndex(currentImageIndex + 1)
        }
        if(currentImageIndex == property.property_photos.length - 1){
            setCurrentImageIndex(0)
        }
    }

    const pictureLeft = () => {
        if(currentImageIndex == 0){
            setCurrentImageIndex(property.property_photos.length - 1)
        }
        if(currentImageIndex < property.property_photos.length -1){
            setCurrentImageIndex(currentImageIndex - 1)
        }
    }
    // loading
    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <>
            <button onClick={() => logout()}>Log Out</button>
            <button onClick={()=> toMyAccount()}>My Account</button>
            <button onClick={() => toHome()}>To Home</button>
            {/* // display banner for bookmarked */}
            <div> {/* property info*/}
                {/* // Name of seller that links to user's profile */}
                {/* seller image */}
                <button onClick={() => toLister(property.lister_user_id)}>
                    <p>{property.lister_username}</p>
                    <img style={{height: '20px', width: '20px' }} src={property.lister_user_image}/>
                    <p>To Listers Profile</p>
                </button>
                {/* Picture */}
                <img style={{height: '350px', width: '500px'}} src={property.property_photo_url}/>
                {/* // BONUS: Pictures array that has arrow buttons to go forward and back to the different picture */}
                <h1>{property.property_name}</h1>
                {property.property_photos && property.property_photos[currentImageIndex] &&
                <div>
                    <button onClick={() => pictureLeft()}>&lt;</button>
                    <img style={{height: '350px', width: '500px'}} src={property.property_photos[currentImageIndex]}/>
                    <button onClick={() => pictureRight()}>&gt;</button>
                </div>}
                {/* // BONUS: IsSold banner */}
                {property.isSold ? <p>Sold!</p> : ""}
                {/* // Asking price that dissappears if the property is sold */}
                {property.isSold ? <p>Sold for: {property.winning_bid_amount}</p> : <p>Asking Price: {property.asking_price}</p>}
                {/* // Buy or rent */}
                {property.isSold ? "" : (property.sell_or_rent ? <p> For Sale</p> : <p>For Rent</p>)}
                {/* // Property type */}
                <p>Property Type: {property.property_type}</p>
                {/* // Square Feet */}
                <p>Square Footage: {property.square_footage}</p>
                {/* // Num beds */}
                <p>Number of Bedrooms: {property.number_of_beds}</p>
                {/* // Num baths */}
                <p>Number of Bathrooms: {property.number_of_baths}</p>
                {/* // isHaunted */}
                <p>Number of Ghosts: {property.number_of_ghosts}</p>
                {/* // Address */}
                <p>Address: {property.address}</p>
                {/* // BONUS: if sold or rented: Buyer information */}
                {property.isSold && 
                    <div>
                        <p>SOLD!</p>
                        {property.sell_or_rent == "sell" &&
                            <p>Closed for ${property.winning_bid_amount}.00 by {property.winning_bidder_username}</p>
                        }
                        {property.sell_or_rent == "rent" && 
                            <p>Closed for ${property.winning_bid_amount}.00 per month by {property.winning_bidder_username}</p>
                        }
                    </div>}
            </div>

            {/* // If property is posted by current user */}
            {property.lister_user_id == currentUserId &&
                <div>
                        {/* // Edit button that opens a popup form with the same structure as the page */}
                        <button onClick={() => openPropertyEditPopup()}>Edit</button>
                        {/* popup edit property form */}
                        {isEditPropertyPopupOpen &&
                            // edit form
                            <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                                <button onClick={() => closePropertyEditPopup()}>Cancel</button>
                                <form onSubmit={editedPropertyFormSubmission}>
                                    <label htmlFor="property_name">Property Name:</label>
                                    <input id="property_name" type="text" name="property_name" value={editedProperty.property_name} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.property_name?.message}</p>}
                                    <label htmlFor="property_photo_url">Property Photo URL:</label>
                                    <input id="property_photo_url" type="text" name="property_photo_url" value={editedProperty.property_photo_url} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.property_photo_url?.message}</p>}
                                    <label htmlFor="property_photos">Property Photos</label>
                                    <p>Enter like: &quot;urlOne&quot;,&quot;urlTwo&quot;,&quot;urlThree&quot;</p>
                                    <input id="property_photos" type="text" name="property_photos" value={editedProperty.property_photos} onChange={editPropertyChangeHandler}/>
                                    <label htmlFor="asking_price">Asking Price</label>
                                    <input id="asking_price" type="number" name="asking_price" value={editedProperty.asking_price} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.asking_price?.message}</p>}
                                    <label>Sell Or Rent?</label>
                                    <label htmlFor="sell">Sell:</label>
                                    <input id="sell" type="radio" name="sell_or_rent" value="true" checked={editedProperty.sell_or_rent == true} onChange={editPropertyChangeHandler}/>
                                    <label htmlFor="rent">Rent:</label>
                                    <input id="rent" type="radio" name="sell_or_rent" value="false" checked={editedProperty.sell_or_rent == false} onChange={editPropertyChangeHandler}/>
                                    <label htmlFor="property_type">Property Type:</label>
                                    <select id="property_type" name="property_type" value={editedProperty.property_type} onChange={editPropertyChangeHandler}>
                                        <option value="House">House</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                    </select>
                                    <label htmlFor="square_footage">Square Footage</label>
                                    <input id="square_footage" type="number" name="square_footage" value={editedProperty.square_footage} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.square_footage?.message}</p>}
                                    <label htmlFor="number_of_beds">Number of Beds</label>
                                    <input id="number_of_beds" type="number" name="number_of_beds" value={editedProperty.number_of_beds} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.number_of_beds?.message}</p>}
                                    <label htmlFor="number_of_baths">Number of Bathrooms</label>
                                    <input id="number_of_baths" type="number" name="number_of_baths" value={editedProperty.number_of_baths} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.number_of_baths?.message}</p>}
                                    <label htmlFor="number_of_ghosts">Number of Ghosts</label>
                                    <input id="number_oof_ghosts" type="number" name="number_of_ghosts" value={editedProperty.number_of_ghosts} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.number_of_ghosts?.message}</p>}
                                    <label htmlFor="address">Address</label>
                                    <input id="address" type="text" name="address" value={editedProperty.address} onChange={editPropertyChangeHandler}/>
                                    {editedPropertyErrors && <p style={{color: 'red'}}>{editedPropertyErrors.address?.message}</p>}
                                    <button>Submit Edit</button>
                                </form>
                            </div>
                        }
                        {/* // Delete button */}
                        <button onClick={() => openDeletePropertyPopup()}>Delete</button>
                </div>
            }
            {pendingDelete &&
                <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}}>
                    {/* please make the delete red and in both in a column */}
                    <button onClick={() => closeDeletePropertyPopup()}>Cancel</button>
                    <button onClick={() => deletePropertyForReal()}>Delete</button>
                </div>
            }

    {/* BONUS: make offer window and lists my offer, with edit and delete */}
    {/* window to submit offer */}
    {/* {myOffer &&
        <div>
            <p>{myOffer.amount}</p>
            <button onClick={() => editOffer(myOffer)}>Edit</button>
            <button onClick={() => deleteMyOffer(myOffer._id)}>Delete</button>
        </div>
        } */}
    
    {/* //BONUS: Table of offer if current user == lister user id*/}
        {/* // accept button */}
        {/* // bid */}
        {/* // username that links to user's profile */}
        {/* // Upon clicking accept on a bid, popup that asks for confirmation, and upon confirmation,  */}
        {/* // sets the property owner to the bidding user and sets the property to sold,  */}
        {/* // sets the winning bid as the bid attached to the property model */}

    {/* // If property is not posted by current user, */}
        {/* // Bid button */}
            {/* // bid amount */}
        {/* // Bookmark button */}

        </>
    )
}

export default ViewOneProperty