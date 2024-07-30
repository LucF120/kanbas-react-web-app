export default function AssignmentEditor({ dialogTitle, assignment, setAssignment, addAssignment }:
    { dialogTitle: string; assignment: any; setAssignment: (assignment: any) => void; addAssignment: () => void; }) {
    return (
        <div id="wd-add-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {dialogTitle} </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <input className="form-control" value={assignment.title} placeholder="Assignment Title"
                            onChange={(e) => setAssignment({...assignment, title: e.target.value})} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancel </button>
                        <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                            Add Assignment </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
