import { render, screen, cleanup, waitForElement } from '@testing-library/react';
import Login from './pages/Login';
import userEvent from "@testing-library/user-event";

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


