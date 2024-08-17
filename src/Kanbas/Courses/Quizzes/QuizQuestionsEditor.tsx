import { FaPlus } from "react-icons/fa";
import * as client from "./client";
import { useDispatch } from "react-redux";
import { updateQuiz } from "./reducer";
import MultipleChoiceQuestionEditor from "./MultipleChoiceQuestionEditor";
import TrueFalseQuestionEditor from "./TrueFalseQuestionEditor";
import OpenEndedQuestionEditor from "./OpenEndedQuestionEditor";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
export default function QuizQuestionsEditor({ quiz, setQuiz, saveQuiz }:
    { quiz: any; setQuiz: (quiz: any) => void; saveQuiz: (quiz: any) => void; }) {
    const { cid, qid } = useParams();
    const navigate = useNavigate();
    const createQuestion = async () => {
        const newQuestion = {
            title: "New Question",
            question: "",
            points: 10,
            answerType: "Multiple Choice",
            answerOptions: ["", "", "", ""],
            correctAnswer: 2,
            correctWrittenAnswers: [""],
            tempId: new Date().getTime().toString(),
        };

        const updatedQuestions = [...quiz.questions, newQuestion];
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        setQuiz(updatedQuiz);
    };

    const deleteQuestion = async (questionId: string) => {
        const updatedQuestions = quiz.questions.filter((question: any) => (question._id && question._id !== questionId) || (question.tempId && question.tempId !== questionId));
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        setQuiz(updatedQuiz);
    };

    const editQuestion = async (questionId: string) => {
        const updatedQuestions = quiz.questions.map((q: any) => ((q._id === questionId) || (q.tempId === questionId)) ? { ...q, editing: true } : q);
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        setQuiz(updatedQuiz);
    };

    return (
        <div id="wd-questions-editor">
            <div className="row mt-4">
                {quiz && quiz.questions && quiz.questions.map((q: any) => {
                    const id = q._id || q.tempId;
                    const answerType = q.tempAnswerType || q.answerType;
                    return (
                        <div className="row mt-4 mb-4">
                            <div className="col-8 d-flex justify-content-end text-end">
                                <h1 className="me-4">{q.title}</h1>
                                <h3 className="ms-2 text-secondary">({q.points} Pts)</h3>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-lg btn-warning me-4"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        editQuestion(id);
                                    }}>
                                    Edit</button>
                                <button className="btn btn-lg btn-danger"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        deleteQuestion(id);
                                    }}>
                                    Delete</button>
                            </div>
                            <div className="col-12 justify-content-center text-center">
                                {q.editing && answerType === "Multiple Choice" &&
                                    <MultipleChoiceQuestionEditor qid={id} q={q} quiz={quiz} setQuiz={setQuiz} />}
                                {q.editing && answerType === "True/False" &&
                                    <TrueFalseQuestionEditor qid={id} q={q} quiz={quiz} setQuiz={setQuiz} />}
                                {q.editing && answerType === "Fill In the Blank" &&
                                    <OpenEndedQuestionEditor qid={id} q={q} quiz={quiz} setQuiz={setQuiz} />}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-lg btn-secondary mt-4 mb-4" onClick={(e) => {
                    e.preventDefault();
                    createQuestion();
                }}>
                    <FaPlus className="me-2" />
                    New Question
                </button>
            </div>
            <hr />
            <div className="d-flex">
                <button className="ms-4 btn btn-lg btn-secondary me-2"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
                    }}>Cancel</button>
                <button className="btn btn-lg btn-danger ms-2" onClick={(e) => {
                    e.preventDefault();
                    saveQuiz(quiz);
                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
                }}>Save</button>
            </div>
        </div>
    );
}