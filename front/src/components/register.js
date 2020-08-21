import React from 'react';


import authService from '../services/auth.service';



class Register extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        name: '',
        last: '',
        message: '',
        successful: false
    };

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    };

    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
    };

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    onChangeLastName = (e) => {
        this.setState({
            last: e.target.value
        });
    };

    RegisterSubmit = async (event) => {
        event.preventDefault();
        console.log('register attempt');
        try {
            const resp = await authService.register(this.state.username, this.state.name, this.state.last,
                this.state.email, this.state.password);
            this.setState({ message: 'Sign Up Successful', successful: true });

        } catch (error) {
            this.setState({
                successful: false,
                message: error.toString()
            });
        }
    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='card card-container'>
                    <form onSubmit={this.RegisterSubmit}>
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="FirstName">First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="FirstName"
                                        value={this.state.name}
                                        onChange={this.onChangeName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="LastName">Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="LastName"
                                        value={this.state.last}
                                        onChange={this.onChangeLastName}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChangeEmail}
        
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Sign Up</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        );
    };
}

export default Register;