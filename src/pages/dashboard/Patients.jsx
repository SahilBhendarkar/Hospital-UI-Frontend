import { useState } from "react";
import { usePatientsQuery } from "../../hooks/usePatientsQuery";
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
    const {
        patients,
        loading,
        addPatient,
        updatePatient,
        deletePatient,
    } = usePatientsQuery();

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
        }, 3500);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatientData((prev) => ({ ...prev, [name]: value }));
    };

    const openConfirm = (message, onConfirm) => {
        setConfirmBox({ open: true, message, onConfirm });
    };

    const closeConfirm = () => {
        setConfirmBox({ open: false, message: "", onConfirm: null });
    };

    const submitForm = (e) => {
        e.preventDefault();

        openConfirm(
            editId
                ? "Are you sure you want to update this patient?"
                : "Are you sure you want to add this patient?",
            () => {
                if (editId) {
                    updatePatient({ id: editId, data: { ...patientData } });
                    showToast("Patient updated successfully");
                } else {
                    addPatient({ ...patientData });
                    showToast("Patient added successfully");
                }

                setShowForm(false);
                setEditId(null);
                setPatientData(emptyPatient);
                closeConfirm();
            }
        );
    };

    const openEdit = (patient) => {
        setEditId(patient.id);
        setPatientData({ ...patient });
        setShowForm(true);
    };

    const openAdd = () => {
        setEditId(null);
        setPatientData(emptyPatient);
        setShowForm(true);
    };

    const confirmDelete = (patient) => {
        openConfirm(
            `Are you sure you want to delete ${patient.name}?`,
            () => {
                deletePatient(patient.id);
                showToast("Patient deleted successfully");
                closeConfirm();
            }
        );
    };

    return (
        <div className="patients-page">
            <div className="patients-header">
                <h2>Patients</h2>
                <button onClick={openAdd}>Add Patient</button>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <div className="patient-list">
                    {patients.map((p) => (
                        <div className="patient-card" key={p.id}>
                            <div>
                                <strong>{p.name}</strong>
                                <div className="sub-text">{p.email}</div>
                                <div className="sub-text">{p.phone}</div>
                            </div>

                            <div className="actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => openEdit(p)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => confirmDelete(p)}
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
                                value={patientData.name}
                                onChange={handleChange}
                                placeholder="Name"
                                required
                            />
                            <input
                                name="email"
                                value={patientData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                name="phone"
                                value={patientData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                required
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
                            <button className="cancel-btn" onClick={closeConfirm}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {toast.show && <div className="toast">{toast.message}</div>}
        </div>
    );
};

export default Patients;
