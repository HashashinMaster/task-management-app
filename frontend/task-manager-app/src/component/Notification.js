import { useEffect, useRef } from "react";
import "./Notification.css";


export default function Notification ({type, msg}){
    const notifType = type == "success" ? "success_notif" : type="error" ?"error_notif":"";
    const notif = useRef();
    useEffect(()=>{
        if(notif.current){
            setTimeout(()=>{
                    notif.current.style.animation = "leave 0.5s";
                setTimeout(() => {
                        notif.current.remove();
                    
                }, 500);
            },5000);
        }

    },[])
    return(      
        <div className= {"notification " + notifType} ref={notif}> 
            <div className={`notif_icon ${type == "success" ? "success_icon" : type="error" ?"error_icon":""}`}>
            
            <i className={`fa-solid ${type == "success" ? "fa-circle-check" : type="error" ?"fa-triangle-exclamation":""}`}></i>
            </div>
            {msg}
            <i className="fa-solid fa-xmark" onClick={e=>e.target.parentElement.remove()}></i>
        </div>
    )
}