import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const NewSurveyContext = createContext();

export const useNewSurvey = () => {
    return useContext(NewSurveyContext);
}

const NewSurveyContextProvider = (props) => {
    const [activeSection, setActiveSection] = useState(-1);
    const [activeQuestion, setActiveQuestion] = useState(-1);
    const [sections, setSections] = useState([
        {
            title: 'Untitled Form',
            description: 'Form Description -> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
            questions: [
                {
                    type: 'address',
                    title: 'Address Question',
                    description: 'Question description',
                    required: false,
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
                },
                {
                    type: 'radio',
                    title: 'Radio Question',
                    description: 'Question description 2',
                    required: true,
                    options: [
                        'Option A',
                        'Option B',
                    ]
                },
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
        toast('New Section Added');
    }

    const deleteSection = (sectionIdx) => {
        if (sections.length <= 1) {
            return;
        }
        let tempSections = [...sections];
        tempSections.splice(sectionIdx, 1);
        setSections(tempSections);
        toast.error('Section deleted');
    }

    const updateSection = (sectionIdx, newSection) => {
        let tempSections = [...sections];
        tempSections.splice(sectionIdx, 1, newSection);
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
        toast('New Question Added');
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

    const updateQuestion = (sectionIdx, questionIdx, newQuestion) => {
        let tempSections = [...sections];
        tempSections[sectionIdx].questions.splice(questionIdx, 1, newQuestion);
        setSections(tempSections);
    }

    const value = {
        sections,
        activeSection,
        activeQuestion,
        addSection,
        deleteSection,
        updateSection,
        updateActiveQuestion,
        addQuestion,
        deleteQuestion,
        updateQuestion,
    }

    return (
        <NewSurveyContext.Provider value={value}>
            {props.children}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </NewSurveyContext.Provider>
    )
}

export default NewSurveyContextProvider;