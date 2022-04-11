import React from "react";

export default function Todo(props) {
    const formatDate = () => {
        if (props.todo.date) {
            const dateArray = props.todo.date.split("-");
            return `${dateArray[2]}-${dateArray[1]}-${dateArray[0]}`;
        }
    };
    return (
        <div className="todo">
            <div className="todo-info">
                <h2 className="todo-title">{props.todo.title}</h2>
                <div className="todo-details">
                    <div className="todo-detail">
                        <h4>Asignee</h4>
                        <h3 className="todo-asignee">{props.todo.asignee}</h3>
                    </div>
                    <div className="todo-detail">
                        <h4>Due Date</h4>
                        <h3 className="todo-date">{formatDate()}</h3>
                    </div>
                    <div className="todo-detail">
                        <h3
                            onClick={() =>
                                props.handleDoneToggle(
                                    props.id,
                                    props.todo.done
                                )
                            }
                            className="todo-btn btn"
                        >
                            {props.todo.done ? "Not Done" : "Done"}
                        </h3>
                    </div>
                    <div className="todo-detail">
                        <h3
                            onClick={() =>
                                props.handleEdit(props.id, props.todo)
                            }
                            className="todo-btn btn"
                        >
                            Edit
                        </h3>
                    </div>
                    <div className="todo-detail">
                        <h3
                            onClick={() => props.handleDelete(props.id)}
                            className="todo-btn btn"
                        >
                            Delete
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
