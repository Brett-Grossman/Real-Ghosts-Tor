import React, {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UserProfile = () => {
    const navigate = useNavigate()
    const {currentUserId, otherUserId} = useParams()
    const [allMyProperties, setAllProperties] = useState([])
    const [allOffers, setAllOffers] = useState([])
    const [allMadeOffers, setAllMadeOffers] = useState([])
    const [allReceivedOffers, setAllReceivedOffers] = useState([])
    const [allBookmarkedProperties, setAllBookmarkedProperties] = useState([])

    // axios get current user

    // axios get all properties,
        // set allMyProperties as filtered whose user_id matched currentUserId
        
    // axios get allOffers,
        // setAllMadeOffers as allOffers.filter bidder_user_id == currentUserId
        // setAllReceivedOffers as offers.seller_id == currentUserId

    // axios get all bookmarks
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
        
        
    return (
        <>
        {/* // Logout button */}
        {/* // Home */}
        {/* // Tabs with these different components */}
        {/* // List of all properties posted by the user, ordered by most recent */}
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
    
        {/* // BONUS: Component 3: List of offers made */}
            {/* // property name with link by id to property */}
            {/* // seller name */}
            {/* // offer amount */}
    
        {/* // BONUS: List of offers recieved */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
    
        {/* // BONUS: List of properties closed on (bought) */}
            {/* // property name with link to property */}
            {/* // seller name */}
            {/* // offer amount */}
    
        {/* // BONUS: List of properties sold */}
            {/* // property name with link to property */}
            {/* // bidder name */}
            {/* // offer amount */}
        </>
    )
}

export default UserProfile