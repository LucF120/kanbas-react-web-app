import { useEffect, useState } from "react";

export default function OpenEndedQuestion({ question, quizSubmission, setQuizSubmission, completed, showCorrectAnswers }:
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

        <div className="mb-2">
            {question && answer && quizSubmission &&
                <div>
                    <hr />
                    <input className={`form-control ${completed && showCorrectAnswers && question.correctWrittenAnswers.find((cwa: string) => cwa === answer.writtenAnswer) ? "bg-success" : completed && showCorrectAnswers && question.correctWrittenAnswers.find((cwa: string) => cwa !== answer.writtenAnswer) ? "bg-danger" : ""}`} id={`open-ended-${question._id}`} value={answer.writtenAnswer || ""}
                        onChange={(e) => {
                            if (!completed) {
                                const newAnswer = { ...answer, writtenAnswer: e.target.value };
                                updateQuizSubmission(newAnswer);
                            }
                        }} />
                    {completed && showCorrectAnswers &&
                        <div className="mt-4">
                            <h4 className="mb-2">Correct Answers:</h4>
                            {
                                question.correctWrittenAnswers.map((cwa: string) => (
                                    <input className="form-control bg-success mt-2" value={cwa} />
                                ))
                            }
                        </div>
                    }
                </div>
            }
        </div>
    );
}