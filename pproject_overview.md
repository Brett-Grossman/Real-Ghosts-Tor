Project name: Real/Ghosts/Tor
Description: This project is a real estate website, that allows you to search based on filters

Roles: We will be doing some pair coding and using liveshare, Griffin will be handling the logic for the filter search sytem
and the property offer system, and Brett will handle the CSS

GitHub Repo: https://github.com/Griffin-Fore/Real-Ghosts-Tor.git

Steps:
    Create new property page just functionality 
        fix asking_price and property_type errors

    view all properties page just the view all not the filter

    create 14 users: 4 realtors and 10 other users for making offers

    create 40-50 properties

    view one property page
    with property info

    edit property form

    delete property button with confirmation

    view all properties page filter system

    BONUS: 
        offer system:
        offer model
        offer controller
        offer routes

    view one property offer form

    view one property realtor side all offers table with accept offer button

    user's profile
    all properties posted by user

    BONUS: all properties bookmarked by the user

    BONUS: as a buyer:
    list of offers made

    BONUS: as a cellar:
    list of offers recieved

    BONUS: as a buyer:
    list of properties closed on

    BONUS: as a cellar:
    list of properties soled
    CURRENT PLACE

Data:
    40 properties
    10 per realtor
    10 other users

User 1: gfore@gmail.com

try to create a user without inputs
try to create unmatched passwords

try to login without inputs
try to login with the wrong email
try to login with the wrong password

Models:
    User:
        id
        Username string
        Email string
        Password string
        (Confirm password) string

    Property:
        id
        user_id String required /
        username String required /
        name String required /
        Picture_url String required /
        BONUS: unlimited array of pictures [String] /
        IsSold Boolean required /
        asking_price String required /
        buy_or_rent Boolean required /
        property_type String required /
        square_feet Number required /
        number_of_beds Number required /
        number_of_baths Number required /
        isHaunted required Boolean required /
        address String required /
        offer_ids array [String] /
        winning_bid_amount Number /
        resident_user_id String /
        resident_username String /
        date_added and date_updated/

    BONUS: Offer:
        id
        property_id String required
        property_name String required
        seller_id String required
        seller_username String required
        seller_user_image required
        bid_amount Number required
        bidder_id String required
        bidder_username required
        date_added and date_updated
    
    Bookmarks:
        id
        property_id
        property_name
        user_id

Routes:
    User controller
        .get getAllUsers
        .post createUser
        .get(id) findOneUser
        .patch(id) editUser
        .delete(id) deleteUser

    Property controller
        .get getAllProperties
        .post createProperty
        .get(id) getOneProperty
        .patch(id) updateProperty
        .delete(id) deleteProperty

    Offer controller
        .get getAllOffers
        .post createOffer
        .get(id) findOneOffer
        .patch(id) updateOffer
        .delete(id) deleteOffer

Detailed Pages:
    Register And Login Page
        Register Form with validations
        Login Form with validations

    ViewAllProperties Page
        Logout button
        ViewMyProfile button
        List of all properties filtered by states, ordered by most recent
        BONUS: Ghost mode with animated ghosts background
            View property button
            Name of agent
            Picture
            BONUS: IsSold banner
            Asking price that dissappears if the property is sold
            Buy or rent
            Property type
            Square Feet
            Num beds
            Num baths
            isHaunted
            Address
        Side bar of filters with
            Property type dropdown
            Buy or rent select
            Min and max Num of bedrooms can have a temp state, with a button that sets min and max state as the temp state, thus updating
            Min and max Num of bathrooms
            Min and max Square feet
            IsHaunted checkbox
            Min and max Price range
            State

    New Property Page
        Logout
        Home
        Picture
        BONUS: array of pictures
            Asking Price
            Buy or rent
            Property type dropdown
            Square feet
            Num beds
            Num baths
            isHaunted
            State
            Address

    ViewOneProperty Page
        Logout button
        Home
        My profile button
            Name of seller that links to user's profile
            Picture
            BONUS: Pictures array that has arrow buttons to go forward and back
            BONUS: IsSold banner
            Asking price that dissappears if the property is sold
            Buy or rent
            Property type
            Square Feet
            Num beds
            Num baths
            isHaunted
            Address
            BONUS: Buyer information
        
        If property is not posted by current user,
            Bid button
                bid amount
            Bookmark button
        
        If property is posted by current user
            Edit button that opens a popup form with the same structure as the page
            Delete button
            Table of bids
                accept button
                bid
                username that links to user's profile
                Upon clicking accept on a bid, popup that asks for confirmation, and upon confirmation, sets the property owner to the bidding user and sets the property to sold, sets the winning bid as the bid attached to the property model

    User's Page
        Logout button
        Home
        Tabs with these different components
        Component 1
        List of all properties posted by the user, ordered by most recent
            View property button
            Name of agent
            Picture
            IsSOld banner
            Asking price
            Buy or rent
            Property type
            Square Feet
            Num beds
            Num baths
            isHaunted
            Address
            BONUS: buyer info

        BONUS: Component 2: All bookmarked properties
        List of all properties bookmarked by the user
            View property button
            Name of agent
            Picture
            IsSOld banner
            Asking price
            Buy or rent
            Property type
            Square Feet
            Num beds
            Num baths
            isHaunted
            Address
            BONUS: buyer info

        BONUS: Component 3: List of offers made
            property name with link by id to property
            seller name
            offer amount

        BONUS: List of offers recieved
            property name with link to property
            bidder name
            offer amount

        BONUS: List of properties closed on (bought)
            property name with link to property
            seller name
            offer amount

        BONUS: List of properties sold
            property name with link to property
            bidder name
            offer amount

Logic:
    The filter search system:
        Every search filter will have a state. The search results will be an axios call of allProperties, that will then be pared down through a series of filters: all_properties will be set to all_proerties_filterd based on the first state, then the resulting array will be filtered based on the second state, and so on until it has been filtered based on all the states, and every time any of the states are updated, this will run again. There will be a series of if checks, so only if the state has a value will the array be filtered based on that value, otherwise that iteration in the filter process will be skipped.

        When a button is clicked it will give a value to the state, and when it is unclicked or the number value is erased, the state will be reset to 0. Each number input will have a submit button so that the page isn't refreshed every time a digit is changed. This can be a bonus.

    The offer system:
        Each offer will be assigned a property_id, a seller user_id and username, a bid amount, and the buyers info of a user_id and username
        When an offer is accepted, the property isSold value will be switched to true, and the bidder's user information will be added to the property's buyer information

