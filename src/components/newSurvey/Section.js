import React from 'react';
import Question from './Question';

const Section = ({ section, idx, length }) => {
    return (
        <div className="section-container">
            <div className="section-header">
                <div className="section-count">Section {idx + 1} of {length}</div>
                <div className="section-info">
                    <div className="section-title">{section.title}</div>
                    <div className="section-description">{section.description}</div>
                </div>
            </div>
            {section.questions.map(question => {
                return (
                    <Question
                        key={question.title}
                        question={question}
                    />
                )
            })}
        </div>
    );
}

export default Section;