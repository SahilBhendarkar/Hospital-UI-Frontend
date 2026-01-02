import { useState } from "react";
import usePatients from "../../hooks/usePatients";
import "../../styles/pages/Patients.css";
import Loader from "../../components/common/Loader";


const emptyPatient = {
    name: "",
    email: "",
    phone: "",
    gender: "",
    role: "PATIENT",
};

const Patients = () => {
    const { patients, loading, createPatient, updatePatient, removePatient } =
        usePatients();


    const [showForm, setShowForm] = useState(false);
    const [patientData, setPatientData] = useState(emptyPatient);
    const [editId, setEditId] = useState(null);

    const [confirmBox, setConfirmBox] = useState({
        open: false,
        message: "",
        onConfirm: null,
    });
    const [toast, setToast] = useState({
        show: false,
        message: "",
    });

    const showToast = (message) => {
        setToast({ show: true, message });

        setTimeout(() => {
            setToast({ show: false, message: "" });
        }, 3000);
    };

    const openAddForm = () => {
        setEditId(null);
        setPatientData(emptyPatient);
        setShowForm(true);
    };

    const openEditForm = (patient) => {
        setEditId(patient.id);
        setPatientData(patient);
        setShowForm(true);
    };


    const openConfirm = (message, onConfirm) => {
        setConfirmBox({ open: true, message, onConfirm });
    };

    const closeConfirm = () => {
        setConfirmBox({ open: false, message: "", onConfirm: null });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prev) => ({ ...prev, [name]: value }));
    };

    const submitForm = (e) => {
        e.preventDefault();

        openConfirm(
            editId
                ? "Are you sure you want to update this patient?"
                : "Are you sure you want to add this patient?",
            () => {
                if (editId) {
                    updatePatient(editId, patientData);
                    showToast("Patient updated successfully");
                } else {
                    createPatient(patientData);
                    showToast("Patient added successfully");
                }

                setShowForm(false);
                setEditId(null);
                setPatientData(emptyPatient);
                closeConfirm();
            }
        );
    };

    const confirmDelete = (patient) => {
        openConfirm(
            `Are you sure you want to delete ${patient.name}?`,
            () => {
                removePatient(patient.id);
                showToast("Patient deleted successfully");
                closeConfirm();
            }
        );
    };

    return (
        <div className="patients-page">
            <div className="patients-header">
                <h2>Patients</h2>
                <button onClick={openAddForm}>Add Patient</button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="patient-list">
                    {patients.map((patient) => (
                        <div className="patient-card" key={patient.id}>
                            <div>
                                <strong>{patient.name}</strong>
                                <div className="sub-text">{patient.email}</div>
                                <div className="sub-text">{patient.phone}</div>
                            </div>
                            <div className="actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => openEditForm(patient)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => confirmDelete(patient)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {showForm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{editId ? "Edit Patient" : "Add Patient"}</h3>
                        <form onSubmit={submitForm}>
                            <input
                                name="name"
                                placeholder="Name"
                                value={patientData.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="email"
                                placeholder="Email"
                                value={patientData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="phone"
                                placeholder="Phone"
                                value={patientData.phone}
                                onChange={handleChange}
                                required
                            />
                            <select
                                name="gender"
                                value={patientData.gender}
                                onChange={handleChange}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <input
                                name="role"
                                value={patientData.role}
                                disabled
                            />

                            <div className="modal-actions">
                                <button type="submit">
                                    {editId ? "Update" : "Add"}
                                </button>
                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {confirmBox.open && (
                <div className="alert-overlay">
                    <div className="alert-box">
                        <p>{confirmBox.message}</p>
                        <div className="alert-actions">
                            <button onClick={confirmBox.onConfirm}>Yes</button>
                            <button
                                className="cancel-btn"
                                onClick={closeConfirm}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {toast.show && (
                <div className="toast">
                    {toast.message}
                </div>
            )}

        </div>
    );
};

export default Patients;
