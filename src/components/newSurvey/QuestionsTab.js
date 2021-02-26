import React from 'react';
import Section from './Section';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import './style.css';

const QuestionsTab = () => {
    const { sections } = useNewSurvey();
    return (
        <div className="sections">
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

        </div>
    );
}

export default QuestionsTab;