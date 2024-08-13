import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const createEnrollment = async (enrollment: any) => {
    const response = await axios.post(`${ENROLLMENTS_API}`, enrollment);
    return response.data;
};
export const deleteEnrollment = async (id: string) => {
    const response = await axios.delete(`${ENROLLMENTS_API}/${id}`);
    return response.data;
};
export const deleteEnrollmentsByCourse = async (courseId: string) => {
    const response = await axios.delete(`${COURSES_API}/${courseId}/enrollments`);
    return response.data;
}
export const fetchAllEnrollments = async () => {
    const response = await axios.get(`${ENROLLMENTS_API}`);
    return response.data;
};
export const fetchEnrollmentsByUser = async (userId: string) => {
    const response = await axios.get(`${USERS_API}/${userId}/enrollments`);
    return response.data;
};
export const fetchEnrollmentsByCourse = async (courseId: string) => {
    const response = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
    return response.data;
};