import React, { Component } from "react";
import Header from "./Header";
import Footer from "./Footer";

class GuestUserLandingPage extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container justify-content-center mt-5">
          <h3>
            Hi User! You need access to proceed further, wait for Admin access
            to proceed further.
          </h3>

          <h4>If already got access, please Admin</h4>
        </div>
        <Footer />
      </div>
    );
  }
}

export default GuestUserLandingPage;