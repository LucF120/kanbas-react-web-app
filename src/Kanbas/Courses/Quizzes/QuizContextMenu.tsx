import { useNavigate } from "react-router-dom";

export default function QuizContextMenu({ customId, quiz, cid, removeQuiz, publishQuiz }: { customId: string; quiz: any; cid: string, removeQuiz: (quizId: string) => void; publishQuiz: (quiz: any) => void; }) {
    const navigate = useNavigate();
    return (
        <div id={customId} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Quiz Context Menu: <b>{quiz.name}</b></h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-inline-flex">
                            <button type="button" className="btn btn-lg btn-warning ms-4 me-4" data-bs-dismiss="modal"
                                onClick={() => {
                                    navigate(`/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`);
                                }}>
                                Edit</button>
                            <button onClick={() => removeQuiz(quiz._id)}
                                type="button" className="btn btn-lg btn-danger me-4"
                                data-bs-dismiss="modal">
                                Delete
                            </button>
                            {!quiz.published && <button className="btn btn-lg btn-success me-4"
                                onClick={() => publishQuiz(quiz)}
                                data-bs-dismiss="modal">
                                Publish</button>}
                            {quiz.published && <button className="btn btn-lg btn-danger me-4" onClick={() => publishQuiz(quiz)}
                                data-bs-dismiss="modal">Unpublish</button>}
                            <button type="button" className="btn btn-lg btn-secondary" data-bs-dismiss="modal">
                                Cancel </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}