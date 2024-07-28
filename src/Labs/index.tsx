import Lab1 from "./Lab1";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";
import TOC from "./TOC";
import { Route, Routes, Navigate } from "react-router";

export default function Labs() {
    return (
        <div>
            <h1>Luc Ferrara</h1>
            <h1>CS5610 SU2 2024 - Section 01</h1>
            <br />
            <h1>Labs</h1>
            <TOC />
            <Routes>
                <Route path="/" element={<Navigate to="Lab1" />} />
                <Route path="Lab1" element={<Lab1 />} />
                <Route path="Lab2" element={<Lab2 />} />
                <Route path="Lab3/*" element={<Lab3 />} />
                <Route path="Lab4" element={<Lab4 />} /> 
            </Routes>
        </div>
    );
}