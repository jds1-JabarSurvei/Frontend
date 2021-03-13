import React from 'react';
import SurveyList from 'components/user/SurveyList';
import Carousel from 'components/user/Carousel';

const Index = () => {
    return (
        <>
            {/* <Carousel/> */}
            <SurveyList isAdmin={true} />
        </>
    );
}

export default Index;