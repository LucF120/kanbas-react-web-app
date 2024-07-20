import { useParams } from "react-router";
import { useLocation } from "react-router-dom";
import "./index.css";

export default function CoursesNavigation() {
    const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades"];
    const { cid } = useParams();
    const { pathname } = useLocation();
    return (
        <div id="wd-courses-navigation" className="list-group fs-5 rounded-0">
            {links.map((link) => (
                <a id="wd-course-modules-link" href={`#/Kanbas/Courses/${cid}/${link}`} className={`list-group-item ${pathname.includes(link) ? 'active' : 'text-danger'} border border-0`}>
                    {link}
                </a>
            ))}
        </div>

    );
}
