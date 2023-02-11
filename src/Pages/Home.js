import React,{useEffect, useState,useContext} from 'react'
import '../css/bootstrap-select.css';
import '../css/bootstrap.min.css';
import '../css/responsive.css';
import '../css/style.css';
import { NavLink,useNavigate } from 'react-router-dom'
import logo from '../images/logo.png';
import meetingimg from '../images/meeting.jpg'

const Home = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        localStorage.removeItem("sessionId");
    },[])
    

    const [validate,setValidate]=useState({CompanyName:false,Title:false,FirstName:false,LastName:false,Phone:false,Email:false,Country:false,CompanySize:false,Industry:false});
    const [firstnameId,setfirstnameId]=useState();
    const [lastnameId,setlastnameId]=useState();
    const [start,setStart]=useState(false);
    const [buttonClick,setButtonClick]= useState(false)
    
const handleCompanyName=(e)=>{

    if(e.target.value.length>1)
    {setValidate((prev)=>({...prev,CompanyName:true}))}
    else{setValidate((prev)=>({...prev,CompanyName:false}))}
};


const handleTitle=(e)=>{
    if(e.target.value.length>1 && e.target.length!="Select")
    {setValidate((prev)=>({...prev,Title:true}))}
    else{
        setValidate((prev)=>({...prev,Title:false}))
    }
};

const handleFirstName=(e)=>{
    if(e.target.value.length>1)
    {setValidate((prev)=>({...prev,FirstName:true}))}
    else{setValidate((prev)=>({...prev,FirstName:false}))};
    setfirstnameId(e.target.value);
};

const handleLastName=(e)=>{
    if(e.target.value.length>1)
    {setValidate((prev)=>({...prev,LastName:true}))}
    else{setValidate((prev)=>({...prev,LastName:false}))};
    setlastnameId(e.target.value)
};

const handlePhone=(e)=>{
    if(e.target.value.length>1)
    {setValidate((prev)=>({...prev,Phone:true}))}
    else{setValidate((prev)=>({...prev,Phone:false}))}
};

const handleEmail=(e)=>{
    if(e.target.value.length>1 && e.target.value.includes('@'))
    {setValidate((prev)=>({...prev,Email:true}))}
    else{setValidate((prev)=>({...prev,Email:false}))}
};

const handleCountry=(e)=>{
  
    if(e.target.value.length>1 && e.target.length!="Select")
    {setValidate((prev)=>({...prev,Country:true}))}
    else{
        setValidate((prev)=>({...prev,Country:false}))
    }
};

const handleCompanySize=(e)=>{
    if(e.target.value.length>1 && e.target.length!="Select")
    {setValidate((prev)=>({...prev,CompanySize:true}))}
    else{
        setValidate((prev)=>({...prev,CompanySize:false}))
    }
};

const handleIndustry=(e)=>{
    if(e.target.value.length>1 && e.target.length!="Select")
    {setValidate((prev)=>({...prev,Industry:true}))}
    else{
        setValidate((prev)=>({...prev,Industry:false}))
    }
};

useEffect(()=>{
if(validate.CompanyName==true && validate.Title==true && validate.FirstName==true && validate.LastName==true && validate.Phone==true && validate.Email==true && validate.Country==true && validate.Industry==true){
setStart(true)
}
},[validate]);

const handleValidate=(e)=>{
    e.preventDefault()
    // if(validate.CompanyName==true && validate.Title==true && validate.FirstName==true && validate.LastName==true && validate.Phone==true && validate.Email==true && validate.Country==true && validate.Industry==true){
    //      setStart(true);
         
    //      }
         setButtonClick(true);
}



  return (
    <React.Fragment>
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
    <section className="page_sec">
        <div className="container">
            <div className="row">
                <div className="bg_inside">
                <div className="col-md-8 col-sm-12 no_pading_right">
                    <div className="inner-side">
                        <div className="heading_bg">
                            <h2>DevOps Self-Assessment</h2>
                        </div>
                        <div className="ability_sec">
                            <p>The ability to develop and deliver software iS an important piece of any organization's ability to deliver value to customers, pivot when necessary, beat competitors to market, and respond to regulatory and compliance requirements. Delivering value with software often requires a technology transformation, and these transformations necessitate improving key capabilities.</p>
                            <p className="top_space">The assessment has questions that touch on several key areas.</p>
                            <ul className="bullet_list top_space">
                                <li>Process</li>
                                <li>Technology and automation culture</li>
                                <li>Measurement</li>
                                <li>Outcomes</li>
                            </ul>
                        </div>
                        <div className="image_meeting"><img src={meetingimg} alt="meeting"/></div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 bg_style">
                    <div className="right_side_form">
                        <h3>Simply fill out this form to start the self-assessment</h3>
                        <form className="form_inner">
                            <div className="from_outer">
                                <label>Company Name*</label>
                                <input type="text" placeholder="Company Name" className="form-control" style={!validate.CompanyName && buttonClick? {border: '1px solid red'}:{}} onChange={handleCompanyName}/>
                            </div>
                            <div className="from_outer">
                                <label>Title*</label>
                                <select name="" className="form-control" title="Title" style={!validate.Title && buttonClick? {border: '1px solid red'}:{}} onChange={handleTitle}>
                                <option>Select</option>
                                    <option>Developer / Engineer</option>
                                    <option>Title2</option>
                                    <option>Title1</option>
                                </select>
                            </div>
                            <div className="from_outer">
                                <label>First Name *</label>
                                <input type="text" placeholder="First Name" className="form-control" style={!validate.FirstName && buttonClick? {border: '1px solid red'}:{}} onChange={handleFirstName}/>
                            </div>
                            <div className="from_outer">
                                <label>Last Name*</label>
                                <input type="text" placeholder="Last Name" className="form-control" style={!validate.LastName && buttonClick? {border: '1px solid red'}:{}} onChange={handleLastName}/>
                            </div>
                            <div className="from_outer">
                                <label>Phone *</label>
                                <input type="number" placeholder="Phone" className="form-control" style={!validate.Phone && buttonClick? {border: '1px solid red'}:{}} onChange={handlePhone}/>
                            </div>
                            <div className="from_outer">
                                <label>Email *</label>
                                <input type="email" placeholder="Email" className="form-control" style={!validate.Email && buttonClick? {border: '1px solid red'}:{}} onChange={handleEmail}/>
                            </div>
                            <div className="from_outer">
                                <label>Country *</label>
                                <select name="" className="form-control" title="Country" style={!validate.Country && buttonClick? {border: '1px solid red'}:{}} onChange={handleCountry}>
                                    <option>Select</option>
                                    <option>India</option>
                                    <option>Title2</option>
                                    <option>Title1</option>
                                </select>
                            </div>
                            <div className="from_outer">
                                <label>Company Size</label>
                                <select name="" className="form-control" title="Company Size" onChange={handleCompanySize}>
                                    <option>Select</option>
                                    <option>8-9</option>
                                    <option>Title2</option>
                                    <option>Title1</option>
                                </select>
                            </div>
                            <div className="from_outer">
                                <label>Industry *</label>
                                <select name="" className="form-control" title="Industry" style={!validate.Industry && buttonClick? {border: '1px solid red'}:{}} onChange={handleIndustry}>
                                    <option>Select</option>
                                    <option>Discrete Manufacturing</option>
                                    <option>Title2</option>
                                    <option>Title1</option>
                                </select>
                            </div>
                            <div className="contact_information">
                             <p>So may use your contact information to provide updates and special offers about Visual Studio and other (Site Title) products and services. You can unsubscribe at any time. To learn more you can read the orvacy statement</p>
                            </div>
                            
                            <div className="start_btn">{start?<NavLink className="btn" to='/home/assessment' state={{sessionId:(firstnameId+' '+lastnameId)}} >Start The Assessment</NavLink>:<button className="btn" onClick={handleValidate}>Start The Assessment</button>}</div>

                        </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
<section className="assessment_outer">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="text_copy">
                    <p>This assessment has been developed in collaboration with industry experts at the IT Revolution DevOps Enterprise Forum and reflects insights from the research they have conducted and published. You may give permission to have your anonymized responses included in future research, which will help us understand the state of technology transformations</p>
                </div>
            </div>
        </div>
    </div>
</section>


</div>
    </div>
    </React.Fragment>
  )
}

export default Home
