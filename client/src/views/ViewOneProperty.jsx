import React, {useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

// ViewOneProperty Page
const ViewOnePropert = () => {
    const navigate = useNavigate()
    const {currentUserId, propertyId} = useParams()
    const [property, setProperty] = usesState({})
    const [editedProperty, setEditedProperty] = useState({})
    const [editedPropertyErrors, setEditedPropertyErrors] = useState({})
    const [isEditPropertyPopupOpen, setIsEditPropertyOpen] = useState(false)
    const [allOffers, setAllOffers] = useState([])
    const [pendingOffer, setPendingOffer] = useState({})
    const [pendingOfferErrors, setPendingOfferErrors] = useState({})
    const [pendingWinningOffer, setPendingWinningOffer] = useState({})
    const [winningOffer, setWinningOffer] = useState({})

    // useEffect pull property from axios, set property and editProperty,
        // with a dependency of property

    // edited property change handler

    // edited property submit:
        // pass editedProperty into a patch for property
            // if successful, setproperty and edited property as res.data
        // if false, set editedPropertyErrors

    // delete property function

    // useEffect containing a fetchOffers

    // fetchOffers axios call to set offers

    // pending offer change handler

    // pending offer submission function
        // pass in the property and user states
        // axios post, if submission passes, fetchOffers
        // catch display pendingOfferErrors

    // accept offer onclick set pending offer to winning offer,
        // axios patch the property with the winning offer info,
        // set in state the property

    // bookmark button adds the 

    // logout function
    // home function
    // my profile function
}
// Logout button
// Home
// My profile button
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