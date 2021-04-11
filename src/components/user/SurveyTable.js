import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

function SurveyTable(props) {
    const {id, title, owner, time, isAdmin, handleModal} = props;
    const { currentUser } = useAuth();
    const history = useHistory();

    const timeConverter = (unixTime) => {
        const a = new Date(unixTime * 1000 + 7 * 1000 * 3600);
        const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        // const hour = ("0" + a.getHours()).slice(-2);
        // const min = ("0" + a.getMinutes()).slice(-2);
        // const sec = ("0" + a.getSeconds()).slice(-2);
        // const time = date + ' ' + month + ' ' + year + " " + hour + ":" + min + ":" + sec;
        const time = date + ' ' + month + ' ' + year;
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