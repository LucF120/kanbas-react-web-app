import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import Grades from "./Grades";
import PeopleTable from "./People/Table";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizDetailsEditor from "./Quizzes/QuizDetailsEditor";
import QuizQuestionsEditor from "./Quizzes/QuizQuestionsEditor";
import QuizEditor from "./Quizzes/QuizEditor";
import FacultyOnlyRoute from "../FacultyOnlyRoute";

export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();
    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} &gt; {pathname.split("/")[4]}
            </h2>
            <hr />
            <div className="row">
                <div className="d-none d-sm-block col-sm-2">
                    <CoursesNavigation />
                </div>
                <div className="d-block col-sm-10">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Piazza" element={<h2>Piazza</h2>} />
                        <Route path="Zoom" element={<h2>Zoom</h2>} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/:id" element={
                            <FacultyOnlyRoute>
                                <AssignmentEditor />
                            </FacultyOnlyRoute>
                        } />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={
                            <FacultyOnlyRoute>
                                <QuizDetails />
                            </FacultyOnlyRoute>
                        } />
                        <Route path="Quizzes/:qid/start" element={<QuizPreview />} />
                        <Route path="Quizzes/:qid/edit/*" element={
                            <FacultyOnlyRoute>
                                <QuizEditor />
                            </FacultyOnlyRoute>
                        } />
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="People/:uid" element={<PeopleTable />} />
                    </Routes>
                </div>
            </div>

        </div>
    );
}
