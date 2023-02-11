import React,{useState,useEffect,useContext} from 'react';

import '../css/bootstrap-select.css';
import '../css/bootstrap.min.css';
import '../css/responsive.css';
import '../css/style.css';
import { NavLink,useNavigate,Navigate,useLocation } from 'react-router-dom';
import logo from '../images/logo.png';
import axios from "axios";
import Resources from "./Resources"
// import { UserContext } from "../App";


const Assesment = ({setUser}) => {

    let location = useLocation();
    let sessionId=location?.state?.sessionId;

    const [consent,setConsent]=useState(false);
    const [confirm, setConfirm] = useState(false);
    const navigate = useNavigate();

    
   const setLocal=()=>{
    localStorage.setItem('sessionId', sessionId);
   }

  return (
    <div>
      <div className="index_page">
    {/* <!--Header Html start here--> */}
    <header className="header_outer">
        <div className="header_inner">
            <div className="container">
                <div className="logo">
                    <a title=""><img width="100" src={logo} alt="Site Title"/></a>
                </div>
                <div className="menu_links">
                    <h1>DevOps Self-Assessment</h1>
                    <p>Helping you become a high-performer</p>
                </div>
            </div>
        </div>
    </header>
    <section className="page_sec assessment_sec">
        <div className="container">
            <div className="row">
                <div className="bg_inside">
                <div className="col-md-12 col-sm-12">
                    <div className="inner-side">
                        <div className="heading_bg">
                            <h2>How to Take This Assessment</h2>
                        </div>
                        <div className="ability_sec">
                            <p>This assessment can help you understand and share your current state with others in your organization using shared [terminology. You can take this assessment by yourself, answering the questions on behalf of your core team, or you can use a facilitated session with key stakeholders deciding on answers together.</p>
                            <div className="depths">
                               <h3>There are two depths of assessment. Please choose:</h3>
                                <form action="#">
                              <p>
                                <input type="radio" id="test1" name="radio-group" checked onChange={()=>{}}/>
                                <label htmlFor="test1">© the short form (allow 20 minutes)</label>
                              </p>
                            </form>
                            </div>
                            
                            <p className="top_space">It is important to answer the questions as honestly as possible, keeping in mind that a true baseline is an essential tool to help you understand where you are, and what you and your team can work on next in your technology transformation journey. This assessment tries to provide useful advice and does not attempt to "grade" or "score you</p>
                            
                            <div className="check_box">
                              <div className="form-group">
                                  <input type="checkbox" id="checkmark" onChange={(e)=>{setConsent(e.target.checked)}}/>
                                  <label htmlFor="checkmark">I give ( Site Title) permission to share my answers without any personally identifying information to improve the benchmark data available to the industry.</label>
                                </div>
                            </div>
                           <div className="start_btn resources_go">{consent? <NavLink className="btn" to='/home/resources' onClick={setLocal}>Take The Assessment</NavLink>:<button className="btn" disabled={!consent}  >Take The Assessment</button>}</div>
                        </div>
                    </div>
                </div>
               
                </div>
            </div>
        </div>
    </section>


</div>
    </div>
  )
}

export default Assesment
