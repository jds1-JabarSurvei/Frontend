import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';
import APICall from "utils/axios"
import RenderedQuestion from './RenderedQuestion';
import { useParams } from 'react-router-dom';
import Loading from 'components/common/Loading';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const SurveyPage = () => {
    const [sectionIdx, setSectionIdx] = useState(0)
    const [survey, setSurvey] = useState([{ "id_form":"5",
                                            "pembuat":"user",
                                            "judulForm":"YUHUHUHU dummy"
                                            ,"pertanyaan":[
                                                {"judul":"BAGIAN 1",
                                                "bagian":0,
                                                "deskripsi":"YUHUHUHU dummy",
                                                "pertanyaan":[
                                                    {"pertanyaan":"YUHUHUHU (dummy)Kenapa Spongebob warnanya kuning?",
                                                        "id_form_field":10,
                                                        "deskripsi":"kemukakan jawaban anda mengenai warna kuning dari spongebob",
                                                        "required":"1",
                                                        "urutan":0,
                                                        "tipe":"short_answer",
                                                        "option":[]},
                                                    {"pertanyaan":"YUHUHUHU Pertanyaan 2 bagian 0 form 1?",
                                                        "id_form_field":11,
                                                        "deskripsi":"deskripsi pertanyaan 2 form 1",
                                                        "required":"1",
                                                        "urutan":1,
                                                        "tipe":"short_answer",
                                                        "option":[]}
                                                ]},
                                                {"judul":"BAGIAN 2",
                                                "bagian":1,
                                                "deskripsi":null,
                                                "pertanyaan":[
                                                    {"pertanyaan":"YUHUHUHU Pertanyaan 1  bagian 1 form 1?",
                                                    "id_form_field":12,
                                                    "deskripsi":"deskripsi pertanyaan 0 bagian 1 form 1",
                                                    "required":"1",
                                                    "urutan":0,
                                                    "tipe":"radio",
                                                    "option":[
                                                        {"nilai":"YUHUHUHUa",
                                                        "id_form_option":10},
                                                        {"nilai":"YUHUHUHUb",
                                                        "id_form_option":11},
                                                        {"nilai":"YUHUHUHUc",
                                                        "id_form_option":12}]}]},
                                                {"judul":"BAGIAN 3",
                                                "bagian":2,
                                                "deskripsi":null,
                                                "pertanyaan":[
                                                    {"pertanyaan":"YUHUHUHU Pertanyaan 1 bagian 2 form 1?",
                                                    "id_form_field":13,
                                                    "deskripsi":"deskripsi pertanyaan 1 bagian 2 form 1",
                                                    "required":"1",
                                                    "urutan":0,
                                                    "tipe":"checkbox",
                                                    "option":[
                                                        {"nilai":"YUHUHUHUa","id_form_option":13},
                                                        {"nilai":"YUHUHUHUb","id_form_option":14}
                                                        ,{"nilai":"YUHUHUHUc","id_form_option":15}]}]}]}]);
    const history = useHistory();
    let { id } = useParams();

    const [answer, setAnswer] = useState([]);
    // useEffect(() => getQuestionAPI(id), []);

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
            console.log('ha')
        });

    }

    const postResponse = async () => {
        // e.preventDefault();
        await APICall.post("/submitjawaban", {
            jawaban: answer[0]
        }).then((res) => {
            history.push('/');
            toast.success('Your response has been recorded!');
        }).catch(() =>
            // alert("GAGAL")
            console.log('halooooo')
        )
    }
    // useEffect(() => postResponse(), []);


    // useEffect(() => console.log(answer[0]), [])
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

