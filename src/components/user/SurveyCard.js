import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import APICall from 'utils/axios';
import { toast } from 'react-toastify';

function SurveyCard(props) {
    const { id, title, owner, time, imagesource, isAdmin, handleModal } = props;
    const history = useHistory();
    const { currentUser } = useAuth();

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
            <div className="col pb-4" >
                <div className="card shadow-sm h-100">
                    <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt={title} onClick={() => onSurveyClick(id)}/>
                    <div className="card-body">
                        <div className="row ">
                            <div className="col-9"  onClick={() => onSurveyClick(id)}>
                                <h5 className="card-title">{title}</h5>
                                <h6 className="card-text">oleh: {owner}</h6>
                                <h6 className="text-muted" style={{fontSize:"12px"}}>{date}</h6>
                            </div>
                            <div className="col-3">
                        {
                        isAdmin ?
                            <div className="dropdown">
                                <i className="fas fa-ellipsis-v menuCard" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul className="dropdown-menu" aria-labelledby={id}>
                                        <li><span className="dropdown-item"><i className="far fa-edit dropdownMenuCard"></i> UBAH</span></li>
                                        <li onClick={() => handleModal(`${id}`)}><span className="dropdown-item"><i className="far fa-trash-alt dropdownMenuCard"></i> HAPUS</span></li>
                                    </ul>
                                    
                            </div> : ""
                        }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SurveyCard;