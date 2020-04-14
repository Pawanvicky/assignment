import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/login", {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        let userrole = response.data.userrole;
        let status = response.data.status;

        console.log(response);

        //This part is responsible for the window navigation after login.

        if (userrole === 3) {
          window.location.replace("/admin");
        } else {
          if (status === "Active") {
            if (userrole === 1) {
              window.location.replace("/exam");            
            }
            if (userrole === 2) {
              window.location.replace("/createExam");
            }
          } else {
            window.location.replace("/guest");
          }
        }
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* HEADER */}
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Online Test App</span>
        </nav>
        {/* HEADER */}

        {/* BODY */}
        <div className="container h-100">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group mb-3">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="form-control input_user"
                      placeholder="Enter Your User Name"
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-key"></i>
                      </span>
                    </div>
                    <input
                      type="password"
                      name="password"
                      className="form-control input_pass"
                      placeholder="Enter Your Password"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="d-flex justify-content-center mt-3 login_container">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-4">
                <div className="d-flex justify-content-center links">
                  Don't have an account?
                  <Link to="/registration" className="ml-2">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BODY */}

        {/* FOOTER */}
        <Footer />
        {/* FOOTER */}
      </React.Fragment>
    );
  }
}
export default LoginPage;