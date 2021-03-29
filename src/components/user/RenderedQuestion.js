import React, { useState, useEffect } from 'react';
import axios from "axios";
import './style.css';
import Address from "./Address";

const RenderedQuestion = ({answer, type, id_form_field, pertanyaan, option}) =>{
  const [isShortAnswer, setIsShortAnswer] = useState(true);
  const [stateAddress, setStateAddress] = useState({
    token: "",
    listProvinsi: [],
    listKabupaten: [],
    listKecamatan: [],
    listKelurahan: [],

    jawaban: {
        provinsi: "",
        kabupaten: "",
        kecamatan: "",
        kelurahan: ""
    }
    })

    const handleShortAnswer = (event) =>{
        const value = event.target.value;
        if (value.length < 20){
            setIsShortAnswer(true);
        } else {
            setIsShortAnswer(false);
        }
    }
    const getAnswer = (event) => {
        var isSame = false;
        const value = event.target.value;
        console.log("answer")
        console.log(answer)
        for (var i = 0; i<answer[0].jawaban.length; i++){
            if (typeof answer[0].jawaban[i] !== "undefined"){
                if (answer[0].jawaban[i].id_form_field == id_form_field){
                    isSame = true;
                    break
                }
            } 
        }
        for (var j = 0; j<option.length; j++){
            if (option[j].nilai==value){
                break;
            }
        }
        if (type == "short_answer" || type == "paragraph"){
            if (isSame){
                answer[0].jawaban.splice(i,1, { "id_form_field" : id_form_field, 
                                                "id_form_option": null,
                                                "value" : value})
            } else{
                answer[0].jawaban.push({"id_form_field" : id_form_field, "id_form_option": null, "value" : value})
            }
        }
        else if (type == "radio"){
            if (isSame){
                answer[0].jawaban.splice(i,1, { "id_form_field" : id_form_field, 
                                                "id_form_option": option[j].id_form_option,
                                                "value" : value})
            } else{
                answer[0].jawaban.push({"id_form_field" : id_form_field,
                                        "id_form_option": option[j].id_form_option,
                                        "value" : value})
            }
        }
        else if(type == "select"){
            var nilai = document.getElementById(id_form_field).value;
            if (isSame){
                answer[0].jawaban.splice(i,1, { "id_form_field" : id_form_field, 
                                                "id_form_option": option[j].id_form_option,
                                                "value" : nilai})
            } else{
                answer[0].jawaban.push({"id_form_field" : id_form_field,
                                        "id_form_option": option[j].id_form_option,
                                        "value" : nilai})
            }
        }
        else if(type == "checkbox"){
            var checkedValue = new Array();
            var uncheckedValue = new Array();
            var isEqual = new Array();

            var inputElements = document.getElementsByClassName('checkbox');
            for(var i=0; inputElements[i]; ++i){
                if(inputElements[i].checked){
                    checkedValue.push(inputElements[i].value);
                }else {
                    uncheckedValue.push(inputElements[i].value);
                }
            }
            for (var i=0; i<checkedValue.length; i++){
                isEqual.push(false);
            }

                for (var j = 0; j<answer[0].jawaban.length; j++){
                    for (var k = 0; k<option.length; k++){
                        if (answer[0].jawaban[j].id_form_option == option[k].id_form_option){
                            for (var i=0; i<checkedValue.length; i++){
                                if (option[k].nilai == checkedValue[i]){
                                    isEqual[i] = true;
                                }
                            }
                        }
                    }
                    
                }

            for (var i = 0; i<answer[0].jawaban.length; i++){
                for (var j = 0; j<uncheckedValue.length; j++){
                    if(typeof answer[0].jawaban[i] !== "undefined"){
                        if (answer[0].jawaban[i].value == uncheckedValue[j]){
                            answer[0].jawaban.splice(i,1)
                        }
                    }
                }
            }
            for (var i = 0; i<isEqual.length; i++){
                if (isEqual[i]){

                }else{
                    answer[0].jawaban.push({"id_form_field" : id_form_field,
                                            "id_form_option": option[i].id_form_option,
                                            "value" : option[i].nilai})
                }
            }
        }
    }

  if (type == "short_answer"){
      return(
          <div>
             <input type="text" 
             onChange={(event)=>{handleShortAnswer(event);getAnswer(event)} }  
            //  onChange={handleShortAnswer}
             required/>
             <h1 className="is-short-answer">{isShortAnswer? "":"Jawaban tidak boleh lebih dari 20 huruf"}<br></br></h1>
          </div>
          
      )
  }
  else if(type == "paragraph"){
      return(
          <input type="text" onChange={getAnswer}  required/>
      )
  }
  else if(type == "checkbox"){
      return(
          option.map(({nilai}) => {
              return(
                  <div>
                      <input type="checkbox" className="checkbox" id={nilai} name={nilai} value={nilai} onChange={getAnswer}/>
                      <label for={nilai}>{nilai}</label>
                  </div>
              )
          })
      )
  }
  else if(type == "radio"){
      return(
          option.map(({nilai}) => {
              return(
                  <div>
                      <input type="radio" name={pertanyaan} id={nilai} value={nilai} onChange={getAnswer} required/>
                      <label for={nilai}>{nilai}</label>
                  </div>
              )
          })
      )
  }
  else if(type == "select"){
      return(
          <select id={id_form_field} name={pertanyaan} onLoad={getAnswer} onChange={getAnswer}>
              {option.map(({nilai}) => {
                  return(
                          <option value={nilai}>{nilai}</option>
                  )
              })}
          </select>
      )
  }
  else if (type == "alamat"){
    return(
        <Address
            // getProvinsi={getProvinsi}
            // handleProvinsi = {handleProvinsi}
            // handleKabupaten = {handleKabupaten}
            // handleKecamatan = {handleKecamatan}
            // handleKelurahan = {handleKelurahan}
            

        />
    )

  }
  else{
      return(
          <textarea required>{type}</textarea>
      )
  }
}

export default RenderedQuestion;