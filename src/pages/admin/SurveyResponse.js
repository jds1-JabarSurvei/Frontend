import React, { useState, useEffect } from 'react';
import APICall from 'utils/axios';
import Table from 'components/responses/Table';


const SurveyPage = () => {
    const [responses, setResponses] = useState([]);
    const [columns, setColumns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurvey = async () => {
            let surveyInfoSuccess = false;
            await APICall('/formQuestions/4')
                .then(response => {
                    // console.log(response.data);
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
                    setColumns(tempColumns);
                }).catch(() => {
                    console.log('Error retrieving survey');
                });
            await APICall('/allFormResponses/4')
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

                })
            setLoading(false);
        }

        fetchSurvey();

    }, []);

    return (
        <>
            {loading ?
                <h1>Loading...</h1> :
                <Table columns={columns} data={responses} />
            }
        </>
    );
}

export default SurveyPage;