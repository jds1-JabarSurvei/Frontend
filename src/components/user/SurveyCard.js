
function SurveyCard(props) {
    const {id, title, owner, imagesource, isAdmin, handleModal} = props;
    return (
        <div className="col">
            <div className="card shadow-sm mb-4">
                <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt={title}/>
                <div className="card-body">
                    <div className="row">
                        <div className="col-9">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">oleh: {owner}</p>
                        </div>
                        <div className="col-3">
                            {
                                isAdmin ? 
                                <div className="dropdown">
                                    <i class="fas fa-ellipsis-v menuCard" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                                    <ul className="dropdown-menu" aria-labelledby={id}>
                                        <li><span className="dropdown-item"><i class="far fa-edit dropdownMenuCard"></i> UBAH</span></li>
                                        <li onClick={ () => handleModal(`${id}`)}><span className="dropdown-item"><i class="far fa-trash-alt dropdownMenuCard"></i> HAPUS</span></li>
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