import React, {createRef, forwardRef, useState,useEffect,useRef} from 'react';
import { useLocation } from 'react-router-dom';
import '../css/bootstrap-select.css';
import '../css/bootstrap.min.css';
import '../css/responsive.css';
import '../css/style.css';
import PrintComponent from './print';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import Showresult from './Showresult';
import { jsPDF } from "jspdf";
import AWS from 'aws-sdk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import data from "./data.json";

const S3_BUCKET =process.env.REACT_APP_S3_BUCKET;
const REGION =process.env.REACT_APP_REGION;


AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});


const Result = () => {

    const notify = () => toast("Answers Uploaded Sucessfully");
    const notifyError = (data) => toast(data + "!");
    
    const location = useLocation();
    let {checkboxValues,checkboxChecked,risk,data}=location.state

    const pdfRef = useRef(null);

    const [printButton, setPrintButton] = useState();
    const componentRef = createRef();
    const Component = forwardRef((pr, ref) =>( 
        <div ref={ref}>
        <div className="result_sec">
        <h2>Pillars</h2>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Questions answered</th>
                    <th scope="col">High risks</th>
                    <th scope="col">Medium risks</th>
                    <th scope="col">Low risks</th>
                </tr>
            </thead>
            <tbody>
                {
                    checkboxValues.map((val)=>( 
                    <tr key={val.name}>
                        <th scope="row">{val.name}</th>
                        <td>{val.questions_answered}</td>   
                        <td>{val.high_risks!=0?val.high_risks:val.high_risks}</td>
                        <td>{val.medium_risks!=0?val.medium_risks:val.medium_risks}</td>
                        <td>{val.low_risks!=0?val.low_risks:val.low_risks}</td>
                    </tr>))
                }
                
            </tbody>
        </table>
        <Showresult data={data} checkboxChecked={checkboxChecked} />
    </div>
   
    </div>
    ));




async function uploadtoS3(){
    let id=toast.loading("Uploading Please wait...");
    const content = pdfRef.current;

    const doc = new jsPDF();
    doc.html(content, {
        callback: function (doc) {
            let blob = doc.output('blob');
            let x = localStorage.getItem("sessionId");
            let y =new Date();
  
            //doc.save('sample.pdf');


  
  var file1 = new File([blob], x+'-'+y+'.pdf');
  


          const params = {
              ACL: 'public-read',
              Body: file1,
              Bucket: S3_BUCKET,
              Key: file1.name
          };
  
 
          myBucket.putObject(params, function(err, data) {
            if (err) {
            //  reject(err);
            toast.update(id, { render: 'Failed To Uplaod', type: "error", isLoading: false, autoClose: 5000 });
            } else {
            
            toast.update(id, { render: "Answers Uploaded Successfully", type: "success", isLoading: false, autoClose: 5000 });
             //notify();
            }
           });
            
        },
        html2canvas: { scale: 0.17 } // change the scale to whatever number you need
    });
};




  return (
    <div className="index_page">
        <ToastContainer toastStyle={{ backgroundColor: "#0064b9",color:'#fff' }} />
      
    {/* <!--Header Html start here--> */}
    <header className="header_outer">
        <div className="header_inner">
            <div className="container">
                <div className="headerbar">
                <div className="logo">
                    <a title=""><img width="100" src={logo} alt="Site Title"/></a>
                </div>
                <div className="menu_links">
                    <h1>DevOps Self-Assessment</h1>
                    <p>Helping you become a high-performer</p>
                </div>
                </div>
                <div className='print_btn'>
                <button
            className="printbutton"
            color="primary"
            onClick={() => printButton?.()}
          >Print</button>
                </div>
                <div className='print_btn' style={{marginLeft:"10px"}}>
                <button
            className="printbutton"
            color="primary"
            onClick={uploadtoS3}
          >Upload</button>
                </div>
            </div>
        </div>
    </header>
    <section className="page_sec result_page">
        <div className="container">
            <div className="row">
                <div className="bg_inside">
                    <div className="col-md-12 col-sm-12 bg_style">
                    <PrintComponent onPrintButtonSet={setPrintButton} Component={Component}/>
                    <div className="result_sec">
        <h2>Pillars</h2>
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Questions answered</th>
                    <th scope="col">High risks</th>
                    <th scope="col">Medium risks</th>
                    <th scope="col">Low risks</th>
                </tr>
            </thead>
            <tbody>
                {
                    checkboxValues.map((val)=>( 
                    <tr key={val.name}>
                        <th scope="row">{val.name}</th>
                        <td>{val.questions_answered}</td>   
                        <td>{val.high_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"HIGH_RISK", allDataresult:data}}>{val.high_risks}</NavLink>:val.high_risks}</td>
                        <td>{val.medium_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"MEDIUM_RISK",allDataresult:data}}>{val.medium_risks}</NavLink>:val.medium_risks}</td>
                        <td>{val.low_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"LOW_RISK",allDataresult:data}}>{val.low_risks}</NavLink>:val.low_risks}</td>
                    </tr>))
                }
                
            </tbody>
        </table>
        </div>
        <div className="pdfwidth" style={{width:"100%"}}>
        <div ref={pdfRef} className="result_sec" style={{width:"100%"}}>
        <h2>Pillars</h2>
        <table className="table pdftable" style={{width:"100%"}}>
            <thead style={{width:"100%"}}>
                <tr>
                    <th scope="col" style={{width:"20%"}}>Name</th>
                    <th scope="col" style={{width:"20%"}}>Questions answered</th>
                    <th scope="col" style={{width:"20%"}}>High risks</th>
                    <th scope="col" style={{width:"20%"}}>Medium risks</th>
                    <th scope="col" style={{width:"20%"}}>Low risks</th>
                </tr>
            </thead>
            <tbody>
                {
                    checkboxValues.map((val)=>( 
                    <tr key={val.name}>
                        <th scope="row">{val.name}</th>
                        <td>{val.questions_answered}</td>   
                        <td>{val.high_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"HIGH_RISK", allDataresult:data}}>{val.high_risks}</NavLink>:val.high_risks}</td>
                        <td>{val.medium_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"MEDIUM_RISK",allDataresult:data}}>{val.medium_risks}</NavLink>:val.medium_risks}</td>
                        <td>{val.low_risks!=0?<NavLink to={'/home/resources'} state={{fromresults:true, dataresult:data?.pillars.filter(z=>z.name===val.name),checkboxCheckedresult:checkboxChecked, checkboxValuesresult:checkboxValues, riskresult:risk, riskType:"LOW_RISK",allDataresult:data}}>{val.low_risks}</NavLink>:val.low_risks}</td>
                    </tr>))
                }
                
            </tbody>
        </table>
        <div><Showresult data={data} checkboxChecked={checkboxChecked} /></div>
        </div>
        </div>
   
                    </div>


                </div>
                
            </div>
        </div>
    </section>




    </div>
  )
}

export default Result
