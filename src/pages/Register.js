import { Component } from "react";
import { registerAPI } from "utils/axios";
import "./style.css";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends Component {
  state = {
    isVisible: false,
    email: "",
    password: "",
    confirmPassword: "",
    wrongPassword: false,
    wrongEmail: false,
    wrongConfirmPassword: false,
    emailHasExisted: false,
    isSubmitted: false,
    submitSuccess: false,
  };

  componentDidUpdate(_prevProps, prevState) {
    if (
      this.state.isSubmitted !== prevState.isSubmitted &&
      this.state.isSubmitted
    ) {
      if (
        !this.state.wrongEmail &&
        !this.state.wrongPassword &&
        !this.state.wrongConfirmPassword
      ) {
        registerAPI(this.state.email, this.state.password).then((result) => {
          console.log(result.data);
          if (result.data.success) {
            this.setState({ submitSuccess: true });
          } else if (result.data.error === "Email has been taken") {
            this.setState({ emailHasExisted: true });
          }
        });
      }
      this.setState({ isSubmitted: false });
    }
  }

  toggleVisiblity = () => {
    const { isVisible } = this.state;
    this.setState({ isVisible: !isVisible });
  };

  handleEmail = (event) => {
    const value = event.target.value;
    this.setState({ email: value });

    if (!emailValidator.test(value) && value != "") {
      this.setState({ wrongEmail: true });
    } else {
      this.setState({ wrongEmail: false });
    }
  };

  handlePassword = (event) => {
    this.setState({ password: event.target.value });
    this.setState({ wrongPassword: false });
  };

  handleConfirmPassword = (event) => {
    this.setState({ confirmPassword: event.target.value });
    if (this.state.password != event.target.value) {
      this.setState({ wrongConfirmPassword: true });
    } else {
      this.setState({ wrongConfirmPassword: false });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, confirmPassword } = this.state;
    if (password != "") {
      // VALIDASINYA DISINI
      if (password.length >= 8) {
        //Login
        this.setState({ wrongPassword: false });
      } else {
        this.setState({ wrongPassword: true });
      }
    } else {
      this.setState({ wrongPassword: false });
    }
    if (confirmPassword != password) {
      this.setState({ wrongConfirmPassword: true });
    } else {
      this.setState({ wrongConfirmPassword: false });
    }
    this.setState({ submitSuccess: false });
    this.setState({ isSubmitted: true });
    this.setState({ emailHasExisted: false });
  };

  render() {
    const {
      isVisible,
      wrongPassword,
      wrongEmail,
      wrongConfirmPassword,
      emailHasExisted,
      submitSuccess,
    } = this.state;
    return (
      <div className="container">
        <div className="row content">
          <div className="col-md-12 line"></div>
          <div className="col-md-6 field">
            <h3 className="register-text mb-3">Register</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  onChange={this.handleEmail}
                  style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="email" style={wrongEmail ? { color: `red` } : {}}>
                  Email
                </label>
                <h6 className="wrong">
                  {wrongEmail ? "Email must be a valid email" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email has been used" : ""}
                </h6>
              </div>
              <div className="form-group">
                <input
                  type={isVisible ? "text" : "password"}
                  name="password"
                  autoComplete="off"
                  style={wrongPassword ? { borderBottom: `2px solid red` } : {}}
                  onChange={this.handlePassword}
                  required
                />
                <label
                  for="password"
                  style={wrongPassword ? { color: `red` } : {}}
                >
                  Password
                </label>
                <i
                  className={`fa ${
                    isVisible ? "fa-eye" : "fa-eye-slash"
                  } password-icon`}
                  style={
                    isVisible
                      ? wrongPassword
                        ? { color: "red" }
                        : { color: "#198754" }
                      : { color: "#999" }
                  }
                  onClick={this.toggleVisiblity}
                />
                <h6 className="wrong">
                  {wrongPassword
                    ? "Password must consist of at least 8 character"
                    : ""}
                </h6>
              </div>
              <div className="form-group">
                <input
                  type={isVisible ? "text" : "password"}
                  name="confirm-password"
                  autoComplete="off"
                  style={
                    wrongConfirmPassword
                      ? { borderBottom: `2px solid red` }
                      : {}
                  }
                  onChange={this.handleConfirmPassword}
                  required
                />
                <label
                  for="confirm-password"
                  style={wrongConfirmPassword ? { color: `red` } : {}}
                >
                  Confirm Password
                </label>
                <i
                  className={`fa ${
                    isVisible ? "fa-eye" : "fa-eye-slash"
                  } password-icon`}
                  style={
                    isVisible
                      ? wrongConfirmPassword
                        ? { color: "red" }
                        : { color: "#198754" }
                      : { color: "#999" }
                  }
                  onClick={this.toggleVisiblity}
                />
                <h6 className="wrong">
                  {wrongConfirmPassword
                    ? "confirm password must equal to password"
                    : ""}
                </h6>
              </div>
              <input type="submit" name="register" value="register" />
              <h6 className="wrong">
                {submitSuccess ? "Account is successfully registered" : ""}
              </h6>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
