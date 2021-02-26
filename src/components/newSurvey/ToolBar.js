import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faFile } from '@fortawesome/free-solid-svg-icons';
import { useNewSurvey } from 'contexts/NewSurveyContext';

const ToolBar = () => {
    const { addQuestion, addSection } = useNewSurvey();

    return (
        <div className="toolbar">
            <div className="toolbar-item" onClick={addQuestion}><FontAwesomeIcon
                color="#5F6368"
                icon={faPlus}
            /></div>
            <div className="toolbar-item" onClick={addSection}><FontAwesomeIcon
                color="#5F6368"
                icon={faFile}
            /></div>
        </div>
    );
}

export default ToolBar;