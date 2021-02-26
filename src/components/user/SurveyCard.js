function surveyCard(props) {
    const {id, title, imagesource} = props;
    return (
        <div className="col">
            <div className="card shadow-sm mb-4">
                <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt={id}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">oleh: {id}</p>
                </div>
            </div>
        </div>
    )
}

export default surveyCard;