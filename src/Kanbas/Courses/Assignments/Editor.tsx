export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name"><b>Assignment Name</b></label>
            <br />
            <br />
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description" rows={7} cols={50}>
                The assignment is available online Submit a link to the landing page of
            </textarea>
            <br />
            <br />
            <table>
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-points">Points</label>
                    </td>
                    <td>
                        <input id="wd-points" value={100} />
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-group">Assignment Group</label>
                    </td>
                    <td>
                        <select id="wd-group">
                            <option>ASSIGNMENTS</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-display-grade-as">Display Grade as</label>
                    </td>
                    <td>
                        <select id="wd-display-grade-as">
                            <option>Percentage</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label htmlFor="wd-submission-type">Submission Type</label>
                    </td>
                    <td>
                        <select id="wd-submission-type">
                            <option>Online</option>
                        </select>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                    </td>
                    <td>
                        <label>Online Entry Options</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="checkbox"
                            id="wd-text-entry"
                            name="check-entry-options"></input>
                        <label htmlFor="wd-text-entry">Text Entry</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="checkbox"
                            id="wd-website-url"
                            name="check-entry-options"></input>
                        <label htmlFor="wd-website-url">Website URL</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="checkbox"
                            id="wd-media-recordings"
                            name="check-entry-options"></input>
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="checkbox"
                            id="wd-student-annotation"
                            name="check-entry-options"></input>
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td>
                        <input type="checkbox"
                            id="wd-file-upload"
                            name="check-entry-options"></input>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <br />
                <tr>
                    <td align="right" valign="top">
                        <label>Assign</label>
                    </td>
                    <td>
                        <tr>
                            <td>
                                <label htmlFor="wd-assign-to">Assign to</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input id="wd-assign-to" value="Everyone"></input>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td>
                                <label htmlFor="wd-due-date">Due</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="date" id="wd-due-date" value="2024-05-13"></input>
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td>
                                <label htmlFor="wd-available-from">Available from</label>
                            </td>
                            <td>
                                <label htmlFor="wd-available-until">Until</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="date" id="wd-available-from" value="2024-05-06"></input>
                            </td>
                            <td>
                                <input type="date" id="wd-available-until" value="2024-05-20"></input>
                            </td>
                        </tr>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}><hr /></td>
                </tr>
                <tr>
                    <td align="right" valign="top"></td>
                    <td align="right" valign="top">
                        <tr>
                            <td><button>Cancel</button></td>
                            <td><button>Submit</button></td>
                        </tr>
                    </td>
                </tr>
            </table>
        </div>
    );
}


