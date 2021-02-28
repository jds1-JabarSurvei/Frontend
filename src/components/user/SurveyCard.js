function SurveyCard(props) {
    const {id, title, owner, imagesource} = props;
    return (
        <div className="col">
            <div className="card shadow-sm mb-4">
                <img src={imagesource} className="survey-img card-img-top" height="100%" width="auto" alt={title}/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">oleh: {owner}</p>
                </div>
            </div>
        </div>
    )
}

export default SurveyCard;