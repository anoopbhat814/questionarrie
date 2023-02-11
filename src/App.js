
import React,{useState} from "react"
import logo from './logo.svg';
import './App.css';
import { Routes,Route ,Navigate} from "react-router-dom";
import Assesment from './Pages/Assesment';
import Home from './Pages/Home';
import Resources from './Pages/Resources';
import Result from './Pages/Result'



function App() {
  
  return (
    <div className="App">
      {/* <Assesment/> */}
      {/* <Home></Home> */}
     
      <Routes>
      <Route  path='/' exact element={<Navigate to='/home'></Navigate>}></Route>
       <Route path='/home'element={<Home ></Home>} ></Route>
        <Route path='/home/resources' element={ <Resources authorized={false}/>} />
        <Route path='/home/assessment' element={ <Assesment />}/>
        <Route path='/home/result' element={<Result ></Result>}></Route>
        
        </Routes>
       
{/* <Resources></Resources> */}
    </div>
  );
}

export default App;
