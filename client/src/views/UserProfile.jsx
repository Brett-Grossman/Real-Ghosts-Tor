import React, {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const {currentUserId, otherUserId} = useParams()
    const [otherUser, setOtherUser] = useState({})
    const [allMyUnsoldProperties, setAllMyUnsoldProperties] = useState([])
    const [allMySoldProperties, setAllMySoldProperties] = useState([])
    const [allMyPurchasedProperties, setAllMyPurchasedProperties] = useState([])
    const [allMadeOffers, setAllMadeOffers] = useState([])
    const [allReceivedOffers, setAllReceivedOffers] = useState([])
    const [allBookmarkedProperties, setAllBookmarkedProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [tab, setTab] = useState("MyProperties")

    // axios get current user
    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${otherUserId}`)
        .then((res) => {
            console.log("AllProperties.jsx getOneUser then res: ", res)
            setOtherUser(res.data)
        })
        .catch((err) => {
            console.log("AllProperties getOneUser catch err: ", err)
        })
    },[otherUserId])

    // axios get all properties,
        // set allMyPropertiesPropertiesThatHaventBeenSold as filtered whose user_id matched currentUserId and filter again not sold
        // set allMySoldProperties as all
        useEffect(() => {
            axios.get('http://localhost:8000/api/properties')
            .then((res) => {
                console.log("AllProperties.jsx getAllProperties then res: ", res)
                let filteredProperties = res.data
                filteredProperties = filteredProperties.filter(property => property.lister_user_id == otherUserId)
                console.log("filteredProperties", filteredProperties)
                let allMyUnsoldProperties = filteredProperties.filter(property => property.isSold == false)
                setAllMyUnsoldProperties(allMyUnsoldProperties)
                console.log("allMyUnsoldProperties", allMyUnsoldProperties)
                let allPropertiesISold = filteredProperties.filter(property => property.isSold == true)
                setAllMySoldProperties(allPropertiesISold)
                console.log("allPropertiesISold", allPropertiesISold)
                let allPropertiesIPurchased = res.data.filter(property => property.winning_bidder_user_id == otherUserId)
                setAllMyPurchasedProperties(allPropertiesIPurchased)
                
            })
            .catch((err) => {
                console.log("AllProperties.jsx getAllProperties catch err: ", err)
            })
        },[otherUserId])

        useEffect(() => {
            axios.get('http://localhost:8000/api/offers')
            .then((res) => {
                console.log("UserProfile getAllOffers then res.data: ", res.data)
                const allOffers = res.data
                const allReceivedOffers = allOffers.filter(offer => offer.lister_id == otherUserId)
                console.log("allReceivedOffers: ", allReceivedOffers)
                setAllReceivedOffers(allReceivedOffers)
                const allMyMadeOffers = allOffers.filter(offer => offer.bidder_user_id == otherUserId)
                console.log("allMyMadeOffers: ", allMyMadeOffers)
                setAllMadeOffers(allMyMadeOffers)
                
            })
        },[otherUserId])

    // BONUS: axios get all bookmarks
        // setAllBookmarkedProperties as filtered whose bookmarks contains currentUserId
        // setLoading(false)
    useEffect(() => {
        axios.get('http://localhost:8000/api/bookmarks')
        .then((res) => {
            console.log("UserProfile.jsx getAllBookmarks res.data: ", res.data)
            const allMyBookmarks = res.data.filter(bookmark => bookmark.creator_user_id == otherUserId)
            console.log("allMyBookmarks", allMyBookmarks)
            setAllBookmarkedProperties(allMyBookmarks)
            
            setLoading(false)
        })
        .catch((err) => {
            console.log("UserProfile getAllBookmarks catch err: ", err)
        })
    },[otherUserId])

    // logout
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
        
    // home
    const toHome = () => navigate(`/all_properties/${currentUserId}`)

    const toNewProperty = () => navigate(`/new_property/${currentUserId}`)

    const toOneProperty = (propertyId) => navigate(`/view_property/${currentUserId}/${propertyId}`)

    const toMyPropertiesTab = () => setTab("MyProperties")

    const toBookmarksTab = () => setTab("Bookmarks")
    
    const toFinancesTab = () => setTab("Offers")

    const toUserProfile = (userId) => navigate(`/profiles/${currentUserId}/${userId}`)

    const toBoughtPropertiesTab = () => setTab("BoughtProperties")

    const toSoldPropertiesTab = () => setTab("SoldProperties")
        
    return (
        <div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
            <div className="row" style={{borderBottom: '2px solid black'}}>
                
                <button className='col-md-2 btn btn-secondary'onClick={() => logout()}>Log out</button>
                <button className='col-md-2 btn btn-primary offset-sm-1 btn-primary'onClick={() => toHome()}>Homepage</button>
                {currentUserId !== otherUserId && <button onClick={() =>toUserProfile(currentUserId)} className="col-md-2 btn btn-primary offset-sm-1 btn-primary">To my Profile</button>}

                
                <button className='col-md-2 offset-sm-1 btn btn-primary' onClick={() => toNewProperty()}>Create New Listing</button>
                <div style={{display: "flex", alignItems: "center"}}>
                <img src={otherUser.user_image_url} style={{height: '100px', width: '100px'}} alt="" />
                <p className="fs-2">{otherUser.username}'s Profile - {tab=="MyProperties" && "Unsold Properties"}{tab=="SoldProperties" && "Sold Properties"}{tab=="Bookmarks" && "Bookmarks"}{tab=="Offers" && "Offers"}{tab=="BoughtProperties" && "Bought Properties"}</p>                
                </div>
                <p></p>

            </div>
        <div style={{margin: '20px'}}>
            <button className="btn offset-sm-1" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toMyPropertiesTab()}>My Unsold Properties</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toSoldPropertiesTab()}>My Sold Properties</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toBoughtPropertiesTab()}>My Bought Properties</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toFinancesTab()}> Offers</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toBookmarksTab()}>My Bookmarks</button>
            
            
        </div>
        
        {/* // Tabs with these different components */}
        {tab == "MyProperties" &&
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                {allMyUnsoldProperties.map((property, index) => (
                    <div key={property._id} className="row" style={{ padding: '10px', marginBottom: '20px' }}>
                        <div className="shadow-lg" style={{ border: '1px solid black' }}>
                            <button className="btn btn-primary" onClick={() => toOneProperty(property._id)} style={{marginTop: "15px"}}>View Property</button>
                                    <p className="fs-5">Property Name: {property.property_name}</p>
                            <div className="row">
                                <div className="col">

                                    
                                    <img style={{height: '200px', width: '300px'}}src={property.property_photo_url}/>
                                    {property.sell_or_rent ? <p>For Sale</p> : <p>To Rent</p>}
                                    <p>Asking price: ${property.asking_price}</p>
                                </div>
                                <div className="col">
                                    <p>Property Type: {property.property_type}</p>
                                    <p>Square Footage: {property.square_footage}sq/ft</p>
                                    <p>Number of Beds: {property.number_of_beds}</p>
                                    <p>Number of Baths: {property.number_of_baths}</p>
                                    <p>Number of Ghosts: {property.number_of_ghosts}</p>
                                    
                                </div>
                                <p>{property.address}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        }
        {tab == "Bookmarks" &&
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            {allBookmarkedProperties && 
                (allBookmarkedProperties.map((bookmark, index) => (
                    <div key={bookmark._id} className="row" style={{ width: '800px', padding: '10px', marginBottom: '20px' }}>
                        <div className="shadow-lg" style={{ border: '1px solid black' }}>
                            <button className="btn btn-primary" onClick={() => toOneProperty(bookmark.property_id)} style={{marginTop: '10px'}}>View Property</button>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <p>Seller:</p>
                                
                                <p> {bookmark.lister_username}</p>
                                <img style={{width: '40px', height: '40px'}} src={bookmark.lister_user_image}/>
                            </div>
                            <p className="fs-5">{bookmark.property_name}</p>
                            <div className="row">
                                <div className="col">
                                    {bookmark.isSold && <p className="fs-5">Sold!</p>}
                                    
                                    <img style={{height: '400px', width: '500px'}} src={bookmark.property_photo_url}/>
                                    {!bookmark.isSold && (bookmark.sell_or_rent ? <p> For Sale</p> : <p>For Rent</p>)}
                                    <p>Asking Price: ${bookmark.asking_price}</p>
                                </div>
                                <div className="col">
                                    <p>Property Type: {bookmark.property_type}</p>
                                    <p>Square Footage: {bookmark.square_footage}</p>
                                    <p>Beds: {bookmark.number_of_beds}</p>
                                    <p>Baths: {bookmark.number_of_baths}</p>
                                    <p>Ghosts: {bookmark.number_of_ghosts}</p>
                            </div>
                            </div>
                            <p>{bookmark.address}</p>
                        </div>
                    </div>
                )))
            
            }
            </div>
        }
        {tab == "Offers" && 
            <div className="row">
        {/* // BONUS: Component 3: List of offers made */}
            {/* // property name with link by id to property */}
            {/* // seller name */}
            {/* // offer amount */}
            {allMadeOffers && 
                <div className="col">
                    <p>Offers Made</p>
                    <table className="table shadow-sm" style={{width: "100%"}}>
                        <thead style={{borderBottom: '1px solid black'}} >
                            <tr>
                                <th className="col-md-1">View Property</th>
                                <th className="col-md-1">Property Name</th>
                                <th className="col-md-1">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="shadow-lg">
                            {allMadeOffers.map((offer, index) => (
                                <tr key={index} style={{border: '1px solid black'}}>
                                    <td style={{borderBottom: '1px solid black'}}><button onClick={() => toOneProperty(offer.property_id)} className="shadow-sm btn btn-primary">View Property</button></td>
                                    <td style={{borderBottom: '1px solid black'}}>{offer.property_name}</td>
                                    <td style={{borderBottom: '1px solid black'}}>${offer.offer_amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        {/* // BONUS: List of offers recieved */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
                {allReceivedOffers &&
                    <div className="col">
                        <p>Offers Received</p>
                        <table className="table shadow-sm" style={{width: "100%"}}>
                            <thead style={{ borderBottom: '1px solid black' }}>
                                <tr>
                                    <th className="col-md-1">View Property</th>
                                    <th className="col-md-1">Property Name</th>
                                    <th className="col-md-1">Bidder</th>
                                    <th className="col-md-1">View Profile</th>
                                </tr>
                            </thead>
                            <tbody style={{ borderBottom: '1px solid black' }} className="shadow-lg">
                                {allReceivedOffers.map((offer, index) => (
                                    <tr key={index} style={{ border: '1px solid black' }}>
                                        <td><button onClick={() => toOneProperty(offer.property_id)} className="btn btn-primary">View</button></td>
                                        <td>{offer.property_name}</td>
                                        <td>{offer.bidder_username}</td>
                                        <td><button onClick={() => toUserProfile(offer.bidder_user_id)} className="btn btn-primary">View</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            }
            {tab == "BoughtProperties" &&
                <div>
        {/* // BONUS: List of properties closed on (bought) */}
            {/* // property name with link to property */}
            {/* // seller name */}
            {/* // offer amount */}
                        {allMyPurchasedProperties &&
                            allMyPurchasedProperties.map((property, index) => (
                                <div key={index}>
                                    <div className="column" style={{marginBottom: '50px',border: '1px solid black',padding: '10px',width: '900px'}}>
                                        <button onClick={() =>toOneProperty(property._id)} className="btn btn-primary">View Property</button>
                                        <p className="fs-5">{property.property_name}</p>
                                        <div className="row">
                                        <div className="col">
                                        <img style={{height: '400px'}} src={property.property_photo_url}/>
                                        <p>{property.sell_or_rent ? "Purchased" : "Rented"} for ${property.winning_bid_amount}</p>
                                        </div>
                                        <div className="col">
                                        <p>{property.property_type}</p>
                                        <p>{property.square_footage} Square Feet</p>
                                        <p>Beds: {property.number_of_beds}</p>
                                        <p>Baths: {property.number_of_baths}</p>
                                        <p>Ghosts: {property.number_of_ghosts}</p>
                                        </div>


                                        <p>Address: {property.address}</p>
                                </div>
                                </div>
                            </div>
                            ))
                        }
                </div>
            }
            {tab == "SoldProperties" &&
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
            {/* // BONUS: List of properties sold */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
                    
                    {allMySoldProperties &&
                        allMySoldProperties.map((property, index) => (
                        <div className="row" style={{ width: '48%', padding: '10px', marginBottom: '20px' }}>
                            <div key={index} className="shadow-lg" style={{ border: '1px solid black' }}>
                                <button onClick={() =>toOneProperty(property._id)} style={{marginTop: '20px'}} className="btn btn-primary">View Property</button>
                                <div className="row">
                                    <div className="col">
                                        <p className="fs-5">{property.property_name}</p>
                                        <img style={{height: '200px'}} src={property.property_photo_url}/>
                                    </div>
                                    <div className="col">
                                        <p>{property.property_type}</p>
                                        <p>{property.square_footage} Square Feet</p>
                                        <p>Beds: {property.number_of_beds}</p>
                                        <p>Baths: {property.number_of_baths}</p>
                                        <p>Ghosts: {property.number_of_ghosts}</p>
                                        
                                    </div>
                                </div>
                                <p>Address: {property.address}</p>
                                        <p><strong>{property.sell_or_rent ? "Sold" : "Rented"} for ${property.winning_bid_amount} to {property.winning_bidder_username} <button className="btn btn-primary" onClick={() => toUserProfile(property.winning_bidder_user_id)} style={{marginBottom: '20px'}}>View Profile</button></strong></p>
                            </div>
                        </div>
                        ))
                    }
                    
                </div>
            }
        </div>
    )
}

export default UserProfile