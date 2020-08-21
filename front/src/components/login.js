import React from 'react';

import AuthService from '../services/auth.service';


class Login extends React.Component {

    state = {
        password: '',
        email: '',
        loading: false,
        message: ''
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

    loginSubmit = async (event) => {

        try {
            event.preventDefault();
            console.log('login attempt');
            this.setState({ loading: true });
            const token = await AuthService.login(this.state.email, this.state.password);
            console.log(token);
            this.props.history.push('/events');
            window.location.reload();

        } catch (e) {
            console.log('fsdfjhjsfhjksd');
            console.log(e);
            this.setState({ message: 'Login failed. Try again', loading: false })
        }

    }

    render() {
        return (
            <div className='col-md-12'>
                <div className='card card-container'>
                    <form onSubmit={this.loginSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='text'
                                className='form-control'
                                name='email'
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                className='form-control'
                                name='password'
                                value={this.state.password}
                                onChange={this.onChangePassword}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loading}
                            >
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>
                        </div>
                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
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

export default Login;