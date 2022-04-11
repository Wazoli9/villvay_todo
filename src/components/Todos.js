import { React, useState, useEffect, useRef } from "react";
import Todo from "./Todo";
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export default function Todos(props) {
    const [todoEls, setTodoEls] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [editedId, setEditedId] = useState();
    const [createdTodo, setCreatedTodo] = useState({
        uid: props.currentUser.uid,
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

    const handleSubmit = async () => {
        console.log(createdTodo);
        if (isEditing) {
            await updateDoc(doc(db, "todos", editedId), createdTodo);
            setIsEditing(false);
            setCreatedTodo({
                uid: props.currentUser.uid,
                title: "",
                asignee: "",
                date: "",
                done: false,
            });
        } else {
            await addDoc(collection(db, "todos"), createdTodo);
            setCreatedTodo({
                uid: props.currentUser.uid,
                title: "",
                asignee: "",
                date: "",
                done: false,
            });
        }
        modalEl.current.close();
    };

    const closeModal = () => {
        setIsEditing(false);
        setCreatedTodo({
            uid: props.currentUser.uid,
            title: "",
            asignee: "",
            date: "",
            done: false,
        });
        modalEl.current.close();
    };

    const handleEdit = (id, todo) => {
        modalEl.current.showModal();
        setIsEditing(true);
        setCreatedTodo(todo);
        setEditedId(id);
    };

    const handleDoneToggle = async (id, done) => {
        await updateDoc(doc(db, "todos", id), {
            done: !done,
        });
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "todos", id));
    };

    useEffect(() => {
        const q = query(
            collection(db, "todos"),
            where("uid", "==", props.currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTodoEls(
                querySnapshot.docs.map((doc) => {
                    const todo = {
                        uid: props.currentUser.uid,
                        title: doc.data().title,
                        date: doc.data().date,
                        done: doc.data().done,
                        asignee: doc.data().asignee,
                    };
                    return (
                        <Todo
                            key={doc.id}
                            todo={todo}
                            handleEdit={handleEdit}
                            handleDoneToggle={handleDoneToggle}
                            handleDelete={handleDelete}
                            id={doc.id}
                        />
                    );
                })
            );
        });
        return () => {
            console.log("cleanup");
            unsubscribe();
        };
    }, [props.currentUser]);

    return (
        <div className="todos">
            <h2 onClick={openModal} className="create-btn btn">
                Create Todo
            </h2>
            <div className="todos-container">
                <div className="todo-container">
                    <h3 className="tabs-todo tab-option">To Do</h3>
                    {todoEls &&
                        todoEls.filter((todoEl) => {
                            return !todoEl.props.todo.done;
                        })}
                </div>
                <div className="done-container">
                    <h3 className="tabs-done tab-option">Done</h3>
                    {todoEls &&
                        todoEls.filter((todoEl) => {
                            return todoEl.props.todo.done;
                        })}
                </div>
            </div>
            <dialog ref={modalEl}>
                <form onSubmit={handleSubmit} className="create-form">
                    <label>
                        Task
                        <input
                            className="title-input"
                            type="text"
                            value={createdTodo.title}
                            onChange={handleChange}
                            name="title"
                            required
                        />
                    </label>
                    <label>
                        Asignee
                        <input
                            className="asignee-input"
                            type="text"
                            value={createdTodo.asignee}
                            onChange={handleChange}
                            name="asignee"
                        />
                    </label>
                    <label>
                        Due Date
                        <input
                            className="date-input"
                            type="date"
                            value={createdTodo.date}
                            onChange={handleChange}
                            name="date"
                        />
                    </label>
                    <label>
                        Completed
                        <input
                            className="check-input"
                            type="checkbox"
                            checked={createdTodo.done}
                            onChange={handleChange}
                            name="done"
                        />
                    </label>
                    <input
                        type='submit'
                        className="form-btn btn"
                        value={isEditing ? "Edit Contact" : "Create Contact"}
                    />
                </form>
                <div onClick={closeModal} className="form-btn btn">
                    Close
                </div>
            </dialog>
        </div>
    );
}
