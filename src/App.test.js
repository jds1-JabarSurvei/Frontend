import { render, screen, cleanup, waitForElement } from '@testing-library/react';
import Login from './pages/Login';
import userEvent from "@testing-library/user-event";
import Homepage from './pages/Homepage'

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