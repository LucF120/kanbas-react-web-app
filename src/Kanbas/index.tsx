import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";
import { useEffect, useState } from "react";
import store from "./store";
import { Provider } from "react-redux";
import * as client from "./Courses/client";
import Account from "./Account";
import ProtectedRoute from "./ProtectedRoute";
import Session from "./Account/Session";
import Enrollments from "./Courses/Enrollments";

export default function Kanbas() {
    const [courses, setCourses] = useState<any[]>([]);
    const [course, setCourse] = useState<any>({
        name: "New Course", 
        description: "New Description",
        image: "/images/reactjs.jpg", 
    });
    const fetchCourses = async () => {
        const courses = await client.fetchAllCourses();
        setCourses(courses);
    };
    useEffect(() => {
        fetchCourses();
    }, []);

    return (
        <Provider store={store}>
            <Session>
                <div id="wd-kanbas">
                    <div className="d-flex">
                        <div className="d-none d-md-block bg-black">
                            <KanbasNavigation />
                        </div>
                    </div>
                    <div className="wd-main-content-offset p-3">
                        <Routes>
                            <Route path="/" element={<Navigate to="Dashboard" />} />
                            <Route path="Account/*" element={<Account />} />
                            <Route path="Dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard
                                        course={course}
                                        setCourse={setCourse} />
                                </ProtectedRoute>
                            } />
                            <Route path="Courses/:cid/*" element={
                                <ProtectedRoute>
                                    <Courses courses={courses} />
                                </ProtectedRoute>
                            } />
                            <Route path="Enrollments" element={
                                <ProtectedRoute>
                                    <Enrollments courses={courses} />
                                </ProtectedRoute>
                            } />
                            <Route path="Calendar" element={<h1>Calendar</h1>} />
                            <Route path="Inbox" element={<h1>Inbox</h1>} />
                        </Routes>
                    </div>
                </div>
            </Session>
        </Provider>
    );
}