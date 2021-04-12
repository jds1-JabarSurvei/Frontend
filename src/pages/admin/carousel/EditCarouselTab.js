import { Component } from 'react';
import CarouselCard from '../../../components/carousel/CarouselCard';
import Loading from '../../../components/common/Loading';

class EditCarouselTab extends Component {

    render(){
        const {listSurvey, handleChoose, loading } = this.props;

        return(
            <div className="edit-carousel-container container">
                {
                    loading ?
                    <Loading/> :
                <>
                    <p className="text-center pilih-carousel">Pilih survei yang ingin ditampilkan pada <i>carousel</i></p>
                    <div className="survey-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                        {
                            listSurvey.map( survey => {
                                return(
                                    <CarouselCard
                                        handleChoose={handleChoose}
                                        selectedIndex={survey.selectedIndex}
                                        id={survey.id}
                                        title={survey.title}
                                        isActive={survey.isActive}
                                        imagesource={`http://localhost:5000${survey.image.path}`}/>
                                    )
                                })
                        }
                    </div>
                </>
                }
            </div>
        )
    }
} 

export default EditCarouselTab;