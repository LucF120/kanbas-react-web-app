import { FaPlus } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentsButtons() {
    return (
        <div id="wd-assignments-button" className="d-flex float-end ">
            <div className="border-gray me-2 pe-1 ps-1 rounded">
                40% of Total
            </div>
            <FaPlus className="me-2 fs-3 ps-1" />
            <IoEllipsisVertical className="me-2 fs-3 ps-1" />
        </div>         
    );
}