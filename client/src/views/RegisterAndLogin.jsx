import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

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
        <>
            <form onSubmit={registrationSubmitHandler}>
                <label htmlFor="username">Username:</label>
                <input id="username" type="text" value={registrationUser.username} name="username" onChange={registrationChangeHandler}/>
                {registrationErrors.email && <p>{registrationErrors.email.message}</p>}
                <label htmlFor="user_image_url">Image URL:</label>
                <input id="user_image_url" type="text" value={registrationUser.user_image_url} name="user_image_url" onChange={registrationChangeHandler}/>
                {registrationErrors.user_image_url && <p>{registrationErrors.user_image_url.message}</p>}
                <label htmlFor="email">Email Address:</label>
                <input id="email" type="text" value={registrationUser.email} name="email" onChange={registrationChangeHandler}/>
                {registrationErrors.email && <p>{registrationErrors.email.message}</p>}
                <label htmlFor="password">Password:</label>
                <input id="password" type="password" value={registrationUser.password} name="password" onChange={registrationChangeHandler}/>
                {registrationErrors.password && <p>{registrationErrors.password.message}</p>}
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input id="confirmPassword" type="password" value={registrationUser.confirmPassword} name="confirmPassword" onChange={registrationChangeHandler}/>
                {registrationErrors.confirmPassword && <p>{registrationErrors.confirmPassword.message}</p>}
                <button>Register</button>
            </form>

            <form onSubmit={loginSubmitHandler}>
                <label htmlFor="loginEmail">Email:</label>
                <input id="loginEmail" type="text" value={loginUser.email} name="email" onChange={loginChangeHandler}/>
                {loginErrors.email && <p>{loginErrors.email}</p>}
                <label htmlFor="loginPassword">Password:</label>
                <input id="loginPassword" type="password" value={loginUser.password} name="password" onChange={loginChangeHandler}/>
                {loginErrors.password && <p>{loginErrors.password}</p>}
                <button>Log In</button>
            </form>
        </>
    )
}

export default RegisterAndLogin