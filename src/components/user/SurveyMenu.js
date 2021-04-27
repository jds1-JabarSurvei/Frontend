import { Component } from 'react';
// import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import SortIcon from '@material-ui/icons/Sort';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

class SurveyMenu extends Component {
    state = {
        categoryMenu: [],
        statusMenu: ""
    }

    handleSearchValue = e => {
        let { statusMenu } = this.state;
        let value = e.target.value;
        const countScroll = window.innerHeight - 65 - window.pageYOffset;

        statusMenu = (value === "") ? "" : `Hasil Pencarian "${e.target.value}"`;
        this.setState({ statusMenu });

        if (value != "") window.scrollBy(0, countScroll);
    }


    render() {
        const { handleView, view, handleSort, handleSearch, style, searchText, isAdmin } = this.props;

        return (
            <>
                <form className="d-flex align-items-center flex-column ">
                    <input className="cari-survei form-control me-2" type="search" placeholder="Cari Survei" aria-label="Search" onChange={e => handleSearch(e.target.value, isAdmin)} />
                </form>
                <div className="survey-menu" style={isAdmin ? { position: "fixed", top: '65px', boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.25)' } : { position: style.position, boxShadow: style.boxShadow, top: style.top }}>
                    <div className="container">
                        <div className="flex-menu">
                            <div className="search-flex">
                                <h6 className="status-menu">{searchText}</h6>
                            </div>

                            <div className="sort-flex right" style={{ marginTop: "5px" }}>
                                <div className="sort-select">
                                    <select data-testid="sort_survey_select" className=" mx-auto" onChange={handleSort}>
                                        <option className="m-3" value="alphabetAscending" key="alphabetAscending">Abjad Menaik</option>
                                        <option className="m-3" value="alphabetDescending" key="alphabetDescending">Abjad Menurun</option>
                                        <option className="m-3" value="timestampAscending" key="timestampAscending">Tanggal Menaik</option>
                                        <option className="m-3" value="timestampDescending" key="timestampDescending">Tanggal Menurun</option>
                                    </select>
                                </div>
                                <ToggleButtonGroup style={{ height: '40px' }} value={view} exclusive onChange={handleView}>
                                    <ToggleButton value="list" aria-label="list">
                                        <Tooltip title={view == "module" ? "Ubah Ke Tampilan Daftar" : ""} placement="bottom" arrow>
                                            <ViewListIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="module" aria-label="module">
                                        <Tooltip title={view == "list" ? "Ubah Ke Tampilan Kartu" : ""} placement="bottom" arrow>
                                            <ViewModuleIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default SurveyMenu;