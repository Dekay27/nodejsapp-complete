const User      = require('..models/User')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

 const register = (res, req, next) => {
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

 module.exports = {
    register
 }