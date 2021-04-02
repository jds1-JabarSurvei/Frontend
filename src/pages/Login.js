import { Component } from 'react';
import './style.css';
import { AuthContext } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import Logo from 'assets/images/logo_jds.png';
import illustration from 'assets/images/illustration.png';
import intersect from 'assets/images/Intersect.png';
const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Login extends Component {
    state = {
        isVisible: false,
        email: "",
        password: "",
        wrongPassword: false,
        wrongEmail: false
    }

    static contextType = AuthContext;


    toggleVisiblity = () => {
        const { isVisible } = this.state;
        this.setState({ isVisible: !isVisible });
    };

    handlePassword = event => {
        this.setState({ password: event.target.value });
        this.setState({ wrongPassword: false });
    };

    handleEmail = event => {
        const value = event.target.value;
        this.setState({ email: value });

        if (!emailValidator.test(value) && value != "") {
            this.setState({ wrongEmail: true });
        } else {
            this.setState({ wrongEmail: false });
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        if (password != "") {
            // VALIDASINYA DISINI
            let loginStatus = await this.context.login(email, password);
            if (!loginStatus) {
                this.setState({ wrongPassword: true });
            }
        } else {
            this.setState({ wrongPassword: false });
        }
    };

    render() {
        if (this.context.currentUser) {
            this.props.history.push('/admin');
        }

        const { isVisible, wrongPassword, wrongEmail } = this.state;
        return (
            <div className="login m-0">
                <div className="container login-logo">
                    <a href="/">
                        <img src={Logo} alt="" width={100} />
                    </a>
                </div>
                <div className="illustration">
                    <img src={illustration} />
                </div>
                <div className="login-container">
                <div className="field login-card shadow" style={{zIndex:"2", position:"relative", backgroundColor:"white"}}>
                    <form className="login-form" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" name="email" autoComplete="off" onChange={this.handleEmail} style={wrongEmail ? { borderBottom: `2px solid #A20E0E` } : {}} required />
                            <label htmlFor="email" style={wrongEmail ? { color: `#A20E0E` } : {}}>Email</label>
                            <h6 className="wrong">{wrongEmail ? "Email tidak valid" : ""}</h6>
                        </div>
                        <div className="form-group">
                            <input type={isVisible ? "text" : "password"} name="password" autoComplete="off" style={wrongPassword ? { borderBottom: `2px solid #A20E0E` } : {}} onChange={this.handlePassword} required />
                            <label htmlFor="password" style={wrongPassword ? { color: `#A20E0E` } : {}}>Kata Sandi</label>
                            <i
                                className={`fa ${isVisible ? "fa-eye" : "fa-eye-slash"} password-icon`}
                                style={isVisible ? (wrongPassword ? { color: '#A20E0E' } : { color: '#198754' }) : { color: '#999' }}
                                onClick={this.toggleVisiblity}
                            />
                            <h6 className="wrong">{wrongPassword ? "Kata sandi salah" : ""}</h6>
                        </div>
                        <button disabled={this.context.loading || wrongEmail } type="submit" class="btn" style={{background:"var(--green)", color:"white", width:"100%", padding:"10px 0"}}>
                            {
                                this.context.loading ?
                                    <div class="spinner-border spinner-border-sm text-light" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                </div> :
                                "Masuk"
                            }
                        </button>
                    </form>
                </div>
                <div className="intersect" style={{position:"absolute", bottom:"0", right:"0", zIndex:"1"}}>
                    <img src={intersect} />
                </div>
                </div>
            </div>
        );
    }
}

export default Login;