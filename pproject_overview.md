Project name: Real/Ghosts/Tor
Description: This project is a real estate website, that allows you to search based on filters

Roles: We will be doing some pair coding and using liveshare, Griffin will be handling the logic for the filter search sytem
and the property offer system, and Brett will handle the CSS

GitHub Repo: https://github.com/Griffin-Fore/Real-Ghosts-Tor.git

Presentation:

    register 
    log in to an account
    go to your profile
    go to someone else's profile 
    filter search
        enter and then delete inputs and submit empty inputs
        clear inputs
        clear all inputs
        search with all inputs, minimum and maximum
    create one property
    edit the property
    open edit window and cancel
    open delete window and cancel
    delete the property
    make an offer on a property
    open, make change, cancel the edit window
    edit the offer
    open and cancel the edit window
    open and cancel the delete button
    delete the offer
    make and leave an offer
    log in to an account with a property with multiple offers
    open and cancel the accept
    accept an offer
    go to offers page to demonstrate those offers are gone
    view your sold properties
    bookmark 2 properties on one account, log off and unbookmark then rebookmark
    bookmark one of the same properties on another account
    Edit the user profile info.
    Show that made offers have changed profile information
    view all the tabs
    play the rhythm game

Steps:
    Create new property page just functionality /
        fix asking_price and property_type errors /

    view all properties page just the view all not the filter /

    create 14 users: 4 realtors and 10 other users for making offers
    legobjg911@aol.com,
    grossmanbrettj@gmail.com, 
    sickmagic@aol.com, 
    grossmanbj@mx.lakeforest.edu, 
    fourtwentz@hotmail.com, 
    sickmagic@aol.com

    create 40-50 properties 

    view one property page /
    with property info /

    edit property form /

    delete property button with confirmation /
    
    user's profile
    all properties posted by user /

    figure out how to pull and push to github /

    view all properties page filter system /

    BONUS: 
        offer system: /
        offer model /
        offer controller /
        offer routes /

    BONUS: view one property offer form on the view property form, when the current user is not the lister /

    BONUS: create 1 offer /

    BONUS: edit and delete one offer /

    BONUS: create 6 offers /

    BONUS: create 3 more offers on one property /

    BONUS: view one property realtor side all offers table with accept offer button and links to the bidder /

    BONUS: accept one offer on two separate properties /
    
    BONUS: bookmark model, controller, routes /

    BONUS: make the bookmark functionality /

    BONUS: make a bookmark and unnmake a bookmark and leave a bookmark, /
    logout and come back /

    BONUS: in another account, make and unmake a bookmark and leave one bookmark /

    BONUS: make 6 bookmarks with one account, 3 with another account, 3 with another account all on the same 6/3 properties /

    BONUS: user page: all properties bookmarked by the user /

    BONUS: Buttons blue except cancel and reset and other those type of buttons /
    BONUS: Property info to the side of the property photo, margins around everything /
    BONUS: multiple photos with a forward and back buttons on the sides
    BONUS: All properties are in tabs of 10 properties max
    BONUS: 50 properties

    BONUS: User Profile:
    BONUS: as a buyer:
    list of offers made with links to the properties /

    BONUS: as a cellar:
    list of offers recieved with links to the properties /

    BONUS: as a buyer:
    list of properties closed on /

    BONUS: as a cellar:
    list of properties soled /

    BONUS: Clear losing bids /
        delete by id the bids /
        remove from offer ids /
        Make three bids on a property and accept one /

    BRETT BONUS: Delete all losing offers

    PAIR BONUS: Fix the user profile navigate buttons to reset the page into the myProperties tab

    PAIR BONUS: Edit profile function, change every property and offer to match

    PAIR BONUS: property has minimum bid amount

    PAIR BONUS: display the numbers with commas and decimal .00

    PAIR BONUS: fix the issue with the server being deleted in six days

    BRETT BONUS: Style the user edit popup
    
    BRETT BONUS: Add user profile text information to each profile

    BONUS: tabs on profile page are ternary blue or grey depending on if tab match /

    BONUS: Add a description for the property, change the model, and the forms /

    BRETT BONUS: add a description for each property

    BONUS: add my profile, logout and home buttons to every page except RegAndLogin /

    BRETT BONUS: Darkmode

    BRETT BONUS: delete all the offers on sold properties

    BONUS: have the current tab on the user's profile be blue /

    BRETT BONUS: remove offer ids from the view property html page

    BONUS: All offers received grouped by property with link to the property and link to the offer maker TEST

    BRETT BONUS: Properties show newest first

    BONUS: Set all error messages to red /

    BONUS: Set the confirms in popups /

    BONUS: Allow for relist and change the listing user's information to the winning bidder user information: 
    if the winning bidder id == otherUserId, reset the lister info and erase the winning bidder info and set isSold to false, remove the bookmark if any /

Data:
    40 properties
    10 per realtor
    10 other users

User 1: gfore@gmail.com

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
        offer_amount Number required
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

