import React from 'react';
import SurveyList from 'components/user/SurveyList';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <SurveyList isAdmin={true} />
            {/* <div className="newSurveyButton">
                <Link to="/admin/survey/new">
                    <i className="fas fa-plus"></i>
                </Link>
            </div>             */}
        </>
    );
}

export default Index;