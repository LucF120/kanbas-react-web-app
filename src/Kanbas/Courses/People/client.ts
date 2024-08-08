import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
export const findAllUsers = async () => {
	const response = await axios.get(USERS_API);
	return response.data;
}
export const findUsersByRole = async (role: string) => {
	const response = await axios.get(`${USERS_API}?role=${role}`);
	return response.data;
}
export const findUsersByPartialName = async (name: string) => {
	const response = await axios.get(`${USERS_API}?name=${name}`);
	return response.data;
}
export const findUsersByNameAndRole = async (name: string, role: string) => {
	const response = await axios.get(`${USERS_API}?name=${name}&role=${role}`);
	return response.data;
}
export const findUserById = async (id: string) => {
	const response = await axios.get(`${USERS_API}/${id}`);
	return response.data;
  };
  