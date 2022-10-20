import Employee from '../models/Employee';

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
    let employeeID = req.body.employeeID
    employeeID.findById(employeeID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        message: 'Error encountered'  
    })
}
