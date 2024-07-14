import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router";
import Courses from "./Courses";
import "./styles.css";

export default function Kanbas() {
    return (
        <div id="wd-kanbas">
            <div className="d-flex">
                <div className="d-none d-md-block bg-black">
                    <KanbasNavigation />
                </div>
            </div>
            <div className="wd-main-content-offset p-3">
                <Routes>
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="Account" element={<h1>Account</h1>} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Courses/" element={<Navigate to="1234" />} />
                    <Route path="Courses/:id/*" element={<Courses />} />
                    <Route path="Calendar" element={<h1>Calendar</h1>} />
                    <Route path="Inbox" element={<h1>Inbox</h1>} />
                </Routes>
            </div>

        </div>
    );
}