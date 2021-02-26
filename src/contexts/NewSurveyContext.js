import React, { createContext, useContext, useState } from 'react';

export const NewSurveyContext = createContext();

export const useNewSurvey = () => {
    return useContext(NewSurveyContext);
}

const NewSurveyContextProvider = (props) => {
    const [questions, setQuestions] = useState([
        {
            title: 'Untitled Form',
            description: 'Form Description -> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
            questions: [
                {
                    type: 'paragraph',
                    title: 'Long Question',
                    description: 'Question description',
                    required: true,
                    options: [],
                },
                {
                    type: 'short',
                    title: 'Short Question',
                    description: 'Question description 2',
                    required: true,
                    options: [],
                },
                {
                    type: 'checkbox',
                    title: 'Checkbox Question',
                    description: '',
                    required: true,
                    options: [
                        'Option A',
                        'Option B',
                    ]
                }
            ]
        }
    ]);

    const value = {
        questions,
    }

    return (
        <NewSurveyContext.Provider value={value}>
            {props.children}
        </NewSurveyContext.Provider>
    )
}

export default NewSurveyContextProvider;