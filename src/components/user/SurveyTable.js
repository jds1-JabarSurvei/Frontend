import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

function SurveyTable(props) {
    const { id, title, owner, time, isAdmin, handleModal } = props;
    const { currentUser } = useAuth();
    const history = useHistory();

    const timeConverter = (unixTime) => {
        const a = new Date(unixTime * 1000 + 7 * 1000 * 3600);
        const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const time = date + ' ' + month + ' ' + year;
        return time;
    }

    const date = timeConverter(time);

    const handleClickMenu = (id, toPage) => {
        history.push(`admin/survey/${toPage}/${id}`);
    }

    const onSurveyClick = (id) => {
        if (!currentUser) {
            history.push(`/survey/${id}`);
        }
    }

    return (
        <>
        <tr  className="survey-table-item">
            <td className="p-3" onClick={() => onSurveyClick(id)} >{title}</td>
            <td className="p-3" onClick={() => onSurveyClick(id)} >{owner}</td>
            <td className="p-3" onClick={() => onSurveyClick(id)} >{date}</td>
            <td className="p-3">
                {
                    isAdmin ? 
                    <div className="dropdown">
                        <i class="fas fa-ellipsis-h menuTable" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu" aria-labelledby={id}>
                            <li onClick={ () => handleClickMenu(id, "response") } ><span className="dropdown-item"><VisibilityIcon className="dropdownMenuCard" />     Lihat Hasil</span></li>
                            <li onClick={ () => handleClickMenu(id, "edit") } ><span className="dropdown-item"><EditIcon className="dropdownMenuCard"/>     Ubah</span></li>
                            <li onClick={ () => handleModal(id, title)}><span className="dropdown-item"><DeleteIcon className="dropdownMenuCard" />     Hapus</span></li>
                        </ul>
                    </div> : ""
                }
            </td>
        </tr>
        </>
    )
}

export default SurveyTable;