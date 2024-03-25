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
                setLoading(false)
            })
            .catch((err) => {
                console.log("AllProperties.jsx getAllProperties catch err: ", err)
            })
        },[])
    
        
    // BONUS: axios get allOffers,
        // setAllMadeOffers as allOffers.filter bidder_user_id == currentUserId
        // setAllReceivedOffers as offers.seller_id == currentUserId

    // BONUS: axios get all bookmarks
        // setAllBookmarkedProperties as filtered whose bookmarks contains currentUserId

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
        <>
            <div className="row " style={{borderBottom: '2px solid black'}}>
                {otherUser._id}
                {otherUser.user_image_url}
                <p>{otherUser.username}'s Profile</p>
                <button className='col-md btn btn-primary'onClick={() => logout()}>Log out</button>
                <button onClick={() => toHome()}>Home</button>
                <button className='col-md btn offset-sm-1 btn-secondary' onClick={() => toNewProperty()}>Create New Listing</button>
            </div>
        <div>
            <button onClick={() => toMyPropertiesTab()}>My Properties</button>
            <button onClick={() => toBookmarksTab()}>My Bookmarks</button>
            <button onClick={() => toFinancesTab()}>To My Offers</button>
            <button onClick={() => toBoughtAndSoldTab()}>To Bought And Sold</button>
        </div>
        
        {/* // Tabs with these different components */}
        {tab == "MyProperties" &&
            <div>
                {allMyUnsoldProperties.map((property, index) => (
                    <div key={property._id}>
                        <p>{index}</p>
                        <button onClick={() => toOneProperty(property._id)}>View Property</button>
                        <p>lister_user_id: {property.lister_user_id}</p>
                        <p>lister_username: {property.lister_username}</p>
                        <p>lister user image: {property.lister_user_image}</p>
                        <h1>property name {property.property_name}</h1>
                        <p>property photo:</p>
                        <img style={{height: '100px', width: '150px'}}src={property.property_photo_url}/>
                        <p>asking price: {property.asking_price}</p>
                        {property.sell_or_rent ? <p>For Sale</p> : <p>To Rent</p>}
                        <p>property type {property.property_type}</p>
                        <p>square footage {property.square_footage}</p>
                        <p>number of beds {property.number_of_beds}</p>
                        <p>number of baths {property.number_of_baths}</p>
                        <p>number of ghosts {property.number_of_ghosts}</p>
                        <p>address {property.address}</p>
                    </div>
                ))}
        {/* // List of all properties posted by the user, ordered by most recent, that haven't been sold */}
        {/* {allMyPropertiesThatHaventBeenSold.map(())} */}
            {/* // View property button */}
            {/* // Name of agent */}
            {/* // Picture */}
            {/* // IsSOld banner */}
            {/* // Asking price */}
            {/* // Buy or rent */}
            {/* // Property type */}
            {/* // Square Feet */}
            {/* // Num beds */}
            {/* // Num baths */}
            {/* // isHaunted */}
            {/* // Address */}
            </div>
        }
        {tab == "Bookmarks" &&
            <div>
        {/* // BONUS: Component 2: All bookmarked properties */}
        {/* // List of all properties bookmarked by the user */}
            {/* // View property button */}
            {/* // Name of agent */}
            {/* // Picture */}
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
        </>
    )
}

export default UserProfile