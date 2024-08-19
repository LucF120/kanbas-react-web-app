import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import { FaQuestionCircle } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";
import { nowInEST } from "../ConvertToEST";
import { useSelector } from "react-redux";

export default function OneQuestionAtATime({ quiz, quizSubmission, setQuizSubmission, submitQuiz, fetchQuiz, completed, restartQuiz, numberOfAttempts, sanitizeHTML }:
    { quiz: any; quizSubmission: any; setQuizSubmission: (quizSubmission: any) => void; submitQuiz: () => void; fetchQuiz: (qid: string) => void; completed: boolean; restartQuiz: (qid: string, restart: boolean) => void; numberOfAttempts: Number; sanitizeHTML: (html: any) => any; }) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState<any>();
    const [questionIndex, setQuestionIndex] = useState<any>();
    const [answer, setAnswer] = useState<any>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";

    const findAnswerForQuestion = (questionId: string) => {
        setAnswer(quizSubmission.answers.find((a: any) => a.question === questionId));
    };

    const answerIsCorrect = () => {
        if ((answer.answerType === "Multiple Choice" || answer.answerType === "True/False") && answer.numberAnswer === question.correctAnswer) {
            return true;
        }
        if (answer.answerType === "Fill In the Blank") {
            const writtenAnswerExists = question.correctWrittenAnswers.find((cwa: string) => cwa === answer.writtenAnswer);
            if (writtenAnswerExists) {
                return true;
            }
        }
        return false;
    };

    const canTakeQuizAgain = (numberOfAttempts: Number, quiz: any) => {
        if (isFaculty) {
            return true;
        }
        if (!quiz.numAttempts) {

            return false;
        }
        if (numberOfAttempts >= quiz.numAttempts) {

            return false;
        } else {
            return true;
        }
    };
    useEffect(() => {
        if (quiz && quiz.questions.length >= 1) {
            const q = quiz.questions[0];
            setQuestion(quiz.questions[0]);
            setQuestionIndex(0);
            setAnswer(quizSubmission.answers.find((a: any) => a.question === q._id));
        } else {
            setQuestion(null);
            setQuestionIndex(null);
            setAnswer(null);
        }
    }, []);
    const showCorrectAnswers = (quiz: any): boolean => {
        if (isFaculty) {
            return true;
        }
        const now = nowInEST();
        if (quiz.showCorrectAnswers) {
            return now.substring(0, 16) > quiz.showCorrectAnswers.substring(0, 16);
        } else {
            return false;
        }
    };
    return (
        <div className="row">
            <div className="col-10">
                <div className="row">
                    <div className="col-12">
                        {question &&
                            <div className="row border border-secondary mt-2 mb-4 ms-3 me-3 w-75">
                                <div className={`col-6 ${completed && showCorrectAnswers(quiz) && answerIsCorrect() ? "bg-success" : (completed && showCorrectAnswers(quiz) && !answerIsCorrect() ? "bg-danger" : "bg-secondary")}`}>
                                    <h3 className="mt-2 mb-2">{question.title}</h3>
                                </div>
                                <div className={`col-6 text-end ${completed && showCorrectAnswers(quiz) && answerIsCorrect() ? "bg-success" : (completed && showCorrectAnswers(quiz) && !answerIsCorrect() ? "bg-danger" : "bg-secondary")}`}>
                                    <h3 className="mb-2 mt-2">{completed && answerIsCorrect() ? question.points + " / " : completed && !answerIsCorrect() ? "0 / " : ""}{question.points} pts</h3>
                                </div>
                                <div className="col-12 mt-4 mb-4 text-left" dangerouslySetInnerHTML={sanitizeHTML(question.question)} />
                                <div className="mb-2 col-12">
                                    {question.answerType === "Multiple Choice" &&
                                        <MultipleChoiceQuestion question={question} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                                    }
                                    {question.answerType === "True/False" &&
                                        <TrueFalseQuestion question={question} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                                    }
                                    {question.answerType === "Fill In the Blank" &&
                                        <OpenEndedQuestion question={question} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                                    }
                                </div>
                            </div>
                        }
                    </div>

                    <div className="col-12">
                        <div className="w-75 ms-3 me-3">

                            {questionIndex < quiz.questions.length - 1 &&
                                <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const q = quiz.questions[questionIndex + 1];
                                        setQuestion(q);
                                        setQuestionIndex(questionIndex + 1);
                                        findAnswerForQuestion(q._id);
                                    }}>
                                    <span className="me-2">Next</span>
                                    <MdNavigateNext />
                                </button>
                            }
                            {questionIndex > 0 &&
                                <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const q = quiz.questions[questionIndex - 1];
                                        setQuestion(q);
                                        setQuestionIndex(questionIndex - 1);
                                        findAnswerForQuestion(q._id);
                                    }}>
                                    <GrFormPrevious />
                                    <span className="me-2">Previous</span>
                                </button>
                            }
                        </div>
                    </div>
                    {!completed &&
                        <div className="col-12">
                            <div className="w-75 ms-3 me-3">
                                <hr />
                                <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        submitQuiz();
                                        const q = quiz.questions[0];
                                        setQuestion(q);
                                        setQuestionIndex(0);
                                        findAnswerForQuestion(q._id);
                                    }}>
                                    Submit Quiz
                                </button>
                            </div>
                        </div>
                    }
                    {
                        completed &&
                        <div className="col-12">
                            <div className="w-75 ms-3 me-3">
                                <hr />
                                <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                    onClick={(e) => {
                                        navigate(`/Kanbas/Courses/${cid}/Quizzes`);
                                    }}>
                                    Back To Quizzes
                                </button>
                                {canTakeQuizAgain(numberOfAttempts, quiz) &&
                                    <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                        onClick={(e) => {
                                            setQuestion(quiz.questions[0]);
                                            setQuestionIndex(0);
                                            restartQuiz(qid as string, true);
                                        }}>
                                        Try Again
                                    </button>
                                }
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className="col-2">
                <ul className="list-group">
                    {quiz && quiz.questions.map((q: any, index: any) => (
                        <li className="d-flex">
                            <FaQuestionCircle className="text-danger me-2" />
                            <a className="text-danger text-decoration-none"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    const q = quiz.questions[index];
                                    setQuestion(q);
                                    setQuestionIndex(index);
                                    findAnswerForQuestion(q._id);
                                }}>
                                {questionIndex === index ? <b>{q.title}</b> : q.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}