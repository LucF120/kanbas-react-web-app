import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { FaHouse } from "react-icons/fa6";
import { MdGolfCourse } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { IoStatsChart } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { useSelector } from "react-redux";

export default function CourseStatus() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    return (
        <div id="wd-course-status" style={{ width: "300px" }}>
            {isFaculty && <h2>Course Status</h2>}
            {isFaculty && <div className="d-flex">
                <div className="w-50 pe-1">
                    <button className="btn btn-lg btn-secondary w-100 text-nowrap ">
                        <MdDoNotDisturbAlt className="me-2 fs-5" />
                        Unpublish
                    </button>
                </div>
                <div className="w-50">
                    <button className="btn btn-lg btn-success w-100">
                        <FaCheckCircle className="me-2 fs-5" />
                        Publish
                    </button>
                </div>
            </div>}
            <br />
            {isFaculty && <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <BiImport className="me-2 fs-5" />
                Import Existing Content
            </button>}
            {isFaculty && <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <LiaFileImportSolid className="me-2 fs-5" />
                Import from Commons
            </button>}
            {isFaculty && <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <FaHouse className="me-2 fs-5" />
                Choose Home Page
            </button>}
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <MdGolfCourse className="me-2 fs-5" />
                View Course Screen
            </button>
            {isFaculty && <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <TfiAnnouncement className="me-2 fs-5" />
                New Announcement
            </button>}
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <IoStatsChart className="me-2 fs-5" />
                New Analytics
            </button>
            <button className="btn btn-lg btn-secondary w-100 mt-1 text-start">
                <IoIosNotifications className="me-2 fs-5" />
                View Course Notifications
            </button>
        </div>
    );
}
