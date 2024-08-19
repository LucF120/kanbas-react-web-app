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
import { nextWeekInEST, nowInEST } from "./ConvertToEST";
export default function Quizzes() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const { quizzes } = useSelector((state: any) => state.quizzesReducer);
    const previouslyCompletedQuiz = (quiz: any) => {
        const submissions = quiz.submissions;
        return submissions.find((s: any) => s.user === currentUser._id);
    };
    const nowEST = nowInEST();
    let oneWeekFromNow = nextWeekInEST();

    const quiz = {
        name: "New Quiz",
        course: cid,
        description: "<p>New Description</p>",
        questions: [],
        availableDate: nowEST,
        dueDate: oneWeekFromNow,
        untilDate: oneWeekFromNow,
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
        const currentDate = nowEST;
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

    const canStartQuiz = (quiz: any) => {
        const currentDate = nowEST.substring(0, 16);
        const availableDate = quiz.availableDate.substring(0, 16);
        const availableUntilDate = quiz.untilDate.substring(0, 16);

        if (currentDate > availableUntilDate) {
            return false;
        }
        if (currentDate < availableUntilDate && currentDate > availableDate) {
            return true;
        }
        if (currentDate < availableDate) {
            return false;
        }
    }

    const calculatePoints = (quiz: any) => {
        const questions = quiz.questions;
        let points = 0;
        for (const question of questions) {
            points = points + question.points;
        }

        return points;
    };
    const calculateScore = (quiz: any, quizSubmission: any) => {
        const questions = quiz.questions;
        const answers = quizSubmission.answers;
        let totalScore = 0;
        for (const answer of answers) {
            const question = questions.find((q: any) => q._id === answer.question);
            if ((question && question.answerType === "Multiple Choice" || question.answerType === "True/False") && answer.numberAnswer === question.correctAnswer) {
                totalScore = totalScore + question.points;
            }
            if (question && question.answerType === "Fill In the Blank") {
                const answerIsCorrect = question.correctWrittenAnswers.find((cwa: any) => cwa === answer.writtenAnswer);
                if (answerIsCorrect) {
                    totalScore = totalScore + question.points;
                }
            }
        }
        return totalScore;
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
                        if (quiz.published || isFaculty) {
                            return (
                                <li className="wd-quiz-list-item list-group-item p-0 fs-5">
                                    <div className="wd-title p-3 ps-2 d-flex align-items-center">
                                        <div className="d-flex flex-grow-1 align-items-center ms-4">
                                            <RxRocket className="me-4 display-5 text-success" />
                                            <div className="ms-4">
                                                {!isFaculty && previouslyCompletedQuiz(quiz) &&
                                                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/start`} className="text-decoration-none">
                                                        <h1 className="text-dark">{quiz.name}</h1>
                                                    </Link>
                                                }
                                                {!isFaculty && !previouslyCompletedQuiz(quiz) && canStartQuiz(quiz) &&
                                                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="text-decoration-none">
                                                        <h1 className="text-dark">{quiz.name}</h1>
                                                    </Link>
                                                }
                                                {!isFaculty && !previouslyCompletedQuiz(quiz) && !canStartQuiz(quiz) &&
                                                    <h1 className="text-dark">{quiz.name}</h1>
                                                }
                                                {isFaculty &&
                                                    <Link to={`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} className="text-decoration-none">
                                                        <h1 className="text-dark">{quiz.name}</h1>
                                                    </Link>
                                                }
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
                                                    {!isFaculty && previouslyCompletedQuiz(quiz) &&
                                                        <span className="text-dark"> <b>Score: {calculateScore(quiz, previouslyCompletedQuiz(quiz))} / {calculatePoints(quiz)}</b></span>}
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
                        }
                    })}
            </ul>
        </div>
    );
}