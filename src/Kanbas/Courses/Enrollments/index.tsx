import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as enrollmentsClient from "./client";
import { fetchCourseById } from "../client";
import { useEffect, useState } from "react";
export default function Enrollments({ courses }: { courses: any[] }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [userCourses, setUserCourses] = useState<any[]>([]);
    const enrollInCourse = async (courseId: string) => {
        const courseExists = await fetchCourseById(courseId);
        if(courseExists) {
            await enrollmentsClient.createEnrollment({
                user: currentUser._id,
                course: courseId,
            });
        }
        setUserCourses(userCourses.filter((course) => course._id !== courseId));
    };
    const fetchEnrollments = async () => {
        const enrolledCourses = await enrollmentsClient.fetchEnrollmentsByUser(currentUser._id);
        let newCourses: any[] = [];
        for (const course of courses) {
            const isEnrolled = enrolledCourses.find((c: any) => c.course === course._id);
            if (!isEnrolled) {
                newCourses.push(course);
            }
        }
        setUserCourses(newCourses);
    };
    useEffect(() => {
        fetchEnrollments();
    }, []);
    return (
        <div>
            <h1>Enroll in a Course</h1>
            <hr />
            <Link to="/Kanbas/Dashboard" className="btn btn-danger">Back</Link>
            <hr />
            <h2 id="wd-dashboard-published">Courses ({userCourses.length})</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    {userCourses.map((course) => {
                        return (
                            <div className="wd-dashboard-course col" style={{ width: " 300px" }}>
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
                                        <button className="btn btn-primary" id="wd-enroll-course-buttton" onClick={(event) => {
                                            event.preventDefault();
                                            enrollInCourse(course._id);
                                        }}>Enroll</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}