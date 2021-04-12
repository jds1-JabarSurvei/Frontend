import { Component } from 'react';
import Loading from '../../../components/common/Loading';

class PreviewCarouselTab extends Component {
    render(){
        const { listCarousel, loading } = this.props;

        return(
            <div className="preview-carousel-container">
            <div id="carouselExample" className="carousel carousel-admin slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {
                        loading ?
                        ""
                        :
                        listCarousel.map( (item, index ) => {
                            return(
                                <button type="button" data-bs-target="#carouselExample" data-bs-slide-to={index} className={index == 0 ? "active" : ""} aria-current={index == 0 ? "true" : ""} aria-label={`Slide ${index}`}></button>
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
                        listCarousel.length == 0 ?
                        <div className="center-page">
                            <p> Belum ada survei yang dipilih </p>
                        </div>
                        :
                        listCarousel.map( (item, index) => {
                            return(
                                <div className={`carousel-item carousel-item-admin ${index == 0 ? "active" : ""}`} style={{backgroundImage:`linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,0)), url("http://localhost:5000${item.image.path}")`}}>
                                    <p>{item.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample"  data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExample"  data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            </div>
        )
    }
} 

export default PreviewCarouselTab;