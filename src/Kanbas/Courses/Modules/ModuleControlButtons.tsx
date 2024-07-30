import GreenCheckmark from "./GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

export default function ModuleControlButtons(
    { moduleId, deleteModule, editModule }:
        {
            moduleId: string; deleteModule: (moduleId: string) => void;
            editModule: (moduleId: string) => void
        }) {
    return (
        <div className="float-end">
            <FaPencil role="button" onClick={() => editModule(moduleId)} className="text-primary me-3" />
            <FaTrash role="button" className="text-danger me-3 mb-1" onClick={() => deleteModule(moduleId)} />
            <GreenCheckmark />
            <FaPlus className="me-3" />
            <IoEllipsisVertical className="fs-4" />
        </div>
    );
}