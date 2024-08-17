import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import * as client from "./client";
import { addQuiz } from "./reducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Search({ course, quiz }: { course: string; quiz: any }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newQuiz, setNewQuiz] = useState<any>({});
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const createQuiz = async (quiz: any) => {
        const newQuiz = await client.createQuiz(course, quiz);
        dispatch(addQuiz(newQuiz));
        return newQuiz;
    };
    return (
        <div className="text-nowrap d-flex ">
            <div className="input-group d-flex">
                <label className="input-group-text bg-white border border-1 border-end-0" htmlFor="wd-quiz-search">
                    <FaSearch className="border-0" />
                </label>
                <input id="wd-quiz-search" type="text" className="me-2 fs-3 ps-1 border border-1 border-start-0" placeholder="Search for Quiz"></input>
            </div>
            {isFaculty && <div className="d-flex me-1 float-end">
                <button id="wd-add-quiz" className="btn btn-lg btn-danger float-end" onClick={async (e) => {
                    const newQuiz = await createQuiz(quiz);
                    navigate(`/Kanbas/Courses/${course}/Quizzes/${newQuiz._id}`)
                }}>
                    <FaPlus className="me-1" />
                    Quiz</button>
            </div>}
        </div>
    );
}