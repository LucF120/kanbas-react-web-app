import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsButtons from "./AssignmentsButtons";
import Search from "./Search";
import { FaEdit } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { useParams } from "react-router";
import * as db from "../../Database";
import DateToString from "./DateToString";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    return (
        <div id="wd-assignments">
            <Search /><br /><br />
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
                        .map((assignment: any) => (
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
                                    <IoEllipsisVertical className="ms-5 fs-3" />
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}