import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import Short from './questionTypes/Short';
import Paragraph from './questionTypes/Paragraph';
import MultipleAnswer from './questionTypes/MultipleAnswer';
import LinearScale from './questionTypes/LinearScale';
import Address from './questionTypes/Address';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import { capitalizeFirstLetter } from 'utils/typography';
import Switch from "react-switch";



const Question = ({ question, sectionIdx, questionIdx }) => {
    const { activeSection, activeQuestion, updateActiveQuestion, deleteQuestion, updateQuestion } = useNewSurvey();
    const questionComponents = {
        short_answer: Short,
        paragraph: Paragraph,
        checkbox: MultipleAnswer,
        radio: MultipleAnswer,
        // linear: LinearScale,
        alamat: Address
    }

    const toggleActive = () => {
        updateActiveQuestion(sectionIdx, questionIdx);
    }

    const onDelete = () => {
        deleteQuestion(sectionIdx, questionIdx);
    }

    const updateTitle = (e) => {
        let newQuestion = { ...question };
        newQuestion.title = e.target.value;

        updateQuestion(sectionIdx, questionIdx, newQuestion);
    }

    const updateType = (e) => {
        console.log(e.target.value)
        let newQuestion = { ...question };
        newQuestion.type = e.target.value;
        newQuestion.options = ['Option A'];

        updateQuestion(sectionIdx, questionIdx, newQuestion);
    }

    const updateRequired = (checked) => {
        let newQuestion = { ...question };
        newQuestion.required = checked;

        updateQuestion(sectionIdx, questionIdx, newQuestion);
    }

    const isActive = () => {
        return activeSection === sectionIdx && activeQuestion === questionIdx;
    }

    let RenderedQuestion = questionComponents[question.type];
    return (
        <div className={isActive() ? "question-container-new active-question-new shadow" : "question-container-new"} onClick={toggleActive}>
            {isActive() ?
                <>

                    <div className="edit-question-new">
                        <div className="input-text-box input-question">
                            <input className="input-text-new" type="text" defaultValue={question.title} onBlur={updateTitle} />
                            <span className="focus-border"></span>
                        </div>
                        <select className="form-select mx-auto" defaultValue={question.type} onChange={updateType}>
                            {Object.keys(questionComponents).map(type => {
                                return (
                                    <option className="m-3" value={type} key={type}>
                                        {capitalizeFirstLetter(type).replace('_answer', '')}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </>
                : <div className="question-title-new">{question.title}</div>
            }

            <RenderedQuestion question={question} sectionIdx={sectionIdx} questionIdx={questionIdx} />
            {isActive() ?
                <>
                    <hr />
                    <div className="question-setting-new">
                        <div className='question-icon-new' onClick={onDelete}><FontAwesomeIcon
                            color="#5F6368"
                            icon={faTrash}
                        /></div>
                        <div className='required-new'>Required</div>
                        <div className='slider-new'>
                            <Switch
                                onChange={updateRequired}
                                checked={question.required}
                                checkedIcon={false}
                                uncheckedIcon={false}
                                onColor='#399F4F'
                            />
                        </div>
                        <div className='additional-settings-new'>
                            <div className='question-icon-new'><FontAwesomeIcon
                                color="#5F6368"
                                icon={faEllipsisV}
                            /></div>
                        </div>
                    </div>
                    <ToolBar />
                </>
                : null}
        </div>
    );
}

export default Question;