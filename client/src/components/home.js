import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from "react-router-dom";
class home extends Component{
    
    constructor() {
        super();
        this.state = {
           subUsers : [],
            redirect: null
        }
    }

   

    componentDidMount() {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/getAllSubUsers',
            data: {
                userId : userId,
            },
            headers: {
                'Authorization': token
              }
        })

            .then( (response) =>  {
                console.log(response.data)
                this.setState({
                   subUsers: response.data.subUsers 
                }
                )
                // self.setState({ items: response.data[0].toDos })
            })

    }

    submitForm = () => {
       
        this.setState({
            redirect : "/addSubUser"
        })

    }

    editSubUser = (index) => {
        console.log(index)
        console.log(this.state.subUsers)
        localStorage.setItem('currentSubUser', this.state.subUsers[index]._id)
        this.setState({
            redirect : "/editSubUser"
        })
    }

    deleteSubUser = (index) => {
        // const subUserId = localStorage.getItem('currentSubUser')
        // const userId = localStorage.getItem('userId')
     axios({
         method : "post",
         url : "http://localhost:8080/api/v1/deleteSubUser",
         data : {
             subUserId :this.state.subUsers[index]._id
         },
        
     }).then((response) => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/v1/getAllSubUsers',
            data: {
                userId : userId,
            },
            headers: {
                'Authorization': token
              }
        })

            .then( (response) =>  {
                console.log(response.data)
                this.setState({
                   subUsers: response.data.subUsers 
                }
                )
                // self.setState({ items: response.data[0].toDos })
            })
        
     })
    }
    render(){


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return(
        <>
            <h1 className="header">Home Page</h1>
            <div >
                <ul >
                <button  className="btn btn-light  btn-lg btn-block ">List of User</button>
                <button  className="btn btn-primary btn-lg " onClick = {this.submitForm}>Create New User</button>
                </ul>
                </div>
                {this.state.subUsers.map((subUser, index) =>{
                    return (
                <div className="card">
                <div className="cardName">
                    <label>{subUser.name}</label>
                </div>
                <div className="cardName">
                    <label>{subUser.phone_number}</label>
                </div>
                <div className="cardName">
                    <label>{subUser.email}</label>
                </div>
                <div class="d-grid gap-1 d-md-flex justify-content-md-end">
                <button  className="btn btn-primary  btn-lg  " onClick = {(e) => {this.editSubUser(index)}}>Edit</button>
                <button  className="btn btn-danger btn-secondary btn-lg " onClick = {(e) => {this.deleteSubUser(index)}}>Remove</button>
                </div>
                </div>

                    )
                })}

            </>
        )
    }
    
}

export default home;