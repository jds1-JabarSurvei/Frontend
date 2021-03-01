import React, { useEffect, useRef } from 'react';
import Question from './Question';
import ToolBar from './ToolBar';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import { text } from '@fortawesome/fontawesome-svg-core';

const Section = ({ section, idx, length }) => {
    const { activeSection, activeQuestion, updateActiveQuestion, deleteSection, updateSection } = useNewSurvey();
    const textareaRef = useRef();

    const onRemove = () => {
        deleteSection(idx);
    }

    const toggleActive = () => {
        updateActiveQuestion(idx, -1);
    }

    const isActive = () => {
        return activeSection === idx && activeQuestion === -1;
    }

    const updateSectionInfo = (component, value) => {
        let newSection = { ...section };
        newSection[component] = value;

        updateSection(idx, newSection);
    }

    const autoResizeTextarea = () => {
        textareaRef.current.style.height = "0px";
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = (scrollHeight + 5) + "px";
    }

    return (
        <div className="section-container">
            <div className="section-header" onClick={toggleActive}>
                <div className="section-count">Section {idx + 1} of {length}</div>
                <div className={isActive() ?
                    "section-info active-question" : "section-info"
                }>
                    {isActive() ?
                        <>
                            <ToolBar />
                            <div className="edit-section">
                                <input type="text" defaultValue={section.title} onBlur={(e) => updateSectionInfo('title', e.target.value)} />
                                <textarea
                                    ref={textareaRef}
                                    defaultValue={section.description}
                                    onKeyDown={autoResizeTextarea}
                                    onBlur={(e) => updateSectionInfo('description', e.target.value)} />
                            </div>
                        </>
                        :
                        <>
                            <div className="section-title">{section.title}</div>
                            <div className="section-description">{section.description}</div>
                        </>
                    }

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