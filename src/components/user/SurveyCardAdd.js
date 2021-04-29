import React from 'react';
import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';

function SurveyCardAdd() {
    const history = useHistory();

    const onSurveyClick = () => {
        history.push(`/admin/survey/new`);
    }

    return (
        <div className="col pb-4" onClick={() => onSurveyClick()} data-testid="survey_card_add">
            <div className="card card-add shadow-sm h-100">
                <div className="card-info-add m-auto d-flex flex-column" style={{ color: "var(--green)" }}>
                    <AddBoxIcon fontSize="large" className="mx-auto" />
                    <span style={{ fontWeight: "bold" }}>Buat Survei Baru</span>
                </div>
            </div>
        </div>
    )
}

export default SurveyCardAdd;