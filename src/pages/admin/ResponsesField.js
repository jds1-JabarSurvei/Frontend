import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckboxChart from 'components/responses/CheckboxChart';

const ResponsesField = ({ hasilSurvey, onDownloadClick }) => {
    const deleteNull = (arrayJawaban) => {
        arrayJawaban.forEach((element, index) => {
            if (element.jawaban == "") {
                arrayJawaban.splice(index, 1);
            }
        });
        return arrayJawaban;
    }

    return (
        <>
            <div className="question-container-new">
                <h1>{hasilSurvey.judulForm}</h1>
                <span>Dibuat oleh: {hasilSurvey.pembuat}</span>
                <div className="download-csv">
                    <Tooltip title="Unduh File CSV" placement="right" arrow>
                        <IconButton aria-label="download" onClick={onDownloadClick}>
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>

            {
                hasilSurvey.responses.map((bagian, index) => {
                    return (
                        <div className="section-container-new">
                            <div className="section-header-new">
                                <div className="section-count-new">
                                    BAGIAN {index + 1} DARI {hasilSurvey.responses.length}
                                </div>
                                <div className="section-info-new">
                                    <div className="section-title-new">{bagian.judul}</div>
                                </div>
                            </div>

                            {
                                bagian.response.map(pertanyaan => {
                                    return (
                                        <div className="question-container-new">
                                            <div className="question-title-new">{pertanyaan.pertanyaan}</div>
                                            <div className="">{deleteNull(pertanyaan.value).length} Tanggapan</div>
                                            {
                                                // Jika Tipe Pertanyaan Short atau Paragraph
                                                (pertanyaan.tipe == "short_answer" || pertanyaan.tipe == "paragraph") ?
                                                    <div className="jawaban_short_container">
                                                        {
                                                            pertanyaan.value.map(jawaban => {
                                                                return (
                                                                    <div className="short_answer">
                                                                        {jawaban.jawaban}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    :
                                                    // Jika Tipe Pertanyaannya adalah Checkbox
                                                    (pertanyaan.tipe == "checkbox") ?
                                                        <CheckboxChart answers={pertanyaan.value} options={pertanyaan.option} />
                                                        :
                                                        // Jika Tipe Pertanyaannya adalah RadioButton
                                                        (pertanyaan.tipe == "radio") ?
                                                            console.log("radio")
                                                            :
                                                            // Jika Tipe Pertanyaannya adalah Alamat
                                                            (pertanyaan.tipe == "alamat") ?
                                                                console.log("alamat")
                                                                :
                                                                ""
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </>
    )
}

export default ResponsesField;