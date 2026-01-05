import api from "./api";

export const getDoctors = () => api.get("/users"); 

export const addDoctor = (data) => api.post("/users", data);

export const updateDoctor = (id, data) =>
    api.put(`/users/${id}`, data);

export const deleteDoctor = (id) =>
    api.delete(`/users/${id}`);
