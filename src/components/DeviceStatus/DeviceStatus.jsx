import React, {  useEffect, useState } from "react";
import s from "./DeviceStatus.module.css";
import TextFielld from "@mui/material//TextField";
import Chart1  from "../Chart/Chart";
import Axios from "axios";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import swal from 'sweetalert2';



const columns = [
  {
    field: 'time',
    headerName: 'Время опроса',
    width: 170,
    hide: true
  },
  {
    field: 'upid',
    headerName: 'ID обратного канала',
    width: 115,

  },
  {
    field: 'upfreq',
    headerName: 'Частота сигнала обратного канала(Гц)',
    width: 140,

  },
  {
    field: 'upwidth',
    headerName: 'Ширина полосы обратного канала(Гц',
    width: 115,

  },
  {
    field: 'uplevel',
    headerName: 'Уровень сигнала в обратном порядке(дБ*мВ)',
    width: 115
  },
  {
    field: 'upsnr',
    headerName: 'Соотношение сигнал/шум в обратном канале(дБ)',
    width: 90
  },
  {
    field: 'downid',
    headerName: 'ID прямого канала',
    width: 95
  },
  {
    field: 'downmod',
    headerName: 'Тип модуляции в прямом канале',
    width: 100
  },
  {
    field: 'downfreq',
    headerName: 'Частота сигнала прямого канала(Гц)',
    width: 90
  },
  {
    field: 'downwidth',
    headerName: 'Ширина полосы прямого канала(Гц)',
    width: 90
  },
  {
    field: 'downlevel',
    headerName: 'Уровень сигнала в прямом канале(дБ*мВ)',
    width: 110
  },
  {
    field: 'downsnr',
    headerName: 'Соотношение сигнал/шум в прямом канале(дБ)',
    width: 100
  },
  {
    field: 'config',
    headerName: 'Файл конфигируцаии',
    width: 130
  }
];
function DeviceStatus(props){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const [stat,setStat]= useState([]);
  const [statDay,setStatDay]= useState([]);
  const [data1,setData1]= useState(year+"-"+month+"-"+date);
  const [data2,setData2]= useState(year+"-"+month+"-"+(date+1));
  const [device,setDevice] = useState([]);
  let {id} = useParams();
  let {dataone} = useParams();
  let {datatwo} = useParams();
  id =props.idabonent;
  const uplevel=[];
  const upsnr=[];
  const time = [];

  useEffect(() => {
    Axios.get("https://localhost:5000/abonent-device/abonent-stats/" + id)
      .then((response) => {
        setStat(response.data);
      })
      .catch(err => console.log(err));
  }, []);
  useEffect(() => {
    dataone = data1;
    datatwo = data2;
    Axios.get("https://localhost:5000/abonent-device/abonent-stats/" + id + "/" + dataone + "/" + datatwo)
      .then((response) => {
        if (response)
          setStatDay(response.data)
      });
  }, []);

  useEffect(() => {
    Axios.get("https://localhost:5000/abonent-device/" + id)
      .then((response) => {
        if (response)
          setDevice(response.data)
      });
  }, [])
  console.log(time);

  function statChart() {
    dataone = data1;
    datatwo = data2;
    Axios.get("https://localhost:5000/abonent-device/abonent-stats/" + id + "/" + dataone + "/" + datatwo)
      .then((response) => {
        if (response)
          setStatDay(response.data)
      });
  }

  return (
    
    <div className={s.DeviceStatus}>
    
      <div className={s.content}>
        <div className={s.titl}>
         Статистика по модему (MAC:{device[0]?.cm_mac} ID:{props.idabonent})
       </div>
       <div className={s.table}>
       <Box sx={{ height: 540, width: '100%' }}>
          <DataGrid
            rows={stat}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            disableRowSelectionOnClick
            getRowId ={(row) => row.idstat}
          />
        </Box>
       </div>
       <div className={s.timeItems}>
       <div className={s.time1}>
       <TextFielld
          id="date"
          type="date"
          InputLabelProps={{
            shrink:true,
          }}
          onChange={e=>{
            setData1(e.target.value)
          }}
          ></TextFielld>
       </div>
       <div className={s.time2}>
          <TextFielld
          id="date"
          type="date"
          InputLabelProps={{
            shrink:true,
          }}
          onChange={e=>{
            setData2(e.target.value)
          }}
          ></TextFielld>
        </div>
        <button onClick={statChart}>
          Показать</button>
        
        </div>
        <div className={s.graph}><Chart1 stat={statDay}/></div>
     
      </div>

    </div>
  );

}

export default DeviceStatus;