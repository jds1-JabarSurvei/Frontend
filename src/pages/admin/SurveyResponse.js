import React, { useState, useEffect } from 'react';
import APICall from 'utils/axios';
import Table from 'components/responses/Table';
import Loading from 'components/common/Loading';
import { useParams } from 'react-router-dom';

const SurveyPage = () => {
    const [responses, setResponses] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [surveyInfo, setSurveyInfo] = useState({});
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchSurvey = async () => {
            let surveyInfoSuccess = false;
            await APICall(`/formQuestions/${id}`)
                .then(response => {

                    let tempColumns = [];
                    response.data.pertanyaan.forEach((bagian) => {
                        let header = {
                            Header: bagian.judul,
                            columns: bagian.pertanyaan.map(pertanyaan => {
                                return {
                                    Header: pertanyaan.pertanyaan,
                                    accessor: bagian.bagian.toString() + "_" + pertanyaan.urutan.toString()
                                }
                            })
                        }
                        tempColumns.push(header);
                    });
                    surveyInfoSuccess = true;
                    let tempSurveyInfo = { ...response.data };
                    delete tempSurveyInfo["pertanyaan"];
                    setSurveyInfo(tempSurveyInfo);
                    setColumns(tempColumns);
                }).catch(() => {
                    console.log('Error retrieving survey');
                    setError(true);
                });
            if (surveyInfoSuccess) {
                await APICall(`/allFormResponses/${id}`)
                    .then(response => {
                        let tempResponses = [];
                        response.data.forEach(indivResponse => {
                            let questionResponse = {}
                            indivResponse.responses.forEach(sectionResponse => {
                                sectionResponse.response.forEach((res) => {
                                    let questionKey = sectionResponse.bagian.toString() + '_' + res.urutan.toString();
                                    questionResponse[questionKey] = res.value[0]
                                })
                            })
                            tempResponses.push(questionResponse);
                        })
                        setResponses(tempResponses);

                    }).catch(() => {
                        setError(true);
                    })

            }
            setLoading(false);
        }


        fetchSurvey();

    }, []);

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
                            <h1>{surveyInfo.judulForm}</h1>
                            <span>Dibuat oleh: {surveyInfo.pembuat}</span>
                            <Table columns={columns} data={responses} />
                        </>
                    }
                </>

            }
        </>
    );
}

export default SurveyPage;