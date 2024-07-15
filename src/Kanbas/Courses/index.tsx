import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes } from "react-router";
import Grades from "./Grades";

export default function Courses() {
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                Course 1234
            </h2>
            <hr />
            <div className="row">
                <div className="d-none d-md-block col-md-2">
                <CoursesNavigation />
                </div>
                <div className="d-block col-sm-12 col-md-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h2>Piazza</h2>} />
                        <Route path="Zoom" element={<h2>Zoom</h2>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:id" element={<AssignmentEditor />} />
                        <Route path="Quizzes" element={<h2>Quizzes</h2>} />
                        <Route path="Grades" element={<Grades />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}
