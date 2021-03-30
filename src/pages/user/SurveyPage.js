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
        console.log("Alohaa!!");
        console.log(answer);
        console.log("Alohhaaa!!!");
        await APICall.post("/submitjawaban", {
            id_form: answer[0].idform,
            jawaban: answer[0].jawaban 
        }).then((res) => {
            console.log(answer)
            history.push('/');
            toast.success('Your response has been recorded!');
        }).catch(() =>
            console.log('halooooo')
        )
    }
    
    const back = (event) => {
        event.preventDefault();
        console.log(answer)
        setSectionIdx(sectionIdx - 1);
    }
    const next = (event) => {
        event.preventDefault();
        console.log("masukk next");
        console.log(answer[0])
        setSectionIdx(sectionIdx + 1);
    }
    const checkButton = (nSection) => {
        if (sectionIdx == 0 && nSection > 1) {
            return (
                <button className="next" onClick={next}>SELANJUTNYA</button>
            )
        }
        if (sectionIdx > 0 && sectionIdx < nSection - 1) {
            return (
                <>
                    <button className="back" onClick={back}>KEMBALI</button>
                    <button className="next" onClick={next}>SELANJUTNYA</button>
                </>
            )
        }
        if (sectionIdx > 0 && sectionIdx == nSection - 1) {
            return (
                <>
                    <button className="back" onClick={back}>KEMBALI</button>
                    <button type="button" className="submit" onClick={postResponse}>KIRIM</button>
                </>

            )
        }
        if (nSection == 1) {
            return (
                <>
                    <button type="button" className="submit" onClick={postResponse}>KIRIM</button>
                </>
            )
        }
    }

    return (

        <div className="survey-page">
            {survey.length > 0 ?
                <>
                    {survey.map(({ form_id, pembuat, judulForm, pertanyaan }, i) => {
                        return (
                            
                            <div key={i}>
                                <form>
                                    {/* Judul Form */}
                                    <div className={sectionIdx == 0 ? "survey-title-container" : "hide"}>
                                        <div className="survey-title">
                                            <h1>{judulForm}</h1>
                                        </div>
                                    </div>
                                    {pertanyaan.map(({ judul, bagian, deskripsi, pertanyaan }, j) => {
                                        return (

                                            <div key={j}>
                                                {/* Section Container */}
                                                <div className={sectionIdx == j ? "section-container" : "hide"}>
                                                    <div className="section-header" >
                                                        <div className="section-info">
                                                            <div className="section-title">{judul}</div>
                                                            <div className="section-description">{deskripsi}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={sectionIdx == j ? "" : "hide"}>
                                                    {pertanyaan.map(({ pertanyaan, id_form_field, tipe, option }, k) => {
                                                        return (
                                                            <div className="question-container">
                                                                {/* Section Container */}
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
                                    <div className="button-flex">
                                        {checkButton(pertanyaan.length)}
                                    </div>
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

