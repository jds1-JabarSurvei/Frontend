import QuestionsTab from 'components/newSurvey/QuestionsTab';
import Preview from 'components/newSurvey/Preview';
import React, { useState, useEffect } from 'react';
import NewSurveyContextProvider from 'contexts/NewSurveyContext';
import './style.css';



function shoot() {
  alert("Great Shot!");
}

// const SurveyPage = (
//   <button onClick={shoot}>Take the shot!</button>
// );




const myFunction = () => {
    // document.getElementById("demo").innerHTML = "YOU CLICKED ME!";
    console.log('this is:');
}

const SurveyPage = () => {
        
    // const shoot = () => {
    //     alert("Greatsdfghjk!");
    //   }
    // //   render(){
    //     return (
    //       <button onClick={shoot}>Take the shot!</button>
    //     );
    const button = (sectionDisplayed, sectionCount) => {
        const back = '<button className="back" onClick={back}>Back</button>';
        const next = '<button className="next" onClick={next}>Next</button>';
        const submit = '<input type="submit" value="Submit" className="submit"></input>';

    
    }
    const back = () => {
        var x = document.getElementsByClassName("question-title");
        // alert("bujed");
        x[0].innerHTML = `  <div className="form-group">
                                <label for="nama" className="question">What's Your Name?</label><br></br>
                                <input type="text" id="nama" className="answer"></input>
                            </div>`;
        // document.getElementsByClassName
        // document.getElementsBy
    }
    const next = () => {
        var x = document.getElementsByClassName("question-title");
        // alert("bujed");
        x[0].innerHTML = `  <div className="form-group">
                                <label for="nama" className="question">Nama</label><br></br>
                                <input type="text" id="nama" className="answer"></input>
                            </div>`;
        // document.getElementsByClassName
        // document.getElementsBy
    }
    // const tabs = [
    //     { title: 'Question' },
    //     { title: 'Preview' },
    // ]
    // const [activeTab, setActiveTab] = useState(tabs[0].title);

    // const updateActiveTab = (newActive) => {
    //     setActiveTab(newActive);
    // }

    // return (
    //     <NewSurveyContextProvider>
    //         <div className="new-surve">
    //             <div className="tab-title">
    //                 {/* {tabs.map(tab => {
    //                     return (
    //                         <div key={tab.title} className={activeTab == tab.title ? 'active' : ''} onClick={() => updateActiveTab(tab.title)}>{tab.title}</div>
    //                     )
    //                 })} */}
    //             </div>
    //             <div className="tab-container">
    //                 {/* {activeTab === 'Question' ? */}
    //                     <QuestionsTab /> 
    //                     {/* : */}
    //                     {/* <Preview /> */}
    //                 {/* // } */}
    //             </div>
    //         </div>
    //     </NewSurveyContextProvider>
    // );


    // return (
    //     <form>
    //         <div className="form-group">
    //             <label for="nama">Hello</label><br></br>
    //             <input type="text" id="nama"></input>
    //         </div>
    //     </form>
    // );


    return (
        <div className="survey-page">
            {/* JUDUL */}

            {/* SECTION */}
            <div className="section-container">
                <div className="section-header" >
                    <div className="section-title">Judul Section</div>
                    <div className="section-info">
                        {/* <div className="section-title">Judul Section</div> */}
                        <div className="section-description">Deskripsi Section</div>
                    </div>
                </div>
             </div>

            {/* QUESTION */}
            <div className="question-container">
                <div className="question-title">
                    <div className="form-group">
                        <label for="nama" className="question">What's Your Name?</label><br></br>
                        <input type="text" id="nama" className="answer"></input>
                    </div>
                    {/* OIIII */}
                </div>
            </div>
            <p id="demo" onClick="{myFunction}">Click me.</p>
            {/* <button onClick={shoot}>Take the shot!</button> */}
            <button className="back" onClick={back}>Back</button>
            <button className="next" onClick={next}>Next</button>
            <input type="submit" value="Submit" className="submit"></input>
        </div>
    );


    // return (
    //     <div className="survey-page">
    //         {/* JUDUL */}

    //         {/* SECTION */}
    //         <div className="section-container">
    //         <div className="section-header" >
    //             <div className="section-count">Section ke</div>
    //             <div className="section-info">
    //                 <div className="section-title">section title</div>
    //                 <div className="section-description">description section</div>
    //             </div>
    //         </div>
    //         <button className="remove-section">Remove Section</button>
    //         </div>

    //         {/* QUESTION */}
    //         <div className="question-container">

    //         <div className="question-title">judlu</div>
    //         <hr />
    //         <div className="question-setting">
    //             <div className='required'>Required</div>
    //             <div className='slider'>Slider</div>
    //             <div className='additional-settings'>I</div>
    //         </div>
    //         </div>
    //     </div>
    // );

    // handleClick = () => {
    //     console.log('this is:', this);
    //   }
    
    //   render() {
    //     return (
    //       <button onClick={this.handleClick}>
    //         Click me
    //       </button>
    //     );
    //   }
}

export default SurveyPage;

