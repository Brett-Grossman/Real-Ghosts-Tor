import { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ViewAllProperties = () => {

    const navigate = useNavigate();
    const { currentUserId } = useParams();
    const [ currentUser, setCurrentUser] = useState({})
    const [loading, setLoading] = useState(true)
    const [allProperties, setAllProperties] = useState([])

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
            setAllProperties(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log("AllProperties.jsx getAllProperties catch err: ", err)
        })
    },[]) //states go in the dependencies

    // filter

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
            <div className="row">
                <div className="col-md">
                {/* all properties displayed */}
                {allProperties.map((property, index) =>(
                
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
                        <p>sell_or_rent: {property.sell_or_rent}</p>
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