import React, { useState, useEffect, useRef } from 'react';
import APICall from 'utils/axios';
import Loading from 'components/common/Loading';
import { useParams } from 'react-router-dom';
import { CSVLink } from "react-csv";
import ResponsesField from './ResponsesField';

const SurveyPage = () => {
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [downloadData, setDownloadData] = useState([]);
    const { id } = useParams();
    const downloadRef = useRef();

    const [hasilSurvey, setHasilSurvey] = useState({})

    useEffect(() => {
        const fetchSurvey = async () => {
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

                            <CSVLink
                                data={downloadData}
                                headers={headers}
                                filename={`${hasilSurvey.judulForm}.csv`}
                                ref={downloadRef}
                                target="_blank" />

                            <ResponsesField onDownloadClick={onDownloadClick} hasilSurvey={hasilSurvey} />
                        </>
                    }
                </>

            }
        </>
    );
}

export default SurveyPage;