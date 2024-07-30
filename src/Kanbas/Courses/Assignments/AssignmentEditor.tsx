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
                        <div className="row">
                            <input className="form-control mb-3 col-12" value={assignment.title} placeholder="Assignment Title"
                                onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
                            <textarea className="form-control mb-3 col-12" value={assignment.description} placeholder="Assignment Description"
                                onChange={(e) => setAssignment({ ...assignment, description: e.target.value })} />
                            <div className="form-group row mb-3">
                                <div className="col-2"></div>
                                <label htmlFor="wd-new-assignment-points" className="form-label col-2 float-end">Points</label>
                                <div className="col-auto mb-3">
                                    <input id="wd-new-assignment-points" type="number" className="form-control" value={assignment.points}
                                        onChange={(e) => setAssignment({ ...assignment, points: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group row mb-3">
                                <div className="col-2"></div>
                                <span className="col-2 me-2 float-end">Assign</span>
                                <div className="col-8 mb-3 border p-3 row">
                                    <div className="col-10">
                                        <label htmlFor="wd-new-assignment-due">Due</label>
                                        <input id="wd-new-assignment-due" type="datetime-local" className="form-control mb-2" value={assignment.dueDate}
                                            onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="wd-new-assignment-available-from">Available from</label>
                                        <input id="wd-new-assignment-available-from" type="datetime-local" className="form-control" value={assignment.availableDate}
                                            onChange={(e) => setAssignment({ ...assignment, availableDate: e.target.value })} />
                                    </div>
                                    <div className="col-6 form-group">
                                        <label htmlFor="wd-new-assignment-until">Until</label>
                                        <input id="wd-new-assignment-until" type="datetime-local" className="form-control" value={assignment.untilDate}
                                            onChange={(e) => setAssignment({ ...assignment, untilDate: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                        </div>
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
