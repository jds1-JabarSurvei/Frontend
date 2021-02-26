import React from 'react';
import Section from './Section';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import './style.css';

const QuestionsTab = () => {
    const { questions } = useNewSurvey();
    return (
        <>
            {questions.map((section, idx) => {
                return (
                    <Section
                        section={section}
                        idx={idx}
                        length={questions.length}
                        key={idx}
                    />
                )
            })}
        </>
    );
}

export default QuestionsTab;