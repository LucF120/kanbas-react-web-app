import { useEffect, useState } from "react";
import QuizDetailsEditor from "./QuizDetailsEditor";
import QuizQuestionsEditor from "./QuizQuestionsEditor";
import { Routes, Route, Navigate, useParams, useLocation } from "react-router";
import * as client from "./client";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setQuizzes, updateQuiz } from "./reducer";

export default function QuizEditor() {
    const { cid, qid } = useParams();
    const [quiz, setQuiz] = useState<any>();
    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const calculatePoints = (quiz: any) => {
        const questions = quiz.questions;
        let points: Number = 0;
        for (const question of questions) {
            points = Number(points) + Number(question.points);
        }

        return Number(points);
    };
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    
    const saveQuiz = async (quiz: any) => {
        await client.updateQuiz(quiz);
        dispatch(updateQuiz(quiz));
        const quizzes = await client.findQuizzesForCourse(cid as string);
        if(quizzes) {
            dispatch(setQuizzes([...quizzes, quiz]));
        }
    };

    const fetchQuiz = async (qid: string) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
    };

    useEffect(() => {
        fetchQuiz(qid as string);
    }, []);
    return (
        <div id="quiz-editor">
            {quiz &&
                <div>
                    <div className="d-inline float-end">
                        <span className="me-4">Points {Number(calculatePoints(quiz))}</span>
                        {!quiz.published &&
                            <span className="text-secondary">
                                <CiNoWaitingSign className="text-secondary mb-1 me-1" />
                                Not Published
                            </span>}
                        {quiz.published &&
                            <span className="text-secondary">
                                <FaCheckCircle className="text-success mb-1 me-1" />
                                Published
                            </span>}
                    </div>
                    <br />
                    <hr />
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className={`nav-link ${pathname.includes("Details") ? "active" : "text-danger"}`} href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Details`}>Details</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${pathname.includes("Questions") ? "active" : "text-danger"}`} href={`#/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit/Questions`}>Questions</a>
                        </li>
                    </ul>
                </div>
            }
            <Routes>
                <Route path="/" element={<Navigate to="Details" />} />
                <Route path="Details" element={<QuizDetailsEditor quiz={quiz} setQuiz={setQuiz} saveQuiz={saveQuiz} />} />
                <Route path="Questions" element={<QuizQuestionsEditor quiz={quiz} setQuiz={setQuiz} saveQuiz={saveQuiz} />} />
            </Routes>
        </div>

    );
}