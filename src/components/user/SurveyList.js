import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import SurveyCard from 'components/user/SurveyCard';
import SurveyTable from 'components/user/SurveyTable';
import SurveyMenu from 'components/user/SurveyMenu';

class SurveyList extends Component {
    state = {
        // Data Dummy, yg ini nanti panggil API
        listSurvey: [
            {id: 1, title:"A", owner:"Jabar Digital Service", imagesource:""},
            {id: 2, title:"B", owner:"Jabar Digital Service", imagesource:""},
            {id: 3, title:"C", owner:"Jabar Digital Service", imagesource:""},
            {id: 4, title:"D", owner:"Jabar Digital Service", imagesource:""},
            {id: 5, title:"E", owner:"Jabar Digital Service", imagesource:""},
            {id: 6, title:"F", owner:"Jabar Digital Service", imagesource:""},
            {id: 7, title:"G", owner:"Jabar Digital Service", imagesource:""},
            {id: 8, title:"H", owner:"Jabar Digital Service", imagesource:""},
            {id: 9, title:"I", owner:"Jabar Digital Service", imagesource:""},
            {id: 10, title:"J", owner:"Jabar Digital Service", imagesource:""}
        ],
        // Untuk tampilan List-View atau Grid View
        isGrid: true,

        // Sort
        isAscending: true,

        // Untuk tambahan menu Action pada page Admin
        isAdmin: true,

        // Modal
        showModal: false,

        // Delete Survey
        idToDelete: 0
    }

    handleView = () => {
        const { isGrid } = this.state;
        this.setState({ isGrid : !isGrid });
    }

    handleSort = () => {
        const { isAscending } = this.state;
        this.setState({ isAscending : !isAscending });
    }

    handleModal = (id) => {
        const { showModal } = this.state;
        this.setState({ showModal : !showModal, idToDelete : id});
    }

    handleDelete = () => {
        const { idToDelete } = this.state;
        // Panggil API
        console.log(idToDelete);
    } 

    ascending(a, b){
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

    descending(a, b){
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


    render(){
        const { isGrid, listSurvey, isAscending, isAdmin, showModal } = this.state;
        const { handleView, handleSort, handleModal, handleDelete, ascending, descending } = this;
        let data = isAscending ? listSurvey.sort(ascending) : listSurvey.sort(descending);

        return(
            <>
            <SurveyMenu isGrid={isGrid} isAscending={isAscending} handleView={handleView} handleSort={handleSort} />
            <div className="container">
                {   listSurvey.length > 0 ?
                    isGrid ? 
                        <div className="survey-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                            {
                                data.map(survey => {
                                    return(
                                        <SurveyCard
                                            id={survey.id}
                                            title={survey.title}
                                            owner={survey.owner}
                                            imagesource={survey.imagesource}
                                            isAdmin={isAdmin}
                                            handleModal={handleModal}
                                        />
                                    )
                                })
                            }
                        </div>
                        :
                        <div className="table-responsive-lg">
                            <table className="survey-list table table-hover">
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
                                            return(
                                                <SurveyTable
                                                    id={survey.id}
                                                    title={survey.title}
                                                    isAdmin={isAdmin}
                                                    handleModal={handleModal}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    :
                    <p className="survey-list text-center">Maaf, saat ini survei belum tersedia</p>
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
                    <i class="fas fa-exclamation-circle text-danger"></i>
                    <h4>Hapus Survei?</h4>
                    <button type="button" class="btn btn-secondary" onClick={() => handleModal(0)}>Kembali</button>
                    <button type="button" class="btn btn-danger" onClick={handleDelete}>Hapus</button>
                </Modal.Body>
            </Modal>

            </>
        )
    }
}

export default SurveyList;