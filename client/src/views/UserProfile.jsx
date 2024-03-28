import React, {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const {currentUserId, otherUserId} = useParams()
    const [otherUser, setOtherUser] = useState({})
    const [allMyUnsoldProperties, setAllMyUnsoldProperties] = useState([])
    const [allMySoldProperties, setAllMySoldProperties] = useState([])
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
    },[])

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

            })
            .catch((err) => {
                console.log("AllProperties.jsx getAllProperties catch err: ", err)
            })
        },[])

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
    },[])

            // BONUS: axios get allOffers,
        // setAllMadeOffers as allOffers.filter bidder_user_id == currentUserId
        // setAllReceivedOffers as offers.seller_id == currentUserId
        // setLoading(false)

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

    const toBoughtAndSoldTab = () => setTab("BoughtAndSold")
        
    return (
        <div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
            <div className="row " style={{borderBottom: '2px solid black'}}>
                
                <button className='col-md btn btn-secondary'onClick={() => toHome()}>Home</button>
                <button className='col-md btn btn-primary offset-sm-1 btn-secondary'onClick={() => logout()}>Log out</button>
                <button className='col-md offset-md-2 btn btn-primary' onClick={() => toNewProperty()}>Create New Listing</button>
                <p className="fs-2">{otherUser.username}'s Profile</p>
                <img src={otherUser.user_image_url} style={{height: '100px', width: '120px'}} alt="" />
            </div>
        <div>
            <button className="btn offset-sm-1" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toMyPropertiesTab()}>My Properties</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toBookmarksTab()}>My Bookmarks</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toFinancesTab()}>To My Offers</button>
            <button className="btn" style={{backgroundColor: '#C0C0C0',border: '1px solid black'}} onClick={() => toBoughtAndSoldTab()}>To Bought And Sold</button>
        </div>
        
        {/* // Tabs with these different components */}
        {tab == "MyProperties" &&
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '20px' }}>
                {allMyUnsoldProperties.map((property, index) => (
                    <div key={property._id} className="row" style={{ width: '48%', padding: '10px', marginBottom: '20px' }}>
                        <div className="shadow-lg" style={{ border: '1px solid black' }}>
                            <p>{index}</p>
                            <button className='' style={{backgroundColor: '#C0C0C0'}} onClick={() => toOneProperty(property._id)}>View Property</button>
                            <p>listing agent: {property.lister_username}</p>
                            <img src={property.lister_user_image} style={{height: '100px', width: '100px'}} />
                            <h1>Name {property.property_name}</h1>
                            <p>Property Photo:</p>
                            <img style={{height: '100px', width: '150px'}}src={property.property_photo_url}/>
                            <p>asking price: ${property.asking_price}</p>
                            {property.sell_or_rent ? <p>For Sale</p> : <p>To Rent</p>}
                            <p>property type: {property.property_type}</p>
                            <p>square footage: {property.square_footage}sq/ft</p>
                            <p>number of beds: {property.number_of_beds}</p>
                            <p>number of baths: {property.number_of_baths}</p>
                            <p>number of ghosts: {property.number_of_ghosts}</p>
                            <p>{property.address}</p>
                        </div>
                    </div>
                ))}
            </div>
        }
        {tab == "Bookmarks" &&
            <div>
        {/* // BONUS: Component 2: All bookmarked properties */}
            {/* // IsSOld banner */}
            {/* // Asking price */}
            {/* // Buy or rent */}
            {/* // Property type */}
            {/* // Square Feet */}
            {/* // Num beds */}
            {/* // Num baths */}
            {/* // isHaunted */}
            {/* // Address */}
            {/* // BONUS: buyer info */}
            {allBookmarkedProperties && 
                (allBookmarkedProperties.map((bookmark, index) => (
                    <div key={bookmark._id}>
                        <button onClick={() => toOneProperty(bookmark.property_id)}>View Property</button>
                        <div>
                            <p>Seller</p>
                            <img style={{width: '20px', height: '20px'}} src={bookmark.lister_user_image}/>
                            <p>{bookmark.lister_username}</p>
                        </div>
                        {bookmark.isSold && <p>Sold!</p>}
                        <h1>{bookmark.property_name}</h1>
                        <img style={{height: '200px'}} src={bookmark.property_photo_url}/>
                        <p>Asking Price: {bookmark.asking_price}</p>
                        {!bookmark.isSold && (bookmark.sell_or_rent ? <p> For Sale</p> : <p>For Rent</p>)}
                        <p>Property Type: {bookmark.property_type}</p>
                        <p>Square Footage: {bookmark.square_footage}</p>
                        <p>Beds: {bookmark.number_of_beds}</p>
                        <p>Baths: {bookmark.number_of_baths}</p>
                        <p>Ghosts: {bookmark.number_of_ghosts}</p>
                        <p>{bookmark.address}</p>
                    </div>
                )))
            
            }
            </div>
        }
        {tab == "Offers" && 
            <div>
        {/* // BONUS: Component 3: List of offers made */}
            {/* // property name with link by id to property */}
            {/* // seller name */}
            {/* // offer amount */}
    
        {/* // BONUS: List of offers recieved */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
            </div>
            }
            {tab == "BoughtAndSold" &&
                <div>
        {/* // BONUS: List of properties closed on (bought) */}
            {/* // property name with link to property */}
            {/* // seller name */}
            {/* // offer amount */}
    
        {/* // BONUS: List of properties sold */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
                </div>
            }
        </div>
    )
}

export default UserProfile