const express = require('express');

const router = express.Router();

const User = require('../models/user')

const bcrypt = require('bcrypt');

const mailService = require('../config/mailService')

const jwt = require('jsonwebtoken');

const { verifyToken } = require('../config/accessAuth')



// router for sign up new user
router.post('/signup', (req, res) => {
    // search for user in database first , if not there craete a new one 
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            res.send({ "Data": user, "message": "User already exists, try to login!", "Status": false })
        } else {

            // hash the password and save it in database
            bcrypt.hash(req.body.password, 10).then(function(hash) {
                console.log(hash)

                User.create({
                        id: "",
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,

                    },
                    (err, user) => {
                        if (err) {
                            res.send({ "Data": err, "message": "Failed in requesting...!", "status": false })
                        } else {

                             //create an access token for new user
                             const accesstoken = jwt.sign({ email: req.body.email },
                                'secretKey', { expiresIn: '10h' });
                            console.log("Token : ", accesstoken);

                            //update the user's id and access token
                            User.findOneAndUpdate({ email: req.body.email }, { id: user._id.toString() , accessToken:accesstoken }, { new: true }, (err, newUser) => {
                                    if (err)
                                        console.log(err)
                                    else
                                        console.log(newUser)

                                    res.status(200).send({ "Data": newUser, "message": "New user signed up Successfully", "status": true , "token": accesstoken})
                                })
                                // mailService.sendEmail(user.email).catch(console.error);
                        }
                    })
            })
        }
    })
})


// login -------------------------------------------------

router.post('/login', (req, res) => {
    console.log(req.headers)
    User.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.status(500).send("Failed to find email: "+err)
        } else {
            console.log("data:", data)
            if (!data) {
                res.send({ "message": "Error in logging in ...!", "Status": false })
            } else {

                bcrypt.compare(req.body.password, data.password, function(err, result) {
                    if (err)
                        console.log("Error", err)
                    else {
                        if (result) {
                            console.log("password equals hash = ", result) // true 

                            //action (login)
                            const accesstoken = jwt.sign({ email: data.email },
                                'secretKey', { expiresIn: '10h' });
                            console.log("Token : ", accesstoken);

                            //update use's access token
                            User.findOneAndUpdate({ email: req.body.email }, { accessToken:accesstoken }, { new: true }, (err, newUser) => {
                                if (err)
                                    console.log(err)
                                else
                                    console.log(newUser)
                            })

                            // const refreshToken = jwt.sign({ email: data.email }, 'RefreshTokenSercterSentence', { expiresIn: '100h' });
                            // data.refreshToken = refreshToken;
                            //res.cookie("jwt", accesstoken, {secure: true, httpOnly: true})

                            res.status(200).send({ "Data": data, "message": "Logged in successfully", "status": true , "token": accesstoken })

                        } else {
                            console.log("Entered password is " + req.body.password + " and the hashed paswword is " + data.password)
                            res.send({ "message": "Something went wrong, please try again !", "Status": false })
                                // action redirect to login page 
                                // password is incorrect
                        }

                    }
                });
            }
        }
    })


})


//Get Profile By ID
router.get('/get/:id', verifyToken, (req, res) => {
    console.log(req.token)
    jwt.verify(req.token, "secretKey", (err, authData) => {

        if (err) {

            res.sendStatus(403);

        } else {

            User.findOne({ _id: req.params.id }, (err, User) => {
                if (err) {
                    res.status(500).send({ "Data": err, "message": "Data in getting data...!", "status": false })
                } else {
                    res.status(200).send({ "Data": User, "message": "Data loaded Successfully", "status": true })
                }
            })
        }
    });
})

//Update User Profile
router.put('/update/:id', (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, (err, data) => {
        if (err) {
            res.status(500).send({ "Data": err, "message": "Data in updating data...!", "status": false })
        } else {
            res.status(200).send({ "Data": data, "message": "Data Updated Successfully", "status": true })
        }
    })
});


router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})






















module.exports = router