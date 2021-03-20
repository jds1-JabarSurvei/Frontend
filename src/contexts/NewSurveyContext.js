import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APICall from 'utils/axios';
import { useHistory } from 'react-router-dom';

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
                    type: 'short_answer',
                    title: 'Short Question',
                    description: 'Question description',
                    required: false,
                    options: [],
                },
            ]
        },
        {
            title: 'Untitled Section',
            description: 'Section Description',
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
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const addSection = () => {
        let tempSections = [...sections];
        tempSections.splice(activeSection + 1, 0, {
            title: 'New Section',
            description: 'Section Description',
            questions: [
                {
                    type: 'short_answer',
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
            type: 'short_answer',
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

    const submitForm = async () => {
        // Untuk sementara, bakal ngetranslate dulu dari yang udah dibuat ke punya zaidan biar lebih cepat
        setLoading(true);
        let payload = {};
        let tempSections = [...sections];
        const firstSection = tempSections[0];
        payload.user_id = "1";
        payload.judulForm = firstSection.title;
        payload.bagian = [];
        tempSections.forEach(section => {
            let tempBagian = {};
            tempBagian.judul = section.title;
            tempBagian.deskripsi = section.description;
            tempBagian.pertanyaan = [];
            section.questions.forEach((question, idx) => {
                let tempOption = []
                if (question.options.length > 0) {
                    question.options.forEach(opt => {
                        tempOption.push({ nilai: opt })
                    })
                }
                let tempPertanyaan = {
                    pertanyaan: question.title,
                    deskripsi: question.description ? question.description : '',
                    required: question.required ? "1" : "0",
                    urutan: (idx + 1).toString(),
                    tipe: question.type,
                    option: tempOption,
                }
                tempBagian.pertanyaan.push(tempPertanyaan);
            });
            payload.bagian.push(tempBagian);
        });
        await APICall.post('buatform', payload)
            .then(res => {
                history.push('/admin');
                toast.success('Successfully added new form!');
            }).catch(() => {
                toast.error('Some error occured. Please try again later');
            }).finally(() => {
                setLoading(false);
            })
    }

    const value = {
        sections,
        activeSection,
        activeQuestion,
        loading,
        addSection,
        deleteSection,
        updateSection,
        updateActiveQuestion,
        addQuestion,
        deleteQuestion,
        updateQuestion,
        submitForm
    }

    return (
        <NewSurveyContext.Provider value={value}>
            {props.children}
        </NewSurveyContext.Provider>
    )
}

export default NewSurveyContextProvider;