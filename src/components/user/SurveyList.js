import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import SurveyCard from 'components/user/SurveyCard';
import SurveyTable from 'components/user/SurveyTable';
import SurveyMenu from 'components/user/SurveyMenu';
import APICall from '../../utils/axios';
import Loading from '../common/Loading';

class SurveyList extends Component {
    state = {
        listSurvey: [],

        // Untuk tampilan List-View atau Grid View
        isGrid: true,

        // Sort
        isAscending: true,

        // Modal
        showModal: false,

        // Delete Survey
        idToDelete: 0,

        // Loading
        loading: true,

        // Style
        style: {
            position: "",
            top: "",
            boxShadow: "",
            marginTop: ""
        },

        // Teks Hasil Percarian
        searchText: ""
    }

    handleView = () => {
        const { isGrid } = this.state;
        this.setState({ isGrid: !isGrid });
    }

    handleSort = () => {
        const { isAscending } = this.state;
        this.setState({ isAscending: !isAscending });
    }

    handleModal = (id) => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal, idToDelete: id });
    }

    handleDelete = () => {
        const { idToDelete } = this.state;
        // Panggil API
        console.log(idToDelete);
    }

    handleSearch = (value, isAdmin) => {
        this.setState({ loading: true });
        let { searchText } = this.state;
        const countScroll = isAdmin ? 0 : window.innerHeight - 65 - window.pageYOffset;

        searchText = (value === "") ? "" : `Hasil Pencarian "${value}"`;
        this.setState({ searchText });

        if (searchText != "") window.scrollBy(0, countScroll);

        APICall.get(`listOfForms/${value}`)
            .then(res => {
                /* If successful */
                this.setState({ listSurvey: [...res.data] });
                this.setState({ loading: false });
            }).catch(() => {
                /* If error */
                this.setState({ listSurvey: [] });
            })

    }

    handleScroll() {
        const winHeight = window.innerHeight;
        const { style } = this.state;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > winHeight - 65) {
                this.setState({
                    style: {
                        position: 'fixed',
                        top: '65px',
                        boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.25)',
                        marginTop: '100px'
                    }
                });
            } else {
                this.setState({
                    style: {
                        position: 'static',
                        top: '0',
                        boxShadow: 'none',
                        marginTop: '50px'
                    }
                });
            }
        })

        if (window.pageYOffset > winHeight - 65) {
            this.setState({
                style: {
                    ...style,
                    marginTop: '100px'
                }
            });
        } else {
            this.setState({
                style: {
                    ...style,
                    marginTop: '50px'
                }
            });
        }
    }

    // Sort
    ascending(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        let comparison = 0;
        if (titleA > titleB) {
            comparison = 1;
        } else if (titleA < titleB) {
            comparison = -1;
        }
        return comparison;
    }

    descending(a, b) {
        const titleA = a.title.toUpperCase();
        const titleB = b.title.toUpperCase();

        let comparison = 0;
        if (titleA < titleB) {
            comparison = 1;
        } else if (titleA > titleB) {
            comparison = -1;
        }
        return comparison;
    }

    callListSurvey() {
        this.setState({ loading: true });
        APICall.get(`listOfForms`)
            .then(res => {
                /* If successful */
                this.setState({ listSurvey: [...res.data] });
                this.setState({ loading: false });
            }).catch(() => {
                /* If error */
                this.setState({ listSurvey: [] });
            })
    }

    componentDidMount() {
        this.handleScroll();
        this.callListSurvey();
    }




    render() {
        const { isGrid, listSurvey, isAscending, showModal, loading, style, searchText } = this.state;
        const { handleView, handleSort, handleModal, handleDelete, ascending, descending, handleSearch } = this;
        const { isAdmin } = this.props;

        // Sort Data by Name
        let data = isAscending ? listSurvey.sort(ascending) : listSurvey.sort(descending);

        return (
            <>
                <SurveyMenu style={style} isGrid={isGrid} isAscending={isAscending} handleView={handleView} handleSearch={handleSearch} handleSort={handleSort} searchText={searchText} isAdmin={isAdmin} />
                <div className="container">
                    {loading ? <div className="survey-list" style={isAdmin ? { marginTop: '125px' } : { marginTop: style.marginTop }}><Loading /></div> :
                        listSurvey.length > 0 ?
                            isGrid ?
                                <div className="survey-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4" style={isAdmin ? { marginTop: '120px' } : { marginTop: style.marginTop }}>
                                    {
                                        data.map(survey => {
                                            return (
                                                <SurveyCard
                                                    id={survey.id}
                                                    title={survey.title}
                                                    owner={survey.owner}
                                                    imagesource=""
                                                    isAdmin={isAdmin}
                                                    handleModal={handleModal}
                                                />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div className="table-responsive-lg">
                                    <table className="survey-list table table-hover" style={isAdmin ? { marginTop: '120px' } : { marginTop: style.marginTop }}>
                                        <thead>
                                            <tr>
                                                <th scope="col-7" className="p-3 col-7">Nama Survei</th>
                                                <th scope="col-4" className="p-3 col-4">Dibuat Oleh</th>
                                                <th scope="col-1" className="p-3 col-1"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                data.map(survey => {
                                                    return (
                                                        <SurveyTable
                                                            id={survey.id}
                                                            title={survey.title}
                                                            owner={survey.owner}
                                                            isAdmin={isAdmin}
                                                            handleModal={handleModal}
                                                        />
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            : <p className="survey-list text-center" style={isAdmin ? { marginTop: '120px' } : { marginTop: style.marginTop }}>Maaf, saat ini survei belum tersedia.</p>
                    }
                </div>

                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={showModal}
                    onHide={() => handleModal(0)}
                    keyboard={false}
                >
                    <Modal.Body className="modal-body">
                        <i className="fas fa-exclamation-circle text-danger"></i>
                        <h4>Hapus Survei?</h4>
                        <button type="button" className="btn btn-secondary" onClick={() => handleModal(0)}>Kembali</button>
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Hapus</button>
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default SurveyList;