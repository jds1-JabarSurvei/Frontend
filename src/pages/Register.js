import { Component } from 'react';
import './style.css';

class Login extends Component {
    state = {
        isVisible: false
    }

    toggleVisiblity = () => {
        const { isVisible } = this.state;
        this.setState({ isVisible : !isVisible });
    };

    render(){
        const { isVisible } = this.state;
        return(
            <div className="container">
                <div className="row content">
                    <div className="col-md-12 line"></div>
                    <div className="col-md-6 field">
                        <h3 className="register-text mb-3">Register</h3>
                        <form>
                            <div className="form-group">  
                                <input type="text" name="email" autoComplete="off" required />
                                <label for="email">Email</label>
                            </div>
                            <div className="form-group">
                                <input type={ isVisible ? "text" : "password" } name="password" autoComplete="off" required />
                                <label for="password">Password</label>
                                <i
                                    className={`fa ${isVisible ? "fa-eye" : "fa-eye-slash"} password-icon`}
                                    style={ isVisible ? { color:'#198754'} : { color:'#999'}}
                                    onClick={this.toggleVisiblity}
                                />
                            </div>
                            <div className="form-group">
                                <input type={ isVisible ? "text" : "password" } name="confirm-password" autoComplete="off" required />
                                <label for="confirm-password">Confirm Password</label>
                                <i
                                    className={`fa ${isVisible ? "fa-eye" : "fa-eye-slash"} password-icon`}
                                    style={ isVisible ? { color:'#198754'} : { color:'#999'}}
                                    onClick={this.toggleVisiblity}
                                />
                            </div>
                            <input type="submit" name="register" value="register" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;