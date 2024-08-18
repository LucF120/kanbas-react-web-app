import { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function MultipleChoiceQuestionEditor({ qid, q, quiz, setQuiz }: { qid: string; q: any; quiz: any; setQuiz: (quiz: any) => void; }) {
    const [question, setQuestion] = useState<any>();

    const createAnswer = () => {
        setQuestion({ ...question, answerOptions: [...question.answerOptions, ""] });
    };

    const cancelEdit = () => {
        setQuiz({
            ...quiz, questions: quiz.questions.map((question: any) =>
                ((question._id === qid) || (question.tempId === qid)) ? { ...question, editing: false, tempAnswerType: null } : question
            )
        });
    };

    const updateQuestion = () => {
        const updatedQuestions = quiz.questions.map((que: any) =>
            ((que._id === qid) || (que.tempId === qid)) ? { ...question, editing: false, answerType: question.tempAnswerType || question.answerType } : que);
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        setQuiz(updatedQuiz);
    };
    const changeAnswerType = (type: string) => {
        const updatedQuestions = quiz.questions.map((que: any) => ((que._id === qid) || (que.tempId === qid)) ? { ...question, tempAnswerType: type } : que);
        const updatedQuiz = { ...quiz, questions: updatedQuestions };
        setQuiz(updatedQuiz);
    };
    useEffect(() => {
        setQuestion(q);
    }, []);

    return (
        <div id={`wd-multiple-choice-editor-${qid}`} className="container border p-4 mt-4 mb-4">
            {question &&
                <div className="row">
                    <div className="col-6 d-flex">
                        <input className="form-control me-2" value={question.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })}></input>
                        <select className="form-select" value={question.tempAnswerType || question.answerType} onChange={(e) => {
                            changeAnswerType(e.target.value)
                        }}>
                            <option>Multiple Choice</option>
                            <option>True/False</option>
                            <option>Fill In the Blank</option>
                        </select>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                        <h4 className="me-2">pts: </h4>
                        <input className="form-control w-25" type="number" min="0" value={question.points} onChange={(e) => setQuestion({ ...question, points: (Number(e.target.value) >= 0 ? e.target.value : 0) })} />
                    </div>
                    <div className="col-12 mt-4">
                        <hr />
                    </div>
                    <div className="col-12 text-start">
                        <span>Enter your question and multiple answers, then select the one correct answer</span>
                    </div>
                    <div className="col-12 mt-4 mb-4 text-start">
                        <h4>Question:</h4>
                    </div>
                    <div className="col-12 mb-4">
                        <textarea className="form-control" value={question.question} onChange={(e) => setQuestion({ ...question, question: e.target.value })} />
                    </div>
                    <div className="col-12 mb-4 text-start">
                        <h4>Answers:</h4>
                    </div>
                    {question.answerOptions && question.answerOptions.map((a: any, index: Number) => (
                        <div className="row col-12">
                            <div className="col-1 mb-4 pt-2">
                                <input className="form-check-input" type="radio" name={`wd-possible-answer-${qid}`} id={`wd-possible-answer-${qid}-${index}`} checked={index === question.correctAnswer}
                                    onChange={(e) => setQuestion({ ...question, correctAnswer: index })}
                                />
                            </div>
                            <div className="col-2 mb-4 justify-content-end pt-1">
                                {question.correctAnswer === index && <label className="form-label text-success" htmlFor={`wd-possible-answer-${qid}-${index}`}><b>Correct Answer</b></label>}
                                {question.correctAnswer !== index && <label className="form-label" htmlFor={`wd-possible-answer-${qid}-${index}`}>Possible Answer</label>}
                            </div>
                            <div className="col-9 mb-4 d-flex">
                                <textarea className="form-control w-50 me-2" value={a} onChange={
                                    (e) => {
                                        setQuestion({
                                            ...question,
                                            answerOptions:
                                                question.answerOptions.map((ao: any, aoIndex: Number) =>
                                                    aoIndex === index ? e.target.value : ao),
                                        });
                                    }
                                } />
                                {question.answerOptions.length > 1 &&
                                    <FaTrash style={{ cursor: "pointer" }} className="text-danger mt-3" onClick={(e) => {
                                        e.preventDefault();
                                        const correctAnswer = (index < question.correctAnswer) ? question.correctAnswer - 1 : (index === question.correctAnswer) ? 0 : question.correctAnswer;
                                        setQuestion({
                                            ...question,
                                            answerOptions:
                                                question.answerOptions.filter((ao: any, aoIndex: Number) => aoIndex !== index),
                                            correctAnswer: correctAnswer
                                        });
                                    }} />
                                }
                            </div>
                        </div>
                    ))}
                    <div className="col-12 text-end mb-4">
                        <FaPlus className="text-danger me-2" style={{ cursor: "pointer" }} onClick={createAnswer} />
                        <span className="text-danger" style={{ cursor: "pointer" }} onClick={createAnswer}>Add Another Answer</span>
                    </div>
                    <div className="col-12 text-start mb-4">
                        <button className="btn btn-lg btn-secondary me-2" onClick={cancelEdit}>Cancel</button>
                        <button className="btn btn-lg btn-danger"
                            onClick={updateQuestion}>Update Question</button>
                    </div>
                </div>
            }
        </div>
    );
}