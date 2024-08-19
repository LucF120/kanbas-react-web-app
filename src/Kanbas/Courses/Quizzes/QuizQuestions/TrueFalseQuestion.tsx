import { useEffect, useState } from "react";

export default function TrueFalseQuestion({ question, quizSubmission, setQuizSubmission, completed, showCorrectAnswers }:
    { question: any; quizSubmission: any, setQuizSubmission: (quizSubmission: any) => void; completed: boolean; showCorrectAnswers: boolean; }) {
    const [answer, setAnswer] = useState<any>();
    const updateQuizSubmission = (newAnswer: any) => {
        setAnswer(newAnswer);
        const newAnswers = quizSubmission.answers.map((a: any) => a.question === newAnswer.question ? newAnswer : a);
        setQuizSubmission({ ...quizSubmission, answers: newAnswers });
    };
    useEffect(() => {
        if (quizSubmission && question) {
            setAnswer(quizSubmission.answers.find((a: any) => a.question === question._id));
        }
    }, [quizSubmission, question]);
    return (
        <div>
            {question && quizSubmission && answer &&
                <div>
                    <div className="mb-2">
                        <hr />
                        <div className={`d-flex ${completed && showCorrectAnswers && 0 === question.correctAnswer ? "bg-success" : completed && showCorrectAnswers && 0 !== question.correctAnswer && answer.numberAnswer === 0 ? "bg-danger" : ""}`}>
                            <input type="radio" className="form-check-input me-4" name={`true-false-option-${question._id}`}
                                id={`true-false-option-${question._id}-true`} checked={answer.numberAnswer === 0}
                                onChange={(e) => {
                                    if (!completed) {
                                        const newAnswer = { ...answer, numberAnswer: 0 };
                                        updateQuizSubmission(newAnswer);
                                    }
                                }} />
                            <label className="form-label"
                                htmlFor={`true-false-option-${question._id}-true`}>True</label>
                        </div>
                    </div>
                    <div className="mb-2">
                        <hr />
                        <div className={`d-flex ${completed && showCorrectAnswers && 1 === question.correctAnswer ? "bg-success" : completed && showCorrectAnswers && 1 !== question.correctAnswer && answer.numberAnswer === 1 ? "bg-danger" : ""}`}>
                            <input type="radio" className="form-check-input me-4" name={`true-false-option-${question._id}`}
                                id={`true-false-option-${question._id}-false`} checked={answer.numberAnswer === 1}
                                onChange={(e) => {
                                    if (!completed) {
                                        const newAnswer = { ...answer, numberAnswer: 1 };
                                        updateQuizSubmission(newAnswer);
                                    }
                                }} />
                            <label className="form-label"
                                htmlFor={`true-false-option-${question._id}-false`}>False</label>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}