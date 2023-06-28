import React, {useState, useEffect} from "react";
import st from './updateApplication.module.css'
import TextField from '@mui/material//TextField';
import MuiMenuItem from '@mui/material/MenuItem';
import Select from '@mui/material//Select';
import axios from 'axios'
import swal from 'sweetalert2';

const UpdateApplicationModal = ({show, onHide}, props) => {

    const actionsForMaster = [
        {
            "id_action": 3,
            "name_action": "Выполнена"
        },
        {
            "id_action": 4,
            "name_action": "Не выполнена"
        }
    ]

    const actionsForManager = [
        {
            "id_action": 1,
            "name_action": "Отменена"
        },
        {
            "id_action": 2,
            "name_action": "В работе"
        },
        {
            "id_action": 3,
            "name_action": "Выполнена"
        },
        {
            "id_action": 4,
            "name_action": "Не выполнена"
        }
    ]

    const [inputValueAction, setInputValueAction] = useState('')
    const [application, setApplication] = ([])
    const [inputValueComment, setInputValueComment] = useState('')

    const handleChangeAction = (event) => {
        setInputValueAction(event.target.value);
    };

    function handleSubmit(){
        var id = localStorage.getItem("Row")
       axios.put("http://localhost:5000/api/application/update/"+id, {
            comment: inputValueComment,
            action: inputValueAction,
        }).then((response) => {
            console.log(response)
        }).catch(err=>console.log(err));
        swal.fire('Данные обновлены.', '', 'success')
    };

    useEffect(()=>{
        axios.get("https://gringrodno-a57ffb08e075.herokuapp.com/api/application/"+localStorage.getItem("Row"))
        .then(res=>{
            application.push({
                "master": res.data[0]?.name,
                "date": new Date(res.data[0]?.data_application).getDate() + "-" + (new Date(res.data[0]?.data_application).getMonth() + 1) + "-" + new Date(res.data[0]?.data_application).getFullYear(),
                "time": res.data[0]?.time,
                "address": res.data[0]?.street + " д." + res.data[0]?.house + " кв." + res.data[0]?.flat,
                "phone": res.data[0]?.phone_number,
                "task": res.data[0]?.name_task,
                "action": res.data[0]?.name_action,
                "comment_master": res.data[0]?.comment_master
              })
        })
        .catch(err=>console.log(err)); 
    },[])

    return(
        (localStorage.getItem("role") === "Менеджер") ?
            (<div className={show ? (`${st.modal} ${st.active}`) : (`${st.modal}`)} onClick={() => onHide(false)}>
                <div className={st.container} onClick={e => e.stopPropagation()}>
                    <div className={st.caption}>
                        <span>Редактирование заявки</span>
                        <button className={st.btnClose} onClick={() => onHide(false)}>Х</button>
                    </div>
                    <div className={st.inputs}>
                        <div className={st.labels}>
                            <div className={st.inputs1}>
                                <div className={st.labelMaster}>
                                    <span>Мастер</span>
                                    <span>{application.master}</span>
                                </div>
                                <div className={st.labelAddress}>
                                    <span>Адрес</span>
                                    <span>{application.address}</span>
                                </div>
                            </div>
                            <div className={st.inputs2}>
                                <div className={st.labelData}>
                                    <span>Дата</span>
                                    <span>{application.date}</span>
                                </div>
                                <div className={st.labelTime}>
                                    <span>Время</span>
                                    <span>{application.time}</span>
                                </div>
                            </div>
                            <div className={st.inputs3}>
                                <div className={st.labelTask}>
                                    <span>Вид заявки</span>
                                    <span>{application.task}</span>
                                </div>
                                <div className={st.inputCommentMaster}>
                                    <span>Комментарий мастера</span>
                                    <span>{application.comment_master}</span>
                                </div>
                            </div>
                        </div>
                        <div className={st.input}>
                            <div className={st.inputAction}>
                                <span>Статус</span>
                                <Select
                                    value={inputValueAction}
                                    onChange={handleChangeAction}
                                    id='inputAction'
                                >
                                    {actionsForManager.map(action =>
                                        <MuiMenuItem value={action.name_action} key={action.id_action}>
                                            {action.name_action}
                                        </MuiMenuItem>) }
                                </Select>
                            </div>
                            <div className={st.inputCommentManager}>
                                <span>Комментарий менеджера</span>
                                <TextField className={st.inputComm} value={inputValueComment}/> 
                            </div>
                        </div>
                    </div>
                    <div className={st.buttons}>
                        <button onClick={handleSubmit}>Сохранить</button>
                    </div>
                </div>
            </div>
            ) : (
                <div className={show ? (`${st.modal} ${st.active}`) : (`${st.modal}`)} onClick={() => onHide(false)}>
                <div className={st.container} onClick={e => e.stopPropagation()}>
                    <div className={st.caption}>
                        <span>Редактирование заявки</span>
                        <button className={st.btnClose} onClick={() => onHide(false)}>Х</button>
                    </div>
                    <div className={st.inputs}>
                        <div className={st.labels}>
                            <div className={st.inputs1}>
                                <div className={st.labelMaster}>
                                    <span>Мастер</span>
                                    <span>{application.master}</span>
                                </div>
                                <div className={st.labelAddress}>
                                    <span>Адрес</span>
                                    <span>{application.address}</span>
                                </div>
                            </div>
                            <div className={st.inputs2}>
                                <div className={st.labelData}>
                                    <span>Дата</span>
                                    <span>{application.date}</span>
                                </div>
                                <div className={st.labelTime}>
                                    <span>Время</span>
                                    <span>{application.time}</span>
                                </div>
                            </div>
                            <div className={st.inputs3}>
                                <div className={st.labelTask}>
                                    <span>Вид заявки</span>
                                    <span>{application.task}</span>
                                </div>
                                <div className={st.inputCommentMaster}>
                                    <span>Комментарий мастера</span>
                                    <span>{application.comment_master}</span>
                                </div>
                            </div>
                        </div>
                        <div className={st.input}>
                            <div className={st.inputAction}>
                                <span>Статус</span>
                                <Select
                                    value={inputValueAction}
                                    onChange={handleChangeAction}
                                    id='inputAction'
                                >
                                    {actionsForMaster.map(action =>
                                        <MuiMenuItem value={action.name_action} key={action.id_action}>
                                            {action.name_action}
                                        </MuiMenuItem>) }
                                </Select>
                            </div>
                            <div className={st.inputCommentManager}>
                                <span>Комментарий менеджера</span>
                                <TextField className={st.inputComm} value={inputValueComment}/> 
                            </div>
                        </div>
                    </div>
                    <div className={st.buttons}></div>
                </div>
            </div>
            )
    )
}

export default UpdateApplicationModal