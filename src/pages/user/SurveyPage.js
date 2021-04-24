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

        await APICall.post("/submitjawaban", {
            id_form: answer[0].idform,
            jawaban: answer[0].jawaban
        }).then((res) => {
            history.push('/');
            toast.success('Jawabanmu sudah terkirim!');
        }).catch(() =>
            console.log('Error detected')
        )
    }

    const handleSubmit = () => {
        let isSubmit = [];
        let isCorrect = true;
        let count = 0;

        for (var i = 0; i < survey[0].pertanyaan.length; i++) {
            for (var j = 0; j < survey[0].pertanyaan[i].pertanyaan.length; j++) {
                isSubmit.push(false);
            }
        }

        for (var i = 0; i < survey[0].pertanyaan.length; i++) {
            for (var j = 0; j < survey[0].pertanyaan[i].pertanyaan.length; j++) {
                count++;
                for (var k = 0; k < answer[0].jawaban.length; k++) {
                    if (survey[0].pertanyaan[i].pertanyaan[j].id_form_field == answer[0].jawaban[k].id_form_field && answer[0].jawaban[k].value != "") {
                        isSubmit[count - 1] = true;
                    }
                    if (survey[0].pertanyaan[i].pertanyaan[j].required == "0") {
                        isSubmit[count - 1] = true;
                    }
                }
                // 
            }
        }
        console.log(isSubmit)
        // console.log(answer[0].jawaban)
        for (var i = 0; i < isSubmit.length; i++) {
            if (!isSubmit[i]) {
                isCorrect = isSubmit[i];
                break;
            }
        }
        if (isCorrect) {
            postResponse();
        } else {
            toast.error('Terdapat pertanyaan wajib yang belum dijawab');
        }
    }

    const back = (event) => {
        event.preventDefault();
        setSectionIdx(sectionIdx - 1);
    }
    const next = (event) => {
        event.preventDefault();
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
                    <button type="button" className="submit" onClick={handleSubmit}>KIRIM</button>
                </>

            )
        }
        if (nSection == 1) {
            return (
                <>
                    <button type="button" className="submit" onClick={handleSubmit}>KIRIM</button>
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
                                                    {pertanyaan.map(({ pertanyaan, id_form_field, tipe, option, required }, k) => {
                                                        return (
                                                            <div className="question-container">
                                                                {/* Section Container */}
                                                                <div className="question-title">
                                                                    <div className="form-group">
                                                                        <label for={pertanyaan} className="question">{pertanyaan}</label>
                                                                        <i className={required == "0" ? "unrequired" : "requireds"}>*</i><br></br>
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

