function SurveyTable(props) {
    const {id, title} = props;
    return (
        <tr>
            <td className="p-3">{title}</td>
            <td className="p-3">{id}</td>
        </tr>
    )
}

export default SurveyTable;