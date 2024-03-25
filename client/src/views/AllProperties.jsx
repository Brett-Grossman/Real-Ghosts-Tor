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
    const [sellOrRent, setSelllOrRent] = useState(null)
    const [propertyType, setPropertyType] = useState('')
    const [potentialMinSquareFootage, setPotentialMinSquareFootage] = useState(0)
    const [potentialMaxSquareFootage, setPotentialMaxSquareFootage] = useState(0)
    const [minSquareFootage, setMinSquareFootage] = useState(0)
    const [maxSquareFootage, setMaxSquareFootage] = useState(0)
    const [potentialMinNumberOdBeds, setPotentialMinNumberOfBeds] = useState(0)
    const [potentialMaxNumberOfBeds, setPotentialMaxNumberOfBeds] = useState(0)
    const [minimumNumberOfBeds, setMinimumNumberOfBeds] = useState(0)
    const [maximumNumberOfBeds, setMaximumNumberOfBeds] = useState(0)
    const [potentialMinNumberOfBaths, setPotentialMinNumberOfBaths] = useState(0)
    const [potentialMaxNumberOfBaths, setPotentialMaxNumberOfBaths] = useState(0)
    const [minimumNumberOfBaths, setMinimumNumberOfBaths] = useState(0)
    const [maximumNumberOfBaths, setMaximumNumberOfBaths] = useState(0)
    const [potentialMinNumberOfGhosts, setPotentialMinNumberOfGhosts] = useState(0)
    const [potentialMaxNumberOfGhosts, setPotentialMaxNumberOfGhosts] = useState(0)
    const [miniumNumberOfGhosts, setMinimumNumberOfGhosts] = useState(0)
    const [maximumNumberOfGhosts, setMaximumNumberOfGhosts] = useState(0)

    const [allOffers, setAllOffers] = useState([])

    // axios get all offers

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
            setAllPropertiesFiltered(filteredProperties)
            console.log("potentialMinimumAskingPrice", potentialMinimumAskingPrice)
            console.log("potentialMaximumAskingPrice", potentialMaximumAskingPrice)
            console.log("minimumAskingPrice", minimumAskingPrice)
            console.log("maximumAskingPrice", maximumAskingPrice)
            setLoading(false)
        })
        .catch((err) => {
            console.log("AllProperties.jsx getAllProperties catch err: ", err)
        })
    },[minimumAskingPrice,
    maximumAskingPrice]) //states go in the dependencies

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
        setMinimumAskingPrice(potentialMinimumAskingPrice)
        setMaximumAskingPrice(potentialMaximumAskingPrice)
    }
    
    const resetAskingPrice = () => {
        setPotentialMinimumAskingPrice(0)
        setPotentialMaximumAskingPrice(0)
        setMinimumAskingPrice(0)
        setMaximumAskingPrice(0)
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
                {currentUser._id}
                {currentUser.user_image_url}
                <p>Hello, {currentUser.username}</p>
                <button onClick={()=> toMyAccount()}>My Account</button>
                <button className='col-md btn btn-primary'onClick={() => logout()}>Log out</button>
                <button className='col-md btn offset-sm-1 btn-secondary' onClick={() => toNewProperty()}>Create New Listing</button>
            </div>
            <div>
                All Offers
            </div>
            <div>
                {/* filter inputs */}
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
            <div className="row">
                <div className="col-md">
                {/* all properties displayed */}
                {allPropertiesFiltered.map((property, index) =>(
                
                <div className="column" style={{ border: '2px solid black' }} key={property._id}>
                        <p>Property Number: {index + 1}</p>
                        <p>ID: {property._id}</p>
                        <button onClick={() => toOneProperty(property._id)}>View Property</button>
                        <p>lister_user_id: {property.lister_user_id}</p>
                        <p>lister_username: {property.lister_username}</p>
                        <p>lister_user_image: {property.lister_user_image}</p>
                        <p>property_name: {property.property_name}</p>
                        <p>property_photo_url: {property.property_photo_url}</p>
                        {/* map all the photos */}
                        <p>Property photos:</p>
                        {property.property_photos.map((photo, index) => (
                            <img style={{height: '20px', width: '20px'}} key={index} src={photo}/>
                        ))}
                        <p>asking_price: {property.asking_price}</p>
                        {property.sell_or_rent ? <p>For Sale</p> : <p>To Rent</p>}
                        <p>property_type: {property.property_type}</p>
                        <p>square_footage: {property.square_footage}</p>
                        <p>number_of_beds: {property.number_of_beds}</p>
                        <p>number_of_baths: {property.number_of_baths}</p>
                        <p>number_of_ghosts: {property.number_of_ghosts}</p>
                        <p>address: {property.address}</p>
                        <p>isSold: {property.isSold}</p>
                        {/* offer ifs array */}
                        {property.offer_ids.map((offer_id, index) => (
                            <p key={index} >{offer_id}</p>
                        ))}
                        <p>winning_bid_amount: {property.winning_bid_amount}</p>
                        <p>winning_bid_user_id: {property.winning_bid_user_id}</p>
                        <p>winning_bid_username: {property.winning_bid_username}</p>
                </div>
            
            ))}
            </div>
            <div className="col-md">
            <div className="subcontainer position-fixed" style={{backgroundColor: '#f0f0f0', border: '2px solid black', left: '58%', transform: 'translateX(50%)'}}>
                <div className='row justify-content-center'>
                    <p className="fs-3">Filters:</p>
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