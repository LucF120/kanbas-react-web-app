import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import * as client from "./client";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { IoMdArrowDropdown } from "react-icons/io";
import DateToString from "../Assignments/DateToString";
import GreenCheckmark from "../Assignments/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";
import "./index.css";
import Search from "./Search";
import QuizContextMenu from "./QuizContextMenu";
import { Link } from "react-router-dom";
import NotPublished from "./NotPublished";
import { nowInEST } from "./ConvertToEST";
export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    
    const nowEST = nowInEST();
    let oneWeekFromNow = new Date(nowEST);
    oneWeekFromNow.setDate(nowEST.getDate() + 7);

    const quiz = {
        name: "New Quiz",
        course: cid,
        description: "<p>New Description</p>",
        questions: [],
        availableDate: nowEST.toISOString(),
        dueDate: oneWeekFromNow.toISOString(),
        untilDate: oneWeekFromNow.toISOString(),
        published: false,
        timeLimit: 20,
        quizType: "Graded Quiz",
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        multipleAttempts: false,
        numAttempts: 1,
        showCorrectAnswers: "",
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionAfterAnswering: false,
    };
    const calculateAvailability = (quiz: any) => {
        const currentDate = nowEST.toISOString();
        const availableDate = quiz.availableDate;
        const availableUntilDate = quiz.untilDate;

        if (currentDate > availableUntilDate) {
            return <b>Closed</b>;
        }
        if (currentDate < availableUntilDate && currentDate > availableDate) {
            return <b>Available</b>;
        }
        if (currentDate < availableDate) {
            return <span><b>Not available until </b> {DateToString(availableDate)}</span>;
        }
    };

    const calculatePoints = (quiz: any) => {
        const questions = quiz.questions;
        let points = 0;
        for (const question of questions) {
            points = points + question.points;
        }

        return points;
    };
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const publishQuiz = async (quiz: any) => {
        const updatedQuiz = { ...quiz, published: !quiz.published };
        await client.updateQuiz({ ...quiz, published: !quiz.published });
        dispatch(updateQuiz(updatedQuiz));
    }
    const removeQuiz = async (quizId: string) => {
        try {
            await client.deleteQuiz(quizId);
            dispatch(deleteQuiz(quizId));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    };
    const fetchQuizzes = async () => {
        const quizzes = await client.findQuizzesForCourse(cid as string);
        dispatch(setQuizzes(quizzes));
    };
    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <div id="wd-quizzes">
            <Search course={cid as string} quiz={quiz} /><br /><br />
            <ul id="wd-quizzes-list" className="list-group rounded-0 border border-left-success">
                <li className="list-group-item p-0 fs-5">
                    <div className="wd-title p-3 ps-2 bg-secondary d-flex">
                        <IoMdArrowDropdown className="me-2 fs-3" />
                        <h1>Assignment Quizzes</h1>
                    </div>
                </li>
                {quizzes
                    .map((quiz: any) => {
                        const customId = `wd-delete-quiz-confirmation-${quiz._id}`;
                        const quizContextId = `wd-quiz-context-dialog-${quiz._id}`;
                        return (
                            <li className="wd-quiz-list-item list-group-item p-0 fs-5">
                                <div className="wd-title p-3 ps-2 d-flex align-items-center">
                                    <div className="d-flex flex-grow-1 align-items-center ms-4">
                                        <RxRocket className="me-4 display-5 text-success" />
                                        <div className="ms-4">
                                            <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="text-decoration-none">
                                                <h1 className="text-dark">{quiz.name}</h1>
                                            </Link>
                                            <span>
                                                <span className="text-dark">{calculateAvailability(quiz)} </span>
                                                <span className="text-secondary">|</span>
                                                <span className="text-dark"> <b>Due</b> </span>
                                                <span className="text-secondary"> {DateToString(quiz.dueDate)} </span>
                                                <span className="text-secondary">|</span>
                                                <span className="text-dark"> {calculatePoints(quiz)} pts </span>
                                                <span className="text-secondary">|</span>
                                                <span className="text-secondary"> {quiz.questions.length} Questions </span>
                                                {!isFaculty && <span className="text-secondary">|</span>}
                                                {!isFaculty && <span className="text-dark"> <b>Score: INSERT_SCORE / {quiz.points}</b></span>}
                                            </span>
                                        </div>
                                    </div>
                                    {isFaculty && quiz.published && <GreenCheckmark />}
                                    {isFaculty && !quiz.published && <NotPublished />}
                                    {isFaculty &&
                                        <IoEllipsisVertical className="ms-5 fs-3" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target={`#${quizContextId}`} />
                                    }
                                    <QuizContextMenu customId={quizContextId} quiz={quiz}
                                        cid={cid as string} removeQuiz={removeQuiz} publishQuiz={publishQuiz} />
                                </div>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
}