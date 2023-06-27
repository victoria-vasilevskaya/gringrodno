import React, {useState,useEffect} from 'react';
import Abonents from './Abonents/Abonents';
import DeviceStatus from './DeviceStatus/DeviceStatus';
import {  Route,Routes,useParams } from 'react-router-dom';
import LoginPage from '../pages/login/loginPage'
import Journal from '../pages/journalPage/journalPage'
import MasterPage from '../pages/masterpage/masterPage'
import AdminPage from '../pages/adminPage/adminPage'
import AdminPanel from './Adminpanel/AdminPanel'
import Axios from 'axios';
import Header from './header/Header';



const AppRouter = () =>{
    const [data,setData]=useState([]);
  const [stat,setStat]=useState([]);
  let {id} = useParams(); 
  const [date,setDate]= useState("");
  const[idabonent,setIdAbonent] = useState(0);

  useEffect(()=>{
    Axios.get("http://localhost:5000/abonent-device")
    .then((response) => {
      if(response)
      setData(response.data)    
  });
},[])
 
  const uplevel=[];
  const upsnr=[];
  const time=[];
  

  useEffect(()=>{
    Axios.get("http://localhost:5000/abonent-device/abonent-stats/"+id)
    .then((response) => {
      if(response)
      setStat(response.data);
      console.log(stat);
      console.log(id);
      stat.map(data=>{
        uplevel.push(data.uplevel);
        upsnr.push(data.uplsnr);
        time.push(data.time);
      });     
  });
  },[])

  const idAbonentChange=(idabonent)=>{
    setIdAbonent(idabonent);
    id=idabonent;
  }
  const dataSet=(data)=>{
    setDate(date);
  }
    return( 
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/master" element={<MasterPage />} />
            <Route path="/admin-panel/*" element={<AdminPanel />} />
            <Route path='/abonent-device' element={[<Header/>,<Abonents rows = {data} idabonent={idAbonentChange} data={dataSet} />]} />
            <Route path={'/abonent-device/device-stats/'+idabonent} element={[<Header />,<DeviceStatus data={date} idabonent={idabonent}/> ]} />
        </Routes>
    )
}

export default AppRouter;