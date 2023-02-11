import React from "react";
import data from "./data.json";
import '../css/bootstrap-select.css';
import '../css/bootstrap.min.css';
import '../css/responsive.css';
import '../css/style.css';

const Showresult = (props) => {


    return (
        <div style={{padding:"15px"}}>

            <div className="index_page">
                {/* <section className="page_sec question_page"> */}
                    <div className="container">
                        <div className="row">
                            <div className="bg_inside">
                                <div >
                                    <div className="right_side_form">
                                        {props?.data?.pillars?.map(
                                            (cat)=>(<div key={cat?.name}>
                                                <h4 style={{color: "#0064b9", paddingTop:"5%"}}>{cat.name}</h4>
                                                {cat.questions.map(
                                                    (ques) =>
                                                    (
                                                       
                                                        <div key={ques?.id}>
                                                            <div className="step_sec">
                                                                <h4>
                                                                    <span style={{fontWeight:600}}>
                                                                        {ques.title}
                                                                        
                                                                    </span>
                                                                </h4>
                                                                <div className="mid_text">
                                                                    <p>{ques.description}</p>
                                                                </div>
                                                            </div>
                                                            <div className="question_list">
                                                                <div className="check_box">
                                                                    {ques.choices.map((ch) =>
                                                                    (
                                                                        <div className="form-group" key={ch?.name}>
                                                                            <input type="checkbox" id={ch.name} value={ch.title} name={ch.id} checked={props.checkboxChecked[ch.name]} readOnly></input>
    
                                                                            <label htmlFor={ch.name}>
                                                                                {ch.title}
                                                                               
                                                                            </label>
                                                                        </div>
    
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                )}
                                                </div>
                                            )


                                           
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {/* </section> */}
            </div>
        </div>
    )

}

export default Showresult;