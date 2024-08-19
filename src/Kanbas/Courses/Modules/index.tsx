import React, { useState, useEffect } from "react";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule, setModules }
    from "./reducer";
import * as client from "./client";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const [moduleName, setModuleName] = useState("");
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const saveModule = async(module: any) => {
        try {
            await client.updateModule(module);
            dispatch(updateModule(module));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    }
    const removeModule = async (moduleId: string) => {
        try {
            await client.deleteModule(moduleId);
            dispatch(deleteModule(moduleId));
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }

    };
    const createModule = async (module: any) => {
        const newModule = await client.createModule(cid as string, module);
        dispatch(addModule(newModule));
    };
    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    useEffect(() => {
        fetchModules();
    }, []);

    return (
        <div>
            {errorMessage && (
                <div id="wd-module-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>
            )}
            <ModulesControls
                setModuleName={setModuleName}
                moduleName={moduleName}
                addModule={() => {
                    createModule({ name: moduleName || "New Module", course: cid });
                    setModuleName("");
                }} />
            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                {isFaculty && <BsGripVertical className="me-2 fs-3" />}
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                        onChange={(e) => saveModule({ ...module, name: e.target.value })}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                               saveModule({ ...module, editing: false });
                                            }
                                        }}
                                        value={module.name} />
                                )}
                                {isFaculty && <ModuleControlButtons
                                    moduleId={module._id}
                                    deleteModule={(moduleId) => { removeModule(moduleId); }}
                                    editModule={(moduleId) => dispatch(editModule(moduleId))} />}
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li className="wd-lesson list-group-item p-3 ps-1">
                                            {isFaculty && <BsGripVertical className="me-2 fs-3" />}
                                            {lesson.name}
                                            {isFaculty && <LessonControlButtons />}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
