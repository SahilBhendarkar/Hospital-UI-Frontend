import api from "./api";

export const getPatients = () => api.get("/users");

export const addPatient = (data) =>
    api.post("/users", data);

export const updatePatient = (id, data) =>
    api.put(`/users/${id}`, data);

export const deletePatient = (id) =>
    api.delete(`/users/${id}`);
