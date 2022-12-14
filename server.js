const express       =   require('express');
const mongoose      =   require('mongoose');
const morgan        =   require('morgan');
const bodyParser    =   require('body-parser');

const dotenv = require('dotenv')
dotenv.config()

const EmployeeRoute = require('./routes/employee')
const AuthRoute     = require('./routes/auth')
const authenticate  = require('./middleware/authenticate')

mongoose.connect('mongodb+srv://dekayroot:12341234@cluster0.514jnqu.mongodb.net/nodejsapp')
const db = mongoose.connection

db.on('error', (err) => {
     console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

 const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/uploads', express.static('uploads'))

const PORT  =   process.env.PORT || 3000

app.listen(PORT, () =>{
    console.log('Server is running on port %i', PORT)
})

app.use('/api/employee', EmployeeRoute)
app.use('/api', AuthRoute)