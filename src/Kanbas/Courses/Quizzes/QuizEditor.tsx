import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as client from "./client";

export default function QuizEditor() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>();
    const calculatePoints = (quiz: any) => {
        const questions = quiz.questions;
        let points = 0;
        for (const question of questions) {
            points = points + question.points;
        }

        return points;
    };
    const fetchQuiz = async (qid: string) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
    };
    useEffect(() => {
        fetchQuiz(qid as string);
    }, []);
    return (
        <div id="quiz-editor">
            {quiz &&
                <div>
                    <div className="d-inline float-end">
                        <span className="me-4">Points {calculatePoints(quiz)}</span>
                    </div>
                </div>
            }
        </div>
    );
}