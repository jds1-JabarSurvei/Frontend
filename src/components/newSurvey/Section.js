import React from 'react';
import Question from './Question';
import ToolBar from './ToolBar';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const Section = ({ section, idx, length }) => {
    const { activeSection, activeQuestion, updateActiveQuestion, deleteSection } = useNewSurvey();

    const onRemove = () => {
        deleteSection(idx);
    }

    const toggleActive = () => {
        updateActiveQuestion(idx, -1);
    }

    return (
        <div className="section-container">
            <div className="section-header" onClick={toggleActive}>
                <div className="section-count">Section {idx + 1} of {length}</div>
                <div className="section-info">
                    {activeSection === idx && activeQuestion === -1 ?
                        <ToolBar /> : null
                    }
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