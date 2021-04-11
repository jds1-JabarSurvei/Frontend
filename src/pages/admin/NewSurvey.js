import SurveyContent from 'components/newSurvey/SurveyContent';
import React, { useEffect } from 'react';
import NewSurveyContextProvider, { useNewSurvey } from 'contexts/NewSurveyContext';

import './style.css';

const NewSurvey = () => {


    return (

        <div className="tab-container">
            <NewSurveyContextProvider>
                <SurveyContent isNew={true} />
            </NewSurveyContextProvider>
        </div>

    )
}

export default NewSurvey;