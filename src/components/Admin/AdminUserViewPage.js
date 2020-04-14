import React, { Component } from "react";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";
import { Link } from "react-router-dom";

class AdminUserViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
  }

  getUsers = () => {
    axios
      .get("http://localhost:8000/api/admin")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getUsers();
  }

  removeUser = id => {
    console.log(id);
    axios
      .delete("http://localhost:8000/api/admin/" + id)
      .then(res => {
        console.log(res.data);
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { users } = this.state;

    let i = 1;
    return (
      <React.Fragment>
        <Header />
        <h5 className="d-flex justify-content-center m-1">
          <b>WELCOME ADMIN</b>
        </h5>
        <div className="container">
          <table className="table table-bordered table-striped table-dark text-center">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Name</th>
                <th scope="col">Contact</th>
                <th scope="col">E-mail</th>
                <th scope="col">Username</th>
                <th scope="col">Role</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            {users.length
              ? users.map(user => (
                  <tbody key={user._id}>
                    <tr>
                      <th scope="row">{i++}</th>
                      <td>{user.name}</td>
                      <td>{user.contact}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>{user.userrole}</td>
                      <td>{user.status}</td>
                      <td>
                        <Link
                          to="/edit-role"
                          className="btn btn-warning mr-2"
                          onClick={() => {
                            let editUser = {
                              id: user._id,
                              name: user.name,
                              contact: user.contact,
                              email: user.email,
                              username: user.username,
                              userrole: user.userrole,
                              status: user.status
                            };
                            localStorage.setItem(
                              "editRole",
                              JSON.stringify(editUser)
                            );
                          }}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={this.removeUser.bind(this, user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))
              : null}
          </table>
        </div>

        <Footer />
      </React.Fragment>
    );
  }
}

export default AdminUserViewPage;