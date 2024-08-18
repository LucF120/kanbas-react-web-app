import { useParams } from "react-router";
import * as client from "./client";
import { FaExclamationCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import dateToString from "../Assignments/DateToString";
import { nowInEST } from "./ConvertToEST";
import ListQuestions from "./QuizQuestions/ListQuestions";
import OneQuestionAtATime from "./QuizQuestions/OneQuestionAtATime";
import DOMPurify from "dompurify";

export default function QuizPreview() {
    const { qid } = useParams();
    const [quiz, setQuiz] = useState<any>();
    const fetchQuiz = async (qid: string) => {
        const quiz = await client.fetchQuizById(qid);
        setQuiz(quiz);
    };

    const sanitizeHTML = (html: any) => {
        return {
            __html: DOMPurify.sanitize(html)
        }
    };

    useEffect(() => {
        fetchQuiz(qid as string);
    }, []);
    return (
        <div id="wd-quiz-preview" className="container">
            {quiz &&
                <div className="mb-4">
                    <h1 className="mb-4"><b>{quiz.name}</b></h1>
                    <div className="wd-error alert alert-danger mb-4">
                        <FaExclamationCircle className="text-danger me-2" />
                        <span className="text-danger">This is a preview of the published version of the quiz</span>
                    </div>
                    <div className="mb-4">
                        <h1 className="mb-4">Quiz Instructions</h1>
                        <div className="mt-4 mb-2" dangerouslySetInnerHTML={sanitizeHTML(quiz.description)} />
                        <hr />
                    </div>
                    {!quiz.oneQuestionAtATime && <ListQuestions quiz={quiz} sanitizeHTML={sanitizeHTML} />}
                    {quiz.oneQuestionAtATime && <OneQuestionAtATime quiz={quiz} sanitizeHTML={sanitizeHTML} />}
                </div>
            }
        </div >
    );
}