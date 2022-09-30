import React, { Component } from 'react';
import axios from 'axios';
import swal from 'sweetalert2';
import {Navigate, Link} from 'react-router-dom';
import { variables } from '../Variables';

class EditUser extends Component {
    state = {
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        billing_address: '',
        delivery_address: '',
        error_list: false,
        is_to_redirect_to_home: false,
    }

    captureId() {
        let location = window.location.href.split("/");
        return location[location.length - 1];
    }

    async componentDidMount() {
        let id = this.captureId();
        let url = variables.API_URL+`contact/retrieve/${id}`;
        const res = await axios.get(url);
        
        if (res.status === 200) {
            this.setState({
                id: id,
                firstname: res.data.firstname,
                lastname: res.data.lastname,
                email: res.data.email,
                password: res.data.password,
                billing_address: res.data.billingAddress,
                delivery_address: res.data.deliveryAddress,
            });
        } else {
            swal.fire({
                title: 'Not Found.',
                text: "Contact cannot be found.",
                icon: 'warning',
                confirmButtonText: 'OK',
            }).then(() => {
                this.setState({
                    is_to_redirect_to_home: true,
                });
            });
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSave = async (e) => {
        e.preventDefault();

        const id = this.captureId();
        const res = await axios.put(variables.API_URL+`contact/${id}`, {
            "id": this.state.id,
            "firstname": this.state.firstname,
            "lastname": this.state.lastname,
            "billingAddress": this.state.billing_address,
            "deliveryAddress": this.state.delivery_address,
            "email": this.state.email,
            "password": this.state.password,
        }).then((val) => {
            if (val.data.status === "200") {            
                swal.fire({
                    title: 'Updated!',
                    text: val.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    this.setState({
                        is_to_redirect_to_home: true,
                    });
                });
            }            
        }).catch((error) => {
            if (error.response.status === 400 && error.response.data.title == "One or more validation errors occurred.") {
                this.setState({
                    error_list: error.response.data.errors,
                });
            } else {
                swal.fire({
                    title: 'Processing related issue.',
                    text: 'Try reviewing your field values, and save again.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
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
                                    <h2>Edit Contact
                                        <Link to="/" className="btn btn-success btn-sm float-end">Go Back</Link>
                                    </h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSave}>
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
                                            <input name="billing_address" type="text" value={this.state.billing_address} onChange={this.handleChange} className="form-control" placeholder="Enter your billing address" />
                                            <span className="text-danger small">{this.state.error_list.BillingAddress}</span>
                                        </div>
                                        <div className="form-group mt-2">
                                            <label>Delivery Address</label>
                                            <input name="delivery_address" type="text" value={this.state.delivery_address} onChange={this.handleChange} className="form-control" placeholder="Enter your delivery address" />
                                            <span className="text-danger small">{this.state.error_list.DeliveryAddress}</span>
                                        </div>

                                        <div className="form-group mt-2">
                                            <button type="submit" className="btn btn-primary col-2 float-end">Save</button>
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

export default EditUser;