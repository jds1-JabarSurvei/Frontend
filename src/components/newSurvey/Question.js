import React from 'react';
import Short from './questionTypes/Short';
import Paragraph from './questionTypes/Paragraph';
import Checkbox from './questionTypes/Checkbox';

const Question = ({ question }) => {
    const questionTypes = {
        short: Short,
        paragraph: Paragraph,
        checkbox: Checkbox,
    }

    let RenderedQuestion = questionTypes[question.type];
    return (
        <div className="question-container">
            <div className="question-title">{question.title}</div>
            <RenderedQuestion question={question} />
            <hr />
            <div className="question-setting">
                <div className='delete-icon'></div>
                <div className='required'>Required</div>
                <div className='slider'>Slider</div>
                <div className='additional-settings'>I</div>
            </div>
        </div>
    );
}

export default Question;