import "./Dashboard.css";

import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function Dashboard({index}){
    const [list,calendar,board,smallAside] = [useRef(),useRef(),useRef(),useRef()];
    useEffect(()=>{
        [list,calendar,board].forEach(e=>e.current.id="");
        smallAside.current.querySelectorAll(`ul .dash_list`).forEach(e=>e.id = "");
        [list,calendar,board][index-1].current.id = "clicked";
        smallAside.current.querySelectorAll(`ul .dash_list`)[index-1].id = "clicked";
    },[index]);

    window.addEventListener("resize",()=>{
        if ( window.innerWidth > 830){
            if(smallAside){
                if(smallAside.current != undefined  || smallAside.current != null)
                    smallAside.current.style.display = "none";
            }
        }
    });
    return(
        <>
        <aside id="big_screen">
            <div id="logo_container">
                <h2>Logo</h2>
            </div>
            <ul>
                          
                <li className="dash_list" key={1}>
                <i  className="fa-solid fa-bars-staggered"></i> <h5>Dashboard</h5>
                </li>
                <Link to={"/ListView"} style={{textDecoration :"none"}}>     
                <li className="dash_list" ref={list}>
                <i className="fa-solid fa-list-check" ></i><h5>List</h5>
                </li>
                </Link>
                <Link to={"/Calendar"} style={{textDecoration :"none"}}>     
                <li className="dash_list" ref={calendar} key={2}>
                <i className="fa-solid fa-calendar-days" ></i><h5>Calendar</h5>
                </li>
                </Link>
                <Link to={"/Board"} style={{textDecoration :"none"}}>     
                <li className="dash_list" ref={board} key={3}>
                <i className="fa-solid fa-clipboard-list" ></i><h5>Board</h5>
                </li>
                </Link>

            </ul>
        </aside>
        <aside id="small_screen" ref={smallAside}>
            <div id="logo_container" onClick={()=>smallAside.current.style.display = "none"}>
                <h2>Logo</h2>
            </div>
            <ul>
                          
                <Link to={"/ListView"} style={{textDecoration :"none"}}>     
                <li className="dash_list" >
                <i className="fa-solid fa-list-check" ></i><h5>List</h5>
                </li>
                </Link>
                <Link to={"/Calendar"} style={{textDecoration :"none"}}>     
                <li className="dash_list">
                <i className="fa-solid fa-calendar-days" ></i><h5>Calendar</h5>
                </li>
                </Link>
                <Link to={"/Board"} style={{textDecoration :"none"}}>     
                <li className="dash_list">
                <i className="fa-solid fa-clipboard-list" ></i><h5>Board</h5>
                </li>
                </Link>

            </ul>
        </aside>
        </>
    
    )
    }