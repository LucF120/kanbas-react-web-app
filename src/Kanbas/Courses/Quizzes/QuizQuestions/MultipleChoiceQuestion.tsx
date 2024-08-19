import { useEffect, useState } from "react";

export default function MultipleChoiceQuestion({ question, quizSubmission, setQuizSubmission, completed, showCorrectAnswers }:
    { question: any; quizSubmission: any, setQuizSubmission: (quizSubmission: any) => void; completed: boolean; showCorrectAnswers: boolean; }) {
    const [answer, setAnswer] = useState<any>();

    const updateQuizSubmission = (newAnswer: any) => {
        setAnswer(newAnswer);
        const newAnswers = quizSubmission.answers.map((a: any) => a.question === newAnswer.question ? newAnswer : a);
        setQuizSubmission({ ...quizSubmission, answers: newAnswers });
        console.log(newAnswers);
    };

    useEffect(() => {
        if (quizSubmission && question) {
            console.log(quizSubmission.answers.find((a: any) => a.question === question._id));
            setAnswer(quizSubmission.answers.find((a: any) => a.question === question._id));
        }
    }, [quizSubmission, question]);
    return (
        question && answer && quizSubmission && question.answerOptions.map((a: any, aIndex: Number) => (
            <div className="mb-2">
                <hr />
                <div className={`d-flex ${completed && showCorrectAnswers && aIndex === question.correctAnswer ? "bg-success" : completed && showCorrectAnswers && aIndex !== question.correctAnswer && answer.numberAnswer === aIndex ? "bg-danger" : ""}`}>
                    <input type="radio" className="form-check-input me-4" name={`multiple-choice-option-${question._id}`}
                        id={`multiple-choice-option-${question._id}-${aIndex}`} checked={answer.numberAnswer === aIndex}
                        onChange={(e) => {
                            if (!completed) {
                                const newAnswer = { ...answer, numberAnswer: aIndex };
                                updateQuizSubmission(newAnswer);
                            }
                        }} />
                    <label className="form-label"
                        htmlFor={`multiple-choice-option-${question._id}-${aIndex}`}>{a}</label>
                </div>
            </div>
        ))
    );
}