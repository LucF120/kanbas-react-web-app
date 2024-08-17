import { useEffect, useState } from "react";

export default function TrueFalseQuestionEditor({ qid, q, quiz, setQuiz }: { qid: string; q: any; quiz: any; setQuiz: (quiz: any) => void; }) {
    const [question, setQuestion] = useState<any>();
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
        setQuestion({ ...q, correctAnswer: (q.correctAnswer > 1 ? 0 : q.correctAnswer) });
    }, []);
    return (
        <div id={`wd-true-false-editor-${qid}`} className="container border p-4 mt-4 mb-4">
            {question &&
                <div className="row">
                    <div className="col-6 d-flex">
                        <input className="form-control me-2" value={question.title} onChange={(e) => setQuestion({ ...question, title: e.target.value })}></input>
                        <select className="form-select" value={question.tempAnswerType || question.answerType } onChange={(e) => changeAnswerType(e.target.value)}>
                            <option>True/False</option>
                            <option>Multiple Choice</option>
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
                        <span>Enter your question text, then select if True or False is the correct answer</span>
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
                    <div className="col-12 d-flex">
                        <div className="mb-4 me-4 pt-2">
                            <input className="form-check-input" type="radio" name={`wd-possible-answer-${qid}`} id={`wd-possible-answer-${qid}-true`}
                                checked={question.correctAnswer === 0} onChange={((e) => setQuestion({ ...question, correctAnswer: 0 }))} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`wd-possible-answer-${qid}-true`} className={question.correctAnswer === 0 ? "text-success" : ""}>
                                <h1>{question.correctAnswer === 0 ? <b>True</b> : "True"}</h1>
                            </label>
                        </div>
                    </div>
                    <div className="col-12 d-flex">
                        <div className="mb-4 pt-2 me-4">
                            <input className="form-check-input" type="radio" name={`wd-possible-answer-${qid}`} id={`wd-possible-answer-${qid}-false`}
                                checked={question.correctAnswer === 1} onChange={((e) => setQuestion({ ...question, correctAnswer: 1 }))} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor={`wd-possible-answer-${qid}-false`} className={question.correctAnswer === 1 ? "text-success" : ""}>
                                <h1>{question.correctAnswer === 1 ? <b>False</b> : "False"}</h1>
                            </label>
                        </div>
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