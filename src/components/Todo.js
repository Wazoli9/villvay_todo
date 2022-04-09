import React from "react";

export default function Todo() {
    return (
        <div className="todo">
            <div className="todo-info">
                <h2 className="todo-title">Pick up dog</h2>
                <div className="todo-details">
                    <div className="todo-detail">
                        <h4>Asignee</h4>
                        <h3 className="todo-asignee">Thomas</h3>
                    </div>
                    <div className="todo-detail">
                        <h4>Date</h4>
                        <h3 className="todo-date">10/11/1999</h3>
                    </div>
                    <div className="todo-detail">
                    <h3 className="done-btn">Done</h3>
                    </div>
                    <div className="todo-detail">
                    <h3 className="delete-btn">Delete</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
