import { useRef } from "react";
import "./CalendarTaskRow.css";

import {icons} from "./TaskListRow"

export default function CalendarTaskRow({completed,title,category,dueDate,_id,time,description,path}){
    const task = useRef();
    return (
        <div ref={task} className={ completed == true? "calendar_task_row_container completed" : "calendar_task_row_container"} onClick={
            ()=>{
                
                task.current.classList = task.current.classList.value.includes("opened")?task.current.classList.value.replace(" opened",""):task.current.classList.value + " opened";
            }
        }>
            <div>
            {title}
            </div>
            <div>
            {icons[category]}{category}
            </div>
            <div>
            <i className="fa-solid fa-calendar-days"></i>{dueDate}
            </div>
            <div>
            <i className="fa-regular fa-clock"></i>{time}
            </div>
            <div>
            {description}
            </div>
        </div>
    )
}