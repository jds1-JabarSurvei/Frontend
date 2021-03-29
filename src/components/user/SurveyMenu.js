import { Component } from 'react';
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
class SurveyMenu extends Component {
    state = {
        categoryMenu : [],
        statusMenu : ""
    }

    handleSearchValue = e => {
        let { statusMenu } = this.state;
        let value = e.target.value;
        const countScroll = window.innerHeight - 65 - window.pageYOffset;

        statusMenu = (value === "") ? "" : `Hasil Pencarian "${e.target.value}"`;
        this.setState({ statusMenu });
        
        if(value != "") window.scrollBy(0, countScroll);
    }


    render(){
        const { isGrid, handleView, handleSort, handleSearch, isAscending, style, searchText, isAdmin } = this.props;

        return(
            <>
            <form className="d-flex align-items-center flex-column ">
                <input className="cari-survei form-control me-2" type="search" placeholder="Cari Survei" aria-label="Search" onChange={e => handleSearch(e.target.value, isAdmin)}/>
            </form>
            <div className="survey-menu" style={ isAdmin ? {position:"fixed", top:'65px', boxShadow:'0px 6px 20px rgba(0, 0, 0, 0.25)'} : {position:style.position, boxShadow:style.boxShadow, top:style.top}}>
                <div className="container">
                    <div className="row">
                        <div className="col-6 left">
                            <h6 className="status-menu">{searchText}</h6>
                        </div>

                        <div className="col-6 right">
                            {/* <OverlayTrigger key="list" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Ubah Ke Tampilan {isGrid ? "Daftar" : "Kartu"}</Tooltip>}>
                                <i className={`fas fa-th-${isGrid ? "list" : "large"}`} onClick={handleView} />
                            </OverlayTrigger>
                            <OverlayTrigger key="sort" placement="bottom" overlay={<Tooltip id={`tooltip-bottom`}>Urutkan {isAscending ? "Menaik" : "Menurun"}</Tooltip>}>
                                <i className={`fas fa-sort-alpha-${isAscending ? "down" : "up"}`} onClick={handleSort} />
                            </OverlayTrigger> */}

                            <Tooltip title={`Ubah Ke Tampilan ${isGrid ? "Daftar" : "Kartu"}`} placement="bottom" arrow>
                                <IconButton onClick={handleView} aria-label="delete question">
                                    { isGrid ? <ViewComfyIcon /> : <ViewListIcon/> }
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={`Urutkan ${isAscending ? "Menaik" : "Menurun"}`} placement="bottom" arrow>
                                <IconButton onClick={handleSort} aria-label="delete question">
                                    { isAscending ? <SortIcon /> : <SortIcon style={{transform: "rotateX(180deg)"}}/> }
                                </IconButton>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default SurveyMenu;