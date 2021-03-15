import QuestionsTab from 'components/newSurvey/QuestionsTab';
import Preview from 'components/newSurvey/Preview';
import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';
import APICall from "utils/axios"
import RenderedQuestion from './RenderedQuestion'

import Section from "components/newSurvey/Section.js";
import { faMapSigns } from '@fortawesome/free-solid-svg-icons';






// function shoot() {
//   alert("Great Shot!");
// }

// // const SurveyPage = (
// //   <button onClick={shoot}>Take the shot!</button>
// // );




// const myFunction = () => {

//     // document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
//     console.log('this is:');
// }

const SurveyPage = () => {
    const [sectionIdx, setSectionIdx] = useState(0)
    const [survey, setSurvey] = useState([{
        "form_id": "1",
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
                        "urutan": 1,
                        "tipe": "short_answer",
                        "option": []
                    },
                    {
                        "pertanyaan": "Pertanyaan 2 bagian 0 form 1?",
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
                        "urutan": 1,
                        "tipe": "radio",
                        "option": [
                            {
                                "nilai": "a"
                            },
                            {
                                "nilai": "b"
                            },
                            {
                                "nilai": "c"
                            }
                        ]
                    },
                    {
                        "pertanyaan": "multiple choice (radi",
                        "tipe": "radio",
                        "option": [
                            {
                                "nilai": "a"
                            },
                            {
                                "nilai": "b"
                            },
                            {
                                "nilai": "c"
                            }
                        ]
                    },
                    {
                        "pertanyaan": "multiple choice (ra",
                        "tipe": "paragraph",
                        "option": [
                            {
                                "nilai": "a"
                            },
                            {
                                "nilai": "b"
                            },
                            {
                                "nilai": "c"
                            }
                        ]
                    },
                    {
                        "pertanyaan": "multiple choice ",
                        "tipe": "select",
                        "option": [
                            {
                                "nilai": "axfdghjkl;"
                            },
                            {
                                "nilai": "b"
                            },
                            {
                                "nilai": "c"
                            }
                        ]
                    },
                    {
                        "pertanyaan": "multiple choic",
                        "tipe": "checkbox",
                        "option": [
                            {
                                "nilai": "asadf"
                            },
                            {
                                "nilai": "bsdafs"
                            },
                            {
                                "nilai": "ayam"
                            }
                        ]
                    }
                ]
            }
        ]
    }]);

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
    // useEffect(() => getQuestionAPI(2), []);

    const back = () => {
        setSectionIdx(sectionIdx-1);
    }
    const next = () => {
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
                    <input type="submit" value="Submit" className="submit"></input>
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
                                        {pertanyaan.map(({pertanyaan, urutan, tipe, option}, k)=>{
                                            return(
                                                <div className="question-container">
                                                    <div className="question-title">
                                                        <div className="form-group">
                                                            <label for={pertanyaan} className="question">{pertanyaan}</label><br></br>
                                                            <RenderedQuestion
                                                                type = {tipe}
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

