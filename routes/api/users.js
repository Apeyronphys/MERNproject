const express = require('express');
const router = express.Router(); 
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const config = require('config'); 
const jwt = require('jsonwebtoken');
const { check, validationResault } = require('express-validator');

const User = require('../../models/User');

//@route        GET api/users
//@desk         Register user       
//@access       Public 

router.post('/', [
    check('name', 'Name is required').not().isEmpty(), 
    check('email', 'Please include a valid email').isEmail(), 
    check('password', 'Please enter a password with minimum 6 or more charcters').isLength({min: 6})
],async (req, res) => {
    const errors = validationResault(req); 
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array});
    }

    const { name, email, password} = req.body;

    try {
    // See if user exist 
    let user = await User.findOne({email});
    if (user){
        return res.status(400).json({ errors: [{ msg: 'User is already exist' }] }); 
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200', 
        r: 'pg', 
        d: 'mm'
    });
    
    user = new User({
        name,
        email, 
        avatar,
        password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10); 

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken

    const payload = { 
        user:{
            id: user.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err; 
            res.json({ token });
        });

    res.send('User route');

    } catch(err){
        console.error(err.massage); 
        res.status(500).send('Server error'); 
    }
});

module.exports = router; 