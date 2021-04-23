import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import APICall from 'utils/axios';
import { useHistory } from 'react-router-dom';
import * as uuid from "uuid";

export const NewSurveyContext = createContext();

export const useNewSurvey = () => {
    return useContext(NewSurveyContext);
}

const NewSurveyContextProvider = (props) => {
    const [isNewSurvey, setIsNewSurvey] = useState(true);
    const [activeSection, setActiveSection] = useState(-1);
    const [activeQuestion, setActiveQuestion] = useState(-1);
    const [fileImage, setFileImage] = useState(null);
    const [fileImageBE, setFileImageBE] = useState('');
    const [formTitle, setFormTitle] = useState('Judul Form');
    const [sections, setSections] = useState([]);
    const [editedFormID, setEditedFormID] = useState(-1);
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const fillQuestion = async (isNew, formId) => {
        if (!isNew) {
            setLoading(true);
            await APICall.get(`formQuestions/${formId}`)
                .then(response => {
                    let tempSections = [];
                    response.data.pertanyaan.forEach((section) => {
                        let tempSection = {};
                        tempSection.title = section.judul;
                        tempSection.description = section.deskripsi;
                        tempSection.questions = [];
                        section.pertanyaan.forEach(pertanyaan => {
                            let tempOption = []
                            if (pertanyaan.option.length > 0) {
                                pertanyaan.option.forEach(opt => {
                                    tempOption.push(opt.nilai)
                                })
                            }

                            let tempQuestion = {
                                id: uuid.v4(),
                                title: pertanyaan.pertanyaan,
                                description: pertanyaan.deskripsi,
                                required: pertanyaan.required,
                                type: pertanyaan.tipe,
                                options: tempOption,
                            }
                            tempSection.questions.push(tempQuestion);
                        });
                        tempSections.push(tempSection);
                    });
                    setSections(tempSections);
                    setFormTitle(response.data.judulForm);
                    setEditedFormID(formId);
                }).catch((err) => {
                    console.log(err)
                    toast.error('Error detected');
                })
            setLoading(false);
        } else {
            setSections([
                {
                    title: 'Judul',
                    description: 'Deskripsi',
                    questions: [
                        {
                            id: uuid.v4(),
                            type: 'short_answer',
                            title: 'Pertanyaan',
                            description: 'Question description',
                            required: false,
                            options: [],
                        },
                    ]
                },
                {
                    title: 'Judul',
                    description: 'Deskripsi',
                    questions: [
                        {
                            id: uuid.v4(),
                            type: 'paragraph',
                            title: 'Pertanyaan',
                            description: 'Question description',
                            required: true,
                            options: [],
                        },
                    ],
                }
            ]);
        }
        setIsNewSurvey(isNew);
    }

    const updateFileImage = event => {
        const file = event.target.files[0];
        if (file) {
            setFileImageBE(file);
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                setFileImage(result);
            }
            reader.readAsDataURL(file);
        }
    }

    const deleteFileImage = () => {
        setFileImage(null);
        setFileImageBE('');
    }

    const updateFormTitle = (e) => {
        setFormTitle(e.target.value);
    }

    const addSection = () => {
        let tempSections = [...sections];
        tempSections.splice(activeSection + 1, 0, {
            title: 'Judul',
            description: 'Deskripsi',
            questions: [
                {
                    id: uuid.v4(),
                    type: 'short_answer',
                    title: 'Pertanyaan',
                    description: 'Question description 2',
                    required: true,
                    options: [],
                },
            ],
        });
        setSections(tempSections);
        setActiveSection(activeSection + 1);
        setActiveQuestion(0);
        toast('Bagian Baru telah Ditambahkan');
    }

    const deleteSection = (sectionIdx) => {
        if (sections.length <= 1) {
            return;
        }
        let tempSections = [...sections];
        tempSections.splice(sectionIdx, 1);
        setSections(tempSections);
        toast.error('Bagian telah Dihapus');
    }

    const updateSection = (sectionIdx, newSection) => {
        let tempSections = [...sections];
        tempSections.splice(sectionIdx, 1, newSection);
        setSections(tempSections);
    }

    const addQuestion = () => {
        let tempSections = [...sections];
        tempSections[activeSection].questions.splice(activeQuestion + 1, 0, {
            id: uuid.v4(),
            type: 'short_answer',
            title: 'Pertanyaan',
            description: 'Question description 2',
            required: true,
            options: [],
        });
        setSections(tempSections);
        toast('Pertanyaan Baru telah Ditambahkan');
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
        if (isNewSurvey && !fileImageBE) {
            toast.error('Please upload your image');
            return;
        }
        // Untuk sementara, bakal ngetranslate dulu dari yang udah dibuat ke punya zaidan biar lebih cepat
        setLoading(true);
        let payload = {};
        let tempSections = [...sections];
        // const firstSection = tempSections[0];
        payload.user_id = "1";
        // payload.judulForm = firstSection.title;
        payload.judulForm = formTitle;
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
                        if (isNewSurvey) {
                            tempOption.push({ nilai: opt })
                        } else {
                            tempOption.push(opt);
                        }
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
        if (isNewSurvey) {
            await APICall.post('buatform', payload)
                .then(res => {

                    const formData = new FormData();
                    formData.append('file', fileImageBE);
                    formData.append('name', formTitle);
                    formData.append('id_form', res.data.id_form);

                    APICall.post('upload', formData)
                        .then(res => {
                            // console.log(res);
                            history.push('/admin');
                            toast.success('Successfully added new form!');
                        })
                        .catch(() => {
                            toast.error('Terdapat beberapa kesalahan. Silakan coba lagi nanti');
                        });


                }).catch(() => {
                    toast.error('Terdapat beberapa kesalahan. Silakan coba lagi nanti');
                })
        } else {
            payload.id_form = editedFormID;
            console.log(payload);
            await APICall.post('editform', payload)
                .then(() => {
                    history.push('/admin');
                    toast.success('Successfully edited form!');

                }).catch(() => {
                    toast.error('Terdapat beberapa kesalahan. Silakan coba lagi nanti');
                })
            setEditedFormID(-1);
        }

        setLoading(false);

    }

    const value = {
        isNewSurvey,
        fileImage,
        formTitle,
        sections,
        activeSection,
        activeQuestion,
        loading,
        fillQuestion,
        updateFileImage,
        deleteFileImage,
        updateFormTitle,
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