import { FaSearch } from "react-icons/fa";
import { FaFilter } from "react-icons/fa";
import { FaFileExport, FaFileImport } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";


export default function Grades() {
    return (
        <div>
            <div className="row">
                <div className="col-12 mb-4 d-flex justify-content-end">
                    <button className="btn btn-lg btn-secondary me-2">
                        <FaFileImport className="me-2" />
                        Import
                    </button>
                    <button className="btn btn-lg btn-secondary me-2">
                        <FaFileExport className="me-2" />
                        Export
                    </button>
                    <button className="btn btn-lg btn-secondary">
                        <IoSettings />
                    </button>
                </div>
                <div className="mb-4 d-flex">
                    <div className="me-auto col-6">
                        <h1>Student Names</h1>
                        <div className="input-group d-flex mb-3 flex-grow-1">
                            <label className="input-group-text bg-white border border-1 border-end-0" htmlFor="wd-assignment-search">
                                <FaSearch className="border-0" />
                            </label>
                            <select id="wd-assignment-search" className="form-select me-2 fs-3 ps-1 border border-1 border-start-0">
                                <option><span className="text-secondary">Search Students</span></option>
                            </select>
                        </div>
                    </div>
                    <div className="justify-content-end col-6">
                        <h1 className="ms-5">Assignment Names</h1>
                        <div className="input-group d-flex mb-3">
                            <label className="input-group-text bg-white border border-1 border-end-0 float-end ms-5" htmlFor="wd-assignment-search">
                                <FaSearch className="border-0" />
                            </label>
                            <select id="wd-assignment-search" className="form-select me-2 fs-3 ps-1 border border-1 border-start-0">
                                <option><span className="text-secondary">Search Assignments</span></option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="col-6 input-group d-flex mb-3">
                    <button className="form-button btn btn-lg btn-secondary" style={{ maxWidth: "25%" }}>
                        <FaFilter className="me-2" /> Apply Filters
                    </button>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <td>Student Name</td>
                            <td>
                                A1 SETUP
                                <br />
                                Out of 100
                            </td>
                            <td>
                                A2 HTML
                                <br />
                                Out of 100
                            </td>
                            <td>
                                A3 CSS
                                <br />
                                Out of 100
                            </td>
                            <td>
                                A4 BOOTSTRAP
                                <br />
                                Out of 100
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-danger">Jane Adams</td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="96.67%"/></td>
                            <td><input className="bg-light form-control text-center" value="92.18%"/></td>
                            <td><input className="bg-light form-control text-center" value="66.22%"/></td>
                        </tr>
                        <tr>
                            <td className="text-danger">Christina Allen</td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                        </tr>
                        <tr>
                            <td className="text-danger">Samreen Ansari</td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                        </tr>
                        <tr>
                            <td className="text-danger">Han Bao</td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                        </tr>
                        <tr>
                            <td className="text-danger">Mahi Sai Srinivas Bobbili</td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                            <td><input className="bg-light form-control text-center" value="100%"/></td>
                        </tr>
                        <tr>
                            <td className="text-danger">Siran Cao</td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                            <td><input className="form-control text-center" value="100%"/></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}