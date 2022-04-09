import {React, useState, useEffect} from "react";
import Todo from "./Todo";

export default function Todos(){
    return(
        <div className="todos-container">
            <div className="todo-container">
                <h3 className="tabs-todo tab-option">To Do</h3>
                <Todo/>
            </div>
            <div className="done-container">
                <h3 className="tabs-done tab-option">Done</h3>
                <Todo/>
            </div>
        </div>
    )
}