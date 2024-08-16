import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaFileExport, FaFileImport } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { useParams } from "react-router";
import * as client from "./client";
import * as assignmentsClient from "../Assignments/client";
import * as peopleClient from "../People/client";
import * as enrollmentClient from "../Enrollments/client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAssignments } from "../Assignments/reducer";

export default function Grades() {
    const { cid } = useParams();
    const dispatch = useDispatch();
    const [grades, setGrades] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [enrollments, setEnrollments] = useState<any[]>([]);
    const { assignments } = useSelector((state: any) => state.assignmentsReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";

    const fetchAssignments = async () => {
        const assignments = await assignmentsClient.findAssignmentsForCourse(cid as string);
        dispatch(setAssignments(assignments));
    };

    const fetchUsers = async () => {
        if (isFaculty) {
            const users = await peopleClient.findAllUsers();
            setUsers(users);
        } else {
            setUsers([currentUser]);
        }

    };

    const getGrades = async () => {
        const { grades } = await client.getAllGrades();
        setGrades(grades);
    };
    const getEnrollments = async () => {
        if(isFaculty) {
            const enrollments = await enrollmentClient.fetchEnrollmentsByCourse(cid as string);
            setEnrollments(enrollments);
        } else {
            setEnrollments([{user: currentUser._id, course: cid}])
        }
        
    };
    useEffect(() => {
        getGrades();
        fetchAssignments();
        fetchUsers();
        getEnrollments();
    }, []);

    return (
        <div>
            <div className="row">
                {isFaculty && <div className="col-12 mb-4 d-flex justify-content-end">
                    <button className="btn btn-lg btn-secondary me-2">
                        <FaFileImport className="me-2" />
                        Import
                    </button>
                    <button className="btn btn-lg btn-secondary me-2">
                        <FaFileExport className="me-2" />
                        Export
                    </button>
                    <button className="btn btn-lg btn-secondary">
                        <IoSettings />
                    </button>
                </div>}
                <div className="mb-4 d-flex">
                    {isFaculty && <div className="me-auto col-6">
                        <h1>Student Names</h1>
                        <div className="input-group d-flex mb-3 flex-grow-1">
                            <label className="input-group-text bg-white border border-1 border-end-0" htmlFor="wd-student-search">
                                <FaSearch className="border-0" />
                            </label>
                            <select id="wd-student-search" className="form-select me-2 fs-3 ps-1 border border-1 border-start-0">
                                <option><span className="text-secondary">Search Students</span></option>
                            </select>
                        </div>
                    </div>}
                    <div className="justify-content-end col-6">
                        <h1 className="ms-5">Assignment Names</h1>
                        <div className="input-group d-flex mb-3">
                            <label className="input-group-text bg-white border border-1 border-end-0 float-end ms-5" htmlFor="wd-assignment-search">
                                <FaSearch className="border-0" />
                            </label>
                            <select id="wd-assignment-search" className="form-select me-2 fs-3 ps-1 border border-1 border-start-0">
                                <option><span className="text-secondary">Search Assignments</span></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-6 input-group d-flex mb-3">
                    <button className="form-button btn btn-lg btn-secondary" style={{ maxWidth: "25%" }}>
                        <FaFilter className="me-2" /> Apply Filters
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <td>Student Name</td>
                            {assignments
                                .filter((a: any) => a.course === cid)
                                .map((a: any) => (
                                    <td>
                                        {a.title}
                                        <br />
                                        Out of {a.points}
                                    </td>
                                ))}
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments
                            .filter((e) => e.course === cid)
                            .map((e) => {
                                const user = users.find((user) => user._id === e.user);
                                return (
                                    <tr>
                                        <td className="text-danger">{user && user.firstName} {user && user.lastName}</td>
                                        {assignments
                                            .filter((a: any) => a.course === cid)
                                            .map((a: any) => {
                                                const assignmentGrades = grades.filter((grade) => grade.assignment === a._id);
                                                const studentGrade = user ? assignmentGrades.find((grade) => grade.student === user._id) : undefined;
                                                return (
                                                    <td><input className="bg-light form-control text-center" value={`${studentGrade && studentGrade.grade || ""}`} /></td>
                                                )
                                            })
                                        }
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}