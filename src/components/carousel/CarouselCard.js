import { Component } from 'react';
import './style.css';

class CarouselCard extends Component {
    // state = {
    //     isActive: false
    // }

    // handleChoose = () => {
    //     const { isActive } = this.state;
    //     this.setState({ isActive : !isActive });
    // }

    render(){
        const { handleChoose, id, isActive, title, imagesource, selectedIndex } = this.props;
        // const { isActive } = this.state;
        // const { handleChoose } = this;

        return(
            <div className="col pb-4">
                <div className="cek h-100">
                    <div className={`card h-100 ${isActive ? "shadow carousel-card-active" : "carousel-card"}`} onClick={() => handleChoose(id)} >
                        {
                            isActive ?
                                <div className="overlay-carousel"></div>
                            :
                            ""
                        }
                        <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt="cek"/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            {
                                isActive ?
                                    <div className="selectedIndex shadow">
                                        <p>{selectedIndex}</p>
                                    </div>
                                :
                                    <div className="notSelected"></div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CarouselCard;