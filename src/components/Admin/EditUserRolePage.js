import React, { Component } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";

class EditUserRolePage extends Component {

  updateUser = arr => {
    axios
      .put("http://localhost:8000/api/admin/" + arr.id, {
        userrole: document.getElementById("userrole").value,
        status: document.getElementById("status").value
      })
      .then(res => {
        window.location.replace("/admin");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let arr = JSON.parse(localStorage.getItem("editRole"));
    return (
      <React.Fragment>
        <Header />
        <h5 className="d-flex justify-content-center m-1">
          <b>WELCOME ADMIN</b>
        </h5>
        <div className="container">
          <table className="table table-striped table-dark">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    className="inputField"
                    type="text"
                    value={arr.name}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>Contact</td>
                <td>
                  <input
                    className="inputField"
                    value={arr.contact}
                    type="text"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>E-mail</td>
                <td>
                  <input
                    className="inputField"
                    value={arr.email}
                    type="text"
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>Username</td>
                <td>
                  <input
                    className="inputField"
                    value={arr.username}
                    type="text"
                    disabled
                  />
                </td>
              </tr>

              <tr>
                <td>Role</td>
                <td>
                  <div className="form-group">
                    <select
                      name="userrole"
                      id="userrole"
                      defaultValue={arr.userrole}
                      className="form-control"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td>
                  <div className="form-group">
                    <select
                      name="status"
                      id="status"
                      defaultValue={arr.status}
                      className="form-control"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark update"
              onClick={this.updateUser.bind(this, arr)}
            >
              Update
            </button>
          </div>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default EditUserRolePage;