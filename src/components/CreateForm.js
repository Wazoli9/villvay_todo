import React from "react";

export default function CreateForm(props) {
    return (
        <div class="form">
            <form onSubmit={props.handleSubmit} className="create-form">
                <label>
                    Task
                    <input
                        className="title-input"
                        type="text"
                        value={props.createdTodo.title}
                        onChange={props.handleChange}
                        name="title"
                        required
                    />
                </label>
                <label>
                    Asignee
                    <input
                        className="asignee-input"
                        type="text"
                        value={props.createdTodo.asignee}
                        onChange={props.handleChange}
                        name="asignee"
                    />
                </label>
                <label>
                    Due Date
                    <input
                        className="date-input"
                        type="date"
                        value={props.createdTodo.date}
                        onChange={props.handleChange}
                        name="date"
                    />
                </label>
                <label>
                    Completed
                    <input
                        className="check-input"
                        type="checkbox"
                        checked={props.createdTodo.done}
                        onChange={props.handleChange}
                        name="done"
                    />
                </label>
                <input
                    type="submit"
                    className="form-btn btn"
                    value={props.isEditing ? "Edit Contact" : "Create Contact"}
                />
            </form>
            <div onClick={props.closeModal} className="form-btn btn">
                Close
            </div>
        </div>
    );
}
