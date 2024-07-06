export default function AssignmentEditor() {
    return (
        <div id="wd-assignments-editor">
            <label htmlFor="wd-name">Assignment Name</label>
            <input id="wd-name" value="A1 - ENV + HTML" /><br /><br />
            <textarea id="wd-description">
                The assignment is available online Submit a link to the landing page of
            </textarea>
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
                <tr>
                    <td align="right" valign="top">
                        <table>
                            <tr>
                                <td>
                                <label>Online Entry Options</label>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <input type="checkbox"
                            id="wd-text-entry"
                            name="check-entry-options"></input>
                    </td>
                    <td>
                        <label htmlFor="wd-text-entry">Text Entry</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <input type="checkbox"
                            id="wd-website-url"
                            name="check-entry-options"></input>
                    </td>
                    <td>
                        <label htmlFor="wd-website-url">Website URL</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <input type="checkbox"
                            id="wd-media-recordings"
                            name="check-entry-options"></input>
                    </td>
                    <td>
                        <label htmlFor="wd-media-recordings">Media Recordings</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <input type="checkbox"
                            id="wd-student-annotation"
                            name="check-entry-options"></input>
                    </td>
                    <td>
                        <label htmlFor="wd-student-annotation">Student Annotation</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <input type="checkbox"
                            id="wd-file-upload"
                            name="check-entry-options"></input>
                    </td>
                    <td>
                        <label htmlFor="wd-file-upload">File Uploads</label>
                    </td>
                </tr>
                <tr>
                    <td align="right" valign="top">
                        <label>Assign</label>
                    </td>
                    <td>
                        <table>
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
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <label htmlFor="wd-available-from">Available from</label>
                                            </td>
                                            <td>
                                                <label htmlFor="wd-available-until">Until</label>
                                            </td>
                                        </tr>
                                        <td>
                                            <input type="date" id="wd-available-from" value="2024-05-06"></input>
                                        </td>
                                        <input type="date" id="wd-available-from" value="2024-05-20"></input>
                                        <td>

                                        </td>
                                        <tr>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                {/* Complete on your own */}
            </table>
        </div>
    );
}

//wd-assign-to		wd-due-date		wd-available-from	wd-available-until	