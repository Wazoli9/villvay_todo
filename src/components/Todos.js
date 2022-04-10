import { React, useState, useEffect, useRef } from "react";
import Todo from "./Todo";

export default function Todos() {
    const [createdTodo, setCreatedTodo] = useState({
        id: undefined,
        uid:undefined,
        title: "",
        asignee: "",
        date: "",
        done: false,
    });

    const modalEl = useRef();
    const openModal = () => {
        modalEl.current.showModal();
    };

    const handleChange = (event) => {
        const target = event.target;
        const value =
            target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        setCreatedTodo((prevState) => {
            return {
                ...prevState,
                [name]: value,
            };
        });
    };
    const closeModal = ()=>{
        modalEl.current.close()
    }
    return (
        <div className="todos">
            <h2 onClick={openModal} className="create-btn btn">
                Create Todo
            </h2>
            <div className="todos-container">
                <div className="todo-container">
                    <h3 className="tabs-todo tab-option">To Do</h3>
                    <Todo />
                </div>
                <div className="done-container">
                    <h3 className="tabs-done tab-option">Done</h3>
                    <Todo />
                </div>
            </div>
            <dialog ref={modalEl}>
                <form className="create-form">
                    <label>
                        Task
                        <input
                            type="text"
                            value={createdTodo.title}
                            onChange={handleChange}
                            name="title"
                        />
                    </label>
                    <label>
                        Asignee
                        <input
                            type="text"
                            value={createdTodo.asignee}
                            onChange={handleChange}
                            name="asignee"
                        />
                    </label>
                    <label>
                        Due Date
                        <input className="date-input"
                            type="date"
                            value={createdTodo.date}
                            onChange={handleChange}
                            name="date"
                        />
                    </label>
                    <label>
                        Completed
                        <input className="check-input"
                            type="checkbox"
                            value={createdTodo.done}
                            onChange={handleChange}
                            name="done"
                        />
                    </label>
                </form>
                <div className="form-btn btn">
                    Create Task
                </div>
                <div onClick={closeModal} className="form-btn btn">
                    Close
                </div>
            </dialog>
        </div>
    );
}
