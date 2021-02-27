import { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Import Icons
import category from 'assets/icons/category-icon.svg';
import gridView from 'assets/icons/grid-view-icon.svg';
import listView from 'assets/icons/list-view-icon.svg';
import sort from 'assets/icons/sort-icon.svg';

class SurveyMenu extends Component {
    handleResize() {
        const surveyList = document.querySelector('.survey-list');
        const winHeight = window.innerHeight;
        const surveyMenu = document.querySelector('.survey-menu');

        window.addEventListener('scroll', () => {
            if(window.pageYOffset > winHeight - 65){
                surveyMenu.style.position = "fixed";
                surveyMenu.style.top = "65px";
                surveyMenu.style.boxShadow = `0px 6px 20px rgba(0, 0, 0, 0.25)`;
                surveyList.style.marginTop = "100px";
            } else {
                surveyMenu.style.position = "static";
                surveyList.style.marginTop = "50px";
                surveyMenu.style.boxShadow = `none`;
            }
        })

        if(window.pageYOffset > winHeight - 65){
            surveyList.style.marginTop = "100px";
        } else {
            surveyList.style.marginTop = "50px";
        }
    }

    handleSearch() {
        const countScroll = window.innerHeight - 65 - window.pageYOffset;
        window.scrollBy(0, countScroll)
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    render(){
        const { isGrid, handleView } = this.props;
        return(
            <>
            <form className="d-flex align-items-center flex-column ">
                <input className="cari-survei form-control me-2 success" type="search" placeholder="Cari Survei" aria-label="Search" onKeyUp={this.handleSearch}/>
            </form>
            <div className="survey-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-6 left">
                            <OverlayTrigger key="category" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Kategori</Tooltip>}>
                                <img src={category} alt="kategori"></img>
                            </OverlayTrigger>
                        </div>

                        <div className="col-6 right">
                            <OverlayTrigger key="list" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Tampilan {isGrid ? "Daftar" : "Kartu"}</Tooltip>}>
                                <img src={isGrid ? listView : gridView} alt="change-view" onClick={handleView}></img>
                            </OverlayTrigger>
                            <OverlayTrigger key="sort" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Urutkan</Tooltip>}>
                                <img src={sort} alt="urutkan"></img>
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default SurveyMenu;