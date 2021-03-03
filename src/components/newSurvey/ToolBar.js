import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faFile } from '@fortawesome/free-solid-svg-icons';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import {
    Tooltip,
    Overlay
} from 'react-bootstrap'
import useWindowSize from 'hooks/useWindowSize';

const ToolBar = () => {
    const { addQuestion, addSection } = useNewSurvey();
    const [showQuestion, setShowQuestion] = useState(false);
    const [showSection, setShowSection] = useState(false);
    const questionRef = useRef(null);
    const sectionRef = useRef(null);
    const size = useWindowSize();

    return (
        <div className={size.width > 767 ? "toolbar" : "toolbar-mobile"}>
            <div ref={questionRef} onMouseOver={() => setShowQuestion(true)} onMouseLeave={() => setShowQuestion(false)} className="toolbar-item" onClick={addQuestion}><FontAwesomeIcon
                color="#5F6368"
                icon={faPlusCircle}
            /></div>
            <Overlay target={questionRef.current} show={showQuestion} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        Add Question
                    </Tooltip>
                )}
            </Overlay>
            <div ref={sectionRef} onMouseOver={() => setShowSection(true)} onMouseLeave={() => setShowSection(false)} className="toolbar-item" onClick={addSection}><FontAwesomeIcon
                color="#5F6368"
                icon={faFile}
            /></div>
            <Overlay target={sectionRef.current} show={showSection} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        Add Section
                    </Tooltip>
                )}
            </Overlay>
        </div>
    );
}

export default ToolBar;