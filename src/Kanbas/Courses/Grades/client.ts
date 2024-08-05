import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const GRADES_API = `${REMOTE_SERVER}/api/grades`;
export const getAllGrades = async () => {
    const response = await axios.get(`${GRADES_API}`);
    return response.data;
}