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
import CreateForm from "./CreateForm";

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

    const handleSubmit = async (event) => {
        event.preventDefault()
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

    const handleDoneToggle = async (event, id, done) => {
        event.stopPropagation()
        await updateDoc(doc(db, "todos", id), {
            done: !done,
        });
    };

    const handleDelete = async (event, id) => {
        event.stopPropagation()
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
                <CreateForm
                handleChange = {handleChange}
                isEditing = {isEditing}
                handleSubmit = {handleSubmit}
                createdTodo = {createdTodo}
                closeModal = {closeModal}
                />
            </dialog>
        </div>
    );
}
