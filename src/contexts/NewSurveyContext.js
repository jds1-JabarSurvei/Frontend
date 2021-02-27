import React, { createContext, useContext, useState } from 'react';

export const NewSurveyContext = createContext();

export const useNewSurvey = () => {
    return useContext(NewSurveyContext);
}

const NewSurveyContextProvider = (props) => {
    const [activeSection, setActiveSection] = useState(0);
    const [activeQuestion, setActiveQuestion] = useState(-1);
    const [sections, setSections] = useState([
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
        },
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
            ],
        }
    ]);

    const addSection = () => {
        let tempSections = [...sections];
        tempSections.splice(activeSection + 1, 0, {
            title: 'New Section',
            description: 'Section Description',
            questions: [
                {
                    type: 'short',
                    title: 'Short Question',
                    description: 'Question description 2',
                    required: true,
                    options: [],
                },
            ],
        });
        setSections(tempSections);
    }

    const deleteSection = (sectionIdx) => {
        if (sections.length <= 1) {
            return;
        }
        let tempSections = [...sections];
        tempSections.splice(sectionIdx, 1);
        setSections(tempSections);
    }

    const addQuestion = () => {
        let tempSections = [...sections];
        tempSections[activeSection].questions.splice(activeQuestion + 1, 0, {
            type: 'short',
            title: 'Inserted Question',
            description: 'Question description 2',
            required: true,
            options: [],
        });
        setSections(tempSections);
    }

    const deleteQuestion = (sectionIdx, questionIdx) => {
        let tempSections = [...sections];
        tempSections[sectionIdx].questions.splice(questionIdx, 1);
        setSections(tempSections);
    }

    const updateActiveQuestion = (sectionIdx, questionIdx) => {
        setActiveSection(sectionIdx);
        setActiveQuestion(questionIdx);
    }

    const value = {
        sections,
        activeSection,
        activeQuestion,
        addSection,
        deleteSection,
        updateActiveQuestion,
        addQuestion,
        deleteQuestion
    }

    return (
        <NewSurveyContext.Provider value={value}>
            {props.children}
        </NewSurveyContext.Provider>
    )
}

export default NewSurveyContextProvider;