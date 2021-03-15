import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';
import APICall from "utils/axios"
import RenderedQuestion from './RenderedQuestion'

const SurveyPage = () => {
    const [sectionIdx, setSectionIdx] = useState(0)
    const [survey, setSurvey] = useState([
        {
            "id_form": 5678,
            "pembuat": "user",
            "judulForm": "dummy",
            "pertanyaan": [
                {
                    "judul": "BAGIAN 1",
                    "bagian": 0,
                    "deskripsi": "dummy",
                    "pertanyaan": [
                        {
                            "pertanyaan": "(dummy)Kenapa Spongebob warnanya kuning?",
                            "id_form_field": 1,
                            "deskripsi": "kemukakan jawaban anda mengenai warna kuning dari spongebob",
                            "required": 1,
                            "urutan": 1,
                            "tipe": "short_answer",
                            "option": []
                        },
                        {
                            "pertanyaan": "Pertanyaan 2 bagian 0 form 1?",
                            "id_form_field": 2,
                            "deskripsi": "deskripsi pertanyaan 2 form 1",
                            "required": 1,
                            "urutan": 2,
                            "tipe": "short_answer",
                            "option": []
                        }
                    ]
                },
                {
                    "judul": "BAGIAN 2",
                    "bagian": 1,
                    "deskripsi": null,
                    "pertanyaan": [
                        {
                            "pertanyaan": "Pertanyaan 1  bagian 1 form 1?",
                            "id_form_field": 3,
                            "deskripsi": "deskripsi pertanyaan 0 bagian 1 form 1",
                            "required": 1,
                            "urutan": 1,
                            "tipe": "short_answer",
                            "option": []
                        }
                    ]
                },
                {
                    "judul": "BAGIAN 3",
                    "bagian": 2,
                    "deskripsi": null,
                    "pertanyaan": [
                        {
                            "pertanyaan": "Pertanyaan 1 bagian 2 form 1?",
                            "id_form_field": 4,
                            "deskripsi": "deskripsi pertanyaan 1 bagian 2 form 1",
                            "required": 1,
                            "urutan": 1,
                            "tipe": "checkbox",
                            "option": [
                                {
                                    "nilai": "a",
                                    "id_form_option": 1
                                },
                                {
                                    "nilai": "b",
                                    "id_form_option": 2
                                },
                                {
                                    "nilai": "c",
                                    "id_form_option": 3
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ])

    
    const [answer, setAnswer] = useState([{ "idform" : survey[0].id_form,
                                            "jawaban":[]    }])

    const getQuestionAPI = (id) => {
      return new Promise((resolve, reject) =>{
        APICall.get("/formQuestions/"+id, {
            id: id,
          }).then(res=>{
            console.log("BERHASIL");
            console.log(res.data)
            setSurvey([res.data]);
          }).catch(()=> {
            console.log("GAGAL");
            setSurvey([]);
          });
      })
    }

    const postResponse = (e) => {
        // e.preventDefault();
        // return (
            
            APICall.post("/submitjawaban", {
                jawaban: answer[0]
            }).then(()=> {
                alert("MANTAP")
                console.log(answer[0])})
            .catch(()=> alert("GAGAL"))
        // )
    }
    useEffect(() => postResponse(), []);
    // useEffect(() => getQuestionAPI(2), []);

    useEffect(() => console.log(answer[0]), [])
    const back = () => {
        console.log(answer)
        setSectionIdx(sectionIdx-1);
    }
    const next = () => {
        console.log(answer[0])
        setSectionIdx(sectionIdx+1);
    }
    const checkButton = (nSection) =>{
        if (sectionIdx == 0 && nSection>1){
            return(
                <div>
                    <button className="next" onClick={next}>Next</button>
                </div>
            )
        }
        if (sectionIdx > 0 && sectionIdx<nSection-1){
            return(
                <div>
                    <button className="back" onClick={back}>Back</button>
                    <button className="next" onClick={next}>Next</button>
                </div>
            )
        }
        if (sectionIdx > 0 && sectionIdx == nSection-1){
            return(
                <div>
                    <button className="back" onClick={back}>Back</button>
                    <input type="submit" value="Submit" className="submit" onSubmit={postResponse}></input>
                </div>
                
            )
        }
    }

    return (
        <div className="survey-page">
            <div className="survey-title">
                {survey.judulForm}
            </div>
            {survey.map(({form_id, pembuat, judulForm, pertanyaan}, i)=>{
                return(
                    <div key={i}>
                        <form>
                            <div className="survey-title">
                                {judulForm}
                            </div>
                            {pertanyaan.map(({judul, bagian, deskripsi, pertanyaan}, j)=>{
                            return(
                                
                                <div key={j}>
                                    <div className={sectionIdx==j ? "section-container":"hide"}>
                                        <div className="section-header" >
                                            <div className="section-title">{judul}</div>
                                            <div className="section-info">
                                                <div className="section-description">{deskripsi}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={sectionIdx==j ? "":"hide"}>
                                        {pertanyaan.map(({pertanyaan, id_form_field, tipe, option}, k)=>{
                                            return(
                                                <div className="question-container">
                                                    <div className="question-title">
                                                        <div className="form-group">
                                                            <label for={pertanyaan} className="question">{pertanyaan}</label><br></br>
                                                            {/* {getAnswer(id_form_field, "")} */}
                                                            <RenderedQuestion
                                                                answer = {answer}
                                                                type = {tipe}
                                                                id_form_field = {id_form_field}
                                                                pertanyaan = {pertanyaan}
                                                                option = {option}
                                                                key = {k}
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
        </div>            
    );
}

export default SurveyPage;

