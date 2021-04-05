import React, { useState, useEffect, useRef } from 'react';
import APICall from 'utils/axios';
import Table from 'components/responses/Table';
import Loading from 'components/common/Loading';
import { useParams } from 'react-router-dom';
import { CSVLink } from "react-csv";
import ResponsesField from './ResponsesField';
import GetAppIcon from '@material-ui/icons/GetApp';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

const SurveyPage = () => {
    const [responses, setResponses] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [surveyInfo, setSurveyInfo] = useState({});
    const [error, setError] = useState(false);
    const [downloadData, setDownloadData] = useState([]);
    const { id } = useParams();
    const downloadRef = useRef();

    const [ hasilSurvey, setHasilSurvey ] = useState({})

    useEffect(() => {
        const fetchSurvey = async () => {
            await APICall(`/allFormResponses/${id}`)
            .then( response => {
                setHasilSurvey(response.data);
                
                let csvData = [];
                let tempPertanyaan = [];
                let tempMatrixJawaban = [];
                response.data.responses.forEach( bagian => {
                    bagian.response.forEach( pertanyaan => {
                        let tempJawaban = [];
                        tempPertanyaan.push(pertanyaan.pertanyaan.toString());

                        pertanyaan.value.forEach( jawaban => {
                            tempJawaban.push(jawaban.jawaban.toString());
                        })

                        tempMatrixJawaban.push(tempJawaban);
                    });
                });

                // Tranpose Matrix
                let matrixJawaban = tempMatrixJawaban[0].map((_, colIndex) => tempMatrixJawaban.map(row => row[colIndex]));
                
                csvData.push(tempPertanyaan);
                matrixJawaban.forEach( row => {
                    csvData.push(row);
                });
                setDownloadData(csvData);
            })
            // let surveyInfoSuccess = false;
            // let csvData = [];
            // let tempColumns = [];
            // let tempResponses = [];
            // await APICall(`/formQuestions/${id}`)
            //     .then(response => {

            //         response.data.pertanyaan.forEach((bagian) => {
            //             let columns = [];
            //             let csvColumns = [];
            //             bagian.pertanyaan.forEach(pertanyaan => {
            //                 columns.push({
            //                     Header: pertanyaan.pertanyaan,
            //                     accessor: bagian.bagian.toString() + "_" + pertanyaan.urutan.toString()
            //                 });
            //                 csvColumns.push(pertanyaan.pertanyaan);
            //             })
            //             tempColumns.push({
            //                 Header: bagian.judul,
            //                 columns,
            //             });
            //             csvData.push(csvColumns);
            //         });
            //         surveyInfoSuccess = true;
            //         let tempSurveyInfo = { ...response.data };
            //         delete tempSurveyInfo["pertanyaan"];
            //         setSurveyInfo(tempSurveyInfo);
            //         setColumns(tempColumns);
            //     }).catch(() => {
            //         console.log('Error retrieving survey');
            //         setError(true);
            //     });
            // if (surveyInfoSuccess) {
            //     let csvRow = [];
            //     await APICall(`/allFormResponses/${id}`)
            //         .then(response => {
            //             response.data.forEach(indivResponse => {
            //                 csvRow = [];
            //                 let questionResponse = {}
            //                 indivResponse.responses.forEach(sectionResponse => {
            //                     sectionResponse.response.forEach((res) => {
            //                         let questionKey = sectionResponse.bagian.toString() + '_' + res.urutan.toString();
            //                         let value = res.value.join(", ");
            //                         questionResponse[questionKey] = value;
            //                         csvRow.push(value);
            //                     })
            //                 })
            //                 tempResponses.push(questionResponse);
            //                 csvData.push(csvRow);
            //             })
            //             setResponses(tempResponses);
            //             setDownloadData(csvData);
            //         }).catch(() => {
            //             setError(true);
            //         })
            // }
            setLoading(false);
        }


        fetchSurvey();

    }, []);

    const onDownloadClick = () => {
        if (downloadRef.current) {
            console.log(downloadRef)
            console.log(downloadData)
            downloadRef.current.link.click();
        }
    }

    return (
        <>
            {loading ?
                <div className="loading-container">
                    <Loading />
                </div>
                :
                <>
                    {error ?
                        <h6>Error detected. Please try again and refresh</h6>
                        :
                        <>
                            {/* <h1>{surveyInfo.judulForm}</h1>
                            <span>Dibuat oleh: {surveyInfo.pembuat}</span>
                            <button onClick={onDownloadClick}>Download</button> */}
                            
                            <CSVLink
                                data={downloadData}
                                filename={`${surveyInfo.judulForm}.csv`}
                                ref={downloadRef}
                                target="_blank" />

                            {/* <Table columns={columns} data={responses} /> */}
                            <ResponsesField  onDownloadClick={onDownloadClick} hasilSurvey={hasilSurvey} />
                        </>
                    }
                </>

            }
        </>
    );
}

export default SurveyPage;