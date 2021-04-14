import { Component } from 'react';
import APICall from '../../utils/axios';
import Loading from '../../components/common/Loading';
import './style.css';

class Carousel extends Component {

    state = {
        listCarousel : [],
        loading: false,
        history: this.props.history
    }

    callListCarousel() {
        this.setState({ loading : true });
        APICall.get(`listOfCarousel`)
        .then( res => {
            this.setState({ listCarousel : [...res.data]});
            this.setState({ loading : false });
        })
        .catch(() => {})
    }

    onSurveyClick = (id) => {
        const { history } = this.state;
        history.push(`/survey/${id}`);
    }

    componentDidMount(){
        this.callListCarousel();
    }

    render(){
        const { listCarousel, loading } = this.state;
        const { onSurveyClick } = this;

        return(
            <div id="carouselExampleCaptions" className="carousel carousel-user slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {
                        loading ?
                            ""
                        :
                            listCarousel.map( (item, index ) => {
                                return(
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={index} className={index == 0 ? "active" : ""} aria-current={index == 0 ? "true" : ""} aria-label={`Slide ${index}`}></button>
                                )
                            })
                    }
                </div>
                <div className="carousel-inner">
                    {
                        loading ?
                            <div className="carousel-item carousel-item-user active" style={{ background:"white"}}>
                                <Loading/>
                            </div>
                        :
                            listCarousel.map( (item, index) => {
                                return(
                                    <div className={`carousel-item carousel-item-user ${index == 0 ? "active" : ""}`} style={{cursor:"pointer", backgroundImage:`linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0)), url("http://localhost:5000${item.image.path}")`}} onClick={() => onSurveyClick(item.id)}>
                                        <p>{item.title}</p>
                                    </div>
                                )
                            })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"  data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        )
    }
}

export default Carousel;