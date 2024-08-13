import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as client from "../Courses/client";
import * as enrollmentsClient from "../Courses/Enrollments/client";
export default function Dashboard({ course, setCourse }: {
    course: any; setCourse: (course: any) => void;
}) {
    const [userCourses, setUserCourses] = useState<any[]>([]);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";

    const addNewCourse = async () => {
        const newCourse = await client.createCourse(course);
        setUserCourses([...userCourses, newCourse]);
        await enrollmentsClient.createEnrollment({ "user": currentUser._id, "course": newCourse._id });
    };

    const deleteCourse = async (courseId: string) => {
        await client.deleteCourse(courseId);
        setUserCourses(userCourses.filter((course) => course._id !== courseId));
        await enrollmentsClient.deleteEnrollmentsByCourse(courseId);
    };

    const updateCourse = async () => {
        await client.updateCourse(course);
        setUserCourses(
            userCourses.map((c) => {
                if (c._id === course._id) {
                    return course;
                } else {
                    return c;
                }
            })
        );
    };

    const fetchCourseById = async (courseId: string) => {
        const course = await client.fetchCourseById(courseId);
        console.log("Here is the course that was fetched:");
        console.log(course);
        return course;
    };
    const fetchEnrollments = async () => {
        const enrolledCourses = await enrollmentsClient.fetchEnrollmentsByUser(currentUser._id);
        let courses: any[] = [];
        for (const element of enrolledCourses) {
            const course = await fetchCourseById(element.course);
            courses.push(course);
        }
        console.log(courses);
        setUserCourses(courses);
    };
    useEffect(() => {
        fetchEnrollments();
    }, []);
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            {isFaculty &&
                <div>
                    <h5>New Course
                        <button className="btn btn-primary float-end"
                            id="wd-add-new-course-click"
                            onClick={addNewCourse} > Add </button>
                        <button className="btn btn-warning float-end me-2"
                            onClick={updateCourse} id="wd-update-course-click">
                            Update
                        </button>
                    </h5><br />
                    <input value={course.name} className="form-control mb-2"
                        onChange={(e) => setCourse({ ...course, name: e.target.value })} />
                    <textarea value={course.description} className="form-control"
                        onChange={(e) => setCourse({ ...course, description: e.target.value })} /><hr />
                </div>
            }


            <h2 id="wd-dashboard-published">Courses ({userCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {userCourses.map((course) => {
                        return (
                            <div className="wd-dashboard-course col" style={{ width: " 300px" }}>
                                <Link to={`/Kanbas/Courses/${course._id}/Home`} className="text-decoration-none" >
                                    <div className="card rounded-3 overflow-hidden" style={{ height: 350 }}>
                                        <img src={`${course.image}`} style={{ height: "160px" }} />
                                        <div className="card-body d-inline-block">
                                            <span className="wd-dashboard-course-link text-truncate"
                                                style={{
                                                    textDecoration: "none",
                                                    color: "navy",
                                                    fontWeight: "bold",
                                                    maxWidth: "95%",
                                                    display: "inline-block"
                                                }} >
                                                {course.name}
                                            </span>
                                            <p className="wd-dashboard-course-title card-text" style={{ maxHeight: 53, overflow: "hidden" }}>
                                                {course.description}
                                            </p>
                                            <Link to={`/Kanbas/Courses/${course._id}/Home`} className="btn btn-primary">Go</Link>
                                            {
                                                isFaculty &&
                                                <button onClick={(event) => {
                                                    event.preventDefault();
                                                    deleteCourse(course._id);
                                                }} className="btn btn-danger float-end"
                                                    id="wd-delete-course-click">
                                                    Delete
                                                </button>
                                            }
                                            {
                                                isFaculty &&
                                                <button id="wd-edit-course-click"
                                                    onClick={(event) => {
                                                        event.preventDefault();
                                                        setCourse(course);
                                                    }}
                                                    className="btn btn-warning me-2 float-end" >
                                                    Edit
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
