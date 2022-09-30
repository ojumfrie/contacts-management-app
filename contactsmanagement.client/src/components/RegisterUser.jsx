import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import { Navigate, Link } from 'react-router-dom';
import { variables } from '../Variables';


class RegisterUser extends Component {
    state = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        billing_address: '',
        delivery_address: '',
        error_list: [],
        is_to_redirect_to_home: false,
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleRegister = async (e) => {
        e.preventDefault();
        const res = await axios.post(variables.API_URL+'contact', {
            // "id": 5,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "billingAddress": this.state.billing_address,
            "deliveryAddress": this.state.delivery_address,
            "email": this.state.email,
            "password": this.state.password,
            // "createdDate": "2022-09-08T03:24:48.898Z"
        }).then((val) => {
            if (val.data.status === "200") {
                swal.fire({
                    title: 'Registered!',
                    text: val.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.setState({
                        firstname: '',
                        lastname: '',
                        email: '',
                        password: '',
                        billing_address: '',
                        delivery_address: '',
                        error_list: [],
                        is_to_redirect_to_home: true,
                    });
                });  
            }            
        }).catch((error) => {
            if (error.response.status === 400 && error.response.data.title == "One or more validation errors occurred.") {
                this.setState({
                    error_list: error.response.data.errors,
                });
            }
        });
    }

    render() {
        return (
            <div>
                {this.state.is_to_redirect_to_home && <Navigate to="/" />}
                <div className="container pt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h2>New Contact
                                        <Link to="/" className="btn btn-success btn-sm float-end">Go to home</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleRegister}>
                                        <div className="form-group mt-2">
                                            <label>Firstname</label>
                                            <input name="firstname" type="text" value={this.state.firstname} onChange={this.handleChange} className="form-control" placeholder="Enter your firstname" />
                                            <span className="text-danger small">{this.state.error_list.Firstname}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Lastname</label>
                                            <input name="lastname" type="text" value={this.state.lastname} onChange={this.handleChange} className="form-control" placeholder="Enter your lastname" />
                                            <span className="text-danger small">{this.state.error_list.Lastname}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Billing Address</label>
                                            <input name="billing_address" type="text" value={this.state.billing_address} onChange={this.handleChange} className="form-control" />
                                            <span className="text-danger small">{this.state.error_list.BillingAddress}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Delivery Address</label>
                                            <input name="delivery_address" type="text" value={this.state.delivery_address} onChange={this.handleChange} className="form-control" />
                                            <span className="text-danger small">{this.state.error_list.DeliveryAddress}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Email</label>
                                            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} className="form-control" />
                                            <span className="text-danger small">{this.state.error_list.Email}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Password</label>
                                            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-control" />
                                            <span className="text-danger small">{this.state.error_list.Password}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <button type="submit" className="btn btn-primary float-end">Register</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterUser;