const { Router } = require("express")
const router = Router();

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const User = require("../models/userModel");

router.post("/signin", async (req, res)=>{
    try {
        // get details from body
        const { email, password } = req.body;

        // check if details present
        if(!(email && password)) {
            res.status(400).json({message: "All fields are neccessary, please provide to signin"});
        }

        // see if user exists
        const user = await User.findOne({email})

        if(!user) {
            res.status(400).json({message: "User doesn't exists! Signup instead"});
        }

        // if user is in DB, encrypt the pass and compare
        if(!bcryptjs.compareSync(password, user.password)) {
            res.status(402).json({message: "Email or password is wrong!"});
        }

        // generate token
        const token = jsonwebtoken.sign({
            id: user._id,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        // send token back to user in cookie
        const cookieOptions = {
            httpOnly: true, 
            expire: ((new Date()) + 7 * 24 * 60 * 60 * 1000)
        };
        
        res.status(201).cookie("token", token, cookieOptions).json({
            token: token,
            email: email
        });

    } catch (error) {
        console.error("Error in Signin route:");
        console.error(error);
    }
})

router.post("/signup", async (req, res)=>{
    try {
        // get details from body
        const {firstname, lastname, email, password} = req.body;

        // check if details present
        if(!(firstname && lastname && email && password)) {
            res.status(400).json({message: "All fields are neccessary, please provide to signup"});
        }

        // see if user already exists
        const user = await User.findOne({email})

        if(user) {
            res.status(400).json({message: "User already exists! Signin instead"});
        }

        // if user is not in DB, encrypt the pass and store user info
        const encryptedPassword = bcryptjs.hashSync(password, 10);

        const newUser = await User.create({
            email,
            password: encryptedPassword,
            firstname,
            lastname
        })

        const userId = newUser._id;

        // generate token
        const token = jsonwebtoken.sign({
            id: userId,
            email
        }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        newUser.password = undefined;
        newUser.token = token;

        // send token back to user in cookie
        const cookieOptions = {
            httpOnly: true, 
            expire: ((new Date()) + 7 * 24 * 60 * 60 * 1000)
        };
        
        res.status(201).cookie("token", token, cookieOptions).json({
            token: token,
            email: email
        });

    } catch (error) {
        console.error("Error in Signup route:");
        console.error(error);
    }
})

module.exports = router;