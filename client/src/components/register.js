import React, { Component } from "react";
import axios from 'axios'



export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name : "",
            phone_number : "",
            email : "",
            password : ""
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
    
submitForm = (e) => {
    e.preventDefault()
    alert("sedning")
  axios({
      method : "post",
      url : "http://localhost:8080/api/v1/registerUser",
      data : {
          name : this.state.name,
          phone_number : this.state.phone_number,
          email : this.state.email,
          password : this.state.password
      }
  }).then((response) => {
     console.log(response)
  })
}



    render() {
        return (
            <form className = "register-form">
                <h3>Register</h3>

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="Name" onChange={this.nameChange}/>
                </div>

                <div className="form-group">
                    <label> Phone Number</label>
                    <input type="text" className="form-control" placeholder=" Phone Number"  onChange={this.phoneChange}/>
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email"  onChange={this.emailChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.passwordChange}/>
                </div>

                <button className="btn btn-primary btn-lg btn-block" onClick = {this.submitForm}>Register</button>
                    {/* Already registered <a href="#">log in?</a> */}
                
            </form>
        );
    }
}