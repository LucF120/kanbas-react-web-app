import React, { useState } from "react";
export default function ArrayStateVariable() {
    const [array, setArray] = useState([1, 2, 3, 4, 5]);
    const addElement = () => {
        setArray([...array, Math.floor(Math.random() * 100)]);
    };
    const deleteElement = (index: number) => {
        setArray(array.filter((item, i) => i !== index));
    };
    return (
        <div id="wd-array-state-variables">
            <h2>Array State Variable</h2>
            <button className="btn btn-success mb-1" onClick={addElement}>Add Element</button>
            <ul className="list-group col-5">
                {array.map((item, index) => (
                    <li className="list-group-item" key={index}>
                        {item}
                        <button onClick={() => deleteElement(index)}
                            id="wd-delete-element-click"
                            className="btn btn-danger float-end">
                            Delete</button>
                    </li>
                ))}
            </ul>
            <hr />
        </div>
    );
}
