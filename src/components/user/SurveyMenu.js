import { Component } from 'react';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

// Import Icons
// import category from 'assets/icons/category-icon.svg';

class SurveyMenu extends Component {
    state = {
        categoryMenu : [],
        statusMenu : ""
    }

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

    handleSearch = e => {
        let { statusMenu } = this.state;
        statusMenu = (e.target.value === "") ? "" : `Hasil Pencarian "${e.target.value}"`;
        this.setState({ statusMenu });
        const countScroll = window.innerHeight - 65 - window.pageYOffset;
        window.scrollBy(0, countScroll);
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize);
        this.handleResize();
    }

    render(){
        const { isGrid, handleView, handleSort, isAscending } = this.props;
        const { statusMenu } = this.state;

        return(
            <>
            <form className="d-flex align-items-center flex-column ">
                <input className="cari-survei form-control me-2" type="search" placeholder="Cari Survei" aria-label="Search" onChange={this.handleSearch}/>
            </form>
            <div className="survey-menu">
                <div className="container">
                    <div className="row">
                        <div className="col-6 left">
                            <h6 className="status-menu">{statusMenu}</h6>
                        </div>

                        <div className="col-6 right">
                            <OverlayTrigger key="list" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Ubah Ke Tampilan {isGrid ? "Daftar" : "Kartu"}</Tooltip>}>
                                <i className={`fas fa-th-${isGrid ? "list" : "large"}`} onClick={handleView} />
                            </OverlayTrigger>
                            <OverlayTrigger key="sort" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Urutkan {isAscending ? "Menaik" : "Menurun"}</Tooltip>}>
                                <i className={`fas fa-sort-alpha-${isAscending ? "down" : "up"}`} onClick={handleSort} />
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