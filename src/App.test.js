import { render, screen, cleanup, waitForElement } from '@testing-library/react';
import Login from './pages/Login';
import userEvent from "@testing-library/user-event";
import Homepage from './pages/Homepage'
import Register from './pages/Register';
import SurveyEditPage from './pages/admin/SurveyEditPage';
import { Route, BrowserRouter } from 'react-router-dom';

test('Login Page', () => {
  render(<Login />);
  //Cek masing-masing field udah ada di page
  const emailInput = screen.getByTestId('email_input')
  expect(emailInput).toBeInTheDocument();
  const emailValidationMessage = screen.getByTestId('email_validation_message')
  expect(emailValidationMessage).toBeInTheDocument();

  //Cek salah format email
  userEvent.type(emailInput, 'sasasaa')
  expect(emailInput).toHaveValue('sasasaa')
  expect(emailValidationMessage).toHaveTextContent("Email tidak valid")

});

test('Home Page User', () =>{
  render(<Homepage/>);
  // carousel
  const search = screen.getByPlaceholderText("Cari Survei")
  expect(search).toBeInTheDocument();
  // survey list
  const tanggalMenaik = screen.getByText("Tanggal Menaik")
  expect(tanggalMenaik).toBeInTheDocument();
  const tanggalMenurun = screen.getByText("Tanggal Menurun")
  expect(tanggalMenurun).toBeInTheDocument();
  const abjadMenaik = screen.getByText("Abjad Menaik")
  expect(abjadMenaik).toBeInTheDocument();
  const abjadMenurun = screen.getByText("Abjad Menurun")
  expect(abjadMenurun).toBeInTheDocument();
  const list = screen.getByLabelText("list")
  expect(list).toBeInTheDocument();
  const card = screen.getByLabelText("module")
  expect(card).toBeInTheDocument();
  const loading = screen.getByText("Loading...")
  expect(loading).toBeInTheDocument();
});

test('Register Page', () => {
  render(<Register />);
  //Cek masing-masing field udah ada di page
  const nameInput = screen.getByTestId('name_input')
  const nameInputValidation = screen.getByTestId('name_validation')
  const emailInput = screen.getByTestId('email_input')
  const emailInputValidation = screen.getByTestId('email_validation')
  const birthdayInput = screen.getByTestId('birthday_input')
  const genderInputMale = screen.getByTestId('gender_input_male')
  const genderInputFemale = screen.getByTestId('gender_input_female')
  const telpInput = screen.getByTestId('telp_input')
  const telpValidation = screen.getByTestId('telp_validation')
  const alamatInput = screen.getByTestId('alamat_input')
  const passwordInput = screen.getByTestId('password_input')
  const passwordValidation = screen.getByTestId('password_validation')
  const confirmPasswordInput = screen.getByTestId('confirm_password_input')
  const confirmPasswordValidationInput = screen.getByTestId('confirm_password_validation')
  const submitInput = screen.getByTestId('submit_input')

  expect(nameInput).toBeInTheDocument();
  expect(nameInputValidation).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(emailInputValidation).toBeInTheDocument();
  expect(birthdayInput).toBeInTheDocument();
  expect(genderInputMale).toBeInTheDocument();
  expect(genderInputFemale).toBeInTheDocument();
  expect(telpInput).toBeInTheDocument();
  expect(telpValidation).toBeInTheDocument();
  expect(alamatInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(passwordValidation).toBeInTheDocument();
  expect(confirmPasswordInput).toBeInTheDocument();
  expect(confirmPasswordValidationInput).toBeInTheDocument();
  expect(submitInput).toBeInTheDocument();


  //Cek salah format nama
  userEvent.type(nameInput, '1213asjasha')
  expect(nameInput).toHaveValue('1213asjasha')
  expect(nameInputValidation).toHaveTextContent("Nama tidak boleh mengandung angka")
  //Cek salah format email
  userEvent.type(emailInput, '1213asjasha')
  expect(emailInput).toHaveValue('1213asjasha')
  expect(emailInputValidation).toHaveTextContent("Email harus memiliki format yang benar")
  //Cek salah format telepon
  userEvent.type(telpInput, 'adasdaeadda')
  expect(telpInput).toHaveValue('adasdaeadda')
  expect(telpValidation).toHaveTextContent("Nomor telepon tidak boleh mengandung huruf dan harus mengandung antara 10-12 angka")

});

test('Edit Page', () => {
  render(
    <BrowserRouter>
      <Route path="/admin/survey/edit/:id">
        <SurveyEditPage />
      </Route>
    </BrowserRouter>,
    {
      route: '/admin/survey/edit/89',
    }
  );
  //Cek masing-masing field ada di page
  // const surveyContent = screen.getByTestId('survey_content')
  // expect(surveyContent).toBeInTheDocument();
  
});