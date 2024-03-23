import {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

// ViewOneProperty Page
const ViewOneProperty = () => {
    const navigate = useNavigate()
    const {currentUserId, propertyId} = useParams()
    const [property, setProperty] = useState({})
    const [editedProperty, setEditedProperty] = useState({})
    const [editedPropertyErrors, setEditedPropertyErrors] = useState({})
    const [isEditPropertyPopupOpen, setIsEditPropertyOpen] = useState(false)
    const [allOffers, setAllOffers] = useState([])
    const [pendingOffer, setPendingOffer] = useState({})
    const [pendingOfferErrors, setPendingOfferErrors] = useState({})
    const [pendingWinningOffer, setPendingWinningOffer] = useState({})
    const [winningOffer, setWinningOffer] = useState({})
    const [pendingBookmark, setPendingBookmark] = useState({})
    const [bookmark, setBookmark] = useState({})
    const [isPageBookmarked, setIsPageBookmarked] = useState(false)

    // useEffect pull property from axios, set property and editProperty,
        // with a dependency of property
    useEffect(() => {
        console.log("ViewOneProperty loaded")
    },[])

    // edited property change handler

    // edited property submit:
        // pass editedProperty into a patch for property
            // if successful, setproperty and editedProperty as res.data
        // if false, set editedPropertyErrors

    // delete property function

    // useEffect containing a fetchOffers

    // fetchOffers axios call to set offers

    // BONUS: pending offer change handler

    // BONUS: pending offer submission function
        // pass in the property and user states
        // axios post, if submission passes, fetchOffers
        // catch display pendingOfferErrors

    // BONUS: accept offer onclick set pending offer to winning offer,
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
    // home function
    // my profile function

    return (
        <>
        
        </>
    )
}

export default ViewOneProperty
// Logout button
// Home
// My profile button
// display banner for bookmarked
// The page
    // Name of seller that links to user's profile
    // Picture
    // BONUS: Pictures array that has arrow buttons to go forward and back
    // BONUS: IsSold banner
    // Asking price that dissappears if the property is sold
    // Buy or rent
    // Property type
    // Square Feet
    // Num beds
    // Num baths
    // isHaunted
    // Address
    // BONUS: if sold or rented: Buyer information

// If property is not posted by current user,
    // Bid button
        // bid amount
    // Bookmark button

// If property is posted by current user
    // Edit button that opens a popup form with the same structure as the page
    // Delete button
    // Table of bids
        // accept button
        // bid
        // username that links to user's profile
        // Upon clicking accept on a bid, popup that asks for confirmation, and upon confirmation, 
        // sets the property owner to the bidding user and sets the property to sold, 
        // sets the winning bid as the bid attached to the property model