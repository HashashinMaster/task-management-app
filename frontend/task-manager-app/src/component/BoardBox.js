import axios from "axios";
import { useRef, useEffect, useContext } from "react";
import "./BoardBox.css";
import {icons} from "./TaskListRow";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";
import { TasksContext } from "./BoardView"
Date.prototype.monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
];
function getDateFormula(dueDate) {
    let day = "";
    let month = "";
    let year = "";
    for (let i =0; i<dueDate.length;i++){
        if(dueDate[i] != "/"){
            day += dueDate[i];
        }
        else{
            year = dueDate.slice(i+1,dueDate.length);
            break
        }
    }
    for (let i =0; i<year.length;i++){
        if(year[i] != "/"){
            month += year[i];
        }
        else{
            month = Date.prototype.monthNames[Number(month-1)]
            year = year.slice(i+1,dueDate.length);
            break
        }
    }
    return [day,month,year]
}
export default function BoardBox({ completed,title,category,dueDate,_id,time,description,path }){
    const notification = useContext(NotificationContext);
    const updateTask = useContext(TasksContext);

    const [titleref,container] = [useRef(),useRef()];
    const dragStarted = (e)=>{
        container.current.classList = `board_box_container closed ${category} dragging`;
    }
    const dragEnded = async (e)=>{
        container.current.classList = `board_box_container closed ${category}`; 
        if(container.current.id){
            e.preventDefault();                        
            const {data} = await axios.put(`http://localhost:3002/api/tasks/${_id}`,
            {
                completed : !completed
            });
            if(data.success){
                notification(currentValue=>{
                    if(currentValue){
                        return [...currentValue,<Notification  msg={data.msg} type="success"/>];
                    }
                        return [<Notification  msg={data.msg} type="success"/>]; 
                });
                
                updateTask(currVal=>{
                    return !currVal
                })
            }
            }
        
    }
    const removeTask = async ()=>{
        const {data} = await axios.delete(`http://localhost:3002/api/tasks/${_id}`);
        if(data.success){
            notification(currentValue=>{
                if(currentValue){
                    return [...currentValue,<Notification  msg={data.msg} type="success"/>];
                }
                    return [<Notification  msg={data.msg} type="success"/>]; 
            });
            
            updateTask(currVal=>{
                return !currVal
            })
        }

    };
    useEffect(() => {
        if(title.length > 34){
            title = title.slice(0,31).trim() + "...";
            titleref.current.textContent = title;
        }
        else{
            titleref.current.textContent = title.trim();
        }
    },[title]);
    
    return(
        <div draggable="true"  onDragStart={dragStarted} onDragEnd={dragEnded} className={`board_box_container closed ${category}`} ref={container} onClick={()=>{
            container.current.classList = container.current.classList.value == `board_box_container opened ${category}` ? `board_box_container closed ${category}` : `board_box_container opened ${category}`
        }}>
            <i className="fa-solid fa-xmark" onClick={removeTask}></i>
            <div className="box_icon_container">
                <div className="icon_container">
                    {icons[category]}  
                </div>
            </div>
                <div className="box_info_container">
                <h4 ref={titleref}></h4>
                <h6>{`${getDateFormula(dueDate)[0]} ${getDateFormula(dueDate)[1]} ${ getDateFormula(dueDate)[2]} > `}  {time}</h6>
                </div>
                <div className="back_info">
                <p>
                    {description}
                </p>
                </div>
               {path != "/"?<img src={path} alt=""/> : ""}
                  
        </div>
    )
}