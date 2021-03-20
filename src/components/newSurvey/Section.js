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
        <div className="section-container-new">
            {activeSection === idx ? <button className="remove-section-new" onClick={onRemove}>Remove Section</button> : null}
            <div className="section-header-new" onClick={toggleActive}>
                <div className="section-count-new">SECTION {idx + 1} OF {length}</div>
                <div className={isActive() ?
                    "section-info-new active-question-new shadow" : "section-info-new"
                }>
                    {isActive() ?
                        <>
                            <ToolBar />
                            <div className="edit-section-new">
                                <div className="input-text-box input-section">
                                    <input className="input-text-new" type="text" defaultValue={section.title} onChange={(e) => updateSectionInfo('title', e.target.value)} />
                                    <span className="focus-border"></span>
                                </div>
                                <div className="input-textarea-box input-section">
                                    <textarea
                                        data-autoresize
                                        row="1"
                                        ref={textareaRef}
                                        defaultValue={section.description}
                                        onKeyUp={autoResizeTextarea}
                                        onClick={autoResizeTextarea}
                                        onChange={(e) => updateSectionInfo('description', e.target.value)} />
                                    <span className="focus-border-text"></span>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="section-title-new">{section.title}</div>
                            <div className="section-description-new">{section.description}</div>
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

        </div>
    );
}

export default Section;