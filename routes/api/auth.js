const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const config = require('config'); 
const jwt = require('jsonwebtoken');
const { check, validationResault } = require('express-validator');

const User = require('../../models/User');

//@route        GET api/auth
//@desk         Test route     
//@access       Public 

router.get('/', auth, async (req, res) => {
    try{
        const user = await (await User.findById(req.user.id)).isSelected('-password');
        res.json(user);
    }catch(err){
        console.error(err.message); 
        res.status(500).send('Server Error');
    };
});

//@route        POST api/auth 
//@desk         Authenticate user and get token        
//@access       Public 

router.post('/', [
    check('email', 'Please include a valid email').isEmail(), 
    check('password', 'Password is required').exists()
],async (req, res) => {
    const errors = validationResault(req); 
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array});
    }

    const { email, password} = req.body;

    try {
    // See if user exist 
    let user = await User.findOne({email});
    if (!user){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] }); 
    }

    // Get users gravatar
    const avatar = gravatar.url(email, {
        s: '200', 
        r: 'pg', 
        d: 'mm'
    });
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] }); 
    }

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