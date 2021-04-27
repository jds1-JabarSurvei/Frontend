import React, { Component } from 'react';
import SurveyList from 'components/user/SurveyList';
import Carousel from 'components/user/Carousel';
import { AuthContext } from 'contexts/AuthContext';

class Index extends Component {
    static contextType = AuthContext;

    render() {

        return (
            this.context.currentUser ?
                <SurveyList isAdmin={true} />
                :
                <>
                    <Carousel history={this.props.history} />
                    <SurveyList isAdmin={false} />
                </>
        );
    }
}

export default Index;