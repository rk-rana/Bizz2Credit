const express = require('express')
var router = express.Router()
var ObjectID = require('mongoose').Types.ObjectId


var { PostMessage } = require('../models/postMessage')


router.get('/', (req, res) => {
    PostMessage.find((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while retrieving all records : ' + JSON.stringify(err, undefined, 2))
    })
})

router.post('/', (req, res) => {
    var newRecord = new PostMessage({
        title: req.body.title,
        message: req.body.message
    })

    newRecord.save((err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while creating new record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.put('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    var updatedRecord = {
        title: req.body.title,
        message: req.body.message
    }

    PostMessage.findByIdAndUpdate(req.params.id, { $set: updatedRecord },{new:true}, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while updating a record : ' + JSON.stringify(err, undefined, 2))
    })
})

router.delete('/:id', (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id : ' + req.params.id)

    PostMessage.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs)
        else console.log('Error while deleting a record : ' + JSON.stringify(err, undefined, 2))
    })
})


module.exports = router


// const controllers ={
//     signUpPage : (req,res) => {
//         res.render('userSignUp')
//     },

//     signUpPost : (req,res) =>{
//         const saltRounds = 10
//         bcrypt.hash(req.body.password, saltRounds, (err,hashedPassword) => {
//             req.body.password = hashedPassword;
//             User.create(req.body)
//             .then((user,err) => {
//                 if(err){
//                     res.json({
//                         status :400,
//                         message : "user cannot be created",
//                         error : err
//                     })
//                 }
//                 res.join({
//                     status : 200,
//                     message : "Registratoion Successful",
//                     user : user
//                 })
                
//             })
//         })
//     },
//     logInPost : (req,res, next) => {
//         User.findOne({email : req.body.email}, (err, user) => {

//             bcrypt.compare ( req.body.password, user.password, (err,result) => {
//                 if(err){
//                     res.send("error is " + err)
//                 }
//                 else if (result == true){
//                     var token = jwt.sign({email : req.body.email}, 'secret', (err,token) =>{
//                         req.body.token =token
//                         next()
//                     })
//                 }
//             })
//         })
//     },

// listUsers :(req,res) =>{
//     const token = req.body.token
//     console.log(token)
//     jwt.verify(token, 'secret', (err,user) => {
//         if(err) res.json({
//             status: 404,
//             message: "Session Expired",
//             error: err
//         })
//         Users.find((err,users) => {
//             if (err) {console.log(err)}

//         User.find({name : user.name}, (err,currentUser)=>{
//             if(err){console.log(err)}

//             for (let i=0; i<)
//         })
//         })
//     })
// }

// }// const controllers ={
//     signUpPage : (req,res) => {
//         res.render('userSignUp')
//     },

//     signUpPost : (req,res) =>{
//         const saltRounds = 10
//         bcrypt.hash(req.body.password, saltRounds, (err,hashedPassword) => {
//             req.body.password = hashedPassword;
//             User.create(req.body)
//             .then((user,err) => {
//                 if(err){
//                     res.json({
//                         status :400,
//                         message : "user cannot be created",
//                         error : err
//                     })
//                 }
//                 res.join({
//                     status : 200,
//                     message : "Registratoion Successful",
//                     user : user
//                 })
                
//             })
//         })
//     },
//     logInPost : (req,res, next) => {
//         User.findOne({email : req.body.email}, (err, user) => {

//             bcrypt.compare ( req.body.password, user.password, (err,result) => {
//                 if(err){
//                     res.send("error is " + err)
//                 }
//                 else if (result == true){
//                     var token = jwt.sign({email : req.body.email}, 'secret', (err,token) =>{
//                         req.body.token =token
//                         next()
//                     })
//                 }
//             })
//         })
//     },

// listUsers :(req,res) =>{
//     const token = req.body.token
//     console.log(token)
//     jwt.verify(token, 'secret', (err,user) => {
//         if(err) res.json({
//             status: 404,
//             message: "Session Expired",
//             error: err
//         })
//         Users.find((err,users) => {
//             if (err) {console.log(err)}

//         User.find({name : user.name}, (err,currentUser)=>{
//             if(err){console.log(err)}

//             for (let i=0; i<)
//         })
//         })
//     })
// }

// }