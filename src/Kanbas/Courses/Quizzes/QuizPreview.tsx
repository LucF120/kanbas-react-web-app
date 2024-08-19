import { useParams } from "react-router";
import * as client from "./client";
import { FaExclamationCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import dateToString from "../Assignments/DateToString";
import { nowInEST } from "./ConvertToEST";
import ListQuestions from "./QuizQuestions/ListQuestions";
import OneQuestionAtATime from "./QuizQuestions/OneQuestionAtATime";
import DOMPurify from "dompurify";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "./reducer";

export default function QuizPreview() {
    const { qid } = useParams();
    const dispatch = useDispatch();
    const [quiz, setQuiz] = useState<any>();
    const [quizSubmission, setQuizSubmission] = useState<any>();
    const [completed, setCompleted] = useState(true);
    const [numberOfAttempts, setNumberOfAttempts] = useState();
    const [totalPoints, setTotalPoints] = useState<Number>();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const fetchQuiz = async (qid: string) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
        if (quiz && previouslyCompletedQuiz(quiz) && completed && !isFaculty) {
            const previouslyCompletedQuizAttempt = previouslyCompletedQuiz(quiz);
            setQuizSubmission(previouslyCompletedQuizAttempt);
        } else {
            const qs = {
                user: currentUser._id,
                answers: quiz.questions.map((q: any) => (
                    {
                        question: q._id,
                        answerType: q.answerType,
                    }
                ))
            };
            setQuizSubmission(qs);
            setCompleted(false);
            const updatedQuiz = { ...quiz, submissions: [qs, ...quiz.submissions] };
            await client.updateQuiz(updatedQuiz);
            dispatch(updateQuiz(updatedQuiz))
        }
        calculateNumberOfAttempts(quiz);
        calculateTotalPoints(quiz);
    };

    const restartQuiz = async (qid: string, restart: boolean) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
        if (quiz && previouslyCompletedQuiz(quiz) && !restart && !isFaculty) {
            const previouslyCompletedQuizAttempt = previouslyCompletedQuiz(quiz);
            setQuizSubmission(previouslyCompletedQuizAttempt);
        } else {
            const qs = {
                user: currentUser._id,
                answers: quiz.questions.map((q: any) => (
                    {
                        question: q._id,
                        answerType: q.answerType,
                    }
                ))
            };
            setQuizSubmission(qs);
            setCompleted(false);
            const updatedQuiz = { ...quiz, submissions: [qs, ...quiz.submissions] };
            await client.updateQuiz(updatedQuiz);
            dispatch(updateQuiz(updatedQuiz))
        }
        calculateNumberOfAttempts(quiz);
        calculateTotalPoints(quiz);
    };

    const previouslyCompletedQuiz = (quiz: any) => {
        const submissions = quiz.submissions;
        return submissions.find((s: any) => s.user === currentUser._id);
    };

    const sanitizeHTML = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    };

    const submitQuiz = async () => {
        //Submits the quiz by putting the submission at the FRONT of the array
        //This way, it shows up as most recent attempt
        const updatedQuiz = { ...quiz, submissions: [quizSubmission, ...quiz.submissions] };
        await client.updateQuiz(updatedQuiz);
        dispatch(updateQuiz(updatedQuiz));
        setCompleted(true);
        calculateNumberOfAttempts(updatedQuiz);
        calculateTotalPoints(updatedQuiz);
    };

    const calculateScore = () => {
        const questions = quiz.questions;
        const answers = quizSubmission.answers;
        let totalScore = 0;
        for (const answer of answers) {
            const question = questions.find((q: any) => q._id === answer.question);
            if (question) {
                if ((question.answerType === "Multiple Choice" || question.answerType === "True/False") && answer.numberAnswer === question.correctAnswer) {
                    totalScore = totalScore + question.points;
                }
                if (question.answerType === "Fill In the Blank") {
                    const answerIsCorrect = question.correctWrittenAnswers.find((cwa: any) => cwa === answer.writtenAnswer);
                    if (answerIsCorrect) {
                        totalScore = totalScore + question.points;
                    }
                }
            }
        }
        return totalScore;
    };

    const calculateTotalPoints = (quiz: any) => {
        let points: Number = 0;
        const questions = quiz.questions;
        for (const question of questions) {
            points = points + question.points;
        }
        setTotalPoints(points);
    };

    const calculateNumberOfAttempts = (quiz: any) => {
        const userSubmissions = quiz.submissions.filter((s: any) => s.user === currentUser._id);
        setNumberOfAttempts(userSubmissions.length);
    };

    useEffect(() => {
        fetchQuiz(qid as string);
    }, []);
    return (
        <div id="wd-quiz-preview" className="container">
            {quiz &&
                <div className="mb-4">
                    <h1 className="mb-4"><b>{quiz.name}</b></h1>
                    {isFaculty &&
                        <div className="wd-error alert alert-danger mb-4">
                            <FaExclamationCircle className="text-danger me-2" />
                            <span className="text-danger">This is a preview of the published version of the quiz</span>
                        </div>
                    }
                    {!completed &&
                        <div className="mb-4">
                            <h1 className="mb-4">Quiz Instructions</h1>
                            <div className="mt-4 mb-2" dangerouslySetInnerHTML={sanitizeHTML(quiz.description)} />
                            <hr />
                        </div>
                    }
                    {completed &&
                        <div>
                            <div className="row">
                                <div className="col-6">
                                    <h4>Attempt #: {Number(numberOfAttempts)} / {quiz.numAttempts} </h4>
                                </div>
                                <div className="col-6">
                                    <h4>Score: {calculateScore()} / {Number(totalPoints)} </h4>
                                </div>
                            </div>
                            <hr />
                        </div>
                    }
                    {!quiz.oneQuestionAtATime && <ListQuestions quiz={quiz} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} submitQuiz={submitQuiz} fetchQuiz={fetchQuiz} completed={completed} restartQuiz={restartQuiz} numberOfAttempts={Number(numberOfAttempts)} sanitizeHTML={sanitizeHTML} />}
                    {quiz.oneQuestionAtATime && <OneQuestionAtATime quiz={quiz} quizSubmission={quizSubmission} setQuizSubmission={setQuizSubmission} submitQuiz={submitQuiz} fetchQuiz={fetchQuiz} completed={completed} restartQuiz={restartQuiz} numberOfAttempts={Number(numberOfAttempts)} sanitizeHTML={sanitizeHTML} />}
                </div>
            }
        </div >
    );
}