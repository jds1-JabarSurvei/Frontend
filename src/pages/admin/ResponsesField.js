import React, { useState, useEffect } from 'react';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CheckboxVisualization from 'components/responses/CheckboxVisualization';
import PieCharts from 'components/responses/PieCharts';
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ResponsesField = ({ hasilSurvey, onDownloadClick }) => {
    const [headers, setHeaders] = useState([]);
    const [downloadData, setDownloadData] = useState([]);

    useEffect(() => {


        let tempHeaders = [];
        let tempResponses = [];
        hasilSurvey.responses.forEach(bagian => {
            bagian.response.forEach(pertanyaan => {
                // <ExcelColumn label="Name" value="name" />
                tempHeaders.push(<ExcelColumn label={pertanyaan.pertanyaan} value={bagian.bagian.toString() + '_' + pertanyaan.urutan.toString()} />)
                // tempHeaders.push({
                //     label: pertanyaan.pertanyaan,
                //     key: bagian.bagian.toString() + '_' + pertanyaan.urutan.toString()
                // });
                // First push empty objects to tempResponses
                if (tempResponses.length == 0) {
                    pertanyaan.value.forEach(val => tempResponses.push({}))
                }
                pertanyaan.value.forEach((value, idx) => {
                    tempResponses[idx][bagian.bagian.toString() + '_' + pertanyaan.urutan.toString()] = value.jawaban && value.jawaban.join(", ");
                })
            });
        });

        setHeaders(tempHeaders);
        setDownloadData(tempResponses);
        console.log(tempHeaders)
        console.log(tempResponses)
    }, []);


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
                    <ExcelFile
                        filename={hasilSurvey.judulForm}
                        element={
                            <Tooltip title="Unduh File Excel" placement="right" arrow>
                                <IconButton aria-label="download" onClick={onDownloadClick}>
                                    <GetAppIcon style={{ color: '#399F4F' }} />
                                </IconButton>
                            </Tooltip>
                        }>
                        <ExcelSheet data={downloadData} name={hasilSurvey.judulForm}>
                            {headers}
                        </ExcelSheet>
                    </ExcelFile>

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