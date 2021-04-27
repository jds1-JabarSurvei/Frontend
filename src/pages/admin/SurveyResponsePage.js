import React, { useState, useEffect } from 'react';
import APICall from 'utils/axios';
import Loading from 'components/common/Loading';
import { useParams } from 'react-router-dom';
import ResponsesField from './ResponsesField';

const SurveyResponsePage = () => {
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
            <div className="tab-container">
                {loading ?
                    <div className="loading-container">
                        <Loading />
                    </div>
                    :
                    <>
                        {error ?
                            <h6>Kesalahan terdeteksi. silakan coba lagi nanti</h6>
                            :
                            <>
                                <ResponsesField
                                    hasilSurvey={hasilSurvey} />
                            </>
                        }
                    </>
                }
            </div>
        </>
    );
}

export default SurveyResponsePage;