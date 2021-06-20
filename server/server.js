import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors'
import './models/db.connect.js'
import {registerUser, loginUser, updateSubUser, deleteSubUser, createSubUser, getAllSubUsers, getUserToBeUpdated } from './controllers/userctrl.js';


const app = express()

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())


app.post('/api/v1/registerUser', registerUser)
app.post('/api/v1/loginUser', loginUser)
app.post('/api/v1/getAllSubUsers', getAllSubUsers);
app.post('/api/v1/createSubUser/', createSubUser);
app.post('/api/v1/updateSubUser', updateSubUser);
app.post('/api/v1/deleteSubUser/', deleteSubUser);
app.post('/api/v1/getUserToBeUpdated', getUserToBeUpdated);

app.listen(8080, () =>{
    console.log('I AM Running On 8080')
} )
