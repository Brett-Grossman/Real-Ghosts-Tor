import User from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const myFirstSecret = process.env.FIRST_SECRET_KEY

const userController = {
    register: async ( req, res) => {
        try{
            console.log("userController register try")
            const potential_email = await User.findOne({email:req.body.email})
            console.log("userController register try potential email: ", potential_email)
            if(potential_email){
                console.log("userController register try if potential email")
                res.status(400).json({message: "This email already exists, please log in."})
            }
            const potential_username = await User.findOne({username:req.body.username})
            console.log("userController register try potential username", potential_username)
            if(potential_username){
                console.log("userController register try if potential username")
                res.status(400).json({message: "This username is already taken. Please choose another."})
            }
            else{
                console.log("userController register try else")
                const newUser = await User.create(req.body)
                const payload = {
                    id: newUser._id,
                    email: newUser.email
                };
                const userToken = jwt.sign(payload, myFirstSecret);
                console.log("userController register else userToken: ", userToken);
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json(newUser)
            }
        }
        catch(err){
            console.log("userController register catch err: ", err)
            res.status(400).json({error: err})
        }
    },
    login: async (req, res) => {
        try {
            console.log("userController login try")
            const potentialUser = await User.findOne({email: req.body.email})
            if(!potentialUser) {
                console.log("userController login try if !potentialUser")
                res.status(400).json({email: "Email not found."})
            } else {
                console.log("userController try else potentialUser")
                const validPassword = await bcrypt.compare(req.body.password, potentialUser.password)
                if (!validPassword) {
                    res.status(400).json({password: "Incorrect password"})
                } else {
                    const payload = {
                        id: potentialUser._id,
                        email: potentialUser.email
                    }
                    const userToken = jwt.sign(payload, myFirstSecret);
                    console.log("userController login userToken: ", userToken);
                    console.log("login potentialUser: ", potentialUser);
                    res.status(201).cookie('userToken', userToken, { httpOnly: true }).json(potentialUser)
                }
            }
        } catch (err) {
            console.log("userController login catch err: ", err)
            res.status(400).json({error: err})
        }
    },
    getAllUsers: async (req, res) => {
        try {
            console.log("userController getAllUsers try");
            const allUsers = await User.find();
            res.json(allUsers)
        }
        catch (err) {
            console.log("userController getAllUsers catch err: ", err)
            res.status(400).json({error: err})
        }
    },
    logout: (req, res) => {
        res.clearCookie('userToken').sendStatus(200)
    },
    getOneUser: async (req, res) => {
        try {
            console.log("userController getOneUser try");
            const selectedUser = await User.findById(req.params.id);
            console.log("userController getOneUser try selectedUser: ", selectedUser);
            res.json(selectedUser);
        }
        catch (err) {
            console.log("userController getOneUser catch err: ", err);
            res.status(400).json(err);
        }
    },
    editUser: async (req, res) => {
        const options = {
            new: true,
            runValidators: true,
        }
        try {
            console.log("userController editUser try")
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, options);
            res.json(updatedUser);
        }
        catch (err)  {
            console.log("userController editUser catch err: ", err)
            res.status(400).json(err)
        }
    },
    deleteUser: async (req, res) => {
        try {
            console.log("userController deleteUser try")
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            res.json(deletedUser)
        }
        catch (err) {
            console.log("userController deleteUser catch err: ", err)
            res.status(400).json(err)
        }
    }
}
export default userController