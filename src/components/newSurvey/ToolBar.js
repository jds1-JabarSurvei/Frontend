import React, { useRef, useState } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import useWindowSize from 'hooks/useWindowSize';

const ToolBar = () => {
    const { addQuestion, addSection } = useNewSurvey();
    const size = useWindowSize();

    return (
        <div className={size.width > 767 ? "toolbar shadow" : "toolbar-mobile shadow"}>
            {/* <div ref={questionRef} onMouseOver={() => setShowQuestion(true)} onMouseLeave={() => setShowQuestion(false)} className="toolbar-item" onClick={addQuestion}><FontAwesomeIcon
                color="#5F6368"
                icon={faPlusCircle}
            /></div> */}

            <Tooltip title="Tambah Pertanyaan" placement="right" arrow>
                <IconButton aria-label="add_question" onClick={addQuestion} >
                    <AddCircleIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Tambah Bagian" placement="right" arrow>
                <IconButton aria-label="add_section" onClick={addSection}>
                    <InsertDriveFileIcon />
                </IconButton>
            </Tooltip>

            {/* <Overlay target={questionRef.current} show={showQuestion} placement="right">
                {(props) => (
                    // <Tooltip {...props}>
                    //     Tambah Pertanyaan
                    // </Tooltip>

                )}
            </Overlay> */}
            {/* <div ref={sectionRef} onMouseOver={() => setShowSection(true)} onMouseLeave={() => setShowSection(false)} className="toolbar-item" onClick={addSection}><FontAwesomeIcon
                color="#5F6368"
                icon={faFile}
            /></div>
            <Overlay target={sectionRef.current} show={showSection} placement="right">
                {(props) => (
                    <Tooltip {...props}>
                        Tambah Bagian
                    </Tooltip>
                )}
            </Overlay> */}
        </div>
    );
}

export default ToolBar;