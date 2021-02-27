import { Component } from 'react';
import SurveyCard from 'components/user/SurveyCard';
import SurveyTable from 'components/user/SurveyTable';
import SurveyMenu from 'components/user/SurveyMenu';

class SurveyList extends Component {
    // Isinya Daftar + Filter
    state = {
        // Data Dummy, yg ini nanti panggil API
        listSurvey: [
            {id: 1, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 2, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 3, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 4, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 5, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 6, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 7, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 8, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 9, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""},
            {id: 10, title:"Judul Survei", owner:"Jabar Digital Service", imagesource:""}
        ],
        // Untuk tampilan List-View atau Grid View
        isGrid: true,

        // Untuk tambahan menu Action pada page Admin
        isAdmin: false,

        // Sort
        isAscending: true
    }

    handleView = () => {
        const { isGrid } = this.state;
        this.setState({ isGrid : !isGrid });
    }

    handleSort = () => {
        const { isAscending } = this.state;
        this.setState({ isAscending : !isAscending });
    }


    render(){
        const { isGrid, listSurvey, isAscending } = this.state;
        const { handleView, handleSort } = this;

        return(
            <>
            <SurveyMenu isGrid={isGrid} isAscending={isAscending} handleView={handleView} handleSort={handleSort} />
            <div className="container">
                {   listSurvey.length > 0 ?
                    isGrid ? 
                        <div className="survey-list row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
                            {listSurvey.map(survey => {
                                return(
                                    <SurveyCard id={survey.id} title={survey.title} owner={survey.owner} imagesource={survey.imagesource}/>
                                )
                            })}
                        </div>
                        :
                        <div className="table-responsive-lg">
                            <table className="survey-list table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col-8" className="p-3 col-8">Nama Survei</th>
                                        <th scope="col-4" className="p-3 col-4">Dibuat Oleh</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSurvey.map(survey => {
                                        return(
                                            <SurveyTable id={survey.id} title={survey.title}/>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    :
                    <p className="survey-list text-center">Maaf, saat ini survei belum tersedia</p>
                }
            </div>
            </>
        )
    }
}

export default SurveyList;