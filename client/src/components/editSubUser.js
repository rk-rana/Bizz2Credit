import React, { Component } from "react";
import axios from 'axios'
import { Redirect } from "react-router-dom";


export default class addUser extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            phone_number : "",
            email : "",
            password : "",
            redirect : null
        }
    }
    
    nameChange = (e) => {
           this.setState({
               name : e.target.value
           })
    }

    phoneChange = (e) => {
        this.setState({
            phone_number : e.target.value
        })
 }

 emailChange = (e) => {
    this.setState({
        email : e.target.value
    })
}

passwordChange = (e) => {
    this.setState({
        password : e.target.value
    })
}




componentDidMount() {
  const currentSubUser = localStorage.getItem('currentSubUser')
    
   axios({
        method : "post",
        url : "http://localhost:8080/api/v1/getUserToBeUpdated",
        data : {
            subUserId : currentSubUser
        }
   }).then((response) => {
       console.log(response.data)
     this.setState(response.data.user)
   })
}
    
submitForm = (e) => {
    e.preventDefault()
   
    const subUserId = localStorage.getItem('currentSubUser')
     const userId = localStorage.getItem('userId')
  axios({
      method : "post",
      url : "http://localhost:8080/api/v1/updateSubUser",
      data : {
          creater : userId,
          name : this.state.name,
          phone_number : this.state.phone_number,
          email : this.state.email,
          password : this.state.password,
          subUserId : subUserId
      },
     
  }).then((response) => {
     this.setState({redirect : "/home"})
     
     
  })
}


    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form className="Create-form">
                <h3 style={{textAlign:"center"}}>Update User</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" onChange={this.nameChange} value={this.state.name}/>
                </div>

                <div className="form-group">
                    <label> Phone Number</label>
                    <input type="text" className="form-control" placeholder=" Phone Number"  onChange={this.phoneChange} value={this.state.phone_number}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={this.emailChange} value={this.state.email}/>
                </div>

              
                
                <div className="d-grid gap-1 d-md-flex justify-content-md-end">
                <button  className="btn btn-primary  btn-lg btn-block " onClick = {this.submitForm}>Submit</button>
                <button  className="btn btn-danger btn-secondary btn-lg " onClick = {this.cancelForm}>Cancel</button>
                </div>
            </form>
        );
    }
}