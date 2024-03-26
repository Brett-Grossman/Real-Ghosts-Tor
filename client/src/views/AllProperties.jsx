import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ViewAllProperties = () => {

    const navigate = useNavigate();
    const { currentUserId } = useParams();
    const [ currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [allPropertiesFiltered, setAllPropertiesFiltered] = useState([])
    // states for the filter
    const [potentialMinimumAskingPrice, setPotentialMinimumAskingPrice] = useState('')
    const [potentialMaximumAskingPrice, setPotentialMaximumAskingPrice] = useState('')
    const [minimumAskingPrice, setMinimumAskingPrice] = useState(0)
    const [maximumAskingPrice, setMaximumAskingPrice] = useState(0)
    const [sellOrRent, setSellOrRent] = useState(null)
    const [propertyType, setPropertyType] = useState('')
    const [potentialMinSquareFootage, setPotentialMinSquareFootage] = useState('')
    const [potentialMaxSquareFootage, setPotentialMaxSquareFootage] = useState('')
    const [minSquareFootage, setMinSquareFootage] = useState(0)
    const [maxSquareFootage, setMaxSquareFootage] = useState(0)
    const [potentialMinNumberOfBeds, setPotentialMinNumberOfBeds] = useState('')
    const [potentialMaxNumberOfBeds, setPotentialMaxNumberOfBeds] = useState('')
    const [minimumNumberOfBeds, setMinimumNumberOfBeds] = useState(0)
    const [maximumNumberOfBeds, setMaximumNumberOfBeds] = useState(0)
    const [potentialMinNumberOfBaths, setPotentialMinNumberOfBaths] = useState('')
    const [potentialMaxNumberOfBaths, setPotentialMaxNumberOfBaths] = useState('')
    const [minimumNumberOfBaths, setMinimumNumberOfBaths] = useState(0)
    const [maximumNumberOfBaths, setMaximumNumberOfBaths] = useState(0)
    const [potentialMinNumberOfGhosts, setPotentialMinNumberOfGhosts] = useState('')
    const [potentialMaxNumberOfGhosts, setPotentialMaxNumberOfGhosts] = useState('')
    const [minimumNumberOfGhosts, setMinimumNumberOfGhosts] = useState(0)
    const [maximumNumberOfGhosts, setMaximumNumberOfGhosts] = useState(0)


    useEffect(() => {
        axios.get(`http://localhost:8000/api/users/${currentUserId}`)
        .then((res) => {
            console.log("AllProperties.jsx getOneUser then res: ", res)
            setCurrentUser(res.data)
        })
        .catch((err) => {
            console.log("AllProperties getOneUser catch err: ", err)
        })
    },[])

    useEffect(() => {
        axios.get('http://localhost:8000/api/properties')
        .then((res) => {
            console.log("AllProperties.jsx getAllProperties then res: ", res)
            let filteredProperties = res.data
            if(minimumAskingPrice !== 0) {
                filteredProperties = filteredProperties.filter(property => property.asking_price >= minimumAskingPrice)
            }
            if(maximumAskingPrice !== 0) {
                filteredProperties = filteredProperties.filter(property => property.asking_price <= maximumAskingPrice)
            }
            // filter for sellOrRent
            if(sellOrRent !== null) {
                console.log("sellOrRent: ", sellOrRent)
                filteredProperties = filteredProperties.filter(property => property.sell_or_rent == sellOrRent)
            }
            if(propertyType !== "") {
                console.log("Property Type: ", propertyType)
                filteredProperties = filteredProperties.filter(property => property.property_type == propertyType)
            }
            if(minSquareFootage !== 0) {
                filteredProperties = filteredProperties.filter(property => property.square_footage >= minSquareFootage)
            }
            if(maxSquareFootage !== 0) {
                filteredProperties = filteredProperties.filter(property => property.square_footage <= maxSquareFootage)
            }
            if(minimumNumberOfBeds !== 0) {
                filteredProperties = filteredProperties.filter(property => property.number_of_beds >= minimumNumberOfBeds)
            }
            if(maximumNumberOfBeds !== 0) {
                filteredProperties = filteredProperties.filter(property => property.number_of_beds <= maximumNumberOfBeds)
            }
            if(minimumNumberOfBaths !== 0){
                filteredProperties = filteredProperties.filter(property => property.number_of_baths >= minimumNumberOfBaths)
            }
            if(maximumNumberOfBaths !== 0) {
                filteredProperties = filteredProperties.filter(property => property.number_of_baths <= maximumNumberOfBaths)
            }
            if(minimumNumberOfGhosts !== 0) {
                filteredProperties = filteredProperties.filter(property => property.number_of_ghosts >= minimumNumberOfGhosts)
            }
            if(maximumNumberOfGhosts !== 0) {
                filteredProperties = filteredProperties.filter(property => property.number_of_ghosts <= maximumNumberOfGhosts)
            }
            setAllPropertiesFiltered(filteredProperties)
            console.log("minimumAskingPrice: ", minimumAskingPrice)
            console.log("maximumAskingPrice: ", maximumAskingPrice)
            console.log("sellOrRent: ", sellOrRent)
            console.log("minSquareFootage: ", minSquareFootage)
            console.log("maxSquareFootage: ", maxSquareFootage)
            console.log("minimumNumberOfBeds", minimumNumberOfBeds)
            console.log("maximumNumberOfBeds", maximumNumberOfBeds)
            console.log("minimumNumberOfBaths", minimumNumberOfBaths)
            console.log("maximumNumberOfBaths", maximumNumberOfBaths)
            console.log("minimumNumberOfGhosts", minimumNumberOfGhosts)
            console.log("maximumNumberOfGhosts", maximumNumberOfGhosts)
            setLoading(false)
        })
        .catch((err) => {
            console.log("AllProperties.jsx getAllProperties catch err: ", err)
        })
    },[minimumAskingPrice,
    maximumAskingPrice,
    sellOrRent,
    propertyType,
    minSquareFootage,
    maxSquareFootage,
    minimumNumberOfBeds,
    maximumNumberOfBeds,
    minimumNumberOfBaths,
    maximumNumberOfBaths,
    minimumNumberOfGhosts,
    maximumNumberOfGhosts]) //states go in the dependencies

    // filter
    const minimumAskingPriceChangehandler = (e) => {
        // const value = e.target.value.trim() !== '' ? parseInt(e.target.value) : 0;
        const value = parseInt(e.target.value)
        console.log(value)
        setPotentialMinimumAskingPrice(value)
    }
    const maximumAskingPriceChangeHandler = (e) => {
        // const value = e.target.value.trim() !== '' ? parseInt(e.target.value) : 0;
        const value = parseInt(e.target.value)
        console.log(value)
        setPotentialMaximumAskingPrice(value)
    }

    const functionToSetAskingPrice = (e) => {
        e.preventDefault()
        let value1 = potentialMinimumAskingPrice
        if(value1 == '' || isNaN(value1) == true) {
            value1 = 0
        }
        let value2 = potentialMaximumAskingPrice
        if(value2 == '' || isNaN(value2) == true) {
            value2 = 0
        }
        setMinimumAskingPrice(value1)
        setMaximumAskingPrice(value2)
    }
    
    const resetAskingPrice = () => {
        setPotentialMinimumAskingPrice('')
        setPotentialMaximumAskingPrice('')
        setMinimumAskingPrice(0)
        setMaximumAskingPrice(0)
    }

    // sellOrRent function
    const setSellOrRentToSell = () => setSellOrRent(true)

    const setSellOrRentToRent = () => setSellOrRent(false)

    // reset sell or rent
    const resetSellOrRent = () => setSellOrRent(null)

    const propertyTypeChangeHandler = (e) => {
        let value1 = String(e.target.value)
        console.log("propertyType: ", value1)
        setPropertyType(value1)
    }
    
    const resetPropertyType = () => setPropertyType('')

    const minimumSquareFootageChangeHandler = (e) => {
        const value = parseInt(e.target.value)
        console.log("minimumSquareFootageChangeHandler value: ", value)
        setPotentialMinSquareFootage(value)
    }

    const maximumSquareFootageChangeHandler = (e) => {
        const value = parseInt(e.target.value)
        console.log("maximumSquareFootageChangeHandler value", value)
        setPotentialMaxSquareFootage(value)
    }

    const setSquareFootage = (e) => {
        e.preventDefault()
        let value1 = potentialMinSquareFootage
        if(value1 == '' || isNaN(value1) == true) {
            value1 = 0
        }
        let value2 = potentialMaxSquareFootage
        if(value2 == '' || isNaN(value2) == true) {
            value2 = 0
        }
        setMinSquareFootage(value1)
        setMaxSquareFootage(value2)
    }

    const resetSquareFootage = () => {
        setPotentialMinSquareFootage('')
        setPotentialMaxSquareFootage('')
        setMinSquareFootage(0)
        setMaxSquareFootage(0)
    }

    const minimumBedsChangeHandler = (e) => {
        const value = parseInt(e.target.value)
        console.log("potentialMinBeds: ", value)
        setPotentialMinNumberOfBeds(value)
    }

    const maximumBedsChangeHandler = (e) => {
        const value = parseInt(e.target.value)
        console.log("potentialMaxBeds: ", value)
        setPotentialMaxNumberOfBeds(value)
    }
    
    const bedFilterSubmissionHandler = (e) => {
        e.preventDefault()
        let value1 = potentialMinNumberOfBeds
        if(value1 == '' || isNaN(value1) == true) {
            value1 = 0
        }
        let value2 = potentialMaxNumberOfBeds
        if(value2 == '' || isNaN(value2) == true) {
            value2 = 0
        }
        setMinimumNumberOfBeds(value1)
        setMaximumNumberOfBeds(value2)
    }
    
    const resetBedFilter = () => {
        setPotentialMinNumberOfBeds('')
        setPotentialMaxNumberOfBeds('')
        setMinimumNumberOfBeds(0)
        setMaximumNumberOfBeds(0)
    }

    const potentialMinimumBathsChangeHandler = (e) => {
        const value1 = parseInt(e.target.value)
        console.log("potentialMinBaths: ", value1)
        setPotentialMinNumberOfBaths(value1)
    }

    const potentialMaximumBathsChangeHandler = (e) => {
        const value2 = parseInt(e.target.value)
        console.log("potentialMaxBaths: ", value2)
        setPotentialMaxNumberOfBaths(value2)
    }

    const bathFilterSubmissionHandler = (e) => {
        e.preventDefault()
        let value1 = potentialMinNumberOfBaths
        if(value1 == '' || isNaN(value1) == true) {
            value1 = 0
        }
        let value2 = potentialMaxNumberOfBaths
        if(value2 == '' || isNaN(value2) == true) {
            value2 = 0
        }
        setMinimumNumberOfBaths(value1)
        setMaximumNumberOfBaths(value2)
    }

    const resetBathFilter = () => {
        setPotentialMinNumberOfBaths('')
        setPotentialMaxNumberOfBaths('')
        setMinimumNumberOfBaths(0)
        setMaximumNumberOfBaths(0)
    }

    const potentialMinimumGhostsChangeHandler = (e) => {
        const value1 = parseInt(e.target.value)
        console.log("potentialMinBaths: ", value1)
        setPotentialMinNumberOfGhosts(value1)
    }

    const potentialMaximumGhostsChangeHandler = (e) => {
        const value2 = parseInt(e.target.value)
        console.log("potentialMaxGhosts: ", value2)
        setPotentialMaxNumberOfGhosts(value2)
    }

    const ghostFilterSubmissionHandler = (e) => {
        e.preventDefault()
        let value1 = potentialMinNumberOfGhosts
        if(value1 == '' || isNaN(value1) == true) {
            value1 = 0
        }
        let value2 = potentialMaxNumberOfGhosts
        if(value2 == '' || isNaN(value2) == true) {
            value2 = 0
        }
        setMinimumNumberOfGhosts(value1)
        setMaximumNumberOfGhosts(value2)
    }

    const resetGhostFilter = () => {
        setPotentialMinNumberOfGhosts('')
        setPotentialMaxNumberOfGhosts('')
        setMinimumNumberOfGhosts(0)
        setMaximumNumberOfGhosts(0)
    }

    // reset all function
    const resetAllFilters = () => {
        setPotentialMinimumAskingPrice('')
        setPotentialMaximumAskingPrice('')
        setMinimumAskingPrice(0)
        setMaximumAskingPrice(0)
        setSellOrRent(null)
        setPropertyType('')
        setPotentialMinSquareFootage('')
        setPotentialMaxSquareFootage('')
        setMinSquareFootage(0)
        setMaxSquareFootage(0)
        setPotentialMinNumberOfBeds('')
        setPotentialMaxNumberOfBeds('')
        setMinimumNumberOfBeds(0)
        setMaximumNumberOfBeds(0)
        setPotentialMinNumberOfBaths('')
        setPotentialMaxNumberOfBaths('')
        setMinimumNumberOfBaths(0)
        setMaximumNumberOfBaths(0)
        setPotentialMinNumberOfGhosts('')
        setPotentialMaxNumberOfGhosts('')
        setMinimumNumberOfGhosts(0)
        setMaximumNumberOfGhosts(0)
    }

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
    
    const toNewProperty = () => navigate(`/new_property/${currentUserId}`)

    // link to my account
    const toMyAccount = () => navigate(`/profiles/${currentUserId}/${currentUserId}`)

    // link to individual property:
    const toOneProperty = (propertyId) => navigate(`/view_property/${currentUserId}/${propertyId}`)

    if(loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
            <div className="row " style={{borderBottom: '2px solid black'}}>
                <p className="fs-2">Hello, {currentUser.username}</p>
            
                <button className='col-md btn btn-primary'onClick={() => logout()}>Log out</button>
                <button className='col-md btn offset-sm-1 btn-secondary' onClick={() => toNewProperty()}>Create New Listing</button>
                <button onClick={() => toMyAccount()} className='col-md offset-md-2 btn btn-primary'>My Account</button>
            </div>
            <div>
                All Offers
            </div>
            <div>
                {/* filter inputs */}
                <p>Zeros are not filtered</p>
                <p>Asking Price</p>
                <form onSubmit={functionToSetAskingPrice}>
                    <label htmlFor="minium_asking_price">Min:</label>
                    <input id="minimum_asking_price" type="number" name="minimum_asking_price" value={potentialMinimumAskingPrice} onChange={minimumAskingPriceChangehandler}/>
                    <label htmlFor="maximum_asking_price">Max</label>
                    <input id="maximum_asking_price" type="number" name="maximum_asking_price" value={potentialMaximumAskingPrice} onChange={maximumAskingPriceChangeHandler}/>
                    <button>Submit</button>
                </form>
                <button onClick={() => resetAskingPrice()}>Reset</button>
            </div>
            <div>
                <p>For Sale Or For Rent</p>
                <button onClick={setSellOrRentToSell}>For Sale</button>
                <button onClick={setSellOrRentToRent}>For Rent</button>
                <button onClick={() => resetSellOrRent()}>Reset</button>
            </div>
            <div>
                <label htmlFor="property_type">Property Type</label>
                <select id="property_type" type="string" value={propertyType} onChange={propertyTypeChangeHandler}>
                    <option value=''>Select a Property Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                </select>
                <button onClick={() => resetPropertyType()}>Reset</button>
            </div>
            <div>
                {/* filter inputs */}
                <p>Square Footage</p>
                <form onSubmit={setSquareFootage}>
                    <label htmlFor="minium_square_footage">Min:</label>
                    <input id="minimum_square_footage" type="number" name="minimum_square_footage" value={potentialMinSquareFootage} onChange={minimumSquareFootageChangeHandler}/>
                    <label htmlFor="maximum_square_footage">Max</label>
                    <input id="maximum_square_footage" type="number" name="maximum_square_footage" value={potentialMaxSquareFootage} onChange={maximumSquareFootageChangeHandler}/>
                    <button>Submit</button>
                </form>
                <button onClick={() => resetSquareFootage()}>Reset</button>
            </div>
            <div>
                <p>Beds</p>
                <form onSubmit={bedFilterSubmissionHandler}>
                    <label htmlFor="minimum_beds">Min:</label>
                    <input id="minimum_beds" type="number" name="minimum_beds" value={potentialMinNumberOfBeds} onChange={minimumBedsChangeHandler}/>
                    <label htmlFor="maximum_beds">Max:</label>
                    <input id="maximum_beds" type="number" name="maximum_beds" value={potentialMaxNumberOfBeds} onChange={maximumBedsChangeHandler}/>
                    <button>Submit</button>
                </form>
                <button onClick={() => resetBedFilter()}>Reset</button>
            </div>
            <div>
                <p>Baths</p>
                <form onSubmit={bathFilterSubmissionHandler}>
                    <label htmlFor="minimum_baths">Min</label>
                    <input id="minimum_baths" type="number" name="minimum_baths" value={potentialMinNumberOfBaths} onChange={potentialMinimumBathsChangeHandler}/>
                    <label htmlFor="maximum_baths">Max</label>
                    <input id="maximum_baths" type="number" name="minimum_baths" value={potentialMaxNumberOfBaths} onChange={potentialMaximumBathsChangeHandler}/>
                    <button>Submit</button>
                </form>
                <button onClick={resetBathFilter}>Reset</button>
            </div>
            <div>
                <p>Ghosts</p>
                <form onSubmit={ghostFilterSubmissionHandler}>
                    <label htmlFor="minimum_ghosts">Min</label>
                    <input id="minimum_ghosts" type="number" name="minimum_ghosts" value={potentialMinNumberOfGhosts} onChange={potentialMinimumGhostsChangeHandler}/>
                    <label htmlFor="maximum_ghosts">Max</label>
                    <input id="maximum_ghosts" type="number" name="maximum_ghosts" value={potentialMaxNumberOfGhosts} onChange={potentialMaximumGhostsChangeHandler}/>
                    <button>Submit</button>
                </form>
                <button onSubmit={() => resetGhostFilter()}>Reset</button>
            </div>
            <div>
                <button onClick={() => resetAllFilters()}>Reset All</button>
            </div>
            <div className="row">
                <div className="col-md">
                {/* all properties displayed */}
                {allPropertiesFiltered.map((property, index) =>(
                
                <div className="column" style={{ border: '2px solid black' }} key={property._id}>
                        <p>Property Number: {index + 1}</p>
                        <p>lister: {property.lister_username}</p>
                        <p></p>
                        <img src={property.lister_user_image} className="col-md-2" style={{ border: '2px solid black' }} />
                        <p>property name: {property.property_name}</p>
                        <p>property photo:</p> 
                        <img src={property.property_photo_url} className="col-md-10"/>
                        {/* map all the photos */}
                        <p>Property photos:</p>
                        {property.property_photos.map((photo, index) => (
                            <img style={{height: '20px', width: '20px'}} key={index} src={photo}/>
                        ))}

                        <p>sell or rent: {property.sell_or_rent ? "This property is for sale" : "This is a rental"}</p>

                        {property.property_type !== 'Apartment' ? (
                        <p>asking price: ${property.asking_price}</p>
                            ) : (
                            <p>This property has amonthly payment option of ${property.asking_price}.</p>
                        )}
                        <p>Sell or rent? </p>

                        <p>
                        {property.sell_or_rent ? `Asking price: $${property.asking_price}` : `This property has monthly payment of $${property.asking_price}`}
                        </p>


                        <p>asking price: {property.asking_price}</p>
                        <p>sell or rent: {property.sell_or_rent ? "This property is for sale" : "This is a rental"}</p>

                        <p>property type: {property.property_type}</p>
                        <p>square footage: {property.square_footage}</p>
                        <p>number of beds: {property.number_of_beds}</p>
                        <p>number of baths: {property.number_of_baths}</p>
                        <p>number of ghosts: {property.number_of_ghosts}</p>
                        <p>address: {property.address}</p>
                        <p>isSold: {property.isSold}</p>
                        {/* offer ifs array */}
                        {property.offer_ids.map((offer_id, index) => (
                            <p key={index} >{offer_id}</p>
                        ))}
                        <p>winning_bid_amount: {property.winning_bid_amount}</p>
                        <p>winning_bid_user_id: {property.winning_bid_user_id}</p>
                        <p>winning_bid_username: {property.winning_bid_username}</p>
                        <button className='col-sm btn offset-sm-1 btn-secondary' onClick={() => toOneProperty(property._id)}>View Listing</button>
                </div>
            
            ))}
            </div>
            <div className="col-md">
            <div className="subcontainer position-fixed" style={{height: '', width: '400px' ,backgroundColor: '#f0f0f0', border: '2px solid black', left: '48%', transform: 'translateX(50%)'}}>
                <div className='row justify-content-center'>
                    <p className="fs-4">Filters:</p>
                    <div className='col-md-6'>
                        <div className="form-group">
                            <label>Asking Price</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of bathrooms</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of Bedrooms</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum # of ghosts</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>minimum SquareFeet</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Rent or Own</label>
                            <input className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Property Type</label>
                            <input className="form-control"></input>
                        </div>
                        <p></p>
                        <button className="btn btn-primary">Filter</button>
                        <p></p>
                    </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default ViewAllProperties;