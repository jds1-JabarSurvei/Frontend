import { Component } from 'react';
import './style.css';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {
    state = {
        isVisible: false,
        email: "",
        password: "",
        wrongPassword: false,
        wrongEmail: false
    }

    toggleVisiblity = () => {
        const { isVisible } = this.state;
        this.setState({ isVisible : !isVisible });
    };

    handlePassword = event => { 
        this.setState({ password : event.target.value });
        this.setState({ wrongPassword : false });
    };

    handleEmail = event => {
        const value = event.target.value;
        this.setState({ email : value });

        if (!emailValidator.test(value) && value != "") {
            this.setState({ wrongEmail : true });
        } else {
            this.setState({ wrongEmail : false });
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        if(password != ""){
            // VALIDASINYA DISINI
            if(email === "aa" && password === "aa"){
                //Login
                this.setState({ wrongPassword : false });

            } else {
                this.setState({ wrongPassword : true });
            };
        } else {
            this.setState({ wrongPassword : false });
        }
    };

    render(){
        const { isVisible, wrongPassword, wrongEmail } = this.state;
        return(
            <div className="container">
                <div className="row content">
                    <div className="col-md-12 line"></div>
                    <div className="col-md-6 field">
                        <h3 className="signin-text mb-3">Sign In</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">  
                                <input type="text" name="email" autoComplete="off" onChange={this.handleEmail} style={ wrongEmail ? {borderBottom:`2px solid red`} : {}} required />
                                <label for="email" style={ wrongEmail ? {color: `red`} : {}}>Email</label>
                                <h6 className="wrong">{ wrongEmail ? "Email must be a valid email" : "" }</h6>
                            </div>
                            <div className="form-group">
                                <input type={ isVisible ? "text" : "password" } name="password" autoComplete="off" style={ wrongPassword ? {borderBottom:`2px solid red`} : {}} onChange={this.handlePassword} required />
                                <label for="password" style={ wrongPassword ? {color: `red`} : {}}>Password</label>
                                <i
                                    className={`fa ${isVisible ? "fa-eye" : "fa-eye-slash"} password-icon`}
                                    style={ isVisible ? (wrongPassword ? { color:'red'} : { color:'#198754'}) : { color:'#999'}}
                                    onClick={this.toggleVisiblity}
                                />
                                <h6 className="wrong">{ wrongPassword ? "Incorrect password" : "" }</h6>
                            </div>
                            <input type="submit" name="login" value="Log In" />
                            <h5>Don't have an account? <a href="google.com">Sign Up</a></h5>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;