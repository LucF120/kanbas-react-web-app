import React, { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsButtons from "./AssignmentsButtons";
import Search from "./Search";
import { FaEdit } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import DateToString from "./DateToString";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, deleteAssignment, setAssignments } from "./reducer";
import { FaTrash } from "react-icons/fa";
import DeleteConfirmation from "./DeleteConfirmation";
import * as client from "./client";

export default function Assignments() {
    const { cid } = useParams();
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const [assignment, setAssignment] = useState<any>({
        _id: new Date().getTime().toString(),
        title: "",
        course: cid,
        description: "",
        points: 100,
        availableDate: "",
        dueDate: "",
        untilDate: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const removeAssignment = async (assignmentId: string) => {
        try {
            await client.deleteAssignment(assignmentId);
            dispatch(deleteAssignment(assignmentId));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    };
    const fetchAssignments = async () => {
        const assignments = await client.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };
    useEffect(() => {
        fetchAssignments();
    }, []);

    return (
        <div id="wd-assignments">
            {errorMessage && (
                <div id="wd-assignment-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
            )}
            <Search course={cid} assignment={assignment} /><br /><br />
            <div>
                <ul id="wd-assignment-list" className="list-group rounded-0 border border-left-success">
                    <li className="list-group-item p-0 fs-5 border-gray">
                        <div className="wd-title p-3 ps-2 bg-secondary">
                            <BsGripVertical className="me-2 fs-3" />
                            <IoMdArrowDropdown className="me-2 fs-3" />
                            ASSIGNMENTS
                            <AssignmentsButtons />
                        </div>
                    </li>
                    {assignments
                        .filter((assignment: any) => assignment.course === cid)
                        .map((assignment: any) => {
                            const customId = `wd-delete-assignment-confirmation-${assignment._id}`;
                            return (
                                <li className="wd-assignment-list-item list-group-item p-0 fs-5">
                                    <div className="wd-title p-3 ps-2 d-flex align-items-center">
                                        <BsGripVertical className="me-4 fs-3" />
                                        <FaEdit className="me-4 fs-3 text-success" />
                                        <div className="d-flex flex-grow-1 align-items-center ms-4">
                                            <div>
                                                <a className="wd-assignment-link text-decoration-none enable-button-pointers" href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}>
                                                    <h1 className="text-dark">{assignment.title}</h1>
                                                </a>
                                                <span>
                                                    <span className="text-danger">{assignment.multipleModules ? "Multiple Modules " : "Single Module "}</span>
                                                    <span className="text-secondary">|</span>
                                                    <span className="text-dark"> Not available until</span>
                                                    <span className="text-secondary"> {DateToString(assignment.availableDate)} </span>
                                                    <span className="text-secondary">|</span>
                                                    <br />
                                                    <span className="text-dark"> Due</span>
                                                    <span className="text-secondary"> {DateToString(assignment.dueDate)} | {assignment.points} pts</span>
                                                </span>
                                            </div>
                                        </div>
                                        <GreenCheckmark />
                                        <FaTrash role="button" className="text-danger ms-5" data-bs-toggle="modal" data-bs-target={"#" + customId} />
                                        <IoEllipsisVertical className="ms-5 fs-3" />
                                        <DeleteConfirmation dialogTitle="Assignment Delete Confirmation" assignment={assignment} customId={customId} deleteAssignment={(assignmentId) => { removeAssignment(assignmentId); }} />
                                    </div>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
}