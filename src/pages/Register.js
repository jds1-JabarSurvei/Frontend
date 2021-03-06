import { Component } from "react";
import { registerAPI } from "utils/axios";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emailValidator = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const handphoneNumberValidator = /[^0-9]/;
const usernameValidator = /[0-9]/;

class Register extends Component {
  state = {
    isVisible: false,
    email: "",
    HPNumber: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
    address: "",
    wrongPassword: false,
    wrongEmail: false,
    wrongConfirmPassword: false,
    wrongNumber: false,
    emailHasExisted: false,
    isSubmitted: false,
    submitSuccess: false,
  };

  registerFun = async () => {
    let result = await registerAPI(this.state.email, this.state.password, this.state.HPNumber, this.state.gender, this.state.address, this.state.birthday);
    if (result.data.error === "Email has been taken") {
      this.setState({ emailHasExisted: true });
    }
    else {
      if (result.data) {
        this.setState({ submitSuccess: true });
        document.getElementsByName("registerForm")[0].reset();
        toast.success('Account registered successfully!');
      }
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (
      //user mensubmit
      this.state.isSubmitted !== prevState.isSubmitted &&
      this.state.isSubmitted
    ) {
      if (
        //user mengisi data lengkap dan benar pada FE
        !this.state.wrongEmail &&
        !this.state.wrongPassword &&
        !this.state.wrongConfirmPassword &&
        !this.state.wrongUsername &&
        !this.state.wrongNumber
      ) {
        this.registerFun();
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
    this.setState({ username: value });

    if (usernameValidator.test(value) && value != "") {
      this.setState({ wrongUsername: true });
    } else {
      this.setState({ wrongUsername: false });
    }
  };

  handleNumber = (event) => {
    const value = event.target.value;
    this.setState({ HPNumber: value });

    if (handphoneNumberValidator.test(value) || (value.length > 12 || value.length < 10) && value != "") {
      this.setState({ wrongNumber: true });
    } else {
      this.setState({ wrongNumber: false });
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
    if (this.state.password != event.target.value && event.target.value != "") {
      this.setState({ wrongConfirmPassword: true });
    } else {
      this.setState({ wrongConfirmPassword: false });
    }
  };

  handleGender = (event) => {
    this.setState({ gender: event.target.value });
  }

  handleBirthday = (event) => {
    this.setState({ birthday: event.target.value });
  }

  handleAddress = (event) => {
    this.setState({ address: event.target.value });
  }

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

      <div className="row contentR">
        <div className="col-md-12 line"></div>
        <div className="col-md-6 fieldR">
          <h3 className="register-text mb-3">Daftar Akun Admin</h3><br></br>
          <form name="registerForm" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">
                Nama
                </label>
              <input
                type="text"
                data-testid="name_input"
                name="username"
                className="form-control"
                autoComplete="off"
                onChange={this.handleUsername}
                required
              />
              <h6 data-testid="name_validation" className="wrongR">
                {wrongUsername ? "Nama tidak boleh mengandung angka" : ""}
              </h6>
            </div>
            <div className="form-group">
              <label htmlFor="email"
              >
                Email
                </label>
              <input
                data-testid="email_input"
                type="text"
                name="email"
                className="form-control"
                autoComplete="off"
                onChange={this.handleEmail}
                required
              />
              <h6 data-testid="email_validation" className="wrongR">
                {wrongEmail ? "Email harus memiliki format yang benar" : ""}
              </h6>
              <h6 className="wrongR">
                {emailHasExisted ? "Email sudah digunakan" : ""}
              </h6>
            </div>
            <div className="form-group mb-3">
              <h6 className="mb-5" style={{ fontSize: "20px" }}>Tanggal Lahir</h6><br></br>
              <input data-testid="birthday_input" type="date" className="mt-2 mb-3"
                style={{ border: `1px solid #ced4da` }}
                id="birthdate" name="birthdate" onChange={this.handleBirthday} required></input>
            </div>

            <div className="form-group">
              <h6 style={{ fontSize: "20px" }}>Jenis Kelamin</h6><br></br>
              <div className="form-check form-check-inline">
                <input
                  data-testid="gender_input_male"
                  className="form-check-input mt-1 mr-5"
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  autoCorrect="off"
                  onChange={this.handleGender}
                  required
                />
                <label className="form-check-label mt-1 mr-5"
                  htmlFor="male"
                  style={{ fontSize: "16px" }}
                >Laki-laki
                  </label>
              </div>
              <div
                className="form-check form-check-inline"
              >
                <input
                  data-testid="gender_input_female"
                  className="form-check-input mt-1"
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  autoCorrect="off"
                  onChange={this.handleGender}
                />
                <label className="form-check-label mt-1"
                  style={{ fontSize: "16px" }}
                  htmlFor="female"
                >
                  Perempuan
                  </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="HPNumber"
              >
                No. Telepon
                </label>
              <input
                data-testid="telp_input"
                type="text"
                name="HPNumber"
                className="form-control"
                autoComplete="off"
                onChange={this.handleNumber}
                required
              />

              <h6 data-testid="telp_validation" className="wrongR">
                {wrongNumber ? "Nomor telepon tidak boleh mengandung huruf dan harus mengandung antara 10-12 angka" : ""}
              </h6>
            </div>
            <div className="form-group">
              <label htmlFor="alamat"
              >
                Alamat
                </label>
              <textarea
                data-testid="alamat_input"
                name="address"
                className="form-control"
                autoComplete="off"
                rows="3"
                onChange={this.handleAddress}
                required
              />

            </div>
            <div className="form-group">
              <label
                htmlFor="password"
              >
                Kata Sandi
                </label>
              <input
                data-testid="password_input"
                type={isVisible ? "text" : "password"}
                name="password"
                className="form-control"
                autoComplete="off"
                onChange={this.handlePassword}
                required
              />
              <h6 data-testid="password_validation" className="wrongR">
                {wrongPassword
                  ? "Kata sandi minimal berisi 8 karakter"
                  : ""}
              </h6>
            </div>
            <div className="form-group">
              <label
                htmlFor="confirm-password"
              >
                Konfirmasi Kata Sandi
                </label>
              <input
                data-testid="confirm_password_input"
                type={isVisible ? "text" : "password"}
                name="confirm-password"
                className="form-control"
                autoComplete="off"
                onChange={this.handleConfirmPassword}
                required
              />
              <h6 data-testid="confirm_password_validation" className="wrongR">
                {wrongConfirmPassword
                  ? "Kolom konfirmasi kata sandi harus sama dengan kata sandi"
                  : ""}
              </h6>
            </div>
            <input data-testid="submit_input" type="submit" className="mt-3" style={{ border: "none" }} name="register" value="Daftarkan Akun" />
          </form>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default Register;
