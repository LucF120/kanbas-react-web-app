import { useNavigate, useParams } from "react-router-dom";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import { useState } from "react";
import { nowInEST } from "../ConvertToEST";
import { useSelector } from "react-redux";

export default function ListQuestions({ quiz, quizSubmission, setQuizSubmission, submitQuiz, fetchQuiz, completed, restartQuiz, numberOfAttempts, sanitizeHTML }:
    { quiz: any; quizSubmission: any; setQuizSubmission: (quizSubmission: any) => void; submitQuiz: () => void; fetchQuiz: (qid: string) => void; completed: boolean; restartQuiz: (qid: string, restart: boolean) => void; numberOfAttempts: Number; sanitizeHTML: (html: any) => any; }) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState<any>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const findAnswerForQuestion = (questionId: string) => {
        return quizSubmission.answers.find((a: any) => a.question === questionId);
    };
    const answerIsCorrect = (question: any) => {
        const answer = findAnswerForQuestion(question._id);
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
        if(isFaculty) {
            return true;
        }
        if (!quiz.numAttempts) {

            return false;
        }
        if(numberOfAttempts >= quiz.numAttempts) {

            return false;
        } else {
            return true;
        }
    };
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
            <div className="col-12">
                {quiz && quiz.questions.map((q: any, index: Number) => (
                    <div className="row border border-secondary mt-2 mb-4 mt-4 ms-3 me-3 w-75">
                        <div className={`col-6 ${completed && showCorrectAnswers(quiz) && answerIsCorrect(q) ? "bg-success" : (completed && showCorrectAnswers(quiz) && !answerIsCorrect(q) ? "bg-danger" : "bg-secondary")}`}>
                            <h3 className="mt-2 mb-2">{q.title}</h3>
                        </div>
                        <div className={`col-6 text-end ${completed && showCorrectAnswers(quiz) && answerIsCorrect(q) ? "bg-success" : (completed && showCorrectAnswers(quiz) && !answerIsCorrect(q) ? "bg-danger" : "bg-secondary")}`}>
                            <h3 className="mb-2 mt-2">{completed && showCorrectAnswers(quiz) && answerIsCorrect(q) ? q.points + " / " : completed && showCorrectAnswers(quiz) && !answerIsCorrect(q) ? "0 / " : ""}{q.points} pts</h3>
                        </div>
                        <div className="col-12 mt-4 mb-4 text-left" dangerouslySetInnerHTML={sanitizeHTML(q.question)} />
                        <div className="mb-2">
                            {q.answerType === "Multiple Choice" &&
                                <MultipleChoiceQuestion question={q} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                            }
                            {q.answerType === "True/False" &&
                                <TrueFalseQuestion question={q} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                            }
                            {q.answerType === "Fill In the Blank" &&
                                <OpenEndedQuestion question={q} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} completed={completed} showCorrectAnswers={showCorrectAnswers(quiz)} />
                            }
                        </div>
                    </div>
                ))}
            </div>
            {!completed &&
                <div className="col-12">
                    <div className="w-75 ms-3 me-3">
                        <hr />
                        <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                            onClick={(e) => {
                                e.preventDefault();
                                submitQuiz();
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
                                    restartQuiz(qid as string, true);
                                }}>
                                Try Again
                            </button>
                        }
                    </div>
                </div>
            }
        </div>


    );
}