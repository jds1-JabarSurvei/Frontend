import { useHistory } from 'react-router-dom';
import AddBoxIcon from '@material-ui/icons/AddBox';
function SurveyTableAdd() {

    const history = useHistory();

    const onSurveyClick = () => {
        history.push(`/admin/survey/new`);
    }

    return (
        <>
            <tr className="survey-table-add" onClick={() => onSurveyClick()} data-testid="survey_table_add">
                <td className="p-3" colSpan="4">
                    <AddBoxIcon />
                    <span style={{ padding: "0 10px" }}>Buat Survei Baru</span>
                </td>
            </tr>
        </>
    )
}

export default SurveyTableAdd;