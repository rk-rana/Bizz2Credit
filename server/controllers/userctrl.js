import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import bcrypt from 'bcrypt'
import Subuser from '../models/Subusers.js'






const router = express.Router();


export const registerUser = async (req, res) => {
    const saltRounds = 10
    bcrypt.hash(req.body.password, saltRounds, function (err, hashedPassword) {
        req.body.password = hashedPassword
        console.log(req.body)
        User.create(req.body)
            .then((user, err) => {
                if (err) {
                    res.json({
                        status: 400,
                        message: "Mongodb Cannot create new user",
                        error: err
                    })
                }
                res.json({
                    status: 200,
                    message: "Registration Successful",
                    user: user
                })
            }
            )

    })


}


export const loginUser = async (req, res) => {
    console.log(req.body)
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            res.json({ message: "User not found" })
        }
        if (!user) {
            res.json({ message: "User not found" })
        }
        else {

            console.log(req.body.password, user.password)
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                console.log(err)
                if (err) {
                    console.log("heyyy")
                    res.status(404).json({ message: "password don't match" })
                }
                else if (result == true) {
                    const token = jwt.sign({ _id: user._id, email: user.email}, 'secret', (err, token) => {
                        User.findByIdAndUpdate(user._id, { token: token } ,  (err, user) => {
                            res.status(200).json({
                                message: "Login Successful",
                                user: user,
                                token: token
                            })

                        })
                           

                    })

                }
                else {
                    res.json({ message: "password don't match" })
                }

            })
        }




    })
}


export const getAllSubUsers = async (req, res) => {
    console.log(req.body)
    // console.log(req)
    User.findById(req.body.userId, (err,user) => {
        if (err) {
            res.json({message : "There is some problem, please login again "})
        }
        else {
            if (!req.headers.authorization){
                 res.json({
                     message : "Token expired, please login again"
                 })
            }
            else {
                console.log(req.headers.authorization)
                console.log(user.token)
                console.log(user)
                if (user.token == req.headers.authorization) {
                 console.log("hiiii")
                
                Subuser.find({creater : req.body.userId}, (err, user) => {
                    if(err) {
                        res.json({
                            message : "can't find your subusers"
                        })

                    }
                    else {
                        res.status(200).json({
                            subUsers : user,
                            message : "All good"
                        })
                    }
                })
            }
                
        }
    }

      }) }

export const createSubUser = async (req, res) => {
    console.log("sa")
    console.log(req.params)
    const { id } = req.params;
    console.log(req.body) 
    try {
        Subuser.create(req.body).then((user, err) => {
            res.json({
                message : "subuser created successfully",
                subUser : user
            })
        })
                
       
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateSubUser = async (req, res) => { 
      console.log(req.body.subUserId)

    try {
        Subuser.findOneAndUpdate({_id : req.body.subUserId}, {...req.body}, (err, user) => {
            
                res.json({
                    updatedSubUser : user
                })
        })
        
        
      
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



  export const deleteSubUser = async(req,res) => {
   
   console.log(req.body)
    Subuser.findOneAndRemove({_id : req.body.subUserId}, (user, err) => {
        res.json({
            message : "subUser deleted"
        })
    })
      
  }
    


  export const getUserToBeUpdated = (req, res) => {
      Subuser.findById(req.body.subUserId, (err, user) => {
          res.json({
              user : user
          })
      })
  }




export default router;
