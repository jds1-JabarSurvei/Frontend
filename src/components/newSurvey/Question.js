import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import ToolBar from './ToolBar';
import Short from './questionTypes/Short';
import Paragraph from './questionTypes/Paragraph';
import Checkbox from './questionTypes/Checkbox';
import { useNewSurvey } from 'contexts/NewSurveyContext';


const Question = ({ question, sectionIdx, questionIdx }) => {
    const { activeSection, activeQuestion, updateActiveQuestion, deleteQuestion } = useNewSurvey();
    const questionTypes = {
        short: Short,
        paragraph: Paragraph,
        checkbox: Checkbox,
    }

    const toggleActive = () => {
        updateActiveQuestion(sectionIdx, questionIdx);
    }

    const onDelete = () => {
        console.log('Delete Question');
        deleteQuestion(sectionIdx, questionIdx);
    }

    let RenderedQuestion = questionTypes[question.type];
    return (
        <div className="question-container" onClick={toggleActive}>
            {activeSection === sectionIdx && activeQuestion === questionIdx ?
                <ToolBar /> : null
            }

            <div className="question-title">{question.title}</div>
            <RenderedQuestion question={question} />
            <hr />
            <div className="question-setting">
                <div className='delete-icon' onClick={onDelete}><FontAwesomeIcon
                    color="#5F6368"
                    icon={faTrash}
                /></div>
                <div className='required'>Required</div>
                <div className='slider'>Slider</div>
                <div className='additional-settings'>I</div>
            </div>
        </div>
    );
}

export default Question;