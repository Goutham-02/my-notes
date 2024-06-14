const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const JWT_SECRET = "hamtumalaghaifraqhK$aifarqhai";

//Create a user using: POST "/api/auth/createUser". No login required.
router.post('/createUser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 8 characters').isLength({ min: 5 }),
], async (req, res) => {
    //If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether the user with email already exists
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "Email already exists!" })
        }

        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });

        const data = {
            user: {
                is: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        
        // res.send({ user })
        res.json({authToken});

    } catch (error) {

        console.error(error.message);
        res.status(500).send("Some error occured!")

    }
    // .then(user => res.json(user))
    // .catch(error => {
    //     console.log(error);
    //     res.json({ error: 'Email alreeady exists!', message: error.message })
    // });
})

module.exports = router;