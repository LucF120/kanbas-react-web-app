import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function Search({ course, quiz}: {course: string | undefined ; quiz: any}) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div className="text-nowrap d-flex ">
            <div className="input-group d-flex">
                <label className="input-group-text bg-white border border-1 border-end-0" htmlFor="wd-quiz-search">
                    <FaSearch className="border-0" />
                </label>
                <input id="wd-quiz-search" type="text" className="me-2 fs-3 ps-1 border border-1 border-start-0" placeholder="Search for Quiz"></input>
            </div>
            {isFaculty && <div className="d-flex me-1 float-end">
                <a className="wd-quiz-link text-decoration-none enable-button-pointers" href={`#/Kanbas/Courses/${course}/Quizzes/${quiz._id}`}>
                    <button id="wd-add-quiz" className="btn btn-lg btn-danger float-end">
                        <FaPlus className="me-1" />
                        Quiz</button>
                </a>
            </div>}
        </div>
    );
}