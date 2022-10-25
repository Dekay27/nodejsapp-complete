const mongoose      =   require('mongoose')
const Employee      =   require('../models/Employee')


// SHOW LIST OF EMPLOYEES
const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error =>{
        res.json({
            message: 'An error encountered'
        })
    })
}


// FIND ONE EMPLOYEE BY ID
const show = (req, res, next) => {
    let employeeID = new mongoose.Types.ObjectId(req.body.employeeID)
    Employee.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'Error encountered' 
        }) 
    })
}

// STORE AN EMPLOYEE RECORD
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })
    if(req.file){
        employee.avatar = req.file.path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee Added Successfully'
        })
    })
    .catch(error => {
        console.log(error)
         res.json({
            message: 'Error Encountered'
         })
    })
}

// STORE AN EMPLOYEE RECORD WITH MULTIPLE FILES
const storemore = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    })

    // this part is not working
    // says foreach() is not a valid function
    if(req.files){
        let path = ''
        req.files.foreach(function(files, index, arr){
            path = path + files.path + ','
        })
        path = path.substring(0, path.lastIndexOf(", "))
        employee.avatar = path
    }
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee with Multiple Avatars Added Successfully'
        })
    })
    .catch(error => {
        console.log(error)
         res.json({
            message: 'Error Encountered'
         })
    })
}

// UPDATE AN EMPLOYEE
const update = (req, res, next) => {
    let employeeID = new mongoose.Types.ObjectId(req.body.employeeID)

    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age
    }

    Employee.findByIdAndUpdate(employeeID, {$set: updatedData})
    .then(() => {
        res.json({
            message: 'Employee Updated Successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'Error has been encountered'
        })
    })
}

// DELETE AN EMPLOYEE
const destroy = (req, res, next) => {
    let employeeID = new mongoose.Types.ObjectId(req.body.employeeID)
    Employee.findByIdAndDelete(employeeID)
    .then(() => {
        res.json({
            message: 'Employee deleted successfully'
        })
    })
    .catch(error =>{
        res.json({
            message: 'Error encountered '
        })
    })
}


module.exports = {
    index, show, store, update, destroy, storemore
}