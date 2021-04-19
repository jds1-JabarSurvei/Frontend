import { useParams } from 'react-router-dom';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';

import SurveyContent from 'components/newSurvey/SurveyContent';
const SurveyEditPage = () => {
    const { id } = useParams();
    return(
        <div className="tab-container">
            <NewSurveyContextProvider>
                <SurveyContent idForm={id} isNew={false} />
            </NewSurveyContextProvider>
        </div>
    )
}

export default SurveyEditPage;