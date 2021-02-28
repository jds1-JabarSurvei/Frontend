import React, { Component } from 'react';
import SurveyList from 'components/user/SurveyList';
import Carousel from 'components/user/Carousel';

class Index extends Component {
    render(){
        return (
            <div>
                <Carousel/>

                <SurveyList/>
            </div>
        );
    }
}

export default Index;