import React from 'react';
import Question from './Question';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const Section = ({ section, idx, length }) => {
    const { deleteSection } = useNewSurvey();

    const onRemove = () => {
        deleteSection(idx);
    }

    return (
        <div className="section-container">
            <div className="section-header">
                <div className="section-count">Section {idx + 1} of {length}</div>
                <div className="section-info">
                    <div className="section-title">{section.title}</div>
                    <div className="section-description">{section.description}</div>
                </div>
            </div>
            {section.questions.map((question, questionIdx) => {
                return (
                    <Question
                        key={question.title}
                        question={question}
                        sectionIdx={idx}
                        questionIdx={questionIdx}
                    />
                )
            })}
            <button className="remove-section" onClick={onRemove}>Remove Section</button>
        </div>
    );
}

export default Section;