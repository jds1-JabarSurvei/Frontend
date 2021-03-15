import React, { useState } from 'react';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const MultipleAnswer = ({ question, sectionIdx, questionIdx }) => {
    const { activeSection, activeQuestion, updateQuestion } = useNewSurvey();
    const [activeOption, setActiveOption] = useState(0);

    const addOption = () => {
        let newQuestion = { ...question };
        newQuestion.options.push("New Option");

        updateQuestion(sectionIdx, questionIdx, newQuestion);
        setActiveOption(newQuestion.options.length - 1);
    }

    const updateActiveOption = (idx) => {
        setActiveOption(idx);
    }

    const updateOption = (idx, newOption) => {
        let newQuestion = { ...question };
        newQuestion.options[idx] = newOption;

        updateQuestion(sectionIdx, questionIdx, newQuestion);
        setActiveOption(-1);
    }

    return (
        <div className="new-question multiple-choice">
            {question.options.map((option, idx) => {
                return (
                    <div className="multiple-choice-option" key={option}>
                        {idx === activeOption ?
                            <>
                                <label><input value={true} disabled type={question.type} name={option} value={option} />
                                    <input type="text" defaultValue={option} onBlur={(e) => updateOption(idx, e.target.value)} />
                                </label><br />
                            </>
                            :
                            <>
                                <label onClick={() => updateActiveOption(idx)}>
                                    <input value={true} disabled type={question.type} name={option} value={option} /> {option}
                                </label><br />
                            </>}
                    </div>
                );
            })}
            {activeSection === sectionIdx && activeQuestion === questionIdx ?
                <div className="multiple-choice-option add-option" onClick={addOption}>
                    <label htmlFor="add"><input type={question.type} disabled name="add" value="add" /> Add Option</label><br />
                </div>
                :
                null}
        </div>
    );
}

export default MultipleAnswer;