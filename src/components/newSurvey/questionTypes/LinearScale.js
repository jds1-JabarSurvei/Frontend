import React, { useRef } from 'react';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const LinearScale = ({ question, sectionIdx, questionIdx }) => {
    const { updateQuestion } = useNewSurvey();
    const minRef = useRef();
    const maxRef = useRef();

    const updateRange = () => {
        let min = parseInt(minRef.current.value);
        let max = parseInt(maxRef.current.value);
        let range = Array.from({ length: min === 0 ? max + 1 : max }, (_, i) => i + min);
        let newQuestion = { ...question };
        newQuestion.options = range;

        updateQuestion(sectionIdx, questionIdx, newQuestion);
    }

    return (
        <div className="linear-question">
            <select name="minimum" ref={minRef} onChange={updateRange}>
                <option value="0">0</option>
                <option value="1">1</option>
            </select>
            <div>To</div>
            <select name="maximum" ref={maxRef} onChange={updateRange}>
                {[...Array(10).keys()].map((val) => {
                    return (
                        <option value={val + 1} key={val}>{val + 1}</option>
                    )
                })}
            </select>
        </div>
    );
}

export default LinearScale;