import QuestionsTab from 'components/newSurvey/QuestionsTab';
import Preview from 'components/newSurvey/Preview';
import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';

const NewSurvey = () => {
    return (
        <NewSurveyContextProvider>
            <div className="new-survey">

                <div className="tab-container">
                    <div className="tab-header">
                        <h1>Create Survey</h1>
                    </div>
                    <QuestionsTab />
                </div>
            </div>
        </NewSurveyContextProvider>
    );
}

export default NewSurvey;