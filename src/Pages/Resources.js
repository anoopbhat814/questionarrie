import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, NavLink, useLocation, Navigate } from "react-router-dom";
import "../css/bootstrap-select.css";
import "../css/bootstrap.min.css";
import "../css/responsive.css";
import "../css/style.css";
import logo from '../images/logo.png';
import linkimg from '../images/link.png';


import axios from "axios";
import data1 from "./data.json";

const Resources = (props) => {


  let navigate = useNavigate();
  let location = useLocation();
  let fromresults = location?.state?.fromresults;
  let dataresult = location?.state?.dataresult;
  let checkboxCheckedresult = location?.state?.checkboxCheckedresult;
  let checkboxValuesresult = location?.state?.checkboxValuesresult;
  let riskresult = location?.state?.riskresult;
  let riskType = location?.state?.riskType;
  let allDataresult = location?.state?.allDataresult;
  let questionsData = location?.state?.QuestionsData

  var x = localStorage.getItem("sessionId");
  if (!x) {
    navigate('/home');
  }

  const [allData, setAllData] = useState();
  const [data, setData] = useState();
  const [categories, setCategories] = useState();
  const [activeCategory, setActiveCategory] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [checkboxValues, setCheckboxValues] = useState();
  const [questionsAnswered, setQuestionsAnswered] = useState();
  const [condition, setCondition] = useState();
  const [choice_0, setChoice_0] = useState(false);
  const [choice_1, setChoice_1] = useState(false);
  const [choice_2, setChoice_2] = useState(false);
  const [choice_3, setChoice_3] = useState(false);
  const [choice_4, setChoice_4] = useState(false);
  let [checkboxChecked, setCheckboxChecked] = useState();
  const [showSkip, setShowSkip] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [backRefresh, setBackRefresh] = useState(false);
  const [risk, setRisk] = useState();
  const [showResults, setShowResults] = useState(false);

  const handleCheckboxValue = (e) => {

    let checkboxId = e.target.id;

    // checkboxChecked[checkboxId]=e.target.checked;
    // setCheckboxChecked(checkboxChecked);

    //let e.target.id = e.target.checked
    let checked = e.target.checked;
    let value = e.target.name.split('-')[0];
    let title = e.target.name.split('-')[1];


    let indexno = categories.findIndex(x => x.name == activeCategory);
    let quesIndex = questionsAnswered[activeCategory];

    let specilCaseIndex = categories[indexno].questions[quesIndex].choices.findIndex(y => y.title == "All of the above");
    let specilcasenone = categories[indexno].questions[quesIndex].choices.findIndex(y => y.title == "None of these");

    if (title == "All of the above" || title == "None of these") {
      setChoice_0(false);
      setChoice_1(false);
      setChoice_2(false);
      setChoice_3(false);
      setChoice_4(checked);




      checkboxChecked['' + indexno + quesIndex + 'choice_0'] = false;
      checkboxChecked['' + indexno + quesIndex + 'choice_1'] = false;
      checkboxChecked['' + indexno + quesIndex + 'choice_2'] = false;
      checkboxChecked['' + indexno + quesIndex + 'choice_3'] = false;
      checkboxChecked['' + indexno + quesIndex + 'choice_4'] = e.target.checked;
      setCheckboxChecked(checkboxChecked);

      //  00choice_0
      // : 
      // true
      // 00choice_1
      // : 
      // true
      // 00choice_2
      // : 
      // true
      // 00choice_3
      // : 
      // false
      // 00choice_4
      // : 
      // false

    }
    else if (checkboxChecked['' + indexno + quesIndex + 'choice_' + specilCaseIndex] == false || checkboxChecked['' + indexno + quesIndex + 'choice_' + specilcasenone] == false || (specilCaseIndex == -1 && specilcasenone == -1)) {

      checkboxChecked[checkboxId] = e.target.checked;

      setCheckboxChecked(checkboxChecked);

      (value == 'choice_0') && setChoice_0(checked);
      (value == 'choice_1') && setChoice_1(checked);
      (value == 'choice_2') && setChoice_2(checked);
      (value == 'choice_3') && setChoice_3(checked);
      (value == 'choice_4') && setChoice_4(checked);
    }




    // if(choice_0==true || choice_1==true || choice_2==true || choice_3==true || choice_4==true || checked==true)
    // {setShowSkip(true)}





    setRefresh(!refresh);


  }

  const handleCategory = (e) => {
if(!fromresults)
    {setActiveCategory(e.target.innerText);
    let index = categories.findIndex(x => x.name == activeCategory);
    if (e.target.innerText != activeCategory && questionsAnswered[e.target.innerText] != 0) {
      setQuestionsAnswered((prev) => ({ ...prev, [e.target.innerText]: questionsAnswered[e.target.innerText] - 1 }));
      //let catIndex= categories.findIndex(x=>x.name==activeCategory);
      // let quesIndex= questionsAnswered[activeCategory]-1;
      //   if((questionsAnswered[activeCategory]<1 )){
      let catIndex = categories.findIndex(x => x.name == e.target.innerText);
      let quesIndex = questionsAnswered[e.target.innerText] - 1;

      let currentCheckboxes = [];

      categories[catIndex]?.questions[quesIndex]?.choices.forEach(x => currentCheckboxes.push(x.name));


      setChoice_0(checkboxChecked[currentCheckboxes[0]]);
      setChoice_1(checkboxChecked[currentCheckboxes[1]]);
      setChoice_2(checkboxChecked[currentCheckboxes[2]]);
      setChoice_3(checkboxChecked[currentCheckboxes[3]]);
      setChoice_4(checkboxChecked[currentCheckboxes[4]]);

      setBackRefresh(!backRefresh)
      // }
    }}
  }




  const handleSubmit = (e) => {
    let index = categories.findIndex(x => x.name == activeCategory);

    if (fromresults) {

      let quesIndex = questionsAnswered[activeCategory];



      let jumpIndex = categories[index].questions.findIndex((z, i) => (i > quesIndex && risk[categories[index].id + z.id] == riskType));

      setQuestionsAnswered((prev) => ({ ...prev, [activeCategory]: jumpIndex != -1 ? jumpIndex : quesIndex }));
      let showresultIndex = categories[index].questions.findIndex((z, i) => (i > jumpIndex && risk[categories[index].id + z.id] == riskType));
      if (showresultIndex == -1) setShowResults(true);

    }
    else {

      let riskval = 'LOW_RISK'
      let catIndex = categories.findIndex(x => x.name == activeCategory);
      let quesIndex = questionsAnswered[activeCategory];
      let quesIndex2 = questionsAnswered[activeCategory] + 1;
      setActiveQuestion(activeQuestion + 1);





      setQuestionsAnswered((prev) => ({
        ...prev, [activeCategory]: questionsAnswered[activeCategory] < categories[index].questions.length - 1 ? (questionsAnswered[activeCategory] + 1)
          : (
            () => {
              if (index == categories.length - 1) { navigate('/home/result', { state: { checkboxValues: checkboxValues, checkboxChecked: checkboxChecked, risk: risk, data: data } }) }

              else {
                let categoryindex = Object.keys(questionsAnswered).findIndex(z => z == activeCategory);

                let jumpcatNew = Object.keys(questionsAnswered).find((z, i) => (i > categoryindex && questionsAnswered[z] < categories[categories.findIndex(x => x.name == z)].questions.length));


                setActiveCategory(jumpcatNew);
                if (questionsAnswered[categories[index + 1].name] == categories[index + 1].questions.length)
                  setQuestionsAnswered((prev) => ({ ...prev, [categories[index + 1].name]: questionsAnswered[categories[index + 1].name] }))
              }; return (questionsAnswered[activeCategory] == categories[index].questions.length ? questionsAnswered[activeCategory] : questionsAnswered[activeCategory] + 1)
            })()
      }));

      if (questionsAnswered[activeCategory] < categories[index].questions.length) {



        let rindex = categories[catIndex].questions[quesIndex].riskRules.findIndex(z => z.condition != "default" && eval(z.condition) == true);

        if (rindex != -1) {
          riskval = categories[catIndex].questions[quesIndex].riskRules[rindex].risk
        }
        risk[categories[catIndex].id + categories[catIndex].questions[quesIndex].id] = riskval
        setRisk(risk);


        setCondition(riskval);

        let checkboxIndex = checkboxValues.findIndex(x => x.name == activeCategory);

        checkboxValues[checkboxIndex].questions_answered = (questionsAnswered[activeCategory] + 1) + '/' + categories[catIndex].questions.length || '0/2';
        checkboxValues[checkboxIndex].high_risks = (riskval == 'HIGH_RISK') ? checkboxValues[checkboxIndex].high_risks + 1 : checkboxValues[checkboxIndex].high_risks;
        checkboxValues[checkboxIndex].medium_risks = (riskval == 'MEDIUM_RISK') ? checkboxValues[checkboxIndex].medium_risks + 1 : checkboxValues[checkboxIndex].medium_risks;
        checkboxValues[checkboxIndex].low_risks = (riskval == 'LOW_RISK') ? checkboxValues[checkboxIndex].low_risks + 1 : checkboxValues[checkboxIndex].low_risks;



        setCheckboxValues(checkboxValues);
      }

      if (questionsAnswered[activeCategory] == categories[index].questions.length - 1) {

        catIndex = categories.findIndex(x => x?.name == categories[index + 1]?.name);
        quesIndex2 = questionsAnswered[categories[index + 1]?.name];
      }

      let currentCheckboxes = [];

      categories[catIndex]?.questions[quesIndex2]?.choices.forEach(x => currentCheckboxes.push(x.name));


      setChoice_0(checkboxChecked[currentCheckboxes[0]]);
      setChoice_1(checkboxChecked[currentCheckboxes[1]]);
      setChoice_2(checkboxChecked[currentCheckboxes[2]]);
      setChoice_3(checkboxChecked[currentCheckboxes[3]]);
      setChoice_4(checkboxChecked[currentCheckboxes[4]]);

      // setChoice_0(false);
      // setChoice_1(false);
      // setChoice_2(false);
      // setChoice_3(false);
      // setChoice_4(false);

      setShowSkip(false)
    }
    //  }
  }

  useEffect(() => {

    if (choice_0 == true || choice_1 == true || choice_2 == true || choice_3 == true || choice_4 == true) { setShowSkip(true) }
    else { setShowSkip(false) }


  }, [choice_0, choice_1, choice_2, choice_3, choice_4])

  const handleBack = (e) => {



    let catIndex = categories.findIndex(x => x.name == activeCategory);
    let quesIndex = questionsAnswered[activeCategory] - 1;


    let index = categories.findIndex(x => x.name == activeCategory);

    if (fromresults) {

      let backquesIndex = questionsAnswered[activeCategory];



      let jumpIndex = categories[index].questions.findLastIndex((z, i) => (i < backquesIndex && risk[categories[index].id + z.id] == riskType));

      setQuestionsAnswered((prev) => ({ ...prev, [activeCategory]: jumpIndex != -1 ? jumpIndex : backquesIndex }));

    }
    else {

      setQuestionsAnswered((prev) => ({
        ...prev, [activeCategory]: (questionsAnswered[activeCategory] > 0) ? (questionsAnswered[activeCategory] - 1)
          : questionsAnswered[activeCategory]

        //  (
        //   ()=>{ 
        //    if(index!=0)
        //   {

        //     console.log("called1>>>>",index,)
        //       if(questionsAnswered[categories[index-1].name]!=0){
        //         console.log("called2>>>>",index,(questionsAnswered[categories[index-1].name]-1))
        //         setQuestionsAnswered((prev)=>( {...prev,[categories[index-1].name]:(questionsAnswered[categories[index-1].name]-1)}))
        //       }
        //       setActiveCategory(categories[index-1].name);
        //     };
        //      return (questionsAnswered[activeCategory])})()
      }));

      if (questionsAnswered[activeCategory] == 0 && index != 0 && questionsAnswered[categories[index - 1].name] != 0) {
        setQuestionsAnswered((prev) => ({ ...prev, [categories[index - 1].name]: (questionsAnswered[categories[index - 1].name] - 1) }));
        setActiveCategory(categories[index - 1].name);
      }

      if (questionsAnswered[activeCategory] == 0 && questionsAnswered[categories[index - 1]?.name] != 0) {

      }

      if ((questionsAnswered[activeCategory] < 1)) {
        catIndex = categories.findIndex(x => x.name == activeCategory) != 0 ? categories.findIndex(x => x.name == activeCategory) - 1 : categories.findIndex(x => x.name == activeCategory);
        quesIndex = index != 0 ? questionsAnswered[categories[index - 1].name] - 1 : questionsAnswered[categories[index].name];
      }

      let currentCheckboxes = [];

      categories[catIndex]?.questions[quesIndex]?.choices.forEach(x => currentCheckboxes.push(x.name));


      setChoice_0(checkboxChecked[currentCheckboxes[0]]);
      setChoice_1(checkboxChecked[currentCheckboxes[1]]);
      setChoice_2(checkboxChecked[currentCheckboxes[2]]);
      setChoice_3(checkboxChecked[currentCheckboxes[3]]);
      setChoice_4(checkboxChecked[currentCheckboxes[4]]);
      setBackRefresh(!backRefresh)
    }

  }
  //console.log("questionsAnswered",questionsAnswered)

  useEffect(() => {
    let riskval = 'LOW_RISK'
    if (categories) {

      let catIndex = categories?.findIndex(x => x.name == activeCategory);
      let quesIndex = questionsAnswered[activeCategory];




      //categories[catIndex].questions[quesIndex].riskRules.forEach(z=>{if(z.condition!="default" && eval(z.condition)==true){riskval=z.risk}});

      let rindex = categories[catIndex].questions[quesIndex]?.riskRules?.findIndex(z => z.condition != "default" && eval(z.condition) == true);

      if (rindex != -1) {
        riskval = categories[catIndex].questions[quesIndex]?.riskRules[rindex]?.risk
      }
      risk[categories[catIndex].id + categories[catIndex]?.questions[quesIndex]?.id] = riskval
      setRisk(risk);


      setCondition(riskval);

      let checkboxIndex = checkboxValues.findIndex(x => x.name == activeCategory);

      checkboxValues[checkboxIndex].questions_answered = (questionsAnswered[activeCategory] + 1) + '/' + categories[catIndex].questions.length || '0/2';
      checkboxValues[checkboxIndex].high_risks = (riskval == 'HIGH_RISK') ? checkboxValues[checkboxIndex].high_risks - 1 : checkboxValues[checkboxIndex].high_risks;
      checkboxValues[checkboxIndex].medium_risks = (riskval == 'MEDIUM_RISK') ? checkboxValues[checkboxIndex].medium_risks - 1 : checkboxValues[checkboxIndex].medium_risks;
      checkboxValues[checkboxIndex].low_risks = (riskval == 'LOW_RISK') ? checkboxValues[checkboxIndex].low_risks - 1 : checkboxValues[checkboxIndex].low_risks;


      setCheckboxValues(checkboxValues)
      //   setChoice_0(false);
      // setChoice_1(false);
      // setChoice_2(false);
      // setChoice_3(false);
      // setChoice_4(false);
    }
  }, [backRefresh])




  useEffect(() => {
    let allcheckboxesArray = [];
    let Categories = [];
    let CategoriesAnswers = [];
    let storedAnswers = [];
    let riskArray = [];

    if (data) {
      if (!fromresults) {
        data?.pillars?.forEach((z, i) => {
          z.questions.forEach((y, j) => {
            y.choices.forEach(x => {
              x.name = '' + i + j + x.id
            })
          })
        })
      }
      if (fromresults) {
        data.pillars = dataresult;
      }



      data?.pillars?.forEach((x) => Categories.push(x));
      data?.pillars?.forEach(y => CategoriesAnswers.push({ [y.name]: 0 }));
      data?.pillars?.forEach(el => storedAnswers.push({ name: el.name, questions_answered: '0/' + el.questions.length, high_risks: 0, medium_risks: 0, low_risks: 0 }));
      data?.pillars?.forEach(check => {
        check.questions.forEach(check1 => {
          check1.choices.forEach(check2 => allcheckboxesArray.push({ [check2.name]: false }))
        })
      });
      data?.pillars?.forEach(rsk => {
        rsk.questions.forEach(rsk1 => riskArray.push({ [rsk.id + rsk1.id]: 'LOW_RISK' }))
      });
      setActiveCategory(Categories[0].name);
      setCategories(Categories);
      setCheckboxValues(storedAnswers);

      let object = Object.assign({}, ...CategoriesAnswers);

      setQuestionsAnswered(object);
      let checkboxobject = Object.assign({}, ...allcheckboxesArray);
      let riskobject = Object.assign({}, ...riskArray);

      setCheckboxChecked(checkboxobject);
      if (!fromresults) { setRisk(riskobject); }
      else { setRisk(riskresult) }
      if (fromresults) {
        setCheckboxChecked(checkboxCheckedresult)
      }
    }

  }, [riskresult, data, dataresult]);



  useEffect(() => {
    if (allDataresult) { setAllData(allDataresult); }
    if (fromresults) {

      let riskArray = [];

      let index = categories?.findIndex(x => x.name == activeCategory);
      let jumpIndex = categories && categories[index]?.questions.findIndex(z => risk[categories[index]?.id + z?.id] == riskType);
      categories && data?.pillars?.forEach(y => riskArray.push({ [y.name]: jumpIndex }));
      let object = Object.assign({}, ...riskArray);
      setQuestionsAnswered(object);
      let showresultIndex = categories && categories[index]?.questions.findIndex((z, i) => (i > jumpIndex && risk[categories[index].id + z.id] == riskType));
      if (showresultIndex == -1) setShowResults(true);
    }

  }, [categories, activeCategory, riskType, questionsData, allDataresult]);

  useEffect(() => {
    //loadQuestion()
    setData(data1)
  }, [])
  const loadQuestion = async () => {
    const url = 'link to your json i want to load from server'

    const result1 = await axios.get(url)

    if (result1.status === 200) {
      //setData(result1.data);
      //setData(data1)
    }



  }

  // if(!authorized){
  //   return redirect("/home");
  // }
  // if(!authorized){
  //   return  navigate("/home")
  // }


  return (
    <div>


      <div className="index_page">
        {/* <!--Header Html start here--> */}
        <header className="header_outer">
          <div className="header_inner">
            <div className="container">
              <div className="logo">
                <a title="">
                  <img width="100" src={logo} alt="Site Title" />
                </a>
              </div>
              <div className="menu_links">
                <h1>DevOps Self-Assessment</h1>
                <p>Helping you become a high-performer</p>
              </div>
            </div>
          </div>
        </header>
        <section className="page_sec question_page">
          <div className="container">
            <div className="row">
              <div className="bg_inside">
                <div className="col-md-4 col-sm-12 bg_style">
                  <div className="sidebar_links">
                    <ul className="">
                      {categories?.map((list) => (
                        <li key={list.name}>
                          {fromresults?
                          <a
                          style={activeCategory === list.name ? { color: "#0064b9" } : {}}
                          // onClick={(e) => {

                          //   setActiveCategory(e.target.innerText);
                          //   setActiveQuestion(0)
                          // }}
                          onClick={handleCategory}
                        >
                          {list.name}
                        </a>
                          :<a
                            href="#"
                            style={activeCategory === list.name ? { color: "#0064b9" } : {}}
                            // onClick={(e) => {

                            //   setActiveCategory(e.target.innerText);
                            //   setActiveQuestion(0)
                            // }}
                            onClick={handleCategory}
                          >
                            {list.name}
                          </a>}
                          {/* <span className="outof_num">{list.name==activeCategory? `${(activeQuestion<=list.questions.length-1)? activeQuestion+1:list.questions.length}/${list.questions.length}`:questionsAnswered[list.name]+'/'+list.questions.length}</span> */}
                          {/* <span className="outof_num">{(list.name==activeCategory)? ((questionsAnswered[list.name]+1)+'/'+list.questions.length):(questionsAnswered[list.name]==0? questionsAnswered[list.name]+'/'+list.questions.length:(questionsAnswered[list.name]+1)+'/'+list.questions.length)}</span> */}
                          <span className="outof_num">{((questionsAnswered[list.name]) + '/' + list.questions.length)}</span>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
                <div className="col-md-8 col-sm-12 form_col">
                  <div className="right_side_form">
                    <h3>AWS Well-Architected Framework</h3>
                    <p className="blue_text">
                      Add a link to your architectural design
                    </p>

                    {categories?.map(
                      (ques) =>
                        ques.name == activeCategory && (
                          <div key={ques.name}>
                            <div className="step_sec">
                              <h4>
                                <span>
                                  {/* {ques.questions[(questionsAnswered[ques.name]<=ques.questions.length-1)? questionsAnswered[ques.name]:(ques.questions.length-1)].title} */}
                                  {ques.questions[questionsAnswered[ques.name] < ques.questions.length ? questionsAnswered[ques.name] : ques.questions.length - 1].title}
                                  <a href="#" className="info_link">
                                    info
                                  </a>
                                </span>{" "}
                                <span className="ask_btn">
                                  <a href="#" className="btn">
                                    Ask an expert{" "}
                                    <img src={linkimg} />
                                  </a>
                                </span>
                              </h4>
                              <div className="mid_text">
                                {/* <p>{ques.questions[(questionsAnswered[ques.name]<=ques.questions.length-1)? questionsAnswered[ques.name] :(ques.questions.length-1)].description}</p> */}
                                <p>{ques.questions[questionsAnswered[ques.name] < ques.questions.length ? questionsAnswered[ques.name] : ques.questions.length - 1].description}</p>
                                <p className="top_space">
                                  O Question does not apply to this workload
                                  info
                                </p>
                              </div>
                            </div>
                            <div className="question_list">
                              <div className="check_box">

                                {/* {ques.questions[(questionsAnswered[ques.name]<=ques.questions.length-1)? questionsAnswered[ques.name] :(ques.questions.length-1)].choices.map((ch) =>  */}
                                {ques.questions[questionsAnswered[ques.name] < ques.questions.length ? questionsAnswered[ques.name] : ques.questions.length - 1].choices.map((ch) =>
                                (
                                  <div className="form-group" key={ch.name}>

                                    <input type="checkbox" id={ch.name} value={ch.title} name={`${ch.id}-${ch.title}`} onChange={fromresults ? () => { } : handleCheckboxValue} checked={checkboxChecked[ch.name]}></input>

                                    <label htmlFor={ch.name}>
                                      {ch.title}
                                      <a className="info_link">
                                        info
                                      </a>
                                    </label>
                                  </div>


                                ))}
                              </div>
                            </div>
                          </div>
                        )
                    )}
                    <div className="start_btn skip">
                      <a className="btn" value={activeCategory} onClick={handleBack}>
                        Back
                      </a>

                      {fromresults ? (showResults ? <NavLink to={'/home/result'} state={{ checkboxValues: checkboxValuesresult, checkboxChecked: checkboxCheckedresult, risk: riskresult, data: allData }} className="btn">Results</NavLink> : <a className="btn" value={activeCategory} onClick={handleSubmit}>Next</a>) : (showSkip ? <a className="btn" value={activeCategory} onClick={handleSubmit}>
                        Submit
                      </a>
                        :
                        <a className="btn" value={activeCategory} onClick={handleSubmit}>
                          skip
                        </a>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
