import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

class RegistrationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      contact: "",
      email: "",
      username: "",
      password: "",
      userrole: 0,
      status: "Inactive"
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/user/register", {
        name: this.state.name,
        contact: this.state.contact,
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
        userrole: this.state.userrole,
        status: this.state.status
      })
      .then(function(response) {
        console.log(response);
        //This is responsible for the page navigation.
        window.location.replace("/guest");    
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

        <div className="container h-100 mt-15">
          <div className="d-flex justify-content-center h-100">
            <div className="user_card">
              <div className="d-flex justify-content-center form_container">
                <form onSubmit={this.onSubmit}>
                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-user"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="name"
                      className="form-control input_user"
                      placeholder="Enter Your Name"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-phone"></i>
                      </span>
                    </div>
                    <input
                      type="name"
                      name="contact"
                      className="form-control input_user"
                      placeholder="Enter Phone Number"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                    <input
                      type="email"
                      name="email"
                      className="form-control input_user"
                      placeholder="Enter Your Email"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group mb-2">
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="fas fa-user-tie"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      name="username"
                      className="form-control input_user"
                      placeholder="Enter User Name"
                      onChange={this.onChange}
                    />
                  </div>

                  <div className="input-group mb-1">
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

                  <div className="d-flex justify-content-center mt-2 login_container">
                    <button
                      type="submit"
                      name="button"
                      className="btn login_btn"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>

              <div className="mt-3">
                <div className="d-flex justify-content-center links">
                  Already have an account?
                  <Link to="/" className="ml-2">
                    Sign In
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

export default RegistrationPage;