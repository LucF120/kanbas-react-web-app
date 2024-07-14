export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <div className="row">
            <div className="form-group mb-4 col-12">
                <label className="form-label" htmlFor="wd-name"><b>Assignment Name</b></label>
                <input className="form-control" id="wd-name" value="A1 - ENV + HTML" />
            </div>
            <div className="form-group mb-4 col-12">
                <textarea className="form-control" id="wd-description" rows={7} cols={50}>
                    The assignment is available online Submit a link to the landing page of
                </textarea>
            </div>
            <div className="col-3 mb-4">
                <label className="form-label float-end" htmlFor="wd-points">Points</label>
            </div>
            <div className="col-9 mb-4">
                <div className="form-group d-flex">
                    <input className="form-control" id="wd-points" value={100} />
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
                        <select className="form-select col-12 mb-3 mt-2" id="wd-submission-type">
                            <option>Online</option>
                        </select>
                        <p className="col-12"><strong>Online Entry Options</strong></p>
                        <input type="checkbox"
                            id="wd-text-entry"
                            name="check-entry-options"></input>
                        <label className="form-label ms-2" htmlFor="wd-text-entry">Text Entry</label>
                    </div>
                    <div className="col-12">
                        <input type="checkbox"
                            id="wd-website-url"
                            name="check-entry-options"></input>
                        <label className="form-label ms-2" htmlFor="wd-website-url">Website URL</label>
                    </div>
                    <div className="col-12">
                        <input type="checkbox"
                            id="wd-media-recordings"
                            name="check-entry-options"></input>
                        <label className="form-label ms-2" htmlFor="wd-media-recordings">Media Recordings</label>
                    </div>
                    <div className="col-12">
                        <input type="checkbox"
                            id="wd-student-annotation"
                            name="check-entry-options"></input>
                        <label className="form-label ms-2" htmlFor="wd-student-annotation">Student Annotation</label>
                    </div>
                    <div className="col-12">
                        <input type="checkbox"
                            id="wd-file-upload"
                            name="check-entry-options"></input>
                        <label className="form-label ms-2" htmlFor="wd-file-upload">File Uploads</label>
                    </div>
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
                    <input className="form-control" type="date" id="wd-due-date" value="2024-05-13"></input>
                    <div className="row">
                        <div className="col-6">
                            <label className="form-label mt-2" htmlFor="wd-available-from">Available from</label>
                            <input className="form-control" type="date" id="wd-available-from" value="2024-05-06"></input>
                        </div>
                        <div className="col-6">
                            <label className="form-label mt-2" htmlFor="wd-available-until">Until</label>

                            <input className="form-control" type="date" id="wd-available-until" value="2024-05-20"></input>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="float-end">
                <button className="btn btn-lg btn-secondary">Cancel</button>
                <button className="btn btn-lg btn-danger ms-2">Save</button>
            </div>

        </div>
    );
}


