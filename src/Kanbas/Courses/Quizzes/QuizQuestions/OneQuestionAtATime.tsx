import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import OpenEndedQuestion from "./OpenEndedQuestion";
import { FaQuestionCircle } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";

export default function OneQuestionAtATime({ quiz }: { quiz: any }) {
    const [question, setQuestion] = useState<any>();
    const [questionIndex, setQuestionIndex] = useState<any>();
    useEffect(() => {
        if (quiz.questions.length >= 1) {
            setQuestion(quiz.questions[0]);
            setQuestionIndex(0);
        } else {
            setQuestion(null);
            setQuestionIndex(null);
        }
    }, []);

    return (
        <div className="row">
            <div className="col-10">
                <div className="row">
                    <div className="col-12">
                        {question &&
                            <div className="row border border-secondary mt-2 mb-4 ms-3 me-3 w-75">
                                <div className="col-6 bg-secondary">
                                    <h3 className="mt-2 mb-2">{question.title}</h3>
                                </div>
                                <div className="col-6 text-end bg-secondary">
                                    <h3 className="mb-2 mt-2">{question.points} pts</h3>
                                </div>
                                <div className="col-12 mt-4 mb-4 text-left">
                                    <p className="mb-2">{question.question}</p>
                                </div>
                                <div className="mb-2 col-12">
                                    {question.answerType === "Multiple Choice" &&
                                        <MultipleChoiceQuestion question={question} />
                                    }
                                    {question.answerType === "True/False" &&
                                        <TrueFalseQuestion question={question} />
                                    }
                                    {question.answerType === "Fill In the Blank" &&
                                        <OpenEndedQuestion question={question} />
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    {questionIndex < quiz.questions.length - 1 &&
                        <div className="col-12">
                            <div className="w-75 ms-3 me-3">
                                <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setQuestion(quiz.questions[questionIndex + 1]);
                                        setQuestionIndex(questionIndex + 1);
                                    }}>
                                    <span className="me-2">Next</span>
                                    <MdNavigateNext />
                                </button>
                            </div>
                        </div>
                    }
                    <div className="col-12">
                        <div className="w-75 ms-3 me-3">
                            <hr />
                            <button className="btn btn-lg btn-secondary mt-2 ms-3 me-3 float-end">Submit Quiz</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-2">
                <ul className="list-group">
                    {quiz && quiz.questions.map((q: any, index: any) => (
                        <li className="d-flex">
                            <FaQuestionCircle className="text-danger me-2" />
                            <a className="text-danger text-decoration-none"
                                style={{ cursor: "pointer" }}
                                onClick={(e) => {
                                    setQuestion(quiz.questions[index]);
                                    setQuestionIndex(index);
                                }}>
                                {questionIndex === index ? <b>{q.title}</b> : q.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
}