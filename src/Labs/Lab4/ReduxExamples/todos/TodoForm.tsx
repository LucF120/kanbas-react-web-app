import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any)  => state.todosReducer);
    const dispatch = useDispatch();
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-5">
                    <input className="form-control" value={todo.title}
                        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))} />
                </div>
                <div className="col-7">
                    <button onClick={() => dispatch(addTodo(todo))}
                        id="wd-add-todo-click"
                        className="btn btn-success float-end"> Add </button>
                    <button onClick={() => dispatch(updateTodo(todo))}
                        id="wd-update-todo-click"
                        className="btn btn-warning me-2 float-end"> Update </button>
                </div>
            </div>
        </li>
    );
}
