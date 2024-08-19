import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function FacultyOnlyRoute({ children }: { children: any}) {
    const { cid } = useParams();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    if (isFaculty) {
        return children;
    } else {
        return <Navigate to={`/Kanbas/Courses/${cid}`} />;
    }
}