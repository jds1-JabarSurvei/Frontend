import React, { useRef, useEffect } from 'react';
import Section from './Section';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import './style.css';

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const QuestionsTab = () => {
    const { sections, updateActiveQuestion, submitForm, loading } = useNewSurvey();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => updateActiveQuestion(-1, -1));

    return (
        <div className="sections" ref={wrapperRef}>
            {sections.map((section, idx) => {
                return (
                    <Section
                        section={section}
                        idx={idx}
                        length={sections.length}
                        key={idx}
                    />
                )
            })}
            <button className="submit-btn-new" onClick={submitForm} disabled={loading}>Submit</button>
        </div>
    );
}

export default QuestionsTab;