const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const userInfo = require('../models/user');

// add new user / signup
router.post('/signup', async (req,res)=>{
    try{
        userInfo.findOne({ email: req.body.email }).then(
            (user) => {
                if (!user) {                    
                        bcrypt.hash(req.body.password, 10, function(err, hash) {
                        // store hash in the database
                        let usernew ={
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            age : req.body.age,
                            gender : req.body.gender,
                            role : 'user'
                        }
    
                        let newUser = new userInfo(usernew);
                        let saveUser = newUser.save();
                        console.log(saveUser);
                        //res.send(saveUser);
                        return res.status(201).json({
                            message: 'Thank you for registering!'
                        });                    
                    });

                    
                }
                else {
                    return res.status(401).json({
                       // error: new Error('Username already exists')
                       message: 'Username already exists'
                    });
                }                
            }
        )      
    }
    catch(error){
        res.status(500).json({
            //error: error
            message: error.message
          });
    }
})

// login 
router.post('/login', async (req,res)=>{
    try {
          userInfo.findOne({ email: req.body.email }).then(
            (user) => {
                if (!user) {
                    return res.status(401).json({
                        //error: new Error('User not found!')
                        message: 'User not found!'
                    });
                }
                //const hash = bcrypt.hash(req.body.password, 10);
                bcrypt.compare(req.body.password, user.password).then(
                    (valid) => {
                        if (!valid) {
                            return res.status(401).json({
                               // error: new Error('Incorrect password!')
                                message: 'Incorrect password!'
                            });
                        }
                        return res.status(200).json({
                            userId: user._id,
                            token: 'token'
                        });                        
                    }
                );
            }
        )
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
})


module.exports = router;