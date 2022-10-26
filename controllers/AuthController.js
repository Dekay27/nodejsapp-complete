const User      = require('../models/User') 
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

 const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err) {
            res.json({
                error: err
            })
        }

        let user = User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass,
            phone: req.body.phone
        })
        user.save()
        .then(user => {
            res.json({
                message: 'User Added Successfully!'
            })
        })
        .catch(error => {
            console.log(error)
            res.json({
                message: 'Error Encountered'
            })
        })
    })
 }

const login = (req, res, next) => {
    let username = req.body.username
    let password = req.body.password

    User.findOne({$or: [{email: username}, {phone: username}]})     // checks if user exists
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){      // checks to see if password matches in database
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretKey', {expiresIn: '30s'})     // create a token that expires in one hour
                    let refreshToken = jwt.sign({name: user.name}, 'thesecrettoken', {expiresIn: '1h'})
                    res.status(200).json({
                         message: "Login successful",
                        token,
                        refreshToken
                    })
                }else{
                    res.status(200).json({
                        message: "Password incorrect, try again"
                    })
                }
            })

        // if user does not exist
        }else{
            res.status(200).json({
                message: "No such user!"
            })
        }
    })

}


 module.exports = {
    register, login
 }