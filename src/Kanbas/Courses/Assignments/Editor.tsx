import { useParams } from "react-router";
import * as db from "../../Database";
import { Link } from "react-router-dom";

export default function AssignmentEditor() {
    const { cid, id } = useParams();
    const assignments = db.assignments;
    const assignment = assignments.find((assignment) => assignment._id === id);
    return (
        <div id="wd-assignments-editor">
            <div className="row">
                <div className="form-group mb-4 col-12">
                    <label className="form-label" htmlFor="wd-name"><b>Assignment Name</b></label>
                    <input className="form-control" id="wd-name" value={`${assignment && assignment.title}`} />
                </div>
                <div className="form-group mb-4 col-12">
                    <textarea className="form-control" id="wd-description" rows={7} cols={50}>
                        {assignment && assignment.description}
                    </textarea>
                </div>
                <div className="col-3 mb-4">
                    <label className="form-label float-end" htmlFor="wd-points">Points</label>
                </div>
                <div className="col-9 mb-4">
                    <div className="form-group d-flex">
                        <input className="form-control" id="wd-points" value={`${assignment && assignment.points}`} />
                        <br />
                    </div>
                </div>
                <div className="col-3 mb-4">
                    <label className="form-label float-end" htmlFor="wd-group">Assignment Group</label>
                </div>
                <div className="col-9 mb-4">
                    <div className="form-group d-flex ">
                        <select className="form-select" id="wd-group">
                            <option>ASSIGNMENTS</option>
                        </select>
                    </div>
                </div>
                <div className="col-3 mb-4">
                    <label className="form-label me-2 float-end" htmlFor="wd-display-grade-as">Display Grade as</label>
                </div>
                <div className="col-9 mb-4">
                    <div className="form-group d-flex">
                        <select className="form-select" id="wd-display-grade-as">
                            <option>Percentage</option>
                        </select>
                    </div>
                </div>
                <div className="col-3 mb-4">
                    <label className="form-label me-2 float-end">Submission Type</label>
                </div>
                <div className="col-9 mb-4  border border-1 rounded-1">
                    <div className="row">
                        <div className="col-12">
                            <select className="form-select col-12 mb-3 mt-2" id="wd-submission-type" value={assignment && assignment.submissionType}>
                                <option>Online</option>
                                <option>In-Person</option>
                            </select>
                        </div>

                        {assignment && assignment.submissionType === "Online" &&
                            <div>
                                <p className="col-12"><strong>Online Entry Options</strong></p>
                                <div className="col-12">
                                    {assignment && assignment.textEntry && <input type="checkbox"
                                        id="wd-text-entry"
                                        name="check-entry-options" checked></input>}
                                    {assignment && !assignment.textEntry && <input type="checkbox"
                                        id="wd-text-entry"
                                        name="check-entry-options"></input>}
                                    <label className="form-label ms-2" htmlFor="wd-text-entry">Text Entry</label>
                                </div>
                                <div className="col-12">
                                    {assignment && assignment.websiteURL && <input type="checkbox"
                                        id="wd-website-url"
                                        name="check-entry-options" checked></input>}
                                    {assignment && !assignment.websiteURL && <input type="checkbox"
                                        id="wd-website-url"
                                        name="check-entry-options"></input>}
                                    <label className="form-label ms-2" htmlFor="wd-website-url">Website URL</label>
                                </div>
                                <div className="col-12">
                                    {assignment && assignment.mediaRecordings && <input type="checkbox"
                                        id="wd-media-recordings"
                                        name="check-entry-options" checked></input>}
                                    {assignment && !assignment.mediaRecordings && <input type="checkbox"
                                        id="wd-media-recordings"
                                        name="check-entry-options"></input>}
                                    <label className="form-label ms-2" htmlFor="wd-media-recordings">Media Recordings</label>
                                </div>
                                <div className="col-12">
                                    {assignment && assignment.studentAnnotation && <input type="checkbox"
                                        id="wd-student-annotation"
                                        name="check-entry-options" checked></input>}
                                    {assignment && !assignment.studentAnnotation && <input type="checkbox"
                                        id="wd-student-annotation"
                                        name="check-entry-options"></input>}
                                    <label className="form-label ms-2" htmlFor="wd-student-annotation">Student Annotation</label>
                                </div>
                                <div className="col-12">
                                    {assignment && assignment.fileUploads && <input type="checkbox"
                                        id="wd-file-upload"
                                        name="check-entry-options" checked></input>}
                                    {assignment && !assignment.fileUploads && <input type="checkbox"
                                        id="wd-file-upload"
                                        name="check-entry-options"></input>}
                                    <label className="form-label ms-2" htmlFor="wd-file-upload">File Uploads</label>
                                </div>
                            </div>}
                    </div>
                </div>
                <div className="col-3 mb-4">
                    <label className="form-label me-2 float-end">Assign</label>
                </div>
                <div className="col-9 mb-4 border border-1 rounded-1">
                    <div className="form-group mb-4">
                        <label className="form-label mt-2" htmlFor="wd-assign-to">Assign to</label>
                        <input className="form-control" id="wd-assign-to" value="Everyone"></input>
                        <label className="form-label mt-2" htmlFor="wd-due-date">Due</label>
                        <input className="form-control" type="datetime-local" id="wd-due-date" value={`${assignment && assignment.dueDate}`}></input>
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label mt-2" htmlFor="wd-available-from">Available from</label>
                                <input className="form-control" type="datetime-local" id="wd-available-from" value={`${assignment && assignment.availableDate}`}></input>
                            </div>
                            <div className="col-6">
                                <label className="form-label mt-2" htmlFor="wd-available-until">Until</label>

                                <input className="form-control" type="datetime-local" id="wd-available-until" value={`${assignment && assignment.untilDate}`}></input>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="float-end">
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-lg btn-secondary">
                    Cancel
                </Link>
                <Link to={`/Kanbas/Courses/${cid}/Assignments`} className="btn btn-lg btn-danger ms-2">
                    Save
                </Link>
            </div>

        </div>
    );
}


