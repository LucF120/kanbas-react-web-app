import { BsGripVertical } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import AssignmentsButtons from "./AssignmentsButtons";
import Search from "./Search";
import { FaEdit } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
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
                    <li className="wd-assignment-list-item list-group-item p-0 fs-5">
                        <div className="wd-title p-3 ps-2 d-flex align-items-center">
                            <BsGripVertical className="me-4 fs-3" />
                            <FaEdit className="me-4 fs-3 text-success" />
                            <div className="d-flex flex-grow-1 align-items-center ms-4">
                                <div>
                                    <a className="wd-assignment-link text-decoration-none enable-button-pointers" href="#/Kanbas/Courses/1234/Assignments/1">
                                        <h1 className="text-dark">A1 - ENV + HTML</h1>
                                    </a>
                                    <span>
                                        <span className="text-danger">Multiple Modules </span>
                                        <span className="text-secondary">|</span>
                                        <span className="text-dark"> Not available until</span>
                                        <span className="text-secondary"> May 6 at 12:00am </span>
                                        <span className="text-secondary">|</span>
                                        <br />
                                        <span className="text-dark"> Due</span>
                                        <span className="text-secondary"> May 13 at 11:59pm | 100 pts</span>
                                    </span>
                                </div>


                            </div>
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-5 fs-3" />
                        </div>
                    </li>
                    <li className="wd-assignment-list-item list-group-item p-0 fs-5">
                        <div className="wd-title p-3 ps-2 d-flex align-items-center">
                            <BsGripVertical className="me-4 fs-3" />
                            <FaEdit className="me-4 fs-3 text-success" />
                            <div className="d-flex flex-grow-1 align-items-center ms-4">
                                <div>
                                    <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/1">
                                        <h1 className="text-dark">A2 - CSS + BOOTSTRAP</h1>
                                    </a>
                                    <span>
                                        <span className="text-danger">Multiple Modules </span>
                                        <span className="text-secondary">|</span>
                                        <span className="text-dark"> Not available until</span>
                                        <span className="text-secondary"> May 13 at 12:00am </span>
                                        <span className="text-secondary">|</span>
                                        <br />
                                        <span className="text-dark"> Due</span>
                                        <span className="text-secondary"> May 20 at 11:59pm | 100 pts</span>
                                    </span>
                                </div>
                            </div>
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-5 fs-3" />
                        </div>
                    </li>
                    <li className="wd-assignment-list-item list-group-item p-0 fs-5">
                        <div className="wd-title p-3 ps-2 d-flex align-items-center">
                            <BsGripVertical className="me-4 fs-3" />
                            <FaEdit className="me-4 fs-3 text-success" />
                            <div className="d-flex flex-grow-1 align-items-center ms-4">
                                <div>
                                    <a className="wd-assignment-link text-decoration-none" href="#/Kanbas/Courses/1234/Assignments/1">
                                        <h1 className="text-dark">A3 - JAVASCRIPT + REACT</h1>
                                    </a>
                                    <span>
                                        <span className="text-danger">Multiple Modules </span>
                                        <span className="text-secondary">|</span>
                                        <span className="text-dark"> Not available until</span>
                                        <span className="text-secondary"> May 20 at 12:00am </span>
                                        <span className="text-secondary">|</span>
                                        <br />
                                        <span className="text-dark"> Due</span>
                                        <span className="text-secondary"> May 27 at 11:59pm | 100 pts</span>
                                    </span>
                                </div>
                            </div>
                            <GreenCheckmark />
                            <IoEllipsisVertical className="ms-5 fs-3" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
