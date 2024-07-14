import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";

export default function Search() {
    return (
        <div className="text-nowrap d-flex ">
            <div className="input-group d-flex">
                <label className="input-group-text bg-white border border-1 border-end-0" htmlFor="wd-assignment-search">
                    <FaSearch className="border-0" />
                </label>
                <input id="wd-assignment-search" type="text" className="me-2 fs-3 ps-1 border border-1 border-start-0" placeholder="Search..."></input>
            </div>
            <div className="d-flex me-1 float-end">
                <button id="wd-add-assignment-group" className="btn btn-lg btn-light me-2">
                    <FaPlus className="me-1" />
                    Group</button>
                <button id="wd-add-assignment" className="btn btn-lg btn-danger float-end">
                    <FaPlus className="me-1" />
                    Assignment</button>
            </div>

        </div>
    );
}