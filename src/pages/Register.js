import { Component } from "react";
import { registerAPI } from "utils/axios";
import "./style.css";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const handphoneNumberValidator = /[^0-9]/;
const usernameValidator = /[0-9]/;
// const validator untuk tanggal lahir misal februari g mungkin >28

class Register extends Component {
  state = {
    isVisible: false,
    username: "",
    email: "",
    HPNumber: "",
    password: "",
    confirmPassword: "",
    wrongPassword: false,
    wrongEmail: false,
    wrongConfirmPassword: false,
    wrongUsername: false,
    wrongNumber: false,
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
        !this.state.wrongConfirmPassword &&
        !this.state.wrongUsername &&
        !this.state.wrongNumber
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

  handleUsername = (event) => {
    const value = event.target.value;
    this.setState({username: value});

    if (usernameValidator.test(value) && value != ""){
      this.setState({wrongUsername: true});
    } else {
      this.setState({wrongUsername: false});
    }
  };
  
  handleNumber = (event) => {
    const value = event.target.value;
    this.setState({HPNumber: value});

    if (handphoneNumberValidator.test(value) || (value.length>12 || value.length<10) && value !=""){
      this.setState({wrongNumber: true});
    } else{
      this.setState({wrongNumber: false});
    }
  }

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
      if (password.length >= 8) {
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
      wrongNumber,
      wrongUsername,
      emailHasExisted,
      submitSuccess,
    } = this.state;
    return (
      <div className="container">
        <div className="row content">
          <div className="col-md-12 line"></div>
          <div className="col-md-6 field">
            <h3 className="register-text mb-3">Daftar Akun Admin</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  onChange={this.handleUsername}
                  style={wrongUsername ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="username" 
                  style={wrongUsername ? { color: `red` } : {}}
                  >
                  Nama
                </label>
                <h6 className="wrong">
                  {wrongUsername ? "Nama tidak boleh mengandung angka" : ""}
                </h6>
              </div>
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
                  {wrongEmail ? "Email harus memiliki format yang benar" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email sudah digunakan" : ""}
                </h6>
              </div>
              <div className="form-group">
                <label for="birthdate">
                  Tanggal Lahir
                </label>
                <input type="date" id="birthdate" name="birthdate"></input>
              </div>
              <div className="form-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  autoComplete="off"
                  required
                />
                <label for="male" 
                  >
                  Laki-laki
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  autoComplete="off"
                  required
                />
                <label for="female" 
                  >
                  Perempuan
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="HPNumber"
                  autoComplete="off"
                  onChange={this.handleNumber}
                  style={wrongNumber ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="HPNumber" 
                  style={wrongNumber ? { color: `red` } : {}}
                  >
                  No. Telepon
                </label>
                <h6 className="wrong">
                  {wrongNumber ? "Nomor telepon tidak boleh mengandung huruf dan harus mengandung antara 10-12 angka" : ""}
                </h6>
              </div>              
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  autoComplete="off"
                  required
                />
                <label for="alamat" 
                >
                  Alamat
                </label>
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
                  Kata Sandi
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
                    ? "Kata sandi minimal berisi 8 karakter"
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
                  Konfirmasi Kata Sandi
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
                    ? "Kolom konfirmasi kata sandi harus sama dengan kata sandi"
                    : ""}
                </h6>
              </div>
              <input type="submit" name="register" value="Daftarkan Akun" />
              <h6 className="wrong">
                {submitSuccess ? "Akun berhasil didaftarkan" : ""}
              </h6>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
