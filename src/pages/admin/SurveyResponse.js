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
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [downloadData, setDownloadData] = useState([]);
    const { id } = useParams();
    const downloadRef = useRef();

    const [hasilSurvey, setHasilSurvey] = useState({})

    useEffect(() => {
        const fetchSurvey = async () => {
            console.log('halo')
            await APICall(`/allFormResponses/${id}`)
                .then(response => {
                    setHasilSurvey(response.data);
                    let tempHeaders = [];
                    let tempResponses = [];
                    response.data.responses.forEach(bagian => {
                        bagian.response.forEach(pertanyaan => {
                            tempHeaders.push({
                                label: pertanyaan.pertanyaan,
                                key: bagian.bagian.toString() + '_' + pertanyaan.urutan.toString()
                            });
                            // First push empty objects to tempResponses
                            if (tempResponses.length == 0) {
                                pertanyaan.value.forEach(val => tempResponses.push({}))
                            }
                            pertanyaan.value.forEach((value, idx) => {
                                tempResponses[idx][bagian.bagian.toString() + '_' + pertanyaan.urutan.toString()] = value.jawaban.join(", ");
                            })
                        });
                    });

                    setHeaders(tempHeaders);
                    setDownloadData(tempResponses)
                }).finally(() => {
                    setLoading(false);
                })
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
                                headers={headers}
                                filename={`${hasilSurvey.judulForm}.csv`}
                                ref={downloadRef}
                                target="_blank" />

                            {/* <Table columns={columns} data={responses} /> */}
                            <ResponsesField onDownloadClick={onDownloadClick} hasilSurvey={hasilSurvey} />
                        </>
                    }
                </>

            }
        </>
    );
}

export default SurveyPage;