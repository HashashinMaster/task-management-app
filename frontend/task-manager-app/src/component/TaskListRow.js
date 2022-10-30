import "./TaskListRow.css";
import { useRef,useEffect,useContext } from "react";
import { NotificationContext } from "./ViewPage";
import Notification from "./Notification";
import axios from "axios";
import { TasksContext } from "./ListView";

export const icons = {
    Food:<i className="fa-solid fa-utensils" style={{marginRight:"10px"}}></i>,
    Map:<i className="fa-solid fa-map" style={{marginRight:"10px"}}></i>,
    Meeting:<i className="fa-solid fa-handshake" style={{marginRight:"10px"}}></i>,
    Travel:<i className="fa-solid fa-plane-arrival" style={{marginRight:"10px"}}></i>,
    Games:<i className="fa-solid fa-gamepad" style={{marginRight:"10px"}}></i>,
    Sport:<i className="fa-solid fa-volleyball" style={{marginRight:"10px"}}></i>,
    Other:<i className="fa-regular fa-circle-question" style={{marginRight:"10px"}}></i>
}

export default function TaskListRow({completed,title,category,dueDate,_id,time,description,path}){
    const notification = useContext(NotificationContext);
    const updateTask = useContext(TasksContext);
    const checkDIV = useRef(null);
    const dragStarted = (e)=>{
        e.target.classList = "item_row dragging closed";
    }
    const dragEnded = (e)=>{
        e.target.classList = "item_row closed";
             if(e.target.id)
                 checkDIV.current.click();
        
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
    const changeTaskData = async (e)=>{
        if(e){
            e.preventDefault();                        
        }
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
        useEffect(()=>{
            if(completed)
            checkDIV.current.classList = "checking checked";
            else
            checkDIV.current.classList = "checking";
        },[]);
    return(
        <tr className="item_row closed" draggable="true" onDragStart={dragStarted} onDragEnd={dragEnded} >
            <td>
                <i className="fa-solid fa-chevron-down"   onClick={e=>{
                    if(e.target.parentElement.parentElement.classList.value == "item_row" && e.target.parentElement.parentElement.classList.value != "item_row dragging"){
                        e.target.parentElement.parentElement.classList = "item_row closed";
                        
                    }
                    else{
                        e.target.parentElement.parentElement.classList = "item_row";
                    }
                     } }></i>
                    <div className="task_row_header">
                        <div className="" ref={checkDIV} onClick ={changeTaskData}>
                        <i className="fa-solid fa-check row"></i>

                        </div>
                        <div  className="task_row_title">
                            <span style={{
                                textDecorationLine:completed?"line-through":""
                            }}>
                            {title}
                            <i className="fa-solid fa-calendar-xmark" onClick={removeTask}  style={{position:"absolute",bottom:"10px",right:"10px",transition:"0.23s",cursor:"pointer"}}></i>
                            </span>
                            <br></br>
                            <i className="fa-solid fa-diagram-successor"></i>
                            <div style={{marginLeft:"10px"}}>
                                {icons[category]}
                                {category}
                            </div>
                            <div style={{marginLeft:"10px"}}>
                                <i className="fa-solid fa-calendar-check" style={{marginRight:"10px"}} ></i>
                                {dueDate}
                            </div>
                            <div style={{marginLeft:"10px"}}>
                                <i className="fa-solid fa-hourglass-half" style={{marginRight:"10px"}}></i>
                                {time}
                            </div>
                            <div style={{marginLeft:"10px"}}>
                                <i className="fa-solid fa-comment" style={{marginRight:"10px"}}></i>
                                {description == ""?"u didn't enter any description":description}
                            </div>
                            <div style={{marginLeft:"10px",position:"relative"}}>
                            <i className="fa-solid fa-image" style={{marginRight:"10px",cursor:"pointer" ,display: path == "/"?"none":""}} >

                            </i>
                            <div className="imgContainer" style={{position:"absolute",top:0,left:"30px",zIndex:"2"}}> 
                                <img src={path} style={{maxWidth:"200px",maxHeight:"200px"}}/>
                            </div>
                            </div>
                        </div>
                    </div>
                    
                    
            </td>

        </tr>
        
    )
}