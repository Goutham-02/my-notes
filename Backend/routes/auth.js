const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


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
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        })
        res.send({ user })

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