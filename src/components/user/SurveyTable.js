function SurveyTable(props) {
    const {id, title, owner, isAdmin, handleModal} = props;
    return (
        <>
        <tr>
            <td className="p-3">{title}</td>
            <td className="p-3">{owner}</td>
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