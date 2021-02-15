import { Component } from 'react';
import './style.css';

class Login extends Component {
    state = {
        isVisible: false,
        email: "",
        password: "",
        isWrong: false
    }

    toggleVisiblity = () => {
        const { isVisible } = this.state;
        this.setState({ isVisible : !isVisible });
    };

    handleChange = event => { 
        this.setState({ [event.target.name]: event.target.value });
        this.setState({ isWrong : false });
    };

    handleSubmit = event => {
        event.preventDefault();
        const { email, password } = this.state;
        if(password != ""){
            // VALIDASINYA DISINI
            if(email === "aa" && password === "aa"){
                //Login
                this.setState({ isWrong : false });

            } else {
                this.setState({ isWrong : true });
            };
        } else {
            this.setState({ isWrong : false });
        }
    };

    render(){
        const { isVisible, isWrong } = this.state;
        return(
            <div className="container">
                <div className="row content">
                    <div className="col-md-12 line"></div>
                    <div className="col-md-6 field">
                        <h3 className="signin-text mb-3">Sign In</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">  
                                <input type="text" name="email" autoComplete="off" onChange={this.handleChange} required />
                                <label for="email">Email</label>
                            </div>
                            <div className="form-group">
                                <input type={ isVisible ? "text" : "password" } name="password" autoComplete="off" onChange={this.handleChange} required />
                                <label for="password">Password</label>
                                <i
                                    className={`fa ${isVisible ? "fa-eye" : "fa-eye-slash"} password-icon`}
                                    style={ isVisible ? { color:'#198754'} : { color:'#999'}}
                                    onClick={this.toggleVisiblity}
                                />
                                <h6 className="wrong">{ isWrong ? "Email/Password yang anda masukkan salah" : "" }</h6>
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