import QuestionsTab from 'components/newSurvey/QuestionsTab';
import Preview from 'components/newSurvey/Preview';
import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';

const NewSurvey = () => {
    const tabs = [
        { title: 'Question' },
        { title: 'Preview' },
    ]
    const [activeTab, setActiveTab] = useState(tabs[0].title);

    const updateActiveTab = (newActive) => {
        setActiveTab(newActive);
    }

    return (
        <NewSurveyContextProvider>
            <div className="new-survey">
                <div className="tab-titles">
                    {tabs.map(tab => {
                        return (
                            <div key={tab.title} className={activeTab == tab.title ? 'active' : ''} onClick={() => updateActiveTab(tab.title)}>{tab.title}</div>
                        )
                    })}
                </div>
                <div className="tab-container">
                    {activeTab === 'Question' ?
                        <QuestionsTab /> :
                        <Preview />
                    }
                </div>
            </div>
        </NewSurveyContextProvider>
    );
}

export default NewSurvey;