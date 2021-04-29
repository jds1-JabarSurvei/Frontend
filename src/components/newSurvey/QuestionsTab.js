import React, { useRef, useEffect, useState } from 'react';
import Section from './Section';
import { useNewSurvey } from 'contexts/NewSurveyContext';
import './style.css';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Tooltip from '@material-ui/core/Tooltip';

function useOutsideAlerter(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

const QuestionsTab = () => {
    const { sections, updateActiveQuestion, submitForm, loading, addlastSection, deleteSection, addLastQuestion, deleteQuestion } = useNewSurvey();
    const wrapperRef = useRef(null);
    useOutsideAlerter(wrapperRef, () => updateActiveQuestion(-1, -1));
    const [lastSection, setLastSection] = useState(-1);
    const [lastQuestion, setLastQuestion] = useState(-1);

    useEffect(() => {
        let tempSection = sections.length - 1
        setLastSection(tempSection);
        if (tempSection >= 0) {
            setLastQuestion(sections[tempSection].questions.length - 1);
        } else {
            setLastQuestion(-1);
        }
    }, [sections]);

    const onAddQuestion = () => {
        addLastQuestion();
    }

    const onAddSection = () => {
        addlastSection();
    }

    const onDelete = () => {
        if (lastSection == -1) {
            return;
        }
        if (lastQuestion >= 0) {
            deleteQuestion(lastSection, lastQuestion);
        } else {
            deleteSection(lastSection);
        }
    }

    return (
        <div className="sections" ref={wrapperRef}>
            {sections.map((section, idx) => {
                return (
                    <Section
                        section={section}
                        idx={idx}
                        length={sections.length}
                        key={idx}
                    />
                )
            })}
            <div className="edit-survey-toolbar">
                <div className="edit-survey-toolbar-button">
                    <Tooltip title="Tambah Pertanyaan" placement="bottom" arrow>
                        <IconButton aria-label="add_question" onClick={onAddQuestion}>
                            <AddCircleIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="edit-survey-toolbar-button">
                    <Tooltip title="Tambah Bagian" placement="bottom" arrow>
                        <IconButton aria-label="add_section" onClick={onAddSection}>
                            <InsertDriveFileIcon />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="edit-survey-toolbar-button">
                    <Tooltip title={lastQuestion >= 0 ? "Hapus Pertanyaan Terakhir" : "Hapus Bagian Terakhir"} placement="bottom" arrow>
                        <IconButton aria-label="add_section" onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <button className="submit-btn-new" onClick={submitForm} disabled={loading}>Submit</button>
        </div>
    );
}

export default QuestionsTab;