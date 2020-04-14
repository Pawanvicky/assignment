import React, { Component } from "react";

class Header extends Component {
  onClick = () => {
    window.location.replace("/");
    localStorage.clear();
  };
  render() {
    return (
      <React.Fragment>
        {/* HEADER */}
        <nav className="navbar navbar-dark bg-dark">
          <span className="navbar-brand mb-0 h1">Online Quiz</span>
          <button
            onClick={this.onClick}
            className="btn btn-danger navbar-brand mb-0 h1 logout"
          >
            <i className="fas fa-sign-out-alt"></i>
          </button>
        </nav>
        {/* HEADER */}
      </React.Fragment>
    );
  }
}

export default Header;
