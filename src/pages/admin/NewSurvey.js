import QuestionsTab from 'components/newSurvey/QuestionsTab';
import Preview from 'components/newSurvey/Preview';
import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider, { useNewSurvey } from 'contexts/NewSurveyContext';
import ImageUploader from 'components/newSurvey/ImageUploader';

import './style.css';

const NewSurveyContent = () => {
    const { formTitle, updateFormTitle, fileImage, updateFileImage, deleteFileImage } = useNewSurvey();
    const [isActive, setIsActive] = useState(false);

    const handleActive = () => {
        setIsActive(true);
    }

    const handleInactive = () => {
        setIsActive(false);
    }
    return (
            <div className="new-survey">
                <div className="tab-container">
                    <ImageUploader fileImage={fileImage} updateFileImage={updateFileImage} deleteFileImage={deleteFileImage} />
                    <div className={`tab-header question-container-new ${isActive ? "active-question-new shadow" : "question-container-new"}`}>
                        <div className="input-text-box form-title ">
                            <input autoFocus className="input-text-new" type="text" defaultValue={formTitle} onChange={updateFormTitle} onFocus={handleActive} onBlur={handleInactive} />
                            <span className="focus-border"></span>
                        </div>
                    </div>
                    <QuestionsTab />
                </div>
            </div>
    );
}

const NewSurvey = () => {
    return(
        <NewSurveyContextProvider>
            <NewSurveyContent/>
        </NewSurveyContextProvider>
    )
}

export default NewSurvey;