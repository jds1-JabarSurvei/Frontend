import { Component } from 'react';
import SurveyCard from 'components/user/SurveyCard';
import SurveyMenu from 'components/user/SurveyMenu';

class SurveyList extends Component {
    // Isinya Daftar + Filter
    state = {
        listSurvey: {

        },
        isGrid: false
    }
    render(){
        return(
            <>
            <SurveyMenu/>
            <div className="container">
                <div className="survey-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                    <SurveyCard id={1} title="Arif" imagesource={"https://source.unsplash.com/random"}/>
                </div>
            </div>
            </>
        )
    }
}

export default SurveyList;