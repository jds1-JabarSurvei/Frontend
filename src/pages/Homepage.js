import { Component } from 'react';
import Carousel from '../components/user/Carousel';
import SurveyList from '../components/user/SurveyList';

class Homepage extends Component {
    state = {
        style: {
            position: "",
            top: "",
            boxShadow: "",
            marginTop: ""
        }
    }

    render(){
        const { isAdmin } = this.props;
        return(
            <>
                <Carousel/>
                <SurveyList isAdmin={isAdmin} />
            </>
        )
    }
}

export default Homepage;