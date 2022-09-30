import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';

// The addition
// import { tsConstructorType } from '@babel/types';
import { variables } from '../Variables';


class Users extends Component {

    constructor(props) {
        super(props);
        this.state={
            is_loading: true,
            users: [],
            is_logged_in: false,
            contacts: [],
        };
    }

    refreshList() {
        fetch(variables.API_URL+'contact')
        .then(response=>response.json())
        .then(data => {
            this.setState({users: data})
        });
    }

    async refreshListV2() {
        const res = await axios.get(variables.API_URL+'contact');
        this.setState({
            contacts: res.data,
            is_loading: false,
        });
    }

    componentDidMount() {
        this.refreshListV2();
    }

    handleDelete = async (e, id) => {
        const currentClickedElement = e.currentTarget;
        currentClickedElement.innerText = "Deleting...";

        swal.fire({
            title: 'Are you sure?',
            text: 'You wont be able to revert this.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#3085d6'
        }).then(async (result) => {

            if (result.isConfirmed) {
                const res = await axios.delete(variables.API_URL+`contact/${id}`).then((val) => {
                    if (val.data.status === "200") {
                        currentClickedElement.closest('tr').remove();
                        swal.fire({
                            title: 'Deleted!',
                            text: val.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK',
                        }).then(() => {
                            this.setState({
                                is_loading: false,
                            });
                        });
                    }            
                }).catch((error) => {
                    swal.fire({
                        title: 'Error',
                        text: error.response.data.title,
                        icon: 'error',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        this.setState({
                            is_loading: false,
                        });
                    });
                });
            } else {
                currentClickedElement.innerText = "Delete";
            }
        });
    }

    render() {
        let html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        let { is_loading } = this.state;

        if (is_loading) {
            html_elems = <tr><td colSpan="7"><h3>Loading...</h3></td></tr>;
        } else {
            html_elems = this.state.contacts.map((item) => {
                return (
                    <tr key={item.id}>
                        <td>{item.firstname}</td>
                        <td>{item.lastname}</td>
                        <td>{item.billingAddress}</td>
                        <td>{item.deliveryAddress}</td>
                        <td>{item.email}</td>
                        <td><Link to={`/edit-user/${item.id}`} className="btn btn-primary btn-sm">Edit</Link></td>
                        <td><button onClick={(e) => this.handleDelete(e, item.id)} className="btn btn-danger btn-sm">Delete</button></td>
                    </tr>
                )
            });
        }

        return (
            <div>
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Users Contact Information
                                        <Link to="/register-user" className="btn btn-success btn-sm float-end">Add New</Link>
                                    </h3>
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered table-stripe">
                                        <thead>
                                            <tr>
                                                <th>Firstname</th>
                                                <th>Lastname</th>
                                                <th>Billing Address</th>
                                                <th>Delivery Address</th>
                                                <th>Email</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {html_elems}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users;