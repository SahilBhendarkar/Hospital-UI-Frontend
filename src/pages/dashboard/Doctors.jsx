import { useState } from "react";
import { useDoctorsQuery } from "../../hooks/useDoctorsQuery"; 
import "../../styles/pages/Patients.css"; 
import Loader from "../../components/common/Loader";

const emptyDoctor = {
    name: "",
    email: "",
    phone: "",
    specialty: "",
    license: "",
    role: "DOCTOR",
};

const Doctors = () => {
    const {
        doctors, 
        loading,
        addDoctor, 
        updateDoctor,
        deleteDoctor,
    } = useDoctorsQuery();

    const [showForm, setShowForm] = useState(false);
    const [doctorData, setDoctorData] = useState(emptyDoctor);
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
        setDoctorData((prev) => ({ ...prev, [name]: value }));
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
                ? "Are you sure you want to update this doctor?"
                : "Are you sure you want to add this doctor?",
            () => {
                if (editId) {
                    updateDoctor({ id: editId, data: { ...doctorData } });
                    showToast("Doctor updated successfully");
                } else {
                    addDoctor({ ...doctorData });
                    showToast("Doctor added successfully");
                }

                setShowForm(false);
                setEditId(null);
                setDoctorData(emptyDoctor);
                closeConfirm();
            }
        );
    };

    const openEdit = (doctor) => {
        setEditId(doctor.id);
        setDoctorData({ ...doctor });
        setShowForm(true);
    };

    const openAdd = () => {
        setEditId(null);
        setDoctorData(emptyDoctor);
        setShowForm(true);
    };

    const confirmDelete = (doctor) => {
        openConfirm(
            `Are you sure you want to delete ${doctor.name}?`,
            () => {
                deleteDoctor(doctor.id);
                showToast("Doctor deleted successfully");
                closeConfirm();
            }
        );
    };

    return (
        <div className="patients-page">
            <div className="patients-header">
                <h2 className="title">Doctors</h2>
                <button onClick={openAdd}>Add Doctor</button>
            </div>
<br></br>
            {loading ? (
                <Loader />
            ) : (
                <div className="patient-list">
                    {doctors.map((d) => (
                        <div className="patient-card" key={d.id}>
                            <div>
                                <strong>{d.name}</strong>
                                <div className="sub-text">{d.specialty}</div>
                                <div className="sub-text">{d.email}</div>
                                <div className="sub-text">{d.phone}</div>
                                <div className="sub-text">{d.license}</div>
                            </div>

                            <div className="actions">
                                <button
                                    className="edit-btn"
                                    onClick={() => openEdit(d)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="delete-btn"
                                    onClick={() => confirmDelete(d)}
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
                        <h3>{editId ? "Edit Doctor" : "Add Doctor"}</h3>

                        <form onSubmit={submitForm}>
                            <input
                                name="name"
                                value={doctorData.name}
                                onChange={handleChange}
                                placeholder="Full Name"
                                required
                            />
                            <input
                                name="email"
                                value={doctorData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                            <input
                                name="phone"
                                value={doctorData.phone}
                                onChange={handleChange}
                                placeholder="Phone"
                                required
                            />
                            <input
                                name="specialty"
                                value={doctorData.specialty}
                                onChange={handleChange}
                                placeholder="Specialty (e.g., Cardiology)"
                                required
                            />
                            <input
                                name="license"
                                value={doctorData.license}
                                onChange={handleChange}
                                placeholder="License Number"
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

export default Doctors;
