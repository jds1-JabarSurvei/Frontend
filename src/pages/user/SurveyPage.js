import React, { useState, useEffect } from 'react';
import './style.css';
import APICall from "utils/axios"
import RenderedQuestion from '../../components/user/RenderedQuestion';
import { useParams } from 'react-router-dom';
import Loading from 'components/common/Loading';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const SurveyPage = () => {
    const [sectionIdx, setSectionIdx] = useState(0)
    const [survey, setSurvey] = useState([])
    const history = useHistory();
    let { id } = useParams();

    const [answer, setAnswer] = useState([]);
    useEffect(() => getQuestionAPI(id), []);

    const getQuestionAPI = async (id) => {

        await APICall.get("/formQuestions/" + id, {
            id: id,
        }).then(res => {
            setSurvey([res.data]);
            setAnswer([{
                "idform": res.data.id_form,
                "jawaban": []
            }]);
        }).catch(() => {
            setSurvey([]);
        });
    }

    const postResponse = async () => {
        // e.preventDefault();
        await APICall.post("/submitjawaban", {
            jawaban: answer
        }).then((res) => {
            console.log(answer)
            history.push('/');
            toast.success('Your response has been recorded!');
        }).catch(() =>
            console.log('halooooo')
        )
    }
    
    const back = () => {
        console.log(answer)
        setSectionIdx(sectionIdx - 1);
    }
    const next = () => {
        console.log(answer[0])
        setSectionIdx(sectionIdx + 1);
    }
    const checkButton = (nSection) => {
        if (sectionIdx == 0 && nSection > 1) {
            return (
                <div>
                    <button className="next" onClick={next}>Next</button>
                </div>
            )
        }
        if (sectionIdx > 0 && sectionIdx < nSection - 1) {
            return (
                <div>
                    <button className="back" onClick={back}>Back</button>
                    <button className="next" onClick={next}>Next</button>
                </div>
            )
        }
        if (sectionIdx > 0 && sectionIdx == nSection - 1) {
            return (
                <div>
                    <button className="back" onClick={back}>Back</button>
                    <button type="button" className="submit" onClick={postResponse}>Submit</button>
                </div>

            )
        }
    }

    return (

        <div className="survey-page">
            {survey.length > 0 ?
                <>
                    <div className="survey-title">
                        {survey.judulForm}
                    </div>
                    {survey.map(({ form_id, pembuat, judulForm, pertanyaan }, i) => {
                        return (
                            <div key={i}>
                                <form>
                                    <div className="survey-title">
                                        {judulForm}
                                    </div>
                                    {pertanyaan.map(({ judul, bagian, deskripsi, pertanyaan }, j) => {
                                        return (

                                            <div key={j}>
                                                <div className={sectionIdx == j ? "section-container" : "hide"}>
                                                    <div className="section-header" >
                                                        <div className="section-title">{judul}</div>
                                                        <div className="section-info">
                                                            <div className="section-description">{deskripsi}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={sectionIdx == j ? "" : "hide"}>
                                                    {pertanyaan.map(({ pertanyaan, id_form_field, tipe, option }, k) => {
                                                        return (
                                                            <div className="question-container">
                                                                <div className="question-title">
                                                                    <div className="form-group">
                                                                        <label for={pertanyaan} className="question">{pertanyaan}</label><br></br>
                                                                        <RenderedQuestion
                                                                            answer={answer}
                                                                            type={tipe}
                                                                            id_form_field={id_form_field}
                                                                            pertanyaan={pertanyaan}
                                                                            option={option}
                                                                            key={k}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {checkButton(pertanyaan.length)}
                                </form>
                            </div>
                        )
                    })}
                </>
                : <Loading />}
        </div>
    );
}

export default SurveyPage;

