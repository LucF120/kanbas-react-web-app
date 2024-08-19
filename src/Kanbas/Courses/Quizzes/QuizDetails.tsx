import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { useSelector } from "react-redux";
import DateToString, { dateTimeConvert } from "../Assignments/DateToString";
import { PiPencilLight } from "react-icons/pi";

export default function QuizDetails() {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const { qid, cid } = useParams();
    const [quiz, setQuiz] = useState<any>();
    const calculatePoints = (quiz: any) => {
        const questions = quiz.questions;
        let points = 0;
        for (const question of questions) {
            points = points + question.points;
        }

        return points;
    };
    const fetchQuiz = async (qid: string) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
    };
    useEffect(() => {
        fetchQuiz(qid as string);
    }, []);
    return (
        <div id="wd-quiz-details">
            {quiz && <div>
                <h1>{quiz.name}</h1>
                {isFaculty &&
                    <div className="row justify-content-center">
                        <div className="col-5 text-end"><b>Quiz Type</b></div>
                        <div className="col-7">{quiz.quizType}</div>
                        <div className="col-5 text-end"><b>Points</b></div>
                        <div className="col-7">{calculatePoints(quiz)}</div>
                        <div className="col-5 text-end"><b>Assignment Group</b></div>
                        <div className="col-7">{quiz.assignmentGroup}</div>
                        <div className="col-5 text-end"><b>Shuffle Answer</b></div>
                        <div className="col-7">{quiz.shuffleAnswer ? "Yes" : "No"}</div>
                        <div className="col-5 text-end"><b>Time Limit</b></div>
                        <div className="col-7">{quiz.timeLimit} Minutes</div>
                        <div className="col-5 text-end"><b>Multiple Attempts</b></div>
                        <div className="col-7">{quiz.multipleAttempts ? "Yes" : "No"}</div>
                        {quiz.multipleAttempts && <div className="col-5 text-end"><b>Number of Attempts</b></div>}
                        {quiz.multipleAttempts && <div className="col-7">{quiz.numAttempts}</div>}
                        <div className="col-5 text-end"><b>Show Correct Answers</b></div>
                        <div className="col-7">{quiz.showCorrectAnswers ? "After " + DateToString(quiz.showCorrectAnswers) : "Never"}</div>
                        {quiz.accessCode && <div className="col-5 text-end"><b>Access Code</b></div>}
                        {quiz.accessCode && <div className="col-7">{quiz.accessCode}</div>}
                        <div className="col-5 text-end"><b>One Question at a Time</b></div>
                        <div className="col-7">{quiz.oneQuestionAtATime ? "Yes" : "No"}</div>
                        <div className="col-5 text-end"><b>Webcam Required</b></div>
                        <div className="col-7">{quiz.webcamRequired ? "Yes" : "No"}</div>
                        <div className="col-5 text-end"><b>Lock Questions After Answering</b></div>
                        <div className="col-7">{quiz.lockQuestionAfterAnswering ? "Yes" : "No"}</div>
                    </div>
                }
                <hr />
                <div className="d-inline-flex">
                    <span className="me-4"><b className="me-2">Due </b> {DateToString(quiz.dueDate)}</span>
                    <span className="me-4 ms-4"><b className="me-2">Points </b> {calculatePoints(quiz)}</span>
                    <span className="me-4 ms-4"><b className="me-2">Questions </b> {quiz.questions.length}</span>
                    <span className="me-4 ms-4"><b className="me-2">Available from</b> {DateToString(quiz.availableDate)}</span>
                    <span className="me-4 ms-4"><b className="me-2">Until</b> {DateToString(quiz.untilDate)}</span>
                    <span className="me-4 ms-4"><b className="me-2">Time Limit </b> {quiz.timeLimit} minutes</span>
                </div>
                <hr />
            </div>}

            {!isFaculty && <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-secondary me-4 mb-4"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
                    }}>
                    Back</button>
                <button className="btn btn-lg btn-danger me-4 mb-4" onClick={(e) => {
                    e.preventDefault();
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Start`);
                }}>Start Quiz</button>
                <hr />
            </div>}
            {isFaculty &&
                <div className="d-flex justify-content-center">
                    <button className="btn btn-lg btn-secondary me-4"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
                        }}>
                        Back</button>
                    <button className="btn btn-lg btn-secondary me-4"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Start`);
                        }}>
                        Preview</button>
                    <button className="btn btn-lg btn-secondary"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Edit`);
                        }}>
                        <PiPencilLight className="me-2" />
                        Edit
                    </button>
                </div>
            }

        </div>
    );
}