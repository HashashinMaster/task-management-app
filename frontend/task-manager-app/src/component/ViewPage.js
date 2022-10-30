import "./ViewPage.css"
import Dashboard from "./Dashboard";
import SearchNav from "./SearchNav";
// import ListView from "./ListView";
import TaskForm from "./TaskForm";
import { createContext, useEffect, useRef, useState } from "react";


export const NotificationContext = createContext();
export default function Main({view, index}){
    const [notification,setNotification] = useState();
    const taskForm = useRef(null);
    const [listView,setlistView] = useState(view);
    const [reRendertasks,setreRendertasks] = useState(false);
    const [dashboard,setDashbaord] = useState(<Dashboard key={index} index={index}/>);
    const toggleForm = ()=>{        
        taskForm.current.style.display = "flex";
    }
    useEffect(()=>{
        setlistView(current=>[current]);
    },[reRendertasks]);
    useEffect(()=>{
        setlistView(view);
        setDashbaord([<Dashboard key={index} index={index}/>]);
    },[view]);
    return(
        <NotificationContext.Provider value={setNotification}>
        <div id="Main">
        {dashboard}
        <div className="main_container">
        <SearchNav/>
        <button id="add_task" onClick={toggleForm}>
        <i className="fa-solid fa-plus"></i>
        </button>
        {listView}
        <TaskForm ref={taskForm} reRendertasks={setreRendertasks}/>
        </div>
        <div className="notif_container">
        <div>
            {notification}     
        </div>

        </div>
        </div>
        </NotificationContext.Provider>
    )
}
