import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import * as client from "./client";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { dateTimeConvert } from "../Assignments/DateToString";
import { EditorState } from "draft-js";
import { stateFromHTML } from 'draft-js-import-html';
import { Editor } from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import "./index.css";
import { stateToHTML } from "draft-js-export-html";

export default function QuizDetailsEditor({ quiz, setQuiz, saveQuiz }: { quiz: any; setQuiz: (quiz: any) => void; saveQuiz: (quiz: any) => void }) {
    const { cid, qid } = useParams();
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    useEffect(() => {
        if (quiz && quiz.description) {
            try {
                const contentState = stateFromHTML(quiz.description);
                const newEditorState = EditorState.createWithContent(contentState);
                const oldHTML = stateToHTML(editorState.getCurrentContent());
                const newHTML = stateToHTML(newEditorState.getCurrentContent());
                if (oldHTML !== newHTML) {
                    setEditorState(newEditorState);
                }
            }
            catch (error) {
                console.error('Error converting raw content to EditorState:', error);
            }
        }
    }, [quiz]);

    const handleEditorStateChange = (newEditorState: any) => {
        // Convert EditorState to plain text and update quiz.description
        const html = stateToHTML(newEditorState.getCurrentContent());
        setQuiz({ ...quiz, description: html });
        setEditorState(newEditorState);
    };
    return (
        <div id="wd-quiz-details-editor">
            {quiz &&
                <div>
                    <input className="form-control mt-4 mb-2" value={quiz.name} onChange={(e) => setQuiz({ ...quiz, name: e.target.value })} />
                    <span className="mt-4 mb-2">Quiz Instructions:</span>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorStateChange}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                        toolbar={{
                            options: ['inline', 'blockType', 'list'],
                            inline: {
                                options: ['bold', 'italic', 'underline'],
                            },
                            blockType: {
                                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
                            },
                        }}
                    />
                    <div className="row mt-4">
                        <div className="col-3 mb-4">
                            <label className="form-label float-end" htmlFor="wd-quiz-type">Quiz Type</label>
                        </div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50">
                                <select value={quiz.quizType} className="form-select" id="wd-quiz-type"
                                    onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}>
                                    <option>Graded Quiz</option>
                                    <option>Practice Quiz</option>
                                    <option>Graded Survey</option>
                                    <option>Ungraded Survey</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3 mb-4">
                            <label className="form-label float-end" htmlFor="wd-assignment-group">Assignment Group</label>
                        </div>
                        <div className="col-9 mb-4">
                            <div className="form-group d-flex w-50">
                                <select value={quiz.assignmentGroup} className="form-select" id="wd-assignment-group"
                                    onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}>
                                    <option>Quizzes</option>
                                    <option>Exams</option>
                                    <option>Assignments</option>
                                    <option>Projects</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2"><b>Options</b></div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-shuffle-answers" type="checkbox" className="form-check-input me-2" defaultChecked={quiz.shuffleAnswers} onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })} />
                                <label className="form-label" htmlFor="wd-shuffle-answers">Shuffle Answers</label>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-time-limit" className="form-control me-2 w-25" value={quiz.timeLimit} onChange={(e) => setQuiz({ ...quiz, timeLimit: e.target.value })} />
                                <label className="form-label pb-1" htmlFor="wd-time-limit">Time Limit (Minutes)</label>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-multiple-attempts" type="checkbox" className="form-check-input me-2" defaultChecked={quiz.multipleAttempts} onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })} />
                                <label className="form-label me-4" htmlFor="wd-multiple-attempts">Allow Multiple Attempts</label>
                                {quiz.multipleAttempts &&
                                    <input type="number" min="1" className="form-control me-2 w-50" value={quiz.numAttempts} onChange={(e) => setQuiz({ ...quiz, numAttempts: (Number(e.target.value) >= 1 ? e.target.value : 1) })} />
                                }
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input type="checkbox" id="wd-show-correct-answers" className="form-check-input me-2" defaultChecked={quiz.showCorrectAnswers} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked ? (quiz.showCorrectAnswers ? dateTimeConvert(quiz.showCorrectAnswers) : dateTimeConvert(new Date().toISOString())) : "" })} />
                                <label className="form-label me-4" htmlFor="wd-show-correct-answers">Show Correct Answers</label>
                                {quiz.showCorrectAnswers &&
                                    <input type="datetime-local" className="form-control me-2 w-50" id="wd-show-correct-answers-by" value={dateTimeConvert(quiz.showCorrectAnswers)} onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.value })} />
                                }
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input type="checkbox" id="wd-access-code-toggle" className="form-check-input me-2" checked={quiz.accessCode}
                                    onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.checked ? "Password" : "" })} />
                                <label className="form-label me-4" htmlFor="wd-access-code-toggle">Require Access Code</label>
                                <input className="form-control me-2 w-50" id="wd-access-code" value={quiz.accessCode} onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })} />
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-one-question-at-a-time" type="checkbox" className="form-check-input me-2" defaultChecked={quiz.oneQuestionAtATime} onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })} />
                                <label className="form-label" htmlFor="wd-one-question-at-a-time">One Question at a Time</label>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-2">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-webcam-required" type="checkbox" className="form-check-input me-2" defaultChecked={quiz.webcamRequired} onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })} />
                                <label className="form-label" htmlFor="wd-webcam-required">Webcam Required</label>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-9 mb-4">
                            <div className="form-group d-flex w-50 p-2 border rounded">
                                <input id="wd-lock-question-after-answer" type="checkbox" className="form-check-input me-2" defaultChecked={quiz.lockQuestionAfterAnswering} onChange={(e) => setQuiz({ ...quiz, lockQuestionAfterAnswering: e.target.checked })} />
                                <label className="form-label" htmlFor="wd-lock-question-after-answer">Lock Questions After Answering</label>
                            </div>
                        </div>
                        <div className="col-3 mt-4 mb-4">
                            <label className="form-label float-end">Assign</label>
                        </div>
                        <div className="col-5 mt-4 ms-2 mb-2 border rounded p-2">
                            <div className="row p-4">
                                <label className="col-12 text-dark" htmlFor="wd-due-date"><b>Due</b></label>
                                <input type="datetime-local" className="col-12 form-control mb-4" id="wd-due-date" value={quiz.dueDate.substring(0, 19)}
                                    onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value + ".000Z" })} />
                                <label className="col-6 form-label" htmlFor="wd-available-date"><b>Available from</b></label>
                                <label className="col-6 form-label" htmlFor="wd-until-date"><b>Until</b></label>
                                <div className="col-12 d-inline-flex">
                                    <input type="datetime-local" className="form-control w-50 mb-4 me-2" id="wd-available-date" value={quiz.availableDate.substring(0, 19)}
                                        onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value + ".000Z" })} />
                                    <input type="datetime-local" className="form-control w-50 mb-4" id="wd-until-date" value={quiz.untilDate.substring(0, 19)}
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setQuiz({ ...quiz, untilDate: e.target.value + ".000Z" })
                                        }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center mt-2 mb-2">
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                            <button className="btn btn-lg btn-secondary me-2">Cancel</button>
                        </Link>
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}>
                            <button className="btn btn-lg btn-success ms-2 me-2" onClick={(e) => {
                                saveQuiz(quiz);
                            }}>Save</button>
                        </Link>
                        <Link to={`/Kanbas/Courses/${cid}/Quizzes`}>
                            <button className="btn btn-lg btn-danger ms-2" onClick={(e) => {
                                saveQuiz({ ...quiz, published: true });
                            }}>Save & Publish</button>
                        </Link>
                    </div>
                    <hr />
                </div>
            }
        </div>
    );
}