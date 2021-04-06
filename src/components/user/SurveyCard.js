import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import APICall from 'utils/axios';
import { toast } from 'react-toastify';

function SurveyCard(props) {
    const { id, title, owner, imagesource, isAdmin, handleModal } = props;
    const history = useHistory();
    const { currentUser } = useAuth();

    const onSurveyClick = (id) => {
        if (!currentUser) {
            history.push(`/survey/${id}`);
        } else {
            history.push(`admin/survey/response/${id}`);
        }
        // console.log('halo')
    }

    
    return (
        <div>
            <div className="col pb-4" >
            <div className="card shadow-sm h-100">
                <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt={title} onClick={() => onSurveyClick(id)}/>
                <div className="card-body">
                    <div className="row ">
                        <div className="col-9"  onClick={() => onSurveyClick(id)}>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">oleh: {owner}</p>
                        </div>
                        <div className="col-3">
            {
                isAdmin ?
                    <div className="dropdown">
                        <i className="fas fa-ellipsis-v menuCard" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                            <ul className="dropdown-menu" aria-labelledby={id}>
                                <li><span className="dropdown-item"><i className="far fa-edit dropdownMenuCard"></i> UBAH</span></li>
                                <li onClick={() => handleModal(`${id}`)}><span className="dropdown-item"><i className="far fa-trash-alt dropdownMenuCard"></i> HAPUS</span></li>
                                {/* <li onClick={(e)=>{onDeleteClick(e, id, title)}}><span className="dropdown-item"><i className="far fa-trash-alt dropdownMenuCard"></i> HAPUS</span></li> */}
                            </ul>
                            
                    </div> : ""
            }
                    </div>
                </div>
            
                
            </div>
            </div>

            
        </div>
        {/* <!-- Button trigger modal --> */}
{/* <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button> */}

{/* <!-- Modal --> */}
{/* <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div> */}
        </div>

        
    )
}

export default SurveyCard;