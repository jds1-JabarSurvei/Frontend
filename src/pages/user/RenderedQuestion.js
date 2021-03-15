import React, { useState, useEffect } from 'react';
import './style.css';

const RenderedQuestion = ({type, pertanyaan, option}) =>{
  const [isShortAnswer, setIsShortAnswer] = useState(true);
    const handleShortAnswer = (event) =>{
        const value = event.target.value;
        if (value.length < 20){
            setIsShortAnswer(true);
        } else {
            setIsShortAnswer(false);
        }
    }

  if (type == "short_answer"){
      return(
          <div>
             <input type="text" onChange={handleShortAnswer}  required/>
             <h1 className="is-short-answer"><br></br>{isShortAnswer? "":"Jawaban tidak boleh lebih dari 20 huruf"}</h1>
          </div>
          
      )
  }
  else if(type == "paragraph"){
      return(
          <input type="text"  required/>
      )
  }
  else if(type == "checkbox"){
      return(
          option.map(({nilai}) => {
              return(
                  <div>
                      <input type="checkbox" id={nilai} name={nilai} value={nilai} />
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
                      <input type="radio" name={pertanyaan} id={nilai} value={nilai} required/>
                      <label for={nilai}>{nilai}</label>
                  </div>
              )
          })
      )
  }
  else if(type == "select"){
      return(
          <select id={pertanyaan} name={pertanyaan}>
              {option.map(({nilai}) => {
                  return(
                          <option value={nilai}>{nilai}</option>
                  )
              })}
          </select>
      )
  }
  else{
      return(
          <textarea required>{type}</textarea>
      )
  }
}

export default RenderedQuestion;