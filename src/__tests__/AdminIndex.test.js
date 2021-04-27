import { render, screen, cleanup, waitForElementToBeRemoved, fireEvent } from '@testing-library/react';
import SurveyList from 'components/user/SurveyList';
import APICall from 'utils/axios';
import AuthContextProvider, { useAuth } from 'contexts/AuthContext';
import userEvent from "@testing-library/user-event";

const mockSurveyList = [
    {
        "id": 84,
        "title": "Survei Hewan Peliharaan",
        "owner": "user",
        "image": {
            "name": "Survei Hewan Peliharaan",
            "path": "/images/2b113BqhpZTRCOcZkpQmvQueTWXtcbbH8R4PxxE7diRMoByiM2gZ7by.jpg"
        },
        "time": 1618354607
    },
    {
        "id": 87,
        "title": "Judul Form Baru",
        "owner": "user",
        "image": {
            "name": "Judul Form",
            "path": "/images/2b11Cp9KuPja9CpnpmXZQbGTCOy64i687CMgjd2PQjsPS5uStwymppbu.jpg"
        },
        "time": 1618413336
    }
];

beforeEach(() => {
    APICall.get = jest.fn(() => Promise.resolve({ data: mockSurveyList }));

})

test('Login Page', async () => {
    const { getByText, getByTestId, getAllByTestId } = render(
        <AuthContextProvider>
            <SurveyList isAdmin={true} />
        </AuthContextProvider>
    );
    await waitForElementToBeRemoved(() => getByText('Loading...'));

    // Test Sorting
    const sortSurveySelect = getByTestId('sort_survey_select');
    expect(sortSurveySelect).toBeInTheDocument();
    expect(getAllByTestId('survey_card')[0]).toHaveTextContent('Judul Form Baru');

    fireEvent.change(sortSurveySelect, { target: { value: "alphabetDescending" } });
    expect(getAllByTestId('survey_card')[0]).toHaveTextContent('Survei Hewan Peliharaan');

    fireEvent.change(sortSurveySelect, { target: { value: "alphabetAscending" } });
    expect(getAllByTestId('survey_card')[0]).toHaveTextContent('Judul Form Baru');

    fireEvent.change(sortSurveySelect, { target: { value: "timestampAscending" } });
    expect(getAllByTestId('survey_card')[0]).toHaveTextContent('Survei Hewan Peliharaan');

    fireEvent.change(sortSurveySelect, { target: { value: "timestampDescending" } });
    expect(getAllByTestId('survey_card')[0]).toHaveTextContent('Judul Form Baru');

    // Change Survey View
    const surveyViewListButton = getByTestId('survey_view_list_button');
    fireEvent.click(surveyViewListButton);
    expect(getAllByTestId('survey_table')[0]).toBeInTheDocument();
    expect(getByTestId('survey_table_add')).toBeInTheDocument();

    const surveyViewModuleButton = getByTestId('survey_view_module_button');
    fireEvent.click(surveyViewModuleButton);
    expect(getAllByTestId('survey_card')[0]).toBeInTheDocument();
    expect(getByTestId('survey_card_add')).toBeInTheDocument();
    // screen.debug();
    //Cek masing-masing field udah ada di page
    // const emailInput = screen.getByTestId('email_input')
    // expect(emailInput).toBeInTheDocument();
    // const emailValidationMessage = screen.getByTestId('email_validation_message')
    // expect(emailValidationMessage).toBeInTheDocument();

    // //Cek salah format email
    // userEvent.type(emailInput, 'sasasaa')
    // expect(emailInput).toHaveValue('sasasaa')
    // expect(emailValidationMessage).toHaveTextContent("Email tidak valid")

});