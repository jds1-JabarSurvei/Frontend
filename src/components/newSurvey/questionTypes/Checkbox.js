import React from 'react';

const Checkbox = ({ question }) => {
    return (
        <div className="new-question checkbox">
            {question.options.map(option => {
                return (
                    <div className="checkbox-option" key={option}>
                        <input type="checkbox" name={option} value={option} />
                        <label htmlFor={option}>{option}</label><br></br>
                    </div>
                );
            })}
        </div>
    );
}

export default Checkbox;