function SurveyTable(props) {
    const { id, title, isAdmin, handleModal } = props;
    return (
        <>
            <tr>
                <td className="p-3">{title}</td>
                <td className="p-3">{id}</td>
                <td className="p-3">
                    {
                        isAdmin ?
                            <div className="dropdown">
                                <i className="fas fa-ellipsis-h menuTable" id={id} data-bs-toggle="dropdown" aria-expanded="false"></i>
                                <ul className="dropdown-menu" aria-labelledby={id}>
                                    <li><span className="dropdown-item"><i className="far fa-edit dropdownMenuCard"></i> EDIT</span></li>
                                    <li onClick={() => handleModal(`${id}`)}><span className="dropdown-item"><i className="far fa-trash-alt dropdownMenuCard"></i> DELETE</span></li>
                                </ul>
                            </div> : ""
                    }
                </td>
            </tr>
        </>
    )
}

export default SurveyTable;