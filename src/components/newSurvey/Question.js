import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import Short from './questionTypes/Short';
import Paragraph from './questionTypes/Paragraph';
import MultipleAnswer from './questionTypes/MultipleAnswer';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import {
    Switch,
} from 'antd';


const Question = ({ question, sectionIdx, questionIdx }) => {
    const { activeSection, activeQuestion, updateActiveQuestion, deleteQuestion, updateQuestion } = useNewSurvey();
    const questionComponents = {
        short: Short,
        paragraph: Paragraph,
        checkbox: MultipleAnswer,
        radio: MultipleAnswer,
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
        let newQuestion = { ...question };
        newQuestion.type = e.target.value;
        newQuestion.options = ['Option A'];

        updateQuestion(sectionIdx, questionIdx, newQuestion);
    }

    const isActive = () => {
        return activeSection === sectionIdx && activeQuestion === questionIdx;
    }

    let RenderedQuestion = questionComponents[question.type];
    return (
        <div className={isActive() ? "question-container active-question" : "question-container"} onClick={toggleActive}>
            {isActive() ?
                <>
                    <ToolBar />
                    <div className="edit-question">
                        <input type="text" defaultValue={question.title} onBlur={updateTitle} />
                        <select defaultValue={question.type} onChange={updateType}>
                            {Object.keys(questionComponents).map(type => {
                                return (
                                    <option value={type} key={type}>{type}</option>
                                )
                            })}
                        </select>
                    </div>
                </>
                : <div className="question-title">{question.title}</div>
            }

            <RenderedQuestion question={question} sectionIdx={sectionIdx} questionIdx={questionIdx} />
            <hr />
            <div className="question-setting">
                <div className='delete-icon' onClick={onDelete}><FontAwesomeIcon
                    color="#5F6368"
                    icon={faTrash}
                /></div>
                <div className='required'>Required</div>
                <div className='slider'>
                    <Switch defaultChecked={question} />
                </div>
                <div className='additional-settings'>I</div>
            </div>
        </div>
    );
}

export default Question;