import React from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckboxVisualization from 'components/responses/CheckboxVisualization';
import PieCharts from 'components/responses/PieCharts'

const ResponsesField = ({ hasilSurvey, onDownloadClick }) => {
    const deleteNull = (arrayJawaban) => {
        arrayJawaban.forEach((element, index) => {
            if (element.jawaban == null) {
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
                            <GetAppIcon style={{ color: '#399F4F' }} />
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
                                                        <CheckboxVisualization answers={pertanyaan.value} options={pertanyaan.option} />
                                                        :
                                                        // Jika Tipe Pertanyaannya adalah RadioButton
                                                        (pertanyaan.tipe == "radio") ?
                                                            <PieCharts answers={pertanyaan.value} options={pertanyaan.option} />
                                                            :
                                                            // Jika Tipe Pertanyaannya adalah Alamat
                                                            (pertanyaan.tipe == "alamat") ?
                                                                <div className="jawaban_short_container">
                                                                    <div className="alamat_header alamat_row">
                                                                        <div className="alamat_column">Provinsi</div>
                                                                        <div className="alamat_column">Kabupaten</div>
                                                                        <div className="alamat_column">Kecamatan</div>
                                                                        <div className="alamat_column">Kelurahan</div>
                                                                        <div className="alamat_column">Detail</div>
                                                                    </div>
                                                                    {
                                                                        pertanyaan.value.map(jawaban => {
                                                                            let jawabanArray = jawaban.jawaban.toString().split(";");
                                                                            console.log(jawabanArray);
                                                                            return (
                                                                                <div className="short_answer alamat_row">
                                                                                    <div className="alamat_column">{jawabanArray[0]}</div>
                                                                                    <div className="alamat_column">{jawabanArray[1]}</div>
                                                                                    <div className="alamat_column">{jawabanArray[2]}</div>
                                                                                    <div className="alamat_column">{jawabanArray[3]}</div>
                                                                                    <div className="alamat_column">{jawabanArray[4]}</div>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
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