import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function SurveyTable(props) {
    const {id, title, owner, time, isAdmin, handleModal} = props;
    const { currentUser } = useAuth();
    const history = useHistory();

    const timeConverter = (unixTime) => {
        var a = new Date(unixTime * 1000);
        var months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        // var hour = a.getHours();
        // var min = a.getMinutes();
        // var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year;
        return time;
    }
    
    const date = timeConverter(time);

    const onSurveyClick = (id) => {
        if (!currentUser) {
            history.push(`/survey/${id}`);
        } else {
            history.push(`admin/survey/${id}`);
        }
    }
    return (
        <>
        <tr  className="survey-table-item">
            <td className="p-3" onClick={() => onSurveyClick(id)}>{title}</td>
            <td className="p-3" onClick={() => onSurveyClick(id)}>{owner}</td>
            <td className="p-3" onClick={() => onSurveyClick(id)}>{date}</td>
            <td className="p-3">
                {
                    isAdmin ? 
                    <div className="dropdown">
                        <i class="fas fa-ellipsis-h menuTable" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu" aria-labelledby={id}>
                            <li><span className="dropdown-item"><i class="far fa-edit dropdownMenuCard"></i> UBAH</span></li>
                            <li onClick={ () => handleModal(`${id}`)}><span className="dropdown-item"><i class="far fa-trash-alt dropdownMenuCard"></i> HAPUS</span></li>
                        </ul>
                    </div> : ""
                }
            </td>
        </tr>
        </>
    )
}

export default SurveyTable;