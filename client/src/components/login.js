import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from 'axios'


export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email : "",
            password : "",
            redirect: null
        }
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
      axios({
          method : "post",
          url : "http://localhost:8080/api/v1/loginUser",
          data : {
              email : this.state.email,
              password : this.state.password
          }
      }).then((response) => {
          console.log(response)
          if (response.data.message == "User not found" || response.data.message == "password don't match"  ){
              alert(response.data.message)
          }
        //   console.log(response)
          else{
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('userId',response.data.user._id)
            alert(response.data.message)
            this.setState({
                redirect : "/Home"
            })
          }

      })
    }
    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <form className="Login-form">

                <h3>Log in</h3>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.emailChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.passwordChange}/>
                </div>

                <button  className="btn btn-primary btn-lg btn-block" onClick = {this.submitForm}>Log In</button>
                <Link to = "/register">
                <button  className="btn btn-danger btn-lg btn-block">Register</button>
                </Link>
            </form>
        );
    }
}