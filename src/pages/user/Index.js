import React from 'react';
import SurveyList from 'components/user/SurveyList';
import Carousel from 'components/user/Carousel';
import Alamat from 'components/user/Alamat';

const Index = () => {
    return (
        <>
            <Carousel/>
            <SurveyList isAdmin={false}/>
            <Alamat/>
        </>
    );
}

export default Index;