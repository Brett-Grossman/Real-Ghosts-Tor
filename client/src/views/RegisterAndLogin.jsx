import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterAndLogin = () => {
    const navigate = useNavigate();
    const [registrationUser, setRegistrationUser] = useState({
        username: '',
        user_image_url: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [registrationErrors, setRegistrationErrors]  = useState({})

    const [loginUser, setLoginUser] = useState({
        username: '',
        user_image_url: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [loginErrors, setLoginErrors] = useState({})

    const registrationChangeHandler = (e) => {
        setRegistrationUser({...registrationUser, [e.target.name]:e.target.value})
    }

    const registrationSubmitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/users', registrationUser, {withCredentials:true})
            .then((res) => {
                console.log("RegisterAndLogin.jsx registrationSubmitHandler then res: ", res)
                navigate(`/all_properties/${res.data._id}`)
            })
            .catch((err) => {
                console.log("RegisterAndLogin.jsx registration submitHandler catch err: ", err.response.data.error.errors)
                setRegistrationErrors(err.response.data.error.errors)
            })
    }

    const loginChangeHandler = (e) => {
        setLoginUser({...loginUser, [e.target.name]:e.target.value})
    }

    const loginSubmitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', loginUser, {withCredentials:true})
            .then((res) => {
                console.log("RegisterAndLogin.jsx loginSubmitHandler then res: ", res)
                navigate(`/all_properties/${res.data._id}`)
            })
            .catch((err) => {
                console.log("RegisterAndLogin.jsx loginSubmitHandler catch err: ", err.response.data)
                setLoginErrors(err.response.data)
            })
    }

    return (
        <div className='container shadow-lg' style={{backgroundColor: '#f0f0f0'}}>
        <div className=" text-center">
            <h1>Welcome to RealGhostTor</h1>
        </div>
        <div className='row justify-content-center text-center'>
            <div className='col-md-6'>
            <h1 className='fs-2'>Register here!</h1>
            <form onSubmit={registrationSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input id="username" 
                        type="text"
                        className="form-control" 
                        value={registrationUser.username} 
                        name="username"
                        placeholder='Enter Name' 
                        onChange={registrationChangeHandler}/>
                    {registrationErrors.username && <p className="text-danger">{registrationErrors.username.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="user_image_url">Image URL:</label>
                    <input 
                        id="user_image_url" 
                        type="text"
                        className="form-control" 
                        value={registrationUser.user_image_url} 
                        name="user_image_url" 
                        placeholder='Enter Picture URL'
                        onChange={registrationChangeHandler}/>
                    {registrationErrors.user_image_url && <p className="text-danger">{registrationErrors.user_image_url.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input 
                        id="email" 
                        type="text"
                        className="form-control" 
                        value={registrationUser.email} 
                        name="email" 
                        placeholder='Enter Email'
                        onChange={registrationChangeHandler}/>
                    {registrationErrors.email && <p className="text-danger">{registrationErrors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                        id="password" 
                        type="password" 
                        className="form-control"
                        value={registrationUser.password} 
                        name="password" 
                        placeholder='Enter Password'
                        onChange={registrationChangeHandler}/>
                    {registrationErrors.password && <p className="text-danger">{registrationErrors.password.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input id="confirmPassword" 
                        type="password"
                        className="form-control" 
                        value={registrationUser.confirmPassword} 
                        name="confirmPassword" 
                        placeholder="Confirm Password"
                        onChange={registrationChangeHandler}/>
                    {registrationErrors.confirmPassword && <p className="text-danger">{registrationErrors.confirmPassword.message}</p>}
                <p></p>
                <button type='submit' className='btn btn-primary'>Register</button>
                <p></p>
                </div>

            </form>
        </div>
        </div>
        <div className='container text-center'>
        <h1 className='fs-2'>Dont have an Account?</h1>
        <h1 className='fs-2'>Register here!</h1>
        
        <form onSubmit={loginSubmitHandler}>
        <div className='row justify-content-center'>
        <div className='col-md-6'>
                <div className="form-group">
                    <label htmlFor="loginEmail">Email:</label>
                    <input 
                        id="loginEmail" 
                        type="text"
                        className="form-control" 
                        value={loginUser.email} 
                        name="email" 
                        onChange={loginChangeHandler}/>
                    {loginErrors.email && <p className="text-danger">{loginErrors.email}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="loginPassword">Password:</label>
                    <input 
                        id="loginPassword" 
                        type="password"
                        className="form-control" 
                        value={loginUser.password} 
                        name="password" 
                        placeholder=""
                        onChange={loginChangeHandler}/>
                    {loginErrors.password && <p className="text-danger">{loginErrors.password}</p>}
                </div>
                <p></p>
            <button type='submit' className='btn btn-primary'>Log In</button>
            <p></p>
        </div>
        </div>        
        </form>
        
        </div>
    </div>
    )
}

export default RegisterAndLogin