import { useDispatch } from "react-redux";

export default function DeleteConfirmation({ dialogTitle, assignment, customId, deleteAssignment }:
    { dialogTitle: string; assignment: any; customId: string; deleteAssignment: (assignmentId: string) => void }) {
    const dispatch = useDispatch(); 
    return (
        <div id={customId} className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <h1>Are you sure you want to delete this assignment?</h1>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            No </button>
                        <button onClick={() => deleteAssignment(assignment._id)} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Yes </button>
                    </div>
                </div>
            </div>
        </div>
    );
}