import React, { useState, useEffect } from 'react';
import APICall from 'utils/axios';
import Loading from 'components/common/Loading';
import { useParams } from 'react-router-dom';
import ResponsesField from './ResponsesField';

const SurveyPage = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const [hasilSurvey, setHasilSurvey] = useState({})

    useEffect(() => {
        const fetchSurvey = async () => {
            await APICall(`/allFormResponses/${id}`)
                .then(response => {
                    setHasilSurvey(response.data);
                }).finally(() => {
                    setLoading(false);
                })
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
                            <ResponsesField
                                hasilSurvey={hasilSurvey} />
                        </>
                    }
                </>

            }
        </>
    );
}

export default SurveyPage;