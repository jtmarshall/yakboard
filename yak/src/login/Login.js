import React, {Component} from 'react';
import AuthService from './AuthService';
import './Login.css';


class Login extends Component {

    constructor() {
        super();

        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    }

    // Redirect login page if
    componentWillMount(){
        if(this.Auth.loggedIn())
            this.props.history.replace('/');
    }

    render() {
        return (
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="User"
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <input
                            className="form-item"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                        />
                        <br/>
                        <input
                            className="form-submit"
                            value="SUBMIT"
                            type="submit"
                        />
                    </form>
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }

    handleFormSubmit(e){
        e.preventDefault();

        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                this.props.history.replace('#/');
            })
            .catch(err =>{
                alert(err);
            })
    }
}

export default Login;