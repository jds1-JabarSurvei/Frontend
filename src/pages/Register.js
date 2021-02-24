import { Component } from "react";
import { registerAPI } from "utils/axios";
import "./style.css";

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const handphoneNumberValidator = 
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
            <h3 className="register-text mb-3">Daftar Akun Admin</h3>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  autoComplete="off"
                  // onChange={this.handleEmail}
                  // style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="username" 
                  // style={wrongEmail ? { color: `red` } : {}}
                  >
                  Nama Pengguna
                </label>
                {/* <h6 className="wrong">
                  {wrongEmail ? "Email must be a valid email" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email has been used" : ""}
                </h6> */}
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
                <input
                  type="text"
                  name="HPNumber"
                  autoComplete="off"
                  // onChange={this.handleEmail}
                  // style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="HPNumber" 
                  // style={wrongEmail ? { color: `red` } : {}}
                  >
                  No. Telepon
                </label>
                {/* <h6 className="wrong">
                  {wrongEmail ? "Email must be a valid email" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email has been used" : ""}
                </h6> */}
              </div>
              {/* <form>
  <input type="radio" id="male" name="gender" value="male">
  <label for="male">Male</label><br>
  <input type="radio" id="female" name="gender" value="female">
  <label for="female">Female</label><br>
  <input type="radio" id="other" name="gender" value="other">
  <label for="other">Other</label>
</form> */}
              <div className="form-group">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  autoComplete="off"
                  // onChange={this.handleEmail}
                  // style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="male" 
                  // style={wrongEmail ? { color: `red` } : {}}
                  >
                  Laki-laki
                </label>
                {/* <h6 className="wrong">
                  {wrongEmail ? "Email must be a valid email" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email has been used" : ""}
                </h6> */}
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  autoComplete="off"
                  // onChange={this.handleEmail}
                  // style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="female" 
                  // style={wrongEmail ? { color: `red` } : {}}
                  >
                  Perempuan
                </label>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  autoComplete="off"
                  // onChange={this.handleEmail}
                  // style={wrongEmail ? { borderBottom: `2px solid red` } : {}}
                  required
                />
                <label for="alamt" 
                // style={wrongEmail ? { color: `red` } : {}}
                >
                  Alamat
                </label>
                {/* <h6 className="wrong">
                  {wrongEmail ? "Email must be a valid email" : ""}
                </h6>
                <h6 className="wrong">
                  {emailHasExisted ? "Email has been used" : ""}
                </h6> */}
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
