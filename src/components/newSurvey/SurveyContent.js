import QuestionsTab from 'components/newSurvey/QuestionsTab';
import React, { useState, useEffect } from 'react';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import ImageUploader from 'components/newSurvey/ImageUploader';

import './style.css';
import Loading from 'components/common/Loading';

const SurveyContent = ({ isNew, idForm }) => {
    const { formTitle, updateFormTitle, fileImage, updateFileImage, deleteFileImage, fillQuestion, loading } = useNewSurvey();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        fillQuestion(isNew, idForm);
    }, []);

    const handleActive = () => {
        setIsActive(true);
    }

    const handleInactive = () => {
        setIsActive(false);
    }
    return (
        <div className="new-survey">
            {loading ?
                <Loading />
                :
                <>
                    {isNew ?
                        <ImageUploader fileImage={fileImage} updateFileImage={updateFileImage} deleteFileImage={deleteFileImage} /> : null}

                    <div className={`tab-header question-container-new ${isActive ? "active-question-new shadow" : "question-container-new"}`}>
                        <div className="input-text-box form-title ">
                            <input className="input-text-new" type="text" defaultValue={formTitle} onChange={updateFormTitle} onFocus={handleActive} onBlur={handleInactive} />
                            <span className="focus-border"></span>
                        </div>

                    </div>
                    <QuestionsTab />
                </>
            }


        </div>
    );
}

export default SurveyContent;